// src/components/EnterpriseForm.tsx
// Enterprise lead form — sends to /api/enterprise/join → Telegram bot.

import type { FC, FormEvent, ChangeEvent } from 'react';
import React, { useState, useRef } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface FormState {
  email: string;
  company: string;
  blockchain: string;
  serviceType: string;
  scale: string;
  message: string;
  hp: string;
}
const INITIAL: FormState = { email: '', company: '', blockchain: '', serviceType: '', scale: '', message: '', hp: '' };
type Status = 'idle' | 'loading' | 'success' | 'error';

const EnterpriseForm: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const hcaptchaSiteKey = (siteConfig.customFields?.HCAPTCHA_SITEKEY as string) || '';
  const captchaRef = useRef<HCaptcha>(null);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [captchaToken, setCaptchaToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/enterprise/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          company: form.company,
          blockchain: form.blockchain,
          serviceType: form.serviceType,
          scale: form.scale,
          message: form.message,
          hp: form.hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setForm(INITIAL);
      } else if (res.status === 429) {
        setStatus('error');
        setErrorMsg('Too many requests. Please try again in a few minutes.');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const ic =
    'w-full rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400';
  const lc = 'block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1';

  return (
    <SectionContainer id="contact" className="pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100 lg:text-3xl">
            <Translate id="enterprise.form.title">Get in touch</Translate>
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            <Translate id="enterprise.form.description">
              Tell us about your project. We will get back to you within 1 business day.
            </Translate>
          </p>
        </div>
        {status === 'success' ? (
          <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-8 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-100 mb-2">
              <Translate id="enterprise.form.success.title">Thank you!</Translate>
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400">
              <Translate id="enterprise.form.success.description">
                We have received your message and will contact you within 1 business day.
              </Translate>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-yellow-500/25 bg-yellow-500/5 dark:bg-neutral-800/50 p-8"
          >
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" value={form.hp} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="ent-email" className={lc}>
                <Translate id="enterprise.form.email">Work email *</Translate>
              </label>
              <input
                id="ent-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                className={ic}
              />
            </div>
            <div>
              <label htmlFor="ent-company" className={lc}>
                <Translate id="enterprise.form.company">Company name *</Translate>
              </label>
              <input
                id="ent-company"
                type="text"
                name="company"
                required
                placeholder="Acme Corp"
                value={form.company}
                onChange={handleChange}
                className={ic}
              />
            </div>
            <div>
              <label htmlFor="ent-blockchain" className={lc}>
                <Translate id="enterprise.form.blockchain">Blockchain of interest</Translate>
              </label>
              <select
                id="ent-blockchain"
                name="blockchain"
                value={form.blockchain}
                onChange={handleChange}
                className={ic}
              >
                <option value="">Select…</option>
                <option value="Bitcoin / Bitcoin-like">Bitcoin / Bitcoin-like</option>
                <option value="EVM (Ethereum, L2s)">EVM (Ethereum, L2s)</option>
                <option value="Both">Both</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="ent-service" className={lc}>
                <Translate id="enterprise.form.serviceType">What are you looking for?</Translate>
              </label>
              <select
                id="ent-service"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className={ic}
              >
                <option value="">Select…</option>
                <option value="Managed by EasyLayer team">Fully managed by EasyLayer team</option>
                <option value="Self-hosted with PRO services">Self-hosted + PRO services (SQL / S3)</option>
                <option value="Priority support only">Priority support only</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="ent-scale" className={lc}>
                <Translate id="enterprise.form.scale">Expected data volume</Translate>
              </label>
              <select id="ent-scale" name="scale" value={form.scale} onChange={handleChange} className={ic}>
                <option value="">Select…</option>
                <option value="< 1M events/day">&lt; 1M events/day</option>
                <option value="1M–100M events/day">1M–100M events/day</option>
                <option value="> 100M events/day">&gt; 100M events/day</option>
                <option value="Unknown">Unknown / not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="ent-message" className={lc}>
                <Translate id="enterprise.form.message">Tell us more (optional)</Translate>
              </label>
              <textarea
                id="ent-message"
                name="message"
                rows={4}
                maxLength={1500}
                placeholder="Describe your use case, timeline, or any specific requirements…"
                value={form.message}
                onChange={handleChange}
                className={ic}
              />
              <p className="mt-1 text-xs text-neutral-400">{form.message.length}/1500</p>
            </div>
            {/* hCaptcha widget — renders only when sitekey is configured */}
            {hcaptchaSiteKey && (
              <HCaptcha
                sitekey={hcaptchaSiteKey}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken('')}
                ref={captchaRef}
              />
            )}

            {status === 'error' && (
              <div className="rounded border border-red-300 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {errorMsg}
              </div>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded border border-yellow-500 bg-yellow-500 px-6 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading'
                ? translate({ id: 'enterprise.form.sending', message: 'Sending…' })
                : translate({ id: 'enterprise.form.submit', message: 'Send message →' })}
            </button>
            <p className="text-center text-xs text-neutral-400">
              We respect your privacy. Your information will not be shared with third parties.
            </p>
          </form>
        )}
      </div>
    </SectionContainer>
  );
};

export default EnterpriseForm;
