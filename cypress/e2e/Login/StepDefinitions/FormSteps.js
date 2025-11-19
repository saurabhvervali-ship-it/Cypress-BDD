import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import FormPage from "../../Pages/formPage";

const form = new FormPage();
let data;

before(() => {
  cy.fixture("formData").then((formData) => {
    data = formData;
  });
});

Given("I open the angular practice form page", () => {
  cy.viewport(412, 915);
  form.visit();
});

When("I enter valid user details", () => {
  form.elements.nameInput().type(data.name);
  form.elements.emailInput().type(data.email);
  form.elements.passwordInput().type(data.password);
  form.elements.genderDropdown().select(data.gender);
  form.elements.employmentRadio().check();

  const formattedDOB = form.formatDate(data.dob);
  form.elements.dateOfBirth().type(formattedDOB);
});


When("I submit the form", () => {
  form.elements.submitButton().click();
});

Then("I should see a success message", () => {
  form.elements.successMsg().should("contain", "Success!");
});

When("I submit the form without entering data", () => {
  form.elements.submitButton().click();
});

Then("I should see validation errors", () => {
  form.elements.nameInput().should("have.attr", "required");
});
