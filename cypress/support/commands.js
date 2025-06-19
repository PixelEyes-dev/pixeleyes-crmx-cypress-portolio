// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import LoginPage from "./pageObjects/LoginPage";

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ============================================
// AUTHENTICATION COMMANDS
// ============================================

/**
 * Custom login command for CRMx application
 * @param {string} email - User email (optional, uses env variable if not provided)
 * @param {string} password - User password (optional, uses env variable if not provided)
 */
Cypress.Commands.add("login", (email = null, password = null) => {
  const userEmail = email || Cypress.env("userEmail");
  const userPassword = password || Cypress.env("userPassword");

  cy.visit("https://www.crmx.mx");
  LoginPage.homePageTitle().should("have.text", "Welcome to CRMx111");
  LoginPage.emailInput().type(userEmail);
  LoginPage.passwordInput().type(userPassword);
  LoginPage.loginButton().click();
  cy.url().should("include", "/dashboard");
  cy.get(".flex h1").should("have.text", "Dashboard");
});

/**
 * Custom logout command
 */
Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should("include", "/login");
});

// ============================================
// FORM INTERACTION COMMANDS
// ============================================

/**
 * Fill form fields dynamically
 * @param {Object} formData - Object with field selectors and values
 */
Cypress.Commands.add("fillForm", (formData) => {
  Object.keys(formData).forEach((selector) => {
    cy.get(selector).type(formData[selector]);
  });
});

/**
 * Clear and type in a field
 * @param {string} selector - Element selector
 * @param {string} text - Text to type
 */
Cypress.Commands.add("clearAndType", (selector, text) => {
  cy.get(selector).clear().type(text);
});

// ============================================
// NAVIGATION COMMANDS
// ============================================

/**
 * Navigate to a specific page
 * @param {string} page - Page path
 */
Cypress.Commands.add("navigateTo", (page) => {
  cy.visit(page);
  cy.get("body").should("be.visible");
});

/**
 * Click navigation menu item
 * @param {string} menuItem - Menu item text or selector
 */
Cypress.Commands.add("clickMenuItem", (menuItem) => {
  cy.get(`[data-testid="${menuItem}"]`).click();
  cy.url().should("include", menuItem.toLowerCase());
});

// ============================================
// DATA MANAGEMENT COMMANDS
// ============================================

/**
 * Create a new record (customer, deal, etc.)
 * @param {string} type - Type of record (customer, deal, etc.)
 * @param {Object} data - Record data
 */
Cypress.Commands.add("createRecord", (type, data) => {
  cy.visit(`/${type}s`);
  cy.get(`[data-testid="add-${type}-button"]`).click();

  Object.keys(data).forEach((field) => {
    cy.get(`[data-testid="${type}-${field}"]`).type(data[field]);
  });

  cy.get(`[data-testid="save-${type}"]`).click();
});

/**
 * Search for a record
 * @param {string} searchTerm - Search term
 */
Cypress.Commands.add("searchRecord", (searchTerm) => {
  cy.get('[data-testid="search-input"]').type(searchTerm);
  cy.get('[data-testid="search-button"]').click();
});

// ============================================
// VALIDATION COMMANDS
// ============================================

/**
 * Check if element contains text
 * @param {string} selector - Element selector
 * @param {string} text - Expected text
 */
Cypress.Commands.add("shouldContainText", (selector, text) => {
  cy.get(selector).should("contain.text", text);
});

/**
 * Check if element is visible and enabled
 * @param {string} selector - Element selector
 */
Cypress.Commands.add("shouldBeVisibleAndEnabled", (selector) => {
  cy.get(selector).should("be.visible").and("not.be.disabled");
});

// ============================================
// UTILITY COMMANDS
// ============================================

/**
 * Wait for page to load completely
 */
Cypress.Commands.add("waitForPageLoad", () => {
  cy.get("body").should("be.visible");
  cy.get('[data-testid="loading"]').should("not.exist");
});

/**
 * Take screenshot with custom name
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add("takeScreenshot", (name) => {
  cy.screenshot(name);
});

/**
 * Check responsive design at different viewports
 * @param {Array} viewports - Array of viewport sizes
 */
Cypress.Commands.add(
  "checkResponsive",
  (viewports = ["iphone-6", "ipad-2", [1280, 720]]) => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get("body").should("be.visible");
    });
  }
);

// ============================================
// API COMMANDS (if needed)
// ============================================

/**
 * Make API request and store response
 * @param {string} method - HTTP method
 * @param {string} url - API endpoint
 * @param {Object} body - Request body (optional)
 */
Cypress.Commands.add("apiRequest", (method, url, body = null) => {
  const options = {
    method: method,
    url: url,
    failOnStatusCode: false,
  };

  if (body) {
    options.body = body;
  }

  return cy.request(options);
});

// ============================================
// COMMAND TYPE DEFINITIONS (for TypeScript support)
// ============================================

// Uncomment these if using TypeScript
/*
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
      fillForm(formData: Record<string, string>): Chainable<void>
      clearAndType(selector: string, text: string): Chainable<void>
      navigateTo(page: string): Chainable<void>
      clickMenuItem(menuItem: string): Chainable<void>
      createRecord(type: string, data: Record<string, string>): Chainable<void>
      searchRecord(searchTerm: string): Chainable<void>
      shouldContainText(selector: string, text: string): Chainable<void>
      shouldBeVisibleAndEnabled(selector: string): Chainable<void>
      waitForPageLoad(): Chainable<void>
      takeScreenshot(name: string): Chainable<void>
      checkResponsive(viewports?: Array<string | number[]>): Chainable<void>
      apiRequest(method: string, url: string, body?: any): Chainable<Response<any>>
    }
  }
}
*/
