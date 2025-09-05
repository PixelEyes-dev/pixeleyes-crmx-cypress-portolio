#!/usr/bin/env node

/**
 * Generate Browser-Specific Baselines for Visual Regression
 * Creates separate baseline folders for each browser
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baselineDir = 'cypress/screenshots/visual-regression/baselines';
const currentDir = 'cypress/screenshots/cross-browser/criticalUIStates.cy.js';

function generateBrowserBaselines() {
  console.log('📸 Generating Browser-Specific Baselines');
  console.log('========================================\n');

  // Check if current directory exists
  if (!fs.existsSync(currentDir)) {
    console.log('❌ Current screenshots directory not found:', currentDir);
    console.log('💡 Run the cross-browser visual regression tests first');
    return;
  }

  // Get available browsers
  const browsers = ['chrome', 'firefox', 'edge'];
  const availableBrowsers = [];

  browsers.forEach(browser => {
    const browserDir = path.join(currentDir, browser);
    if (fs.existsSync(browserDir)) {
      availableBrowsers.push(browser);
    }
  });

  if (availableBrowsers.length === 0) {
    console.log('📊 No browser-specific folders found in current screenshots');
    console.log('💡 Run: npm run cypress:cross-browser -- --spec "cypress/e2e/visual-regression/criticalUIStates.cy.js"');
    return;
  }

  console.log(`📊 Found ${availableBrowsers.length} browsers: ${availableBrowsers.join(', ')}\n`);

  // Create baseline directory if it doesn't exist
  if (!fs.existsSync(baselineDir)) {
    fs.mkdirSync(baselineDir, { recursive: true });
  }

  // Generate baselines for each browser
  availableBrowsers.forEach(browser => {
    console.log(`🔄 Generating baseline for ${browser.toUpperCase()}...`);

    const browserCurrentDir = path.join(currentDir, browser);
    const browserBaselineDir = path.join(baselineDir, browser);

    // Create browser-specific baseline directory
    if (!fs.existsSync(browserBaselineDir)) {
      fs.mkdirSync(browserBaselineDir, { recursive: true });
    }

    // Copy screenshots to baseline
    const screenshots = fs.readdirSync(browserCurrentDir).filter(file => file.endsWith('.png'));

    screenshots.forEach(screenshot => {
      const sourcePath = path.join(browserCurrentDir, screenshot);
      const destPath = path.join(browserBaselineDir, screenshot);

      fs.copyFileSync(sourcePath, destPath);
    });

    console.log(`✅ Generated ${screenshots.length} baseline images for ${browser}`);
  });

  console.log('\n🎯 Browser-specific baselines generated successfully!');
  console.log('\n📁 Directory structure:');
  console.log(`   ${baselineDir}/`);
  availableBrowsers.forEach(browser => {
    console.log(`   ├── ${browser}/`);
    const browserBaselineDir = path.join(baselineDir, browser);
    const screenshots = fs.readdirSync(browserBaselineDir).filter(file => file.endsWith('.png'));
    screenshots.forEach(screenshot => {
      console.log(`   │   ├── ${screenshot}`);
    });
  });

  console.log('\n💡 Next steps:');
  console.log('   1. Run cross-browser tests: npm run cypress:cross-browser -- --spec "cypress/e2e/visual-regression/criticalUIStates.cy.js"');
  console.log('   2. Compare specific browser: npm run visual:compare-chrome');
  console.log('   3. Compare all browsers: npm run visual:compare-all-browsers');
}

generateBrowserBaselines();
