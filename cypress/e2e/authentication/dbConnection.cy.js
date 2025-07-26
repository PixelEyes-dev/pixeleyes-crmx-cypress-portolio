describe("Database Connection Test", () => {
  it("should connect to the database and fetch organizations", () => {
    cy.task("queryOrganizations").then((rows) => {
      cy.log("Organizations:", JSON.stringify(rows));
      expect(Array.isArray(rows)).to.be.true;
    });
  });
});
