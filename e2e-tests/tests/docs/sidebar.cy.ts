// e2e-tests/tests/docs/sidebar.cy.ts

// Matches versioned paths: /v1.0.14/ or /0.0.2/ or /v0.0.10-alpha.0/ (semver with optional pre-release)
const isVersionedPath = (p: string) => /\/v?\d+\.\d+[\.\d]*(-[a-zA-Z0-9.]+)?\//.test(p);

describe('Docs sidebar', () => {
  it('/docs loads and shows a sidebar', () => {
    cy.visit('/docs');
    cy.get('nav.menu, aside nav').should('exist');
  });

  it('all sidebar links return 2xx (skipping versioned paths)', () => {
    cy.visit('/docs');
    cy.collectInternalHrefs('nav.menu a.menu__link[href]').then((paths) => {
      expect(paths.length, 'sidebar links found').to.be.greaterThan(0);

      const toCheck = paths.filter((p) => !isVersionedPath(p));
      const skipped = paths.filter((p) => isVersionedPath(p));

      if (skipped.length > 0) {
        cy.log(`Skipping ${skipped.length} versioned path(s): ${skipped.join(', ')}`);
      }

      for (const p of toCheck) {
        cy.assertInternalUrlOk(p);
      }
    });
  });

  it('Overview section exists in sidebar', () => {
    cy.visit('/docs');
    cy.get('nav.menu').contains('Overview').should('exist');
  });
});
