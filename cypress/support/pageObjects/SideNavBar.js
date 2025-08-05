class SideNavBar {
  leadsTab() {
    return cy.get('#side-nav-leads');
  }
  customersTab() {
    return cy.get('#side-nav-customers');
  }
  salesTab() {
    return cy.get('#side-nav-sales');
  }
}

export default new SideNavBar();
