class ProductPage {
  visit() {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.visit('/');
  }

  selectProductByName(productName) {
    cy.get(`li.product-item[data-ga-product-comercial_name="${productName}"]`).as('selectedProduct');
  }

  clickOnProduct() {
    cy.get('@selectedProduct').click();
  }

  addProductToCart() {
    cy.wait(2000);
    cy.get('button#swatch_attribute_card.btn-primary')
      .should('be.visible')
      .click({ force: true });
  }

  continueShopping() {
    cy.get('a.btn-secondary[href="https://tiendaonline.movistar.com.ar/"]')
      .should('be.visible')
      .click({ force: true });
  }

  goToAccessoriesCategory() {
    cy.get('a[href="accesorios-para-celulares.html"]')
  .click({ force: true }); 
  }

  selectAccessoryByName(accessoryName) {
    cy.get(`li.product-item[data-ga-product-comercial_name="${accessoryName}"]`).as('selectedAccessory');
  }

  clickOnAccessory() {
    cy.get('@selectedAccessory').find('a.product-link').click({ force: true });
  }

  addAccessoryToCart() {
    cy.wait(1000);
    cy.get('button#swatch_attribute_card.btn-primary')
      .should('be.visible')
      .click({ force: true });
  }

}

export const productPage = new ProductPage();

