class CartPage {
  validateProductInCart(productName) {
    cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]')
      .should('contain', productName);
  }

  validateTotalPrice(expectedPrice) {
    cy.get('td.amount span.price')
      .invoke('text')
      .then((priceText) => {
        const price = priceText.replace(/\s/g, '').replace(',', '.');
        expect(price).to.include(expectedPrice.replace(/\s/g, '').replace(',', '.'));
      });
  }

  validateCartItemCount(expectedCount) {
    cy.get('input.qty')
      .invoke('val')
      .should('eq', expectedCount.toString());
  }

  finalizePurchase() {
    cy.get('button[data-role="proceed-to-checkout"]')
      .should('be.visible')
      .click({ force: true });
  }

  takeScreenshot() {
    cy.screenshot('cart-screenshot');
  }
}

export const cartPage = new CartPage();


