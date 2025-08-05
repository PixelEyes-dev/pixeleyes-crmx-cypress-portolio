class SalesPage {
  salesPageTitle() {
    return cy.get('#salesTitle');
  }
  addSalesButton() {
    return cy.get('#addSaleButton');
  }
  addNewSaleModal() {
    return cy.get('#addSaleDialogContent');
  }
  addNewSaleModalTitle() {
    return cy.get('#addSaleDialogTitle');
  }
  addNewSaleCustomerSelect() {
    return cy.get('#sale-input-customer');
  }
  addNewSaleAmountTextBox() {
    return cy.get('#sale-input-amount');
  }
  addNewSaleDateTextBox() {
    return cy.get('#sale-input-date');
  }
  addNewSaleInvoiceNumberTextBox() {
    return cy.get('#sale-input-invoice-number');
  }
  addNewSalePaymentStatusSelect() {
    return cy.get('#sale-input-payment-status');
  }
  addNewSalePaymentMethodSelect() {
    return cy.get('#sale-input-payment-method');
  }
  addNewSaleDescriptionTextBox() {
    return cy.get('#sale-input-description');
  }
  addNewSaleCreateButton() {
    return cy.get('#sale-btn-save');
  }
  successConfirmationMessage() {
    return cy.get('li[role="status"]');
  }
}
export default new SalesPage();
