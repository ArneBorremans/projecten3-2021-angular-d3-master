describe('Routes get displayed and work correctly', function () {
  // test nav meertaligheid selector
  it('Routes get displayed and work correctly', function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: '/api/route',
      status: 200,
      response: 'fixture:routes.json'
    });

    // Succesvolle login
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(2000)
    cy.url().should('include', '/home')

    // 4 routes en route knop werkt
    cy.get('[data-cy=navRouteBtn]').should('be.visible').click()
    cy.get('[data-cy=routeThumbnail]').should('have.length', 4)

    // Geen routes, toont melding
    cy.route({
      method: 'GET',
      url: '/api/route',
      status: 200,
      response: []
    });

    cy.visit('/route')

    cy.get('[data-cy=geenWandelingenMelding]').should('be.visible')
  });
});
