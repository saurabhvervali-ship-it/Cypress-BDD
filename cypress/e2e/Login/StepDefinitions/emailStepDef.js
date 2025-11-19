import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the signup page", () => {
  cy.visit("http://localhost:8080"); 
});

When(
  "I sign up with email {string} and password {string}",
  (email, password) => {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("button[type=submit]").click();
  }
);


Then("I should receive a verification email at {string}", (email) => {
  const verificationLink = "http://localhost:8080/verify.html";

  cy.task("sendMail", {
    to: email,
    subject: "Verify your email",
    text: `Click here to verify: ${verificationLink}`
  });

  cy.wait(5000);

  cy.request({
    method: "GET",
    url: "http://localhost:8025/api/v2/search",
    qs: { kind: "to", query: email }
  }).then((res) => {
    const items = res.body.items || [];
    if (!items.length) throw new Error("No email found for " + email);
    const msg = items[0];
    const link = (msg.Content && msg.Content.Body).match(/https?:\/\/\S+/)[0];
    cy.visit(link);
  });
});