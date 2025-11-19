import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the file upload page", () => {
  cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");
});

When("I upload a {string} file", (fileType) => {
  let filePath;

  if (fileType === "jpg") {
    filePath = "sad.jpg";
  } else if (fileType === "pdf") {
    filePath = "sample.pdf";
  }

 
  cy.get("#filesToUpload").attachFile(filePath);
});

Then("I should see the file uploaded successfully", () => {
  cy.get("#fileList li").should("be.visible");
});
