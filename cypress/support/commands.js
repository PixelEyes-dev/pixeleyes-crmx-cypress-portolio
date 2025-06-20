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
  const userEmail = email || Cypress.env("CYPRESS_USER_EMAIL");
  const userPassword = password || Cypress.env("CYPRESS_USER_PASSWORD");

  cy.visit("/");
  LoginPage.homePageTitle().should("have.text", "Welcome to CRMx111");
  LoginPage.emailInput().type(userEmail);
  LoginPage.passwordInput().type(userPassword);
  LoginPage.loginButton().click();
  cy.url().should("include", "/dashboard");
  cy.get(".flex h1").should("have.text", "Dashboarddd");
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

// ============================================
// SCREENSHOT AND VIDEO RECORDING COMMANDS
// ============================================

/**
 * Take screenshot with custom name and timestamp
 * @param {string} name - Screenshot name
 * @param {Object} options - Screenshot options
 */
Cypress.Commands.add("takeScreenshot", (name, options = {}) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const screenshotName = `${name}-${timestamp}`;
  cy.screenshot(screenshotName, options);
});

/**
 * Take screenshot at specific test step
 * @param {string} stepName - Name of the test step
 */
Cypress.Commands.add("screenshotAtStep", (stepName) => {
  const testName = Cypress.currentTest.title;
  const stepScreenshotName = `${testName}-${stepName}`;
  cy.takeScreenshot(stepScreenshotName);
});

/**
 * Take screenshot on failure with detailed context
 */
Cypress.Commands.add("screenshotOnFailure", () => {
  cy.on("fail", (error) => {
    const testName = Cypress.currentTest.title;
    const failureScreenshotName = `${testName}-FAILURE`;
    cy.screenshot(failureScreenshotName);
    throw error; // Re-throw the error to maintain test failure
  });
});

/**
 * Take screenshot before and after an action
 * @param {Function} action - Action to perform
 * @param {string} actionName - Name of the action
 */
Cypress.Commands.add("screenshotAroundAction", (action, actionName) => {
  const testName = Cypress.currentTest.title;

  // Screenshot before action
  cy.takeScreenshot(`${testName}-before-${actionName}`);

  // Perform the action
  action();

  // Screenshot after action
  cy.takeScreenshot(`${testName}-after-${actionName}`);
});

/**
 * Take screenshot of specific element
 * @param {string} selector - Element selector
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add("screenshotElement", (selector, name) => {
  cy.get(selector).screenshot(name);
});

/**
 * Take screenshot of full page
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add("screenshotFullPage", (name) => {
  cy.screenshot(name, { capture: "fullPage" });
});

/**
 * Take screenshot of viewport only
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add("screenshotViewport", (name) => {
  cy.screenshot(name, { capture: "viewport" });
});

// ============================================
// TEST RECORDING UTILITIES
// ============================================

/**
 * Start recording a test session
 * @param {string} sessionName - Name of the test session
 */
Cypress.Commands.add("startRecording", (sessionName) => {
  const timestamp = new Date().toISOString();
  cy.log(`🎥 Starting recording: ${sessionName} at ${timestamp}`);
  cy.takeScreenshot(`${sessionName}-start`);
});

/**
 * End recording a test session
 * @param {string} sessionName - Name of the test session
 */
Cypress.Commands.add("endRecording", (sessionName) => {
  const timestamp = new Date().toISOString();
  cy.log(`🎥 Ending recording: ${sessionName} at ${timestamp}`);
  cy.takeScreenshot(`${sessionName}-end`);
});

/**
 * Record test step with screenshot
 * @param {string} stepName - Name of the test step
 * @param {Function} stepAction - Action to perform
 */
Cypress.Commands.add("recordStep", (stepName, stepAction) => {
  cy.log(`📸 Recording step: ${stepName}`);
  cy.takeScreenshot(`step-${stepName}-before`);

  if (stepAction) {
    stepAction();
  }

  cy.takeScreenshot(`step-${stepName}-after`);
});

// ============================================
