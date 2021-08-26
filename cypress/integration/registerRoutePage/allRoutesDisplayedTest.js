describe('All Routes Displayed', function () {
  it('All Routes are correctly displayed', function () {
    cy.server();

    cy.route({
      method: 'GET',
      url: '/api/route/public',
      status: 200,
      response: 'fixture:routes.json'
    });

    cy.visit('/signup');

    // 3 routes in 25km
    cy.get('[data-cy=registerRouteItem]').should('have.length', 3)
    // 1 route in 50km
    cy.get('[data-cy=registerRouteDistance50]').click()
    cy.get('[data-cy=registerRouteItem]').should('have.length', 1)
    // geen routes in 100km
    cy.get('[data-cy=registerRouteDistance100]').should('not.exist')
  });
});
