// e2e-tests/support/e2e.ts
import './commands';

Cypress.on('uncaught:exception', (err) => {
  const thirdPartyPatterns = ['fbq is not defined', 'gtag is not defined', 'hcaptcha'];
  if (thirdPartyPatterns.some((p) => err.message.toLowerCase().includes(p))) return false;
  return true;
});
