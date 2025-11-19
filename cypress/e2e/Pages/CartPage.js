class CartPage {

  elements = 
  {
    cartItems: ()=>cy.get("tr td:nth-child(4) strong"),
  }
  verifyCartTotal(expectedMaxTotal) {
    let sum = 0;
    this.elements.cartItems()
      .each(($el) => {
        const amount = Number($el.text().split(" ")[1].trim());
        sum += amount;
      })
      .then(() => {
        expect(sum).to.be.lessThan(expectedMaxTotal);
      });
  }
}

export default CartPage;
