class CustomerPage {
  elements = {
    username: () => cy.get("#input-username"),
    password: () => cy.get("#input-password"),
    loginButton: () => cy.get(".btn.btn-primary"),

    customerMenu: () => cy.get("#menu-customer>a"),
    customersSubmenu: () => cy.get("#menu-customer>ul>li:first-child"),

    tableRows: () => cy.get("table.table.table-bordered.table-hover tbody tr"),
    tableColumns: () =>
      cy.get("table.table.table-bordered.table-hover thead tr td"),

    paginationText: () => cy.get("div.col-sm-6.text-right"),
  };

  visit() {
    cy.visit("https://demo3x.opencartreports.com/admin/");
  }

  login() {
    this.elements.username().type("demo");
    this.elements.password().type("demo");
    this.elements.loginButton().click();
  }

  openCustomerTable() {
    this.elements.customerMenu().click();
    this.elements.customersSubmenu().click();
  }

  getRowCount() {
    return this.elements.tableRows().then(($rows) => $rows.length);
  }

  getColumnCount() {
    return this.elements.tableColumns().then(($cols) => $cols.length);
  }

  readTableData() {
    this.elements.tableRows().each(($row) => {
      cy.wrap($row)
        .find("td")
        .each(($col) => cy.log($col.text()));
    });
  }

  getTotalPages() {
    return this.elements.paginationText()
      .invoke("text")
      .then((text) => {
        return text.substring(
          text.indexOf("(") + 1,
          text.indexOf("Pages") - 1
        );
      });
  }
}

export default CustomerPage;
