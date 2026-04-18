// e2e-tests/tests/misc/newsletter.cy.ts
describe('Newsletter form', () => {
  beforeEach(() => { cy.viewport(1280, 720); cy.visit('/#subscribe'); });
  it('email input visible', () => {
    cy.get('#subscribe input[type="email"]').should('be.visible');
  });
  it('submit button enabled', () => {
    cy.get('#subscribe button[type="submit"]').should('be.visible').and('not.be.disabled');
  });
  it('HTML5 validation on empty submit', () => {
    cy.get('#subscribe button[type="submit"]').click();
    cy.get('#subscribe input[type="email"]').then(($i) => {
      expect($i[0].validity.valid).to.be.false;
    });
  });
});
