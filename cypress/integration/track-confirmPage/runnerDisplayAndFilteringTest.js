describe('All users displayed and correct filtering', function () {
  it('All users displayed and correct filtering', function () {
    cy.server();

    cy.route({
      method: 'GET',
      url: '/api/loper/public?page=0',
      status: 200,
      response: 'fixture:lopers.json'
    });

    cy.route({
      method: 'GET',
      url: '/api/loper/searchhidden?gemeente=gent&voornaam=fred&naam=perry',
      status: 200,
      response: 'fixture:loper.json'
    })

    cy.visit('/track');
    /* GEEN FILTERS */
    // Zonder filters
    cy.wait(1000)
    cy.get('[data-cy=trackLoperItem]').should('have.length', 5)

    cy.get('[data-cy=track-confirmZoekButton]').click()

    // Loper bestaat, retourneert 1 resultaat
    cy.get('[data-cy=nameParticipant]').type('perry')
    cy.get('[data-cy=surnameParticipant]').type('fred')
    cy.get('[data-cy=locationParticipant]').type('gent')

    cy.get('[data-cy=login-button]').click()

    cy.get('[data-cy=filteredLoper]').should('have.length', 1)

    // Loper bestaat niet, wordt niet gevonden.
    cy.get('[data-cy=nameParticipant]').clear().type('john')
    cy.get('[data-cy=surnameParticipant]').clear().type('johnson')
    cy.get('[data-cy=locationParticipant]').clear().type('brussel')

    cy.get('[data-cy=login-button]').click()

    cy.get('[data-cy=filteredLoper]').should('not.exist')
  });
});
