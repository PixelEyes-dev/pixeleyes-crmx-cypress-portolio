/// <reference types="cypress" />

describe("User Login", () => {
  it("should authenticate user", () => {
    cy.login();
  });
});
