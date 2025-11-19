class ConfirmationPage {
  purchaseButton = '[value="Purchase"]'

elements = 
{
    checkoutButton: ()=>cy.contains("Checkout"),
    countryInput: ()=>cy.get("#country",{timeout:10000}),
    suggestionLink: ()=>cy.get(".suggestions ul li a"),
    // purchaseButton: ()=>cy.get('[value="Purchase"]')
}

  submitFormDetails() {
    this.elements.checkoutButton().click();
    this.elements.countryInput().type("India");
    this.elements.suggestionLink().click();
    cy.get(this.purchaseButton).click();
  }

  getAlertMessage() {
    return cy.get(".alert.alert-success.alert-dismissible");
  }
}

export default ConfirmationPage;