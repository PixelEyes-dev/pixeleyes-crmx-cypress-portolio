class DashboardPage {
  dashboardTitle() {
    return cy.get(".flex h1");
  }
}
export default new DashboardPage();
