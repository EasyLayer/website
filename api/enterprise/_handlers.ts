// api/enterprise/_handlers.ts
// Handler for the EasyLayer enterprise contact form.
// Validates, rate-limits, verifies hCaptcha, then sends lead to Telegram bot.
// No database or Google Sheets required.

import type { RequestHandler } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendTelegramMessage, formatEnterpriseLead } from '../_lib/_telegram';

// ── Environment ──────────────────────────────────────────────────────────────

const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET || '';

// Guard: Vercel production always disables bypass regardless of env var value.
const IS_VERCEL_PRODUCTION =
  process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production';
const HCAPTCHA_ALLOW_DEV_BYPASS = IS_VERCEL_PRODUCTION
  ? false
  : String(process.env.HCAPTCHA_ALLOW_DEV_BYPASS || 'false').toLowerCase() === 'true';

// ── Field limits (whitelist approach) ────────────────────────────────────────

const FIELD_LIMITS = {
  email: 160,
  company: 200,
  blockchain: 50,
  serviceType: 80,
  scale: 60,
  message: 1500,
  hp: 100,
} as const;

const ALLOWED_FIELDS = ['email', 'company', 'blockchain', 'serviceType', 'scale', 'message', 'captchaToken', 'hp'];

// ── Rate limiting (in-memory, best-effort for serverless) ────────────────────

const RL_WINDOW_MS = 60_000;
const RL_MAX = 5;
const rlBuckets = new Map<string, { windowStart: number; count: number }>();

function getClientIp(req: any): string {
  const xf = req.headers?.['x-forwarded-for'];
  if (typeof xf === 'string' && xf.length > 0) return xf.split(',')[0].trim();
  if (Array.isArray(xf) && xf[0]) return String(xf[0]).split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimitOrThrow(req: any): void {
  const now = Date.now();
  const ip = getClientIp(req);
  const key = `enterprise:${ip}`;

  const curr = rlBuckets.get(key);
  if (!curr || now - curr.windowStart >= RL_WINDOW_MS) {
    rlBuckets.set(key, { windowStart: now, count: 1 });
    return;
  }
  curr.count += 1;
  rlBuckets.set(key, curr);

  if (curr.count > RL_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((RL_WINDOW_MS - (now - curr.windowStart)) / 1000));
    const err: any = new Error('RATE_LIMITED');
    err.status = 429;
    err.retryAfterSec = retryAfterSec;
    throw err;
  }
}

// ── hCaptcha ──────────────────────────────────────────────────────────────────

async function verifyHcaptcha(token: string, ip?: string): Promise<boolean> {
  if (HCAPTCHA_ALLOW_DEV_BYPASS && (token === 'dev-bypass' || token === '')) return true;
  if (!HCAPTCHA_SECRET) return true; // No secret configured = skip verification

  const params = new URLSearchParams();
  params.set('response', token);
  params.set('secret', HCAPTCHA_SECRET);
  if (ip) params.set('remoteip', ip);

  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const json: any = await res.json().catch(() => ({}));
  return Boolean(json?.success);
}

// ── Sanitization ──────────────────────────────────────────────────────────────

function sanitize(value: unknown, maxLen: number): string | null {
  if (value === undefined || value === null) return null;
  let s = String(value).normalize('NFKC').replace(/[\u0000-\u001F\u007F]/g, '').trim();
  if (s.length > maxLen) return null;
  return s || null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ── Main handler ──────────────────────────────────────────────────────────────

export const postEnterpriseJoin: RequestHandler = async (req: any, res: any) => {
  // CORS
  const allowedOrigin = IS_VERCEL_PRODUCTION ? 'https://easylayer.io' : '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Rate limit
  try {
    rateLimitOrThrow(req);
  } catch (e: any) {
    if (e?.status === 429) {
      res.setHeader('Retry-After', String(e.retryAfterSec || 60));
      return res.status(429).json({ success: false, message: 'Too many requests. Please try again soon.' });
    }
    return res.status(429).json({ success: false, message: 'Too many requests.' });
  }

  // Filter to allowed fields only
  const rawBody = req.body || {};
  const body: any = {};
  for (const key of ALLOWED_FIELDS) {
    if (rawBody[key] !== undefined) body[key] = rawBody[key];
  }

  // Validate email
  const email = sanitize(body.email, FIELD_LIMITS.email);
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email' });
  }

  // Honeypot
  const hp = sanitize(body.hp, FIELD_LIMITS.hp);
  if (hp) {
    res.setHeader('Cache-Control', 'no-store');
    return res.json({ success: true });
  }

  // hCaptcha
  const token = String(body.captchaToken || '');
  const captchaOk = await verifyHcaptcha(token, getClientIp(req));
  if (!captchaOk) {
    return res.status(400).json({ success: false, message: 'Captcha verification failed' });
  }

  // Sanitize optional fields
  const company = sanitize(body.company, FIELD_LIMITS.company);
  const blockchain = sanitize(body.blockchain, FIELD_LIMITS.blockchain);
  const serviceType = sanitize(body.serviceType, FIELD_LIMITS.serviceType);
  const scale = sanitize(body.scale, FIELD_LIMITS.scale);
  const message = sanitize(body.message, FIELD_LIMITS.message);

  // Send to Telegram
  const telegramText = formatEnterpriseLead({
    email,
    company,
    blockchain,
    serviceType,
    scale,
    message,
    ip: getClientIp(req),
  });

  try {
    await sendTelegramMessage(telegramText);
  } catch (e: any) {
    console.error('[enterprise] Telegram send failed:', e?.message);
    // Still return success — the lead data was valid; delivery failure is server-side
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.json({ success: true });
};

// ── Vercel wrapper ────────────────────────────────────────────────────────────

export default function vercelWrapper(handler: RequestHandler) {
  return async (req: VercelRequest, res: VercelResponse) =>
    handler(req as any, res as any, (() => {}) as any);
}
