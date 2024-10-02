describe('CP003 - Validar cuotas en compra de equipo - Cuotas dinámicas - Banco.Credicoop - Tarjeta.Visa', () => {
  it('Debe verificar si se ofrece el número de cuotas proporcionado para el banco Credicoop con tarjeta Visa', () => {
    
    const numeroCuotas = '60'; // Aca se puede definir el número de cuotas dinamicamente ('60', '3', '1', '5151' etc.)
    
    cy.visit('/');
    cy.wait(4000);

    cy.get('li.product-item[data-ga-product-comercial_name="Samsung Galaxy A05 128GB 4G"]')
      .should('be.visible')
      .click();
    cy.wait(4000);

    cy.get('a#open-installments-modal').click();
    cy.wait(3000);

    cy.get('button#banksArrow').click({ force: true });
    
    cy.get('input#inputbank')
      .should('be.visible')
      .type('Credicoop');
    cy.wait(2000);

    cy.contains('Credicoop').click();

    cy.get('button#cardsArrow').click({ force: true });
    
    cy.get('input#inputCard')
      .should('be.visible')
      .type('Visa');
    cy.wait(2000);

    cy.contains('Visa').click();

    cy.get('button.btn-primary[data-ga-index="19"]')
      .should('be.visible')
      .click();

    let foundCuotas = false;
    cy.get('tbody#bodyTable tr').each(($tr) => {
      const cuotaText = $tr.find('span.blue').text();
      
      if (numeroCuotas === '1' && cuotaText.includes('1 cuota')) {
        foundCuotas = true; 
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco Credicoop sí ofrece 1 cuota.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:green;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot('alert_si_ofrece_1_cuota'); 
        });
      } else if (cuotaText.includes(`${numeroCuotas} cuotas`)) {
        foundCuotas = true;
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco Credicoop sí ofrece ${numeroCuotas} cuotas.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:green;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot(`alert_si_ofrece_${numeroCuotas}_cuotas`);
        });
      }
    }).then(() => {
      if (!foundCuotas) {
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco Credicoop no ofrece ${numeroCuotas} cuotas.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:red;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot(`alert_no_ofrece_${numeroCuotas}_cuotas`); 
        });
      }
    });
  });
});
