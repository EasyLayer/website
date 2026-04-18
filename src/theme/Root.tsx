// src/theme/Root.tsx
// Global root wrapper — adds cookie consent banner at the bottom of every page.

import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

export default function Root({ children }: { children: React.ReactNode }) {
  const acceptLabel = translate({ id: 'cookieConsent.accept', message: 'Accept' });
  const textPrefix = translate({
    id: 'cookieConsent.text',
    message:
      'We use cookies to enhance your experience on our website. By continuing to use this site, you agree to our',
  });
  const privacyLabel = translate({ id: 'cookieConsent.privacyPolicy', message: 'Privacy Policy' });

  return (
    <>
      {children}
      <CookieConsent
        location="bottom"
        buttonText={acceptLabel}
        cookieName="easylayer-cookie-consent"
        style={{
          background: '#ffffff',
          color: '#1f2937',
          alignItems: 'center',
          padding: '1rem',
          zIndex: 9999,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        buttonStyle={{
          background: '#22d3ee',
          color: 'white',
          fontSize: '14px',
          padding: '0.5rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
        expires={150}
      >
        {textPrefix}{' '}
        <Link to="/policy" style={{ color: '#22d3ee', textDecoration: 'underline', fontWeight: '500' }}>
          {privacyLabel}
        </Link>
        .
      </CookieConsent>
    </>
  );
}
