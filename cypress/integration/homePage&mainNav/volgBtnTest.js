describe('Volg Button Check', function () {
  // Test Home volg button, Nav volg button en home redirect met nav home button
  // Home Button
  it('Volg Button redirects naar track', function () {
    cy.visit('/');
    cy.get('[data-cy=volgBtn]').click()
    cy.url().should('include', '/track')
  });
  // Nav Button
  it('Main nav Volg Button redirects naar track', function () {
    cy.visit('/');
    cy.get('[data-cy=navVolgBtn]').click()
    cy.url().should('include', '/track')
  });
  // Back home with Home Button
  it('Main nav Home Button redirects naar home', function () {
    cy.get('[data-cy=navHomeBtn]').click()
    cy.url().should('include', '/home')
  });
});
