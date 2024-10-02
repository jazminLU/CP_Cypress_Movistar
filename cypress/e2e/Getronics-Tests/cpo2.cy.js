describe('CP002 - Aplicar filtro de equipos - Memoria Interna 128GB - Precio Entre $300K y $600K', () => {
  it('Aplicar los filtros y devolver la cantidad correcta de equipos filtrados', () => {
    
    cy.visit('/');
    cy.wait(4000);

    cy.get('strong[role="heading"].block-subtitle.filter-subtitle')
      .should('be.visible')
      .click();
    cy.wait(1000);

    cy.get('div[data-role="title"]').contains('Memoria interna')
      .should('be.visible')
      .click();
    cy.wait(1000);

    cy.get('div[data-role="content"]')
      .should('not.have.attr', 'aria-hidden', 'true');
    cy.wait(1000);

    cy.get('li[data-value="802"]').contains('128GB').click();
    cy.wait(1000);

    cy.get('strong[role="heading"].block-subtitle.filter-subtitle')
      .should('be.visible')
      .click();
    cy.wait(1000);

    cy.contains('div', 'Precio').click();
    cy.wait(2000);
    cy.get('li[data-value="300000_600000"]').contains('$ 300.000 - $ 600.000').click({ force: true });
    cy.wait(1000);
    cy.get('strong[role="heading"].block-subtitle.filter-subtitle')
    .should('be.visible');

    cy.url().should('eq', 'https://tiendaonline.movistar.com.ar/');
  });
});
