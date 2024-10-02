class CheckoutPage {
    fillPersonalData() {
       
        cy.fixture('personalData').then((data) => {
          
            cy.get('input[name="custom_email"]').clear().type(data.email);

            cy.get('input[name="firstname"]').clear().type(data.firstname);

            cy.get('input[name="lastname"]').clear().type(data.lastname);

            cy.get('input[name="custom_attributes[dni]"]').clear().type(data.dni);

            cy.get('select[name="customer_gender"]').select(data.gender);

            cy.get('select#movistar-checkout-birthdate-day').select(data.birthdate.day);

            cy.get('select#movistar-checkout-birthdate-month').select(data.birthdate.month);

            cy.get('select#movistar-checkout-birthdate-year').select(data.birthdate.year);

            cy.get('input[name="custom_attributes[celular]"]')
                .clear()
                .type(data.celular, { force: true });
        });
    }
}

export const checkoutPage = new CheckoutPage();
