class DashboardPage {
  dashboardTitle() {
    return cy.get('.flex h1');
  }
  kpiCards() {
    return cy.get('div.rounded-lg');
  }
}
export default new DashboardPage();
