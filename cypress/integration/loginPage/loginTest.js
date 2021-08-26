describe('Login page works correctly', function () {
  // test nav meertaligheid selector
  it('Login page works correctly', function () {
    cy.visit('/login');

    // Lege login gegevens, error
    cy.get('[data-cy=login-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Alleen gebruikersnaam, error
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Alleen wachtwoord, error
    cy.visit('/login');
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Foute inloggegevens, error
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin')
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')

    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-password]').type('P@ssword1')
    cy.get('[data-cy=login-button]').click()
    cy.wait(1000)
    cy.get('[data-cy=appError]').should('be.visible')
    // Succesvolle login
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(2000)
    cy.url().should('include', '/home')
  }); 
});
