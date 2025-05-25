describe('Home page', () => {
    it('should load and display site title', () => {
      cy.visit('/');
      cy.get('nav').contains('EasyLayer').should('be.visible');
    });
  });
  