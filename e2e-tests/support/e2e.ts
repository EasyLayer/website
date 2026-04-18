// e2e-tests/support/e2e.ts
import './commands';

// Selectively ignore third-party script errors that are not in our control.
// Keep this narrow so real application errors still fail tests.
Cypress.on('uncaught:exception', (err) => {
  const thirdPartyPatterns = [
    'fbq is not defined',
    'gtag is not defined',
    'hcaptcha',
    // Cross-origin scripts (FB Pixel, Analytics) throw opaque "Script error."
    // because browsers hide details of cross-origin exceptions.
    'Script error',
  ];
  if (thirdPartyPatterns.some((p) => err.message.toLowerCase().includes(p.toLowerCase()))) {
    return false; // suppress — not our code
  }
  return true; // let real errors fail the test
});
