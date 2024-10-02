describe('CP004 - Seleccionar Samsung Galaxy A05 Y Validarcompra de equipo en 3 cuotas- Prueba con Bancos ICBC y Galicia', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false; 
  });

  it('Verificar si se ofrecen 3 cuotas sin interés para los bancos ICBC y Galicia', () => {
    const numeroCuotas = '3'; // Se puede probar con 3,6,12,18,etc 

    cy.visit('/');
    cy.wait(2000);  

    cy.get('strong[role="heading"].block-subtitle.filter-subtitle')
      .should('be.visible')
      .click();
    cy.wait(2000);

    cy.contains('a', 'Samsung')
      .should('be.visible')
      .click();


    cy.wait(2000);
    cy.get('[data-id="17629"] > a > .product-image > img')
      .should('be.visible')
      .click(); 
    cy.wait(2000);
    
    

    cy.get('div.calculator a#open-installments-modal')
      .should('be.visible')
      .click();
    cy.wait(2000);

    cy.get('button#banksArrow').click({ force: true });
    cy.get('input#inputbank').should('be.visible').type('ICBC');
    cy.wait(2000);
    cy.contains('ICBC').click();

    cy.get('button#cardsArrow').click({ force: true });
    cy.get('input#inputCard').should('be.visible').type('Mastercard');
    cy.wait(2000);
    cy.contains('Mastercard').click();
   
    cy.get('#calculate_btn > .btn-primary').should('be.visible').click();
 
    let foundCuotasICBC = false;
    cy.get('tbody#bodyTable tr').each(($tr) => {
      const cuotaText = $tr.find('span.blue').text();
      if (cuotaText.includes(`${numeroCuotas} cuotas`)) {
        foundCuotasICBC = true;
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco ICBC ofrece ${numeroCuotas} cuotas con Mastercard.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:green;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot(`alert_icbc_si_ofrece_${numeroCuotas}_cuotas`);
        });
      }
    }).then(() => {
      if (!foundCuotasICBC) {
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco ICBC no ofrece ${numeroCuotas} cuotas con Mastercard.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:red;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot(`alert_icbc_no_ofrece_${numeroCuotas}_cuotas`);
        });
      }
    });
    cy.wait(1000);
  
    cy.get('button').contains('Probar otra tarjeta').click();
    cy.wait(1000);

    cy.get('button#banksArrow').click({ force: true });
    cy.get('input#inputbank')
      .should('be.visible')
      .clear()   
      .type('Galicia');
    cy.wait(1000);
    cy.contains('Galicia').click();

    cy.get('button#cardsArrow').click({ force: true });
    cy.get('input#inputCard')
      .should('be.visible')
      .clear()   
      .type('American Express');
    cy.wait(2000);
    cy.contains('American Express').click();
    cy.get('#calculate_btn > .btn-primary').should('be.visible').click();
  
    let foundCuotasGalicia = false;
    cy.get('tbody#bodyTable tr').each(($tr) => {
      const cuotaText = $tr.find('span.blue').text();
      if (cuotaText.includes(`${numeroCuotas} cuotas`)) {
        foundCuotasGalicia = true;
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco Galicia ofrece ${numeroCuotas} cuotas con American Express.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:green;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot(`alert_galicia_si_ofrece_${numeroCuotas}_cuotas`);
        });
      }
    }).then(() => {
      if (!foundCuotasGalicia) {
        cy.document().then((doc) => {
          const alertDiv = doc.createElement('div');
          alertDiv.innerHTML = `<strong>El banco Galicia no ofrece ${numeroCuotas} cuotas con American Express.</strong>`;
          alertDiv.style.cssText = 'position:fixed;top:20px;left:50%;background-color:red;color:white;padding:10px;border-radius:5px;z-index:1000;';
          doc.body.appendChild(alertDiv);
          cy.screenshot(`alert_galicia_no_ofrece_${numeroCuotas}_cuotas`);
          cy.get('button#btn-others-cards')
            .should('be.visible') 
            .click(); 

        });
      }
    });
  });
});

1