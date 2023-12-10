describe('App E2E Tests', () => {
    it('should display the home page', () => {
      cy.visit('/');
      cy.contains('Personal Budget').should('exist');
    });
  
    it('should navigate to the about page', () => {
      cy.visit('/');
      cy.contains('About').click();
      cy.url().should('include', '/about');
    });
  
    // Add more test cases for different pages and interactions
  });
  