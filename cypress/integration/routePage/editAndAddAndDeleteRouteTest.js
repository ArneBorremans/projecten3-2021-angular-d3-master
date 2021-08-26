describe('Routes get added and edited correctly', function () {
  it('Routes get added and edited correctly', function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: '/api/route',
      status: 200,
      response: 'fixture:routes.json'
    });

    cy.route({
      method: 'PUT',
      url: 'api/route/1',
      status: 200,
      response: 'fixture:editedRoute.json'
    })

    cy.route({
      method: 'DELETE',
      url: 'api/route/1',
      status: 200,
      response: ''
    })

    // Succesvolle login
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(2000)
    cy.url().should('include', '/home')

    // 4 routes en route knop werkt
    cy.get('[data-cy=navRouteBtn]').should('be.visible').click()
    cy.url().should('include', '/route')
    cy.get('[data-cy=routeThumbnail]').should('have.length', 4)

    // Route toevoegen
    cy.get('[data-cy=routeOverviewAddButton]').click()
    cy.url().should('include', '/route/new')
    cy.visit('./route')
    cy.url().should('include', '/route')

    // Route aanpassen
    cy.get('[data-cy=routeThumbnail]').first().click()
    cy.url().should('include', '/route/edit/1')

    cy.get('[data-cy=routeNameField]').type("test")
    cy.get('[data-cy=routeBeschrijvingField]').click()
    cy.get('[data-cy=routeSubmitButton]').click()
    cy.get('[data-cy=routeKlaarButton]').click()
    cy.url().should('include', '/route')

    // Route verwijderen - confirm
    cy.get('[data-cy=routeThumbnail]').first().click()
    cy.url().should('include', '/route/edit/1')

    cy.get('[data-cy=routeDeleteButton').click()
    cy.get('[data-cy=routeDeleteConfirmButton]').click()
    cy.url().should('include', '/route')

    // Route verwijderen - cancel
    cy.get('[data-cy=routeThumbnail]').first().click()
    cy.url().should('include', '/route/edit/1')

    cy.get('[data-cy=routeDeleteButton').click()
    cy.get('[data-cy=routeDeleteCancelButton]').click()
    cy.url().should('include', '/route/edit/1')
  });
});
