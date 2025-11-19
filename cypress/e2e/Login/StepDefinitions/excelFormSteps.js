import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ExcelFormPage from "../../Pages/excelFormPage";
import readXlsxFile from "read-excel-file";

const form = new ExcelFormPage();

Given("I open the practice form", () => {
  form.visit();
});

When("I read data from Excel and fill the form", () => {
  cy.readFile("cypress/fixtures/testData.xlsx", "binary").then((fileBuffer) => {
    const buffer = Cypress.Buffer.from(fileBuffer, "binary"); // important
    return readXlsxFile(buffer);
  }).then((rows) => {
    rows.shift();
    const [Name, Email, Password, Gender] = rows[0];
    form.fillForm(Name, Email, Password, Gender);
  });
});

Then("I should see an success message", () => {
  form.verifySuccess();
});
