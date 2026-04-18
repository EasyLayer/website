// e2e-tests/tests/landing/navbar.cy.ts
describe('Navbar', () => {
  beforeEach(() => { cy.viewport(1280, 720); cy.visit('/'); });
  it('all desktop internal navbar links return 2xx', () => {
    cy.collectInternalHrefs('nav a[href]', {
      excludeText: [/github/i, /twitter/i, /discussions/i],
    }).then((paths) => {
      if (!paths.length) return;
      for (const p of paths) cy.assertInternalUrlOk(p);
    });
  });
  it('Docs link points to /docs', () => {
    cy.get('nav').contains('Docs').should('have.attr', 'href').and('include', '/docs');
  });
  it('Enterprise link points to /enterprise', () => {
    cy.get('nav').contains('Enterprise').should('have.attr', 'href').and('include', '/enterprise');
  });
  it('mobile menu opens', () => {
    cy.viewport(375, 812);
    // Click the hamburger button
    cy.get('nav button').first().click({ force: true });
    // The mobile overlay renders a fixed full-screen div — find Docs link inside it
    cy.get('div.fixed').contains('Docs').should('be.visible');
  });
});
