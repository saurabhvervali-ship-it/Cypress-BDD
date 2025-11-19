import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the Angular application", () => {
  cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  cy.get(".btn.btn-primary", { timeout: 10000 }).should("be.visible");
});

When("I intercept the request and modify the author name", () => {
  cy.intercept(
    "GET",
    "**/Library/GetBook.php?AuthorName=shetty",
    {
      statusCode: 403,
      body: { message: "Forbidden access - author not allowed" },
    }
  ).as("dummyURL");
});

When("I click on Get Books button", () => {
  cy.get(".btn.btn-primary").click();
});

Then("I should get a 403 response", () => {
  cy.wait("@dummyURL").its("response.statusCode").should("eq", 403);
});
