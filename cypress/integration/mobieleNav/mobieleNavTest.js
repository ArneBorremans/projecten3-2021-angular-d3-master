describe('Mobile Navigation test', function () {
  it('Tests Mobile Navigation', function () {
    cy.visit('/');
    cy.viewport(1000, 600)
    
    // Track
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileTrackButton]').click({ force: true })
    cy.url().should('include', '/track')

    // Schrijf In
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileSchrijfinButton]').click({ force: true })
    cy.url().should('include', '/signup')

    // Home
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileHomeButton]').click({ force: true })
    cy.url().should('include', '/home')

    // Login
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileLoginButton]').click({ force: true })
    cy.url().should('include', '/login')

    // Log in als admin
    cy.get('[data-cy=login-email]').type('admin@admin.be')
    cy.get('[data-cy=login-password]').type('P@ssword1111')
    cy.get('[data-cy=login-button]').click()
    cy.wait(2000)
    cy.url().should('include', '/home')

    // Profiel
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileProfileButton]').click({ force: true })
    cy.url().should('include', '/profile')

    // Route
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileRoutesButton]').click({ force: true })
    cy.url().should('include', '/route')

    // Log out
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileLogoutButton]').click({ force: true })
    cy.url().should('include', '/login')

    // Talen veranderen
    cy.visit('/')
    // Verander naar FR
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileLanguageButton]').click({ force: true }).get('button').contains('FR').click({ force: true });
    cy.get('[data-cy=homeIntro]').contains('Vous voulez faire partie')
    // Verander naar NL
    cy.get('[data-cy=navMobileMenu]').click()
    cy.get('[data-cy=navMobileLanguageButton]').click({ force: true }).get('button').contains('NL').click({ force: true });
    cy.get('[data-cy=homeIntro]').contains('Wil jij deel uitmaken')
  });
});
