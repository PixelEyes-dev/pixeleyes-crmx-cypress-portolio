#!/usr/bin/env node

/**
 * Cross-Browser Test Runner Script
 * Runs E2E tests across multiple browsers
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Browser configurations - platform-aware
const getAvailableBrowsers = () => {
  const platform = process.platform;

  if (platform === 'darwin') {
    // macOS - Safari is available
    return [
      { name: 'chrome', displayName: 'Chrome' },
      { name: 'firefox', displayName: 'Firefox' },
      { name: 'edge', displayName: 'Edge' },
      { name: 'safari', displayName: 'Safari' },
    ];
  } else {
    // Windows/Linux - Safari not available
    return [
      { name: 'chrome', displayName: 'Chrome' },
      { name: 'firefox', displayName: 'Firefox' },
      { name: 'edge', displayName: 'Edge' },
    ];
  }
};

const browsers = getAvailableBrowsers();

// Test files to run
const testFiles = ['cypress/e2e/leads/crossBrowserLeadManagement.cy.js'];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logPlatformInfo() {
  const platform = process.platform;
  const platformName = platform === 'darwin' ? 'macOS' : platform === 'win32' ? 'Windows' : 'Linux';

  log(`\n${colors.bright}🖥️  Platform Detection${colors.reset}`, 'blue');
  log(`Platform: ${platformName} (${platform})`, 'cyan');

  if (platform === 'darwin') {
    log(`✅ Safari testing available on macOS`, 'green');
  } else {
    log(`ℹ️  Safari testing not available on ${platformName}`, 'yellow');
    log(`   Safari is macOS-only. Consider using macOS for full cross-browser testing.`, 'yellow');
  }
}

function runTest(browser, testFile) {
  log(`\n${colors.bright}🌐 Running ${testFile} on ${browser.displayName}...${colors.reset}`, 'blue');

  try {
    const command = `npx cypress run --browser ${browser.name} --spec "${testFile}" --headless`;
    log(`📋 Command: ${command}`, 'cyan');

    const result = execSync(command, {
      stdio: 'pipe',
      encoding: 'utf8',
    });

    log(`✅ ${browser.displayName} test completed successfully!`, 'green');
    return { success: true, browser: browser.name, output: result };
  } catch (error) {
    log(`❌ ${browser.displayName} test failed!`, 'red');
    log(`Error: ${error.message}`, 'red');
    return { success: false, browser: browser.name, error: error.message };
  }
}

function generateReport(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = `cypress/reports/cross-browser-report-${timestamp}.json`;

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passed: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    },
    results: results,
  };

  // Ensure reports directory exists
  const reportsDir = path.dirname(reportPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`📊 Report saved to: ${reportPath}`, 'magenta');

  return report;
}

function printSummary(report) {
  log(`\n${colors.bright}📊 Cross-Browser Test Summary${colors.reset}`, 'blue');
  log(`================================`, 'blue');
  log(`Total Tests: ${report.summary.total}`, 'cyan');
  log(`Passed: ${report.summary.passed}`, 'green');
  log(`Failed: ${report.summary.failed}`, 'red');
  log(`Success Rate: ${((report.summary.passed / report.summary.total) * 100).toFixed(1)}%`, 'yellow');

  log(`\n${colors.bright}Detailed Results:${colors.reset}`, 'blue');
  report.results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    const color = result.success ? 'green' : 'red';
    log(`${status} ${result.browser}`, color);
  });
}

async function main() {
  log(`${colors.bright}🚀 Starting Cross-Browser E2E Test Suite${colors.reset}`, 'magenta');
  log(`Time: ${new Date().toLocaleString()}`, 'cyan');

  // Log platform information
  logPlatformInfo();

  const results = [];

  for (const testFile of testFiles) {
    log(`\n${colors.bright}📁 Testing: ${testFile}${colors.reset}`, 'yellow');

    for (const browser of browsers) {
      const result = runTest(browser, testFile);
      results.push(result);

      // Add a small delay between browser runs
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  const report = generateReport(results);
  printSummary(report);

  // Exit with appropriate code
  const exitCode = report.summary.failed > 0 ? 1 : 0;
  process.exit(exitCode);
}

// Handle script execution
main().catch(error => {
  log(`💥 Script execution failed: ${error.message}`, 'red');
  process.exit(1);
});

export { runTest, generateReport, printSummary };
