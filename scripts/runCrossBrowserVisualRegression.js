#!/usr/bin/env node

/**
 * Cross-Browser Visual Regression Test Runner
 * Runs visual regression tests across multiple browsers with browser-specific folders
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browsers = ['chrome', 'firefox', 'edge'];
const specFile = 'cypress/e2e/visual-regression/criticalUIStates.cy.js';

function runTestForBrowser(browser) {
  return new Promise((resolve, reject) => {
    console.log(`🌐 Running visual regression tests on ${browser.toUpperCase()}...`);

    // Create browser-specific screenshot and video folders
    const screenshotDir = `cypress/screenshots/cross-browser/${browser}`;
    const videoDir = `cypress/videos/cross-browser/${browser}`;

    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }

    const args = ['run', '--browser', browser, '--spec', specFile, '--headless', '--config', `screenshotsFolder=${screenshotDir},videosFolder=${videoDir}`];

    const cypressProcess = spawn('npx', ['cypress', ...args], {
      stdio: 'inherit',
      shell: true,
    });

    cypressProcess.on('close', code => {
      if (code === 0) {
        console.log(`✅ ${browser.toUpperCase()} visual regression tests completed successfully!`);
        resolve(browser);
      } else {
        console.log(`❌ ${browser.toUpperCase()} visual regression tests failed with code ${code}`);
        reject(new Error(`${browser} failed with code ${code}`));
      }
    });

    cypressProcess.on('error', error => {
      console.log(`❌ Error running ${browser} tests:`, error.message);
      reject(error);
    });
  });
}

async function runCrossBrowserVisualRegression() {
  console.log('🚀 Starting Cross-Browser Visual Regression Tests');
  console.log('================================================\n');

  const results = [];
  const errors = [];

  for (const browser of browsers) {
    try {
      const result = await runTestForBrowser(browser);
      results.push(result);
    } catch (error) {
      errors.push({ browser, error: error.message });
    }
  }

  console.log('\n📊 Cross-Browser Visual Regression Summary');
  console.log('==========================================');
  console.log(`Total browsers tested: ${browsers.length}`);
  console.log(`Successful: ${results.length}`);
  console.log(`Failed: ${errors.length}`);

  if (results.length > 0) {
    console.log('\n✅ Successful browsers:');
    results.forEach(browser => {
      console.log(`   - ${browser.toUpperCase()}`);
    });
  }

  if (errors.length > 0) {
    console.log('\n❌ Failed browsers:');
    errors.forEach(({ browser, error }) => {
      console.log(`   - ${browser.toUpperCase()}: ${error}`);
    });
  }

  console.log('\n📁 Screenshot locations:');
  browsers.forEach(browser => {
    const screenshotDir = `cypress/screenshots/cross-browser/${browser}`;
    console.log(`   ${browser.toUpperCase()}: ${screenshotDir}`);
  });

  console.log('\n💡 Next steps:');
  console.log('   1. Generate browser-specific baselines: npm run visual:generate-browser-baselines');
  console.log('   2. Compare specific browser: npm run visual:compare-chrome');
  console.log('   3. Compare all browsers: npm run visual:compare-all-browsers');

  if (errors.length > 0) {
    process.exit(1);
  }
}

runCrossBrowserVisualRegression();
