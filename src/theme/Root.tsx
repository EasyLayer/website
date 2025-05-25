import React from 'react';
import CookieConsent from 'react-cookie-consent';

export default function Root({ children }) {
  return (
    <>
      {children}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
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
        // enableDeclineButton
        // declineButtonText="Decline"
        // declineButtonStyle={{
        //   background: "transparent",
        //   color: "#1f2937",
        //   fontSize: "14px",
        //   padding: "0.5rem 1.5rem",
        //   borderRadius: "4px",
        //   cursor: "pointer",
        //   fontWeight: "500",
        //   border: "1px solid #e5e7eb"
        // }}
        // onAccept={() => {}}
      >
        We use cookies to enhance your experience on our website. By continuing to use this site, you agree to our{' '}
        <a
          href="/policy"
          style={{
            color: '#22d3ee',
            textDecoration: 'underline',
            fontWeight: '500',
          }}
        >
          privacy policy
        </a>
        .
      </CookieConsent>
    </>
  );
}
