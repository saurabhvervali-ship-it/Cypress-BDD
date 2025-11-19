import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CustomerPage from "../../Pages/dynamicTablepage";

const page = new CustomerPage();
let totalRows = 0;
let totalColumns = 0;
let totalPages = "";

Given("I am on the customer table page", () => {
  page.visit();
  page.login();
  page.openCustomerTable();
});

When("I check rows", () => {
  page.getRowCount().then((count) => {
    totalRows = count;
  });
});

Then("it should have 7 rows", () => {
  expect(totalRows).to.equal(7);
});

When("I check columns", () => {
  page.getColumnCount().then((count) => {
    totalColumns = count;
  });
});

Then("it should have 10 columns", () => {
  expect(totalColumns).to.equal(10);
});

When("I read all table data", () => {
  page.readTableData();
});

When("I get total pages", () => {
  page.getTotalPages().then((pages) => {
    totalPages = pages;
    cy.log("Pages: " + totalPages);
  });
});

Then("pages should be shown", () => {
  expect(Number(totalPages)).to.be.greaterThan(0);
});
