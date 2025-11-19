import {Given,When,Then,Before,After,BeforeAll,AfterAll,}from "@badeball/cypress-cucumber-preprocessor";
import CartPage1 from "../../Pages/calculationsPage";

const cart = new CartPage1();
let calculatedTotal = 0;
let uiTotal = 0;

BeforeAll(() => {
  cy.log("Starting the Cart Test Suite"); //THIS IS RUNNING FOR ALL TESTS CASES
});

AfterAll(() => {
  cy.log("Cart Test Suite Completed");
});

// Before(() => {
//   cy.log("Setting up test data");
//   calculatedTotal = 0;
//   uiTotal = 0;
// });

// After(() => {
//   cy.log("Cleaning up after test");
//   cy.clearCookies();
// });

Given("I open the demo cart page", () => {
  cy.visit("https://rahulshettyacademy.com/angularpractice/shop");
  cy.get(".card").should("have.length.greaterThan", 0);
});

When("I add two items and read all item amounts from the UI", () => {
  cart.addProductByName("Samsung Note 8");
  cart.addProductByName("Blackberry");

  cart.getCheckoutButton().click();

  cart.calculateItemTotal().then((total) => {
    calculatedTotal = total;
  });

  cart.readUiTotal().then((total) => {
    uiTotal = total;
  });
});

Then("the total amount displayed should match the calculated total", () => {
  expect(uiTotal).to.equal(calculatedTotal);
});
