describe('Airalo UI Test', () => {
  it('Search and verify Japan eSIM package details', () => {
    cy.visit('https://airalo.com', {
      headers: { 'Accept-Language': 'en-US' }
    });
    

    cy.get('[data-testid="search-input"]').type('Japan');

    cy.get('.countries-list')
      .contains('Japan').click();

    cy.url().should('include', '/japan-esim');

    cy.get('.sim-item-link').eq(1).within(() => {
      cy.contains('BUY NOW').click();
    });

    cy.get('[data-testid="sim-detail-header"]').within(() => {
      cy.contains('Moshi Moshi').should('exist');
      cy.contains('Japan').should('exist');
      cy.contains('1 GB').should('exist');
      cy.contains('7 Days').should('exist');
      cy.contains('$4.50').should('exist');
    });
  });
});
