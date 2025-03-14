// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("apiLogin", () => {
    const clientId = '7e29e2facf83359855f746fc490443e6';
    const clientSecret = 'e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb';
  
    return cy.request({
      method: 'POST',
      url: 'https://sandbox-partners-api.airalo.com/v2/token',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: true,
      body: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('access_token');
      return response.body.data.access_token;
    });
  });
  