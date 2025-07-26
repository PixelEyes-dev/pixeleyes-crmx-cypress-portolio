class SideNavBar {
  leadsTab() {
    return cy.get("#side-nav-leads");
  }
  customersTab() {
    return cy.get("#side-nav-customers");
  }
}

export default new SideNavBar();
