import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'landing',
  trashAssetsBeforeRuns: true,
  viewportHeight: 1000,
  viewportWidth: 1280,
  e2e: {
    specPattern: 'e2e-tests/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'e2e-tests/support/e2e.ts',
    baseUrl: 'http://localhost:3000',
    retries: { runMode: 1, openMode: 0 },
  },
  screenshotOnRunFailure: false,
});
