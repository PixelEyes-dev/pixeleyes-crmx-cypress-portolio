/// <reference types="cypress" />

import DashboardPage from "../../support/pageObjects/DashboardPage";
import LoginPage from "../../support/pageObjects/LoginPage";
import ProfilePage from "../../support/pageObjects/ProfilePage";
import TopNavBar from "../../support/pageObjects/TopNavBar";
import { generateUserData } from "../../support/testDataGenerator";

describe("User Onboarding", () => {
  // Generate user data once to be shared between tests
  const userData = generateUserData();

  it("should onboard user", () => {
    cy.visit("/");
    LoginPage.signUpTab().click();

    cy.log("Generated user data:", userData);

    // Fill the form with generated data
    LoginPage.firstNameTextBox().type(userData.firstName);
    LoginPage.lastNameTextBox().type(userData.lastName);
    LoginPage.organizationNameTextBox().type(userData.organization);
    LoginPage.signUpEmailTextBox().type(userData.email);
    LoginPage.signUpPasswordTextBox().type(userData.password);

    LoginPage.createAccountButton().click();

    // Verify successful registration
    cy.url().should("include", "/dashboard");
    DashboardPage.dashboardTitle().should("have.text", "Dashboard");

    //Navigate to profile page
    TopNavBar.profileIcon().click();
    TopNavBar.profileMenuProfileLink().click();
    cy.url().should("include", "/profile");
    ProfilePage.profilePageTitle().should("have.text", "Profile");
    ProfilePage.currentUserEmail().should("have.text", userData.email);
    TopNavBar.profileIcon().click();
    TopNavBar.profileMenuLogoutButton().click();
    cy.url().should("include", "/auth");
  });

  it("should verify the user created can login", () => {
    cy.login(userData.email, userData.password);
    TopNavBar.profileIcon().click();
    TopNavBar.profileMenuProfileLink().click();
    cy.url().should("include", "/profile");
    ProfilePage.profilePageTitle().should("have.text", "Profile");
    ProfilePage.currentUserEmail().should("have.text", userData.email);
    TopNavBar.profileIcon().click();
    TopNavBar.profileMenuLogoutButton().click();
    cy.url().should("include", "/auth");
  });

  it("should verify database connection and query execution", () => {
    // First, test basic database connectivity
    cy.log("🔌 Testing database connection...");
    cy.task("queryOrganizations").then((organizations) => {
      cy.log(
        "✅ Database connection successful - organizations query executed"
      );
      cy.log("📊 Organizations count:", organizations.length);
      cy.log(
        "📋 Sample organizations:",
        JSON.stringify(organizations.slice(0, 2), null, 2)
      );
    });
  });

  it("should verify user data was inserted into the database", () => {
    // Log the email we're searching for
    cy.log(`🔍 Searching for profile with email: ${userData.email}`);

    // Add a timestamp to track when the query starts
    const queryStartTime = new Date().toISOString();
    cy.log(`⏰ Database query started at: ${queryStartTime}`);

    cy.task("queryProfileByEmail", userData.email).then((profile) => {
      const queryEndTime = new Date().toISOString();
      cy.log(`✅ Database query completed at: ${queryEndTime}`);

      // Log the raw response to verify we got something from the database
      cy.log("📊 Raw database response type:", typeof profile);
      cy.log("📊 Raw database response:", profile);

      if (profile === null) {
        cy.log(
          "❌ No profile found in database - this indicates the query ran but found no matching record"
        );
        expect(profile).to.not.be.null; // This will fail the test
      } else {
        cy.log("✅ Profile found in database - query executed successfully");
        cy.log(
          "📋 Database query result for profile:",
          JSON.stringify(profile, null, 2)
        );

        // Verify the profile exists in the database
        expect(profile).to.not.be.null;
        expect(profile.email).to.equal(userData.email);
        expect(profile.first_name).to.equal(userData.firstName);
        expect(profile.last_name).to.equal(userData.lastName);

        // Log additional profile information
        cy.log(`🆔 Profile ID: ${profile.id}`);
        cy.log(`🏢 Organization ID: ${profile.organization_id}`);
        cy.log(`👤 Role: ${profile.role}`);
        cy.log(`📅 Created at: ${profile.created_at}`);

        // Verify we have all expected database fields
        expect(profile).to.have.property("id");
        expect(profile).to.have.property("email");
        expect(profile).to.have.property("first_name");
        expect(profile).to.have.property("last_name");
        expect(profile).to.have.property("organization_id");
        expect(profile).to.have.property("role");
        expect(profile).to.have.property("created_at");
        expect(profile).to.have.property("updated_at");

        cy.log("✅ All expected database fields are present");
      }
    });
  });

  it("should delete user and organization from database and verify login fails", () => {
    // First, delete the user profile from the database
    cy.log(`🗑️  Deleting user profile with email: ${userData.email}`);
    cy.task("deleteProfileByEmail", userData.email).then((result) => {
      if (result.deleted) {
        cy.log("✅ User profile deleted successfully");
        cy.log("📋 Deleted profile:", JSON.stringify(result.profile, null, 2));
      } else {
        cy.log("❌ Failed to delete user profile - profile not found");
        expect(result.deleted).to.be.true; // This will fail the test
      }
    });

    // Then, delete the organization from the database
    cy.log(`🗑️  Deleting organization: ${userData.organization}`);
    cy.task("deleteOrganizationByName", userData.organization).then(
      (result) => {
        if (result.deleted) {
          cy.log("✅ Organization deleted successfully");
          cy.log(
            "📋 Deleted organization:",
            JSON.stringify(result.organization, null, 2)
          );
        } else {
          cy.log("❌ Failed to delete organization - organization not found");
          expect(result.deleted).to.be.true; // This will fail the test
        }
      }
    );

    // Verify the user can no longer log in with the deleted credentials
    cy.log("🔐 Attempting to login with deleted user credentials...");
    cy.visit("/");

    // Try to login with the deleted user's credentials
    LoginPage.signInEmailTextBox().type(userData.email);
    LoginPage.signInPasswordTextBox().type(userData.password);
    LoginPage.loginButton().click();
    LoginPage.invalidLoginMessage()
      .should("be.visible")
      .should("have.text", "Invalid login credentials");

    // Verify login fails - user should remain on the auth page
    cy.url().should("include", "/auth");

    // Check for error message (this may vary depending on your app's error handling)
    // You might want to check for a specific error message or toast notification
    cy.log("✅ Login failed as expected - user remains on auth page");

    // Optional: Verify the user profile no longer exists in the database
    cy.log("🔍 Verifying user profile no longer exists in database...");
    cy.task("queryProfileByEmail", userData.email).then((profile) => {
      expect(profile).to.be.null;
      cy.log("✅ User profile successfully removed from database");
    });
  });
});
