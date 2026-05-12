// e2e-tests/tests/landing/home.cy.ts
describe('Home page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/');
  });
  it('loads and shows site title', () => {
    cy.get('nav').contains('EasyLayer').should('be.visible');
    cy.get('h1').should('exist');
  });
  it('renders main sections', () => {
    cy.get('#features').should('exist');
    cy.get('#proof-highlights').should('exist');
    cy.get('#subscribe').should('exist');
    cy.get('#faq').should('exist');
  });
  it('hero CTA links to quickstart, proof, and GitHub', () => {
    cy.get('a[href*="/docs/quickstart"]').should('exist');
    cy.get('a[href="/proof"]').should('exist');
    cy.get('a[href*="github.com/easylayer/core"]').should('exist');
  });
  it('enterprise banner links to /enterprise', () => {
    cy.get('a[href="/enterprise"]').should('exist');
  });
  it('FAQ has at least one question', () => {
    cy.get('#faq').find('button').should('have.length.greaterThan', 0);
  });
});
