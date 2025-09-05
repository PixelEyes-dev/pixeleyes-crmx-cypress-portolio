/**
 * Visual Regression Testing Utilities
 * Provides functions for cross-browser visual comparison
 */

import { getBrowserInfo } from './crossBrowserUtils';

/**
 * Take a visual regression screenshot with browser-specific naming
 * @param {string} name - Screenshot name
 * @param {string} selector - Element selector (optional)
 * @param {Object} options - Screenshot options
 */
export function takeVisualRegressionScreenshot(name, selector = 'body', options = {}) {
  const browserInfo = getBrowserInfo();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotName = `${name}-${browserInfo.name}-${browserInfo.version}-${timestamp}`;

  cy.log(`📸 Taking visual regression screenshot: ${screenshotName}`);

  if (selector === 'body') {
    cy.screenshot(screenshotName, options);
  } else {
    cy.get(selector).screenshot(screenshotName, options);
  }
}

/**
 * Compare current screenshot with baseline
 * @param {string} name - Screenshot name
 * @param {string} selector - Element selector (optional)
 * @param {Object} options - Comparison options
 */
export function compareVisualRegression(name, selector = 'body', options = {}) {
  const browserInfo = getBrowserInfo();
  const baselineName = `${name}-${browserInfo.name}-baseline`;

  cy.log(`🔍 Comparing visual regression: ${baselineName}`);

  if (selector === 'body') {
    cy.compareSnapshot(baselineName, options);
  } else {
    cy.get(selector).compareSnapshot(baselineName, options);
  }
}

/**
 * Take and compare visual regression screenshot
 * @param {string} name - Screenshot name
 * @param {string} selector - Element selector (optional)
 * @param {Object} options - Screenshot and comparison options
 */
export function takeAndCompareVisualRegression(name, selector = 'body', options = {}) {
  takeVisualRegressionScreenshot(name, selector, options);
  compareVisualRegression(name, selector, options);
}

/**
 * Wait for UI to stabilize before taking screenshot
 * @param {number} delay - Delay in milliseconds
 */
export function waitForUIStabilization(delay = 1000) {
  cy.log(`⏳ Waiting for UI stabilization: ${delay}ms`);
  cy.wait(delay);
}

/**
 * Hide dynamic elements that might cause false positives
 */
export function hideDynamicElements() {
  cy.log('🎭 Hiding dynamic elements for visual regression');

  // Hide timestamps, dates, and other dynamic content
  cy.get('body').then($body => {
    // Hide elements with timestamps
    $body.find('[data-timestamp], .timestamp, .date').hide();

    // Hide user-specific content
    $body.find('.user-info, .profile-name').hide();

    // Hide loading spinners
    $body.find('.loading, .spinner, [data-loading]').hide();
  });
}

/**
 * Visual regression test for critical UI states
 * @param {string} stateName - Name of the UI state
 * @param {Function} setupFunction - Function to set up the UI state
 * @param {string} selector - Element selector to capture
 */
export function visualRegressionTest(stateName, setupFunction, selector = 'body') {
  describe(`Visual Regression: ${stateName}`, () => {
    it(`should match baseline for ${stateName}`, () => {
      // Set up the UI state
      setupFunction();

      // Wait for UI to stabilize
      waitForUIStabilization();

      // Hide dynamic elements
      hideDynamicElements();

      // Take and compare screenshot
      takeAndCompareVisualRegression(stateName, selector, {
        errorThreshold: 0.1, // 10% tolerance
        capture: 'viewport',
      });
    });
  });
}

/**
 * Generate baseline images for all browsers
 * @param {string} name - Screenshot name
 * @param {string} selector - Element selector (optional)
 */
export function generateBaseline(name, selector = 'body') {
  cy.log(`🎯 Generating baseline for: ${name}`);

  // Take screenshot without comparison
  takeVisualRegressionScreenshot(name, selector, {
    capture: 'viewport',
    disableTimers: true,
  });
}

/**
 * Visual regression configuration for different browsers
 */
export const visualRegressionConfig = {
  chrome: {
    errorThreshold: 0.1,
    capture: 'viewport',
    disableTimers: true,
  },
  firefox: {
    errorThreshold: 0.15, // Slightly higher tolerance for Firefox
    capture: 'viewport',
    disableTimers: true,
  },
  edge: {
    errorThreshold: 0.1,
    capture: 'viewport',
    disableTimers: true,
  },
};

/**
 * Get browser-specific visual regression options
 */
export function getVisualRegressionOptions() {
  const browserInfo = getBrowserInfo();
  return visualRegressionConfig[browserInfo.name] || visualRegressionConfig.chrome;
}
