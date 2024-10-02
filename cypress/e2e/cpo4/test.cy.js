import { productPage } from './ProductPage.cy';
import { cartPage } from './CartPage.cy';
import { checkoutPage } from './CheckoutPage.cy';  

describe('CP004 - Validar la funcionalidad del carrito de compras con un accesorio y completar la compra', () => {
  before(() => {
    cy.viewport('macbook-15');
  });

  it('Seleccionar teléfono, seguir comprando, agregar un accesorio al carrito, finalizar la compra, llenar formulario y tomar captura', () => {
    productPage.visit();
    productPage.selectProductByName('Motorola Moto G85 5G');
    productPage.clickOnProduct();
    productPage.addProductToCart();

    cartPage.validateProductInCart('Motorola Moto G85 5G');

    productPage.continueShopping();

    productPage.goToAccessoriesCategory();

    productPage.selectAccessoryByName('Samsung Adaptador de carga rapida Cable tipo C 25W');
    productPage.clickOnAccessory();
    productPage.addAccessoryToCart();

    cartPage.validateProductInCart('Samsung Adaptador de carga rapida Cable tipo C 25W');

    cartPage.validateTotalPrice('$755.698');

    cartPage.finalizePurchase();

    checkoutPage.fillPersonalData();

    cartPage.takeScreenshot();
  });
});





