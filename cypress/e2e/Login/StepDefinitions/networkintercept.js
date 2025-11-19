import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the Angular app", () => {
  cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

  cy.get("button.btn.btn-primary", { timeout: 10000 }).should("be.visible");
});

When("I intercept the book API response", () => {
  cy.fixture("interceptbooks").then((data) => {
    cy.intercept(
      {
        method: "GET",
        url: "**/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: data,
      }
    ).as("getBook");
  });
});

When("I click on the Get Books button", () => {
  cy.get("button.btn.btn-primary").should("be.enabled").click();
});

Then("I should receive the mocked book response", () => {
  cy.wait("@getBook").then(({ response }) => {
    expect(response.statusCode).to.eq(200);

    cy.get("tbody tr", { timeout: 10000 }).should(
      "have.length",
      response.body.length
    );

    cy.contains("Oops only 1 Book available", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
