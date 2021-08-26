describe('Inschrijf Button Test', function () {
  // Test Home inschrijf button, Nav inschrijf button en home redirect met nav logo
  // Home Button
  it('Inschrijf Button redirects naar sign up', function () {
    cy.visit('/');
    cy.get('[data-cy=inschrijfBtn]').click()
    cy.url().should('include', '/signup')
  });
  // Nav Button
  it('Main nav Inschrijf Button redirects naar sign up', function (){
    cy.visit('/');
    cy.get('[data-cy=navInschrijfBtn]').click()
    cy.url().should('include', '/signup')
  });
  // Back home Home with Logo
  it('Main nav Logo redirects naar home', function (){
    cy.get('[data-cy=navHomeLogo]').click()
    cy.url().should('include', '/home')
  });
});
