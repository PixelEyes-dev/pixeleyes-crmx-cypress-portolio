class SideNavBar {
  menu() {
    return cy.get('div nav');
  }
  leadsTab() {
    return cy.get('#side-nav-leads');
  }
  customersTab() {
    return cy.get('#side-nav-customers');
  }
  salesTab() {
    return cy.get('#side-nav-sales');
  }
  tasksTab() {
    return cy.get('#side-nav-tasks');
  }
}

export default new SideNavBar();
