class LoginPage {
  loginBody() {
    return cy.get("body");
  }
  pageContainer() {
    return cy.get("#authPageContainer");
  }
  logo() {
    return cy.get("#authBranding");
  }
  title() {
    return cy.get("#authTitle");
  }
  signInEmailTextBox() {
    return cy.get("#signInEmailInput");
  }
  signInPasswordTextBox() {
    return cy.get("#signInPasswordInput");
  }
  loginButton() {
    return cy.get("#signInButton");
  }
  signUpTab() {
    return cy.get("#signUpTab");
  }
  firstNameTextBox() {
    return cy.get("#firstNameInput");
  }
  lastNameTextBox() {
    return cy.get("#lastNameInput");
  }
  organizationNameTextBox() {
    return cy.get("#organizationInput");
  }
  signUpEmailTextBox() {
    return cy.get("#signUpEmailInput");
  }
  signUpPasswordTextBox() {
    return cy.get("#signUpPasswordInput");
  }
  createAccountButton() {
    return cy.get("#createAccountButton");
  }
  invalidLoginMessage() {
    return cy.get("#authErrorMessage");
  }
}
export default new LoginPage();
