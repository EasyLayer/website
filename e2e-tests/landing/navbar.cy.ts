describe('Navbar smoke tests', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.visit('/')
    })
  
    it('lists all primary desktop links with correct hrefs', () => {
      cy.get('nav').contains('Docs').should('have.attr', 'href', '/docs')
      cy.get('nav').contains('Blog').should('have.attr', 'href', '/blog')
      cy.get('nav').contains('FAQ').should('have.attr', 'href', '#faq')
      cy.get('nav').contains('Join our Newsletter').should('have.attr', 'href', '#subscribe')
    })
  })