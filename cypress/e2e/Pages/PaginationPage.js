class PaginationPage {
  elements = {
    tableFirstRow: () => cy.get("table tbody tr").first(),
    pageBtn: (num) => cy.get(".pagination li a").contains(num)
  }

  visitPage() {
    cy.visit("https://practice.expandtesting.com/dynamic-pagination-table");
  }

  getFirstRowText() {
    return this.elements.tableFirstRow()
      .invoke("text")
      .then(text => text.trim());
  }

  clickPage(num) {
    this.elements.pageBtn(num).click();
  }
}

export default new PaginationPage();
