import { format, parseISO } from "date-fns";

class FormPage {

  visit() {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
  }

  formatDate(dob) {
    const parsedDate = parseISO(dob); 
    return format(parsedDate, "yyyy-MM-dd");
  }

  elements = {
    nameInput: () => cy.get("input[name='name']:nth-child(2)"),
    emailInput: () => cy.get("input[name='email']"),
    passwordInput: () => cy.get("input[type='password']"),
    genderDropdown: () => cy.get("select"),
    employmentRadio: () => cy.get("#inlineRadio1"),
    dateOfBirth: () => cy.get("input[name='bday']"),
    submitButton: () => cy.get("input[type='submit']"),
    successMsg: () => cy.get(".alert-success"),
  };
}

export default FormPage;
