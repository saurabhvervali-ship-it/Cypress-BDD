class CartPage1 {

  addProductByName(productName) {
    cy.get(".card").each(($el) => {
      const name = $el.find("h4.card-title").text().trim();
      if (name === productName) {
        cy.wrap($el).find("button").click();
      }
    });
  }

  getCheckoutButton() {
    return cy.contains("Checkout");
  }

  getItemAmounts() {
    return cy.get("tr td:nth-child(4)");
  }

  getTotalAmount() {
    return cy.get("h3 strong");
  }

  calculateItemTotal() {
    let sum = 0;

    return this.getItemAmounts().each(($el) => {
      const amountText = $el.text().trim();
      const price = Number(amountText.replace(/[^0-9]/g, ""));
      sum += price;
    }).then(() => sum);
  }

  readUiTotal() {
    return this.getTotalAmount()
      .invoke("text")
      .then((text) => Number(text.replace(/[^0-9]/g, "")));
  }
} 

export default CartPage1;
