import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse = [];


Given("I call the products API", () => {
  cy.request("GET", "https://dummyjson.com/products")
    .then((res) => {
      expect(res.status).to.eq(200);

      apiResponse = res.body.products;
    });
});

Then("I should get a valid list of products", () => {
  expect(apiResponse.length).to.be.lessThan(31);
  cy.log("Number of products: " + apiResponse.length);

  apiResponse.forEach((product) => {
    expect(product).to.have.property("id",);
    expect(product).to.have.property("title");
    expect(product).to.have.property("price");
    expect(product).to.have.property("rating");
  });
});
