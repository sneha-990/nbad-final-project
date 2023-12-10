describe('Visual Regression Tests', () => {
    it('should match the homepage snapshot', () => {
        cy.visit('/');
        cy.get('h1').should('be.visible');
        cy.contains('Login').click();
        cy.url().should('include', '/login');
    });
  });
  