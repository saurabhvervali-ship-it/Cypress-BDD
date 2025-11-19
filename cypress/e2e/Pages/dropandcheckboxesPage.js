class PracticePage {
  elements = {
    // Dropdown
    dropdown: () => cy.get("#dropdown-class-example"),
    selectedOption: () =>
      cy.get("#dropdown-class-example").find("option:selected"),

    // Checkboxes
    checkbox1: () => cy.get("#checkBoxOption1"),
    checkbox3: () => cy.get("#checkBoxOption3"),
  };

  visit() {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  }

  selectDropdown(optionText) {
    this.elements.dropdown().select(optionText);
  }

  verifyDropdownSelected(optionText) {
    this.elements.selectedOption().should("have.text", optionText);
  }

  // Checkbox actions
  checkOption1() {
    this.elements.checkbox1().check();
  }

  checkOption3() {
    this.elements.checkbox3().check();
  }

  uncheckOption1() {
    this.elements.checkbox1().uncheck();
  }

  verifyOption1Checked() {
    this.elements.checkbox1().should("be.checked");
  }

  verifyOption3Checked() {
    this.elements.checkbox3().should("be.checked");
  }

  verifyOption1Unchecked() {
    this.elements.checkbox1().should("not.be.checked");
  }
}

export default new PracticePage();
