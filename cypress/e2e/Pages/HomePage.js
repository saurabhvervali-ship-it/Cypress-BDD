import ProductPage from "./ProductPage";

class HomePage 
{
  elements = 
{
    usernameInput: ()=>cy.get("#username",{timeout:10000}),
    passwordInput: ()=>cy.get("#password"),
    checkbox: ()=>cy.get('[type="checkbox"]'),
    signInButton: ()=>cy.get("#signInBtn")
}

  goTo(url) {
    cy.visit(url);
}

  login(username, password) 
  {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.checkbox().check();
    this.elements.signInButton().click();
    return new ProductPage();
  }
}

export default HomePage;
