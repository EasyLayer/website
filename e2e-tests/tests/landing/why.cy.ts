describe('Why page', () => {
  beforeEach(() => {
    cy.viewport(1280, 900);
    cy.visit('/why');
  });

  it('loads fit-focused comparison page', () => {
    cy.contains('When EasyLayer makes sense').should('be.visible');
    cy.contains('Use EasyLayer when you need your own blockchain state').should('be.visible');
  });

  it('shows good fit and not the best fit guidance', () => {
    cy.contains('Good fit').should('be.visible');
    cy.contains('Not the best first step').should('be.visible');
  });
});
