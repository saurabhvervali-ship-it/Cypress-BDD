import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the windows page", () => {
  cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

  cy.window().then((win) => {
    win.eval(`setTimeout(() => {
      throw new Error(" AUT ERROR (this should be caught by handler)");
    }, 50);`);
  });
});

When("I click the link after removing target", () => {
  cy.get("#opentab").invoke("removeAttr", "target").click();
});

Then("I should be on the QA Click Academy page", () => {``
  cy.url().should("include", "qaclickacademy");
});

Then("I go back to the practice page", () => {
  cy.go("back");
  cy.url().should("include", "AutomationPractice");
});

When("I click the link using the href value", () => {
  cy.get("#opentab").then((el) => {
    const url = el.prop("href");
    cy.visit(url);
  });
});

Then("I should land on the new tab page", () => {
  cy.url().should("include", "qaclickacademy");
});
