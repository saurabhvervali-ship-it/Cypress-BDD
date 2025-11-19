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

// Cypress.Commands.add("loginWithSession", (username, password) => {
//   cy.session([username, password], () => {
//     cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
//     cy.get("#username").type(username);
//     cy.get("#password").type(password);
//     cy.get("#signInBtn").click();
//     // cy.url().should("include", "angularpractice");
//   });
// });

//   cy.visit("https://rahulshettyacademy.com/loginpagePractise/");

// cypress/support/commands.js
//  UI login flow
Cypress.Commands.add("uiLogin", (username, password) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#signInBtn").click();
  cy.url().should("include", "shop");
});

// Session-based login 
Cypress.Commands.add("loginOnce", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
    cy.uiLogin(username, password);
  });
  cy.visit("https://rahulshettyacademy.com/angularpractice/shop");
  cy.url().should("include", "angularpractice/shop");
});

//  API-based login optional
Cypress.Commands.add("LoginAPI", () => {
  cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", {
    userEmail: "saurabh.vervali@gmail.com",
    userPassword: "Shawn!23",
  }).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env("token", response.body.token);
  });
});

Cypress.Commands.add("getLatestEmail", (email) => {
  return cy.request({
    method: "GET",
    url: "http://localhost:8025/api/v2/search",
    qs: {
      kind: "to",
      query: email
    }
  }).then((res) => {
    const items = res.body.items;
    if (!items || items.length === 0) {
      throw new Error("No email found for: " + email);
    }
    return items[0]; // latest message
  });
});

Cypress.Commands.add("sendFakeVerificationEmail", (email) => {
  const verificationLink = "http://localhost:8080/verify.html";

  return cy.request({
    method: "POST",
    url: "http://localhost:8025/api/v1/messages",
    body: {
      From: "no-reply@example.com",
      To: email,
      Raw: `From: no-reply@example.com
To: ${email}
Subject: Verify your email

Click this link to verify: ${verificationLink}`
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
});
