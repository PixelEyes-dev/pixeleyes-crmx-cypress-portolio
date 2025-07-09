describe("Mochawesome Reporter Test", () => {
  it("should pass a simple test", () => {
    expect(true).to.be.true;
  });

  it("should handle basic assertions", () => {
    const result = 2 + 2;
    expect(result).to.equal(4);
  });

  it("should demonstrate test failure for reporting", () => {
    // This test will fail to demonstrate error reporting
    cy.visit("https://www.crmx.mx");
    cy.get("body").should("be.visible");
    // This will fail intentionally to show error reporting
    cy.get(".non-existent-element").should("be.visible");
  });
});
