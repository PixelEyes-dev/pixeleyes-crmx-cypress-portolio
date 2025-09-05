/// <reference types="cypress" />

import { getBrowserInfo, takeScreenshot, logBrowserTestResult, runAccessibilityCheck } from '../../support/crossBrowserUtils';

describe('Cross-Browser Setup Verification Test', () => {
  let browserInfo;

  before(() => {
    browserInfo = getBrowserInfo();
    cy.log(`🌐 Running cross-browser verification on: ${browserInfo.name} ${browserInfo.version}`);
    cy.log(`👤 Browser Family: ${browserInfo.family}`);
    cy.log(`🎭 Headless Mode: ${browserInfo.isHeadless}`);
  });

  it('should verify cross-browser utilities are working', () => {
    cy.login();

    // Take screenshot
    takeScreenshot('cross-browser-verification');

    // Basic accessibility check
    runAccessibilityCheck();

    // Verify browser info is available
    expect(browserInfo.name).to.be.a('string');
    expect(browserInfo.version).to.be.a('string');
    expect(browserInfo.family).to.be.a('string');

    logBrowserTestResult('Cross-Browser Setup', 'PASSED', {
      browser: browserInfo.name,
      version: browserInfo.version,
      family: browserInfo.family,
    });
  });

  it('should verify basic page functionality', () => {
    cy.login();

    // Verify dashboard loads
    cy.get('body').should('be.visible');

    // Take screenshot of dashboard
    takeScreenshot('dashboard-verification');

    logBrowserTestResult('Basic Functionality', 'PASSED', {
      pageLoaded: true,
      bodyVisible: true,
    });
  });

  after(() => {
    cy.log(`🎉 Cross-browser verification completed successfully on ${browserInfo.name} ${browserInfo.version}`);
  });
});
