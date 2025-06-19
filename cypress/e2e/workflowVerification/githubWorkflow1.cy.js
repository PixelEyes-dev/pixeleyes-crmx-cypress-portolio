/// <reference types="cypress" />

describe("User Login", () => {
  it("should authenticate user", () => {
    cy.login();
    cy.get('a[href="/customers"]').click();
    cy.get("h1").should("have.text", "Customers");
    //retest
  });
});
