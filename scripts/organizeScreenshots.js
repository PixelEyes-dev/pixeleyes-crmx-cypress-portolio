#!/usr/bin/env node

/**
 * Organize Cross-Browser Screenshots
 * Manually organizes screenshots into browser-specific folders
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDir = 'cypress/screenshots/cross-browser/criticalUIStates.cy.js';

function organizeScreenshots() {
  console.log('📁 Organizing Cross-Browser Screenshots');
  console.log('======================================\n');

  if (!fs.existsSync(currentDir)) {
    console.log('❌ Current screenshots directory not found:', currentDir);
    console.log('💡 Run the cross-browser visual regression tests first');
    return;
  }

  const screenshots = fs.readdirSync(currentDir).filter(file => file.endsWith('.png'));

  if (screenshots.length === 0) {
    console.log('❌ No screenshots found in:', currentDir);
    return;
  }

  console.log(`📊 Found ${screenshots.length} screenshots to organize`);

  // Create browser-specific folders
  const browsers = ['chrome', 'firefox', 'edge'];
  browsers.forEach(browser => {
    const browserDir = path.join(currentDir, browser);
    if (!fs.existsSync(browserDir)) {
      fs.mkdirSync(browserDir, { recursive: true });
    }
  });

  // For demonstration, let's organize them by assuming the last run was Edge
  // In a real scenario, you'd want to run each browser separately
  const targetBrowser = 'edge'; // You can change this to chrome, firefox, or edge
  const targetDir = path.join(currentDir, targetBrowser);

  console.log(`🔄 Moving screenshots to ${targetBrowser.toUpperCase()} folder...`);

  screenshots.forEach(screenshot => {
    const sourcePath = path.join(currentDir, screenshot);
    const destPath = path.join(targetDir, screenshot);

    fs.copyFileSync(sourcePath, destPath);
    console.log(`   📸 ${screenshot} -> ${targetBrowser}/`);
  });

  console.log(`\n✅ Screenshots organized into ${targetBrowser.toUpperCase()} folder`);
  console.log(`📁 Location: ${targetDir}`);

  console.log('\n💡 To organize for other browsers:');
  console.log('   1. Run tests for Chrome: npm run visual:run-tests');
  console.log('   2. Run this script again with targetBrowser = "chrome"');
  console.log('   3. Repeat for Firefox and Edge');
}

organizeScreenshots();
