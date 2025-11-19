import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../Pages/envVarpage";

const login = new LoginPage();

Given("I opened the practice login page", () => {
  login.visit();
});

When("I entered valid credentials", () => {
  login.enterUsername(Cypress.env("username"));
  login.enterPassword(Cypress.env("password"));
  login.clickLogin();
});

Then("I should be logged in successfully!", () => {
  login.verifyLoginSuccess();
});
