import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../../Pages/ProductPage";
import CartPage from "../../Pages/CartPage";
import ConfirmationPage from "../../Pages/ConfirmationPage";


const productpage = new ProductPage();
const cartpage = new CartPage();

let loginData;

before(function () {
  cy.fixture("example1").then((data) => {
    loginData = data;
  });
});

Given("I am on E-commerce Page", () => {
  
  cy.visit("https://rahulshettyacademy.com/loginpagePractise/");

  // cy.get("#username", { timeout: 10000 }).should("be.visible");
});

When("I login to the application", () => {
  cy.loginOnce(loginData.username, loginData.password);

  cy.url({ timeout: 15000 }).should("include", "angularpractice/shop");
  // cy.get(".card").should("have.length.greaterThan", 0);

  productpage.pageValidation();
  productpage.verifyCardLimit();
});


Then("I add items to cart and checkout", () => {
  // cy.get(".card-title").should("be.visible");

  productpage.selectProduct(loginData.productName);
  productpage.selectFirstProduct();

  cy.get("a.nav-link.btn.btn-primary").should("contain", "Checkout");
});

Then("Validate the total price limit", () => {
  const cartPage = productpage.goToCart();
  // cy.url().should("include", "cart");

  cy.get("tr td:nth-child(4)", { timeout: 10000 }).should(
    "have.length.greaterThan",
    0
  );

  cartPage.verifyCartTotal(200000);
});

Then("Select the country submit and verify Thank you", () => {
  const confirmationPage = new ConfirmationPage();

  confirmationPage.submitFormDetails();

  confirmationPage
    .getAlertMessage()
    .should("be.visible")
    .and("contain", "Success");
});


