class ScreenshotPage {
  elements = {
    form: () => cy.get("form", { timeout: 10000 }),
    nameInput: () => cy.get("input[name='name']", { timeout: 10000 }),
  };

  openPracticeForm() {
    cy.log("Opening Practice Form page...");
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    this.elements.form().should("be.visible");
    cy.title().should("include", "ProtoCommerce");
    cy.log("Form loaded and verified.");
  }

  captureScreenshot() {
    cy.log("Waiting for input field to be visible...");
    this.elements
      .nameInput()
      .should("be.visible")
      .and("have.attr", "name", "name");

    cy.log("Input field visible, capturing screenshot...");
    cy.screenshot("Baseline_Form_UI");
    cy.log("Screenshot taken successfully.");
  }

  verifyFormVisible() {
    this.elements.form().should("exist").and("be.visible");
    cy.log("Verified that the form is displayed correctly.");
  }
}

export default new ScreenshotPage();
