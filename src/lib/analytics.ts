// src/lib/analytics.ts
// Small client-side analytics helper. It intentionally sends only event names
// and low-cardinality metadata; never pass emails, messages, addresses, or user IDs.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'hero_get_started_click'
  | 'hero_github_click'
  | 'hero_proof_click'
  | 'homepage_why_click'
  | 'proof_quickstart_click'
  | 'proof_github_click'
  | 'why_quickstart_click'
  | 'why_enterprise_click'
  | 'enterprise_form_open'
  | 'enterprise_form_submit_success'
  | 'newsletter_submit_success'
  | 'external_github_click';

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );

  window.gtag('event', name, safeParams);
}
