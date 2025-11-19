import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PaginationPage from "../../Pages/PaginationPage";
let textPage1 = "";
let textPage2 = "";

Given("I open the dynamic pagination table page", () => {
  PaginationPage.visitPage();
});

When("I capture first row text on page 1", () => {
  PaginationPage.getFirstRowText().then(text => {
    textPage1 = text;
    cy.log("Page 1 first row: " + textPage1);
  });
});

When("I go to page 2", () => {
  PaginationPage.clickPage(2);
});

When("I capture first row text on page 2", () => {
  PaginationPage.getFirstRowText().then(text => {
    textPage2 = text;
    cy.log("Page 2 first row: " + textPage2);
  });
});

Then("the first row text on page 1 should not equal the first row text on page 2", () => {
  expect(textPage1).to.not.equal(textPage2);
});
