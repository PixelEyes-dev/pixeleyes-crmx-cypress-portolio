/// <reference types="cypress" />
import LoginPage from "../../support/pageObjects/LoginPage";

describe("Sanity: Login Page Display", () => {
  it("should display the login page and show the logo", () => {
    cy.visit("/");
    LoginPage.loginBody().should("not.be.empty");
    LoginPage.logo().should("be.visible");
    LoginPage.title()
      .should("be.visible")
      .should("have.text", "Welcome to CRMx");
    LoginPage.pageContainer().should("be.visible");
  });
});
