// e2e-tests/tests/landing/footer.cy.ts
describe('Footer', () => {
  beforeEach(() => { cy.viewport(1280, 720); cy.visit('/'); });
  it('all internal footer links return 2xx', () => {
    cy.collectInternalHrefs('footer a[href]').then((paths) => {
      if (!paths.length) return;
      for (const p of paths) cy.assertInternalUrlOk(p);
    });
  });
  it('footer contains EasyLayer branding', () => {
    cy.get('footer').contains('EasyLayer').should('exist');
  });
  it('privacy policy link works', () => {
    cy.get('footer a[href*="policy"]').first().then(($a) => {
      cy.assertInternalUrlOk($a.attr('href') || '/policy');
    });
  });
  it('newsletter form is present in footer', () => {
    cy.get('footer input[type="email"]').should('exist');
  });
});
