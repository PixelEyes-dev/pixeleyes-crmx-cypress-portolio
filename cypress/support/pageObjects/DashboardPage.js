class DashboardPage {
  dashboardTitle() {
    return cy.get('h1.text-3xl.font-bold.tracking-tight');
  }
  kpiCards() {
    return cy.get('div.rounded-lg');
  }
}
export default new DashboardPage();
