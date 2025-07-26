class CustomersPage {
  customersPageTitle() {
    return cy.get("#customersHeaderText");
  }
  actionsButton() {
    return cy.get("#customer-actions");
  }
  deleteCustomerButton() {
    return cy.get("#customerDeleteMenuItem");
  }
  confirmDeleteCustomerButton() {
    return cy.get("#confirmDeleteButton");
  }
  successConfirmationMessage() {
    return cy.get('li[role="status"]');
  }
}

export default new CustomersPage();
