// api/_lib/_telegram.ts
// Minimal Telegram Bot API helper — sends a message to a chat via Bot API.
// No external dependencies (telegraf not needed for simple notifications).

const BOT_API = (token: string) => `https://api.telegram.org/bot${token}`;

/**
 * Send a plain-text or HTML message to a Telegram chat.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — message not sent');
    return;
  }

  const res = await fetch(`${BOT_API(token)}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[telegram] sendMessage failed: ${res.status} ${body}`);
  }
}

/**
 * Format an enterprise lead into a readable Telegram message.
 */
export function formatEnterpriseLead(fields: {
  email: string;
  company?: string | null;
  blockchain?: string | null;
  serviceType?: string | null;
  scale?: string | null;
  message?: string | null;
  ip?: string;
}): string {
  const lines = [
    '🏢 <b>New Enterprise Lead</b>',
    '',
    `📧 <b>Email:</b> ${fields.email}`,
  ];

  if (fields.company) lines.push(`🏷 <b>Company:</b> ${fields.company}`);
  if (fields.blockchain) lines.push(`⛓ <b>Blockchain:</b> ${fields.blockchain}`);
  if (fields.serviceType) lines.push(`🔧 <b>Service:</b> ${fields.serviceType}`);
  if (fields.scale) lines.push(`📊 <b>Scale:</b> ${fields.scale}`);
  if (fields.message) lines.push(`\n💬 <b>Message:</b>\n${fields.message}`);
  if (fields.ip) lines.push(`\n🌐 <b>IP:</b> ${fields.ip}`);

  lines.push(`\n🕐 ${new Date().toISOString()}`);

  return lines.join('\n');
}
