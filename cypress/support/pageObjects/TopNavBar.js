class TopNavBar {
  profileIcon() {
    return cy.get("#profile-icon");
  }
  profileMenuProfileLink() {
    return cy.get("#profile-menu-profile-link");
  }
  profileMenuLogoutButton() {
    return cy.get("#profile-menu-logout-button");
  }
}
export default new TopNavBar();
