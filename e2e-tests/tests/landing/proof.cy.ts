describe('Proof page', () => {
  beforeEach(() => {
    cy.viewport(1280, 900);
    cy.visit('/proof');
  });

  it('loads proof assets page', () => {
    cy.contains('Technical proof path').should('be.visible');
    cy.contains('Prove the indexing model before you build on it').should('be.visible');
  });

  it('links to quickstart and GitHub', () => {
    cy.get('a[href*="/docs/quickstart"]').should('exist');
    cy.get('a[href*="github.com/easylayer/core"]').should('exist');
  });
});
