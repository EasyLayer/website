describe('Navbar', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/');
  });

  it('all desktop internal navbar links return 2xx', () => {
    cy.collectInternalHrefs('nav a[href]', {
      excludeText: [/github/i, /twitter/i, /discussions/i],
    }).then((paths) => {
      if (!paths.length) return;
      for (const p of paths) cy.assertInternalUrlOk(p);
    });
  });

  it('Docs link points to /docs', () => {
    cy.get('nav a[href*="/docs"]').contains('Docs').should('be.visible');
  });

  it('Proof, Why, and Enterprise are grouped under the Learn dropdown', () => {
    cy.contains('nav button', 'Learn')
      .should('be.visible')
      .closest('div.group')
      .within(() => {
        // The dropdown is CSS hover/focus driven. Cypress does not reliably
        // activate pseudo-hover, so assert the menu contract by DOM presence.
        // Use partial href matching because Docusaurus may render trailing
        // slashes depending on config/baseUrl.
        cy.get('a[href*="/proof"]').should('exist').and('contain.text', 'Proof');
        cy.get('a[href*="/why"]').should('exist').and('contain.text', 'Why EasyLayer');
        cy.get('a[href*="/enterprise"]').should('exist').and('contain.text', 'Enterprise');
      });
  });

  it('mobile menu opens and includes product links', () => {
    cy.viewport(375, 812);
    cy.get('nav button').first().click({ force: true });
    cy.get('div.fixed').contains('Docs').should('be.visible');
    cy.get('div.fixed').contains('Learn').should('be.visible');
    cy.get('div.fixed').contains('Proof').should('be.visible');
    cy.get('div.fixed').contains('Why EasyLayer').should('be.visible');
    cy.get('div.fixed').contains('Enterprise').should('be.visible');
  });
});
