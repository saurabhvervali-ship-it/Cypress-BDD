 import CartPage from "./CartPage";

class ProductPage {

  elements = 
{
    shopName: ()=>cy.contains("Shop Name",{timeout:10000}),
    appCard: ()=>cy.get("app-card"),
    addButton: (element)=>cy.wrap(element).contains("Add"),
    checkoutButton: ()=>cy.contains("Checkout")
}

  pageValidation() {
    this.elements.shopName().should("be.visible");
  }

  verifyCardLimit() {
    this.elements.appCard().should("have.length", 4);
  }

  selectProduct(productName) {
    cy.get("app-card").each(($el) => {
      if ($el.text().includes(productName)) {
        this.elements.addButton($el).click();
      }
    });
  }

  selectFirstProduct() {
    this.elements.appCard().eq(1).contains("Add").click();
  }

  goToCart() {
    this.elements.checkoutButton().click();
    return new CartPage();
  }
}

export default ProductPage;
