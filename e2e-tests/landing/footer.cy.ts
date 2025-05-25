describe('Footer smoke tests', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.visit('/')
    })
  
    it('displays the logo and branding', () => {
      cy.get('footer img[alt="EasyLayer Logo"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('match', /logo\.png$/)
  
      cy.get('footer').contains('EasyLayer').should('exist')
    })
  })