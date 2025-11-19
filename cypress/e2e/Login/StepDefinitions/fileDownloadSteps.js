import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const pdfPath = "cypress/downloads/tour.pdf";

Given("I open the Kashmir tour page", () => {
  cy.visit("https://www.heenatours.in/domestic-tours/1/kashmir-tour-packages.html?tour=1715");
});

When("I download the tour PDF", () => {
  
  cy.contains("Download PDF")
    .invoke("attr", "href")
    .then((pdfUrl) => {
   
      cy.request({
        url: pdfUrl,
        encoding: "binary"
      }).then((response) => {

        cy.writeFile(pdfPath, response.body, "binary");
      });
    });
});

Then("the PDF should be downloaded", () => {

  cy.readFile(pdfPath, "binary").then((file) => {
    expect(file.length).to.be.greaterThan(50);
  });
});
