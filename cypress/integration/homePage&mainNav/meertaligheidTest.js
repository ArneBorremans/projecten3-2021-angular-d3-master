describe('Meertaligheid Check', function () {
  it('Meertaligheid verandert', function () {
    cy.visit('/');
    // Main nav - verander naar Frans select
    cy.get('[data-cy=langButton]').click().get('button').contains('FR').click({ force: true });
    // Home
    cy.get('[data-cy=homeIntro]').contains('Vous voulez faire partie')
    // Main nav - verander terug naar Nederlands select
    cy.get('[data-cy=langButton]').click().get('button').contains('NL').click({ force: true });
    //Home
    cy.get('[data-cy=homeIntro]').contains('Wil jij deel uitmaken')
  });
});
