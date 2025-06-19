class LoginPage {
  homePageTitle() {
    return cy.get("#authTitle");
  }
  emailInput() {
    return cy.get("#signInEmailInput");
  }
  passwordInput() {
    return cy.get("#signInPasswordInput");
  }
  loginButton() {
    return cy.get("#signInButton");
  }
}

export default new LoginPage();
