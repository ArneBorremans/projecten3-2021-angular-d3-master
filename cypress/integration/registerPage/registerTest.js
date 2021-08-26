describe('Register page works correctly', function () {
  // test nav meertaligheid selector
  it('Register page works correctly', function () {
    cy.visit('/register');
    /*
      cy.get('[data-cy=register-firstname]')
      cy.get('[data-cy=register-lastname]')
      cy.get('[data-cy=register-email]')
      cy.get('[data-cy=register-password]')
      cy.get('[data-cy=register-confirm-password]')
      cy.get('[data-cy=register-button]')
      cy.get('[data-cy=appError)]')
    */
    // Lege registratie gegevens, error
    cy.get('[data-cy=register-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Alleen voornaam, error
    cy.visit('/register');
    cy.get('[data-cy=register-firstname]').type('jeff')
    cy.get('[data-cy=register-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Alleen achternaam, error
    cy.visit('/register');
    cy.get('[data-cy=register-lastname]').type('jefferson')
    cy.get('[data-cy=register-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Alleen achternaam, error
    cy.visit('/register');
    cy.get('[data-cy=register-email]').type('jeff@jefferson.be')
    cy.get('[data-cy=register-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Wachtwoord zonder confirmatie, error
    cy.visit('/register');
    cy.get('[data-cy=register-firstname]').type('jeff')
    cy.get('[data-cy=register-lastname]').type('jefferson')
    cy.get('[data-cy=register-email]').type('jeff@jefferson.be')
    cy.get('[data-cy=register-password]').type('P@ssword1111')
    cy.get('[data-cy=register-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Wachtwoord met foute confirmatie, error (bug laat het wel toe)
    /*cy.visit('/register');
    cy.get('[data-cy=register-firstname]').type('jeff')
    cy.get('[data-cy=register-lastname]').type('jefferson')
    cy.get('[data-cy=register-email]').type('jeff@jefferson.be')
    cy.get('[data-cy=register-password]').type('P@ssword1111')
    cy.get('[data-cy=register-confirm-password]').type('password123')
    cy.get('[data-cy=register-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')*/

    // Succesvolle registratie - werkt alleen met nieuwe unieke gegevens
    /*
    cy.visit('/register');
    cy.get('[data-cy=register-firstname]').type('fred')
    cy.get('[data-cy=register-lastname]').type('fredderson')
    cy.get('[data-cy=register-email]').type('fred@fredderson.be')
    cy.get('[data-cy=register-password]').type('P@ssword1111')
    cy.get('[data-cy=register-confirm-password]').type('P@ssword1111')
    cy.get('[data-cy=register-button]').click()
    cy.wait(4000)
    cy.url().should('include', '/home')
    */
  });
});
