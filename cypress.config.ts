import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 'landing',
    trashAssetsBeforeRuns: true,
    viewportHeight: 1000,
    viewportWidth: 1280,
    
    e2e: {
        specPattern: 'e2e-tests/**/*.cy.{ts,tsx,js,jsx}',
        baseUrl: 'http://localhost:3000',
        supportFile: false,
    },

    screenshotOnRunFailure: false
});
