import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let filePath = "C:\\Users\\Admin\\Desktop\\Sample.xlsx";
let oldVal = "Apple";
let newVal = "BIG APPLE";

Given("I have the Excel file downloaded", () => {
});

When("I update the Excel value Apple to BIG APPLE", () => {
  cy.wrap({ filePath, oldVal, newVal }).as("excelData");
});

Then("the Excel file should be modified", () => {
  cy.get("@excelData").then((data) => {
    cy.task("updateExcel", data).then((result) => {
      expect(result).to.equal(true);
    });
  });
});
