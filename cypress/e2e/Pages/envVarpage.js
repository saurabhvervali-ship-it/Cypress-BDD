class LoginPage {
  elements = {
    usernameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    submitBtn: () => cy.get("#submit"),
    successMessage: () => cy.contains("Logged In Successfully")
  };

  visit() {
    cy.visit(Cypress.env("url"));
  }

  enterUsername(username) {
    this.elements.usernameInput().type(username);
  }

  enterPassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.submitBtn().click();
  }

  verifyLoginSuccess() {
    this.elements.successMessage().should("be.visible");
  }
}

export default LoginPage;
