#!/usr/bin/env node

/**
 * Enhanced Visual Regression Comparison Tool
 * Supports cross-browser comparisons with browser-specific baselines
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baselineDir = 'cypress/screenshots/visual-regression/baselines';
const currentDir = 'cypress/screenshots/cross-browser/criticalUIStates.cy.js';

function getAvailableBrowsers() {
  const browsers = ['chrome', 'firefox', 'edge'];
  const availableBrowsers = [];

  browsers.forEach(browser => {
    const browserDir = path.join(currentDir, browser);
    if (fs.existsSync(browserDir)) {
      availableBrowsers.push(browser);
    }
  });

  return availableBrowsers;
}

function compareScreenshots(browser = null) {
  console.log('🔍 Enhanced Visual Regression Comparison Tool');
  console.log('=============================================\n');

  // Check if directories exist
  if (!fs.existsSync(baselineDir)) {
    console.log('❌ Baseline directory not found:', baselineDir);
    console.log('💡 Run the visual regression tests first to generate baselines');
    return;
  }

  if (!fs.existsSync(currentDir)) {
    console.log('❌ Current screenshots directory not found:', currentDir);
    console.log('💡 Run the visual regression tests first');
    return;
  }

  const availableBrowsers = getAvailableBrowsers();

  if (browser && !availableBrowsers.includes(browser)) {
    console.log(`❌ Browser '${browser}' not found in current screenshots`);
    console.log(`📊 Available browsers: ${availableBrowsers.join(', ')}`);
    return;
  }

  if (availableBrowsers.length === 0) {
    console.log('📊 No browser-specific folders found. Checking main directory...');
    compareMainDirectory();
    return;
  }

  if (browser) {
    console.log(`🔍 Comparing screenshots for browser: ${browser.toUpperCase()}`);
    compareBrowserScreenshots(browser);
  } else {
    console.log(`📊 Found ${availableBrowsers.length} browsers: ${availableBrowsers.join(', ')}`);
    console.log('\n🎯 Available comparison options:');
    console.log('   1. Compare specific browser: npm run visual:compare-local -- --browser chrome');
    console.log('   2. Compare all browsers: npm run visual:compare-local -- --all-browsers');
    console.log('   3. Compare main directory: npm run visual:compare-local -- --main');
  }
}

function compareMainDirectory() {
  const baselineFiles = fs.readdirSync(baselineDir).filter(file => file.endsWith('.png'));
  const currentFiles = fs.readdirSync(currentDir).filter(file => file.endsWith('.png'));

  console.log(`📊 Found ${baselineFiles.length} baseline images`);
  console.log(`📊 Found ${currentFiles.length} current screenshots\n`);

  // Compare each file
  baselineFiles.forEach(baselineFile => {
    const baselinePath = path.join(baselineDir, baselineFile);
    const currentPath = path.join(currentDir, baselineFile);

    if (fs.existsSync(currentPath)) {
      const baselineStats = fs.statSync(baselinePath);
      const currentStats = fs.statSync(currentPath);

      const baselineSize = baselineStats.size;
      const currentSize = currentStats.size;
      const sizeDiff = Math.abs(currentSize - baselineSize);
      const sizeDiffPercent = ((sizeDiff / baselineSize) * 100).toFixed(2);

      console.log(`📸 ${baselineFile}:`);
      console.log(`   Baseline: ${(baselineSize / 1024).toFixed(1)} KB`);
      console.log(`   Current:  ${(currentSize / 1024).toFixed(1)} KB`);
      console.log(`   Difference: ${sizeDiffPercent}% ${currentSize > baselineSize ? '📈' : '📉'}`);

      if (sizeDiffPercent > 10) {
        console.log(`   ⚠️  Significant difference detected!`);
      } else {
        console.log(`   ✅ Within acceptable range`);
      }
      console.log('');
    } else {
      console.log(`❌ ${baselineFile}: No current screenshot found`);
    }
  });
}

function compareBrowserScreenshots(browser) {
  const browserBaselineDir = path.join(baselineDir, browser);
  const browserCurrentDir = path.join(currentDir, browser);

  // Check if browser-specific baseline exists
  if (!fs.existsSync(browserBaselineDir)) {
    console.log(`⚠️  No baseline found for ${browser}. Using main baseline directory.`);
    compareBrowserAgainstMainBaseline(browser);
    return;
  }

  const baselineFiles = fs.readdirSync(browserBaselineDir).filter(file => file.endsWith('.png'));
  const currentFiles = fs.readdirSync(browserCurrentDir).filter(file => file.endsWith('.png'));

  console.log(`📊 Found ${baselineFiles.length} baseline images for ${browser}`);
  console.log(`📊 Found ${currentFiles.length} current screenshots for ${browser}\n`);

  // Compare each file
  baselineFiles.forEach(baselineFile => {
    const baselinePath = path.join(browserBaselineDir, baselineFile);
    const currentPath = path.join(browserCurrentDir, baselineFile);

    if (fs.existsSync(currentPath)) {
      const baselineStats = fs.statSync(baselinePath);
      const currentStats = fs.statSync(currentPath);

      const baselineSize = baselineStats.size;
      const currentSize = currentStats.size;
      const sizeDiff = Math.abs(currentSize - baselineSize);
      const sizeDiffPercent = ((sizeDiff / baselineSize) * 100).toFixed(2);

      console.log(`📸 ${baselineFile} (${browser}):`);
      console.log(`   Baseline: ${(baselineSize / 1024).toFixed(1)} KB`);
      console.log(`   Current:  ${(currentSize / 1024).toFixed(1)} KB`);
      console.log(`   Difference: ${sizeDiffPercent}% ${currentSize > baselineSize ? '📈' : '📉'}`);

      if (sizeDiffPercent > 10) {
        console.log(`   ⚠️  Significant difference detected!`);
      } else {
        console.log(`   ✅ Within acceptable range`);
      }
      console.log('');
    } else {
      console.log(`❌ ${baselineFile}: No current screenshot found for ${browser}`);
    }
  });
}

function compareBrowserAgainstMainBaseline(browser) {
  const browserCurrentDir = path.join(currentDir, browser);
  const baselineFiles = fs.readdirSync(baselineDir).filter(file => file.endsWith('.png'));
  const currentFiles = fs.readdirSync(browserCurrentDir).filter(file => file.endsWith('.png'));

  console.log(`📊 Comparing ${browser} screenshots against main baseline`);
  console.log(`📊 Found ${baselineFiles.length} baseline images`);
  console.log(`📊 Found ${currentFiles.length} current screenshots for ${browser}\n`);

  baselineFiles.forEach(baselineFile => {
    const baselinePath = path.join(baselineDir, baselineFile);
    const currentPath = path.join(browserCurrentDir, baselineFile);

    if (fs.existsSync(currentPath)) {
      const baselineStats = fs.statSync(baselinePath);
      const currentStats = fs.statSync(currentPath);

      const baselineSize = baselineStats.size;
      const currentSize = currentStats.size;
      const sizeDiff = Math.abs(currentSize - baselineSize);
      const sizeDiffPercent = ((sizeDiff / baselineSize) * 100).toFixed(2);

      console.log(`📸 ${baselineFile} (${browser} vs main baseline):`);
      console.log(`   Main Baseline: ${(baselineSize / 1024).toFixed(1)} KB`);
      console.log(`   ${browser} Current: ${(currentSize / 1024).toFixed(1)} KB`);
      console.log(`   Difference: ${sizeDiffPercent}% ${currentSize > baselineSize ? '📈' : '📉'}`);

      if (sizeDiffPercent > 10) {
        console.log(`   ⚠️  Significant difference detected!`);
      } else {
        console.log(`   ✅ Within acceptable range`);
      }
      console.log('');
    } else {
      console.log(`❌ ${baselineFile}: No ${browser} screenshot found`);
    }
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
const browserArg = args.find(arg => arg.startsWith('--browser='))?.split('=')[1];
const allBrowsers = args.includes('--all-browsers');
const mainOnly = args.includes('--main');

if (mainOnly) {
  compareMainDirectory();
} else if (allBrowsers) {
  const availableBrowsers = getAvailableBrowsers();
  availableBrowsers.forEach(browser => {
    console.log(`\n${'='.repeat(50)}`);
    compareBrowserScreenshots(browser);
  });
} else if (browserArg) {
  compareScreenshots(browserArg);
} else {
  compareScreenshots();
}
