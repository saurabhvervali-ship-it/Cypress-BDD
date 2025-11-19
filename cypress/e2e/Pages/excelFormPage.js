class ExcelFormPage {
  visit() {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
  }

  fillForm(name, email, password, gender) {
    cy.get("input[name='name']:nth-child(2)").type(name);
    cy.get("input[name='email']").type(email);
    cy.get("#exampleInputPassword1").type(password);
    cy.get("select").select(gender);
    cy.get("#inlineRadio2").check();
    cy.get("input[type='submit']").click();
  }

  verifySuccess() {
    cy.get(".alert-success").should("contain", "Success");
  }
}

export default ExcelFormPage;
