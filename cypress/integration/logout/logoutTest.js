describe('Log out works correctly', function () {
  it('Log out works correctly', function () {
    // Succesvolle login
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(2000)
    cy.url().should('include', '/home')

    cy.get('[data-cy=navUserMenuButton]').should('be.visible').click()
    cy.get('[data-cy=logoutButton]').click({ force: true })
    cy.wait(1000)
    cy.url().should('include', '/login')
  });
});
