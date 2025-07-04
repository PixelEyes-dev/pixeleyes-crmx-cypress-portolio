class ProfilePage {
  profilePageTitle() {
    return cy.get("#profileTitle");
  }
  currentUserEmail() {
    return cy.get("#profileEmail");
  }
}
export default new ProfilePage();
