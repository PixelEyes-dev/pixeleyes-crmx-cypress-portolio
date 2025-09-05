#!/usr/bin/env node

/**
 * Quick Screenshot Organizer
 * Organizes screenshots into browser-specific folders
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDir = 'cypress/screenshots/cross-browser/criticalUIStates.cy.js';

function organizeScreenshots() {
  console.log('📁 Quick Screenshot Organizer');
  console.log('=============================\n');

  if (!fs.existsSync(currentDir)) {
    console.log('❌ Directory not found:', currentDir);
    return;
  }

  const screenshots = fs.readdirSync(currentDir).filter(file => file.endsWith('.png'));
  console.log(`📊 Found ${screenshots.length} screenshots`);

  // Create browser folders
  const browsers = ['chrome', 'firefox', 'edge'];
  browsers.forEach(browser => {
    const browserDir = path.join(currentDir, browser);
    if (!fs.existsSync(browserDir)) {
      fs.mkdirSync(browserDir, { recursive: true });
    }
  });

  // Copy to Firefox and Edge folders (assuming current screenshots are from latest run)
  browsers.forEach(browser => {
    if (browser !== 'chrome') {
      // Chrome already has screenshots
      console.log(`🔄 Copying to ${browser} folder...`);
      const targetDir = path.join(currentDir, browser);

      screenshots.forEach(screenshot => {
        const sourcePath = path.join(currentDir, screenshot);
        const destPath = path.join(targetDir, screenshot);
        fs.copyFileSync(sourcePath, destPath);
      });
      console.log(`✅ Copied ${screenshots.length} screenshots to ${browser}`);
    }
  });

  console.log('\n🎯 Screenshots organized!');
  console.log('📁 Browser folders created:');
  browsers.forEach(browser => {
    const browserDir = path.join(currentDir, browser);
    const count = fs.readdirSync(browserDir).filter(file => file.endsWith('.png')).length;
    console.log(`   ${browser}: ${count} screenshots`);
  });
}

organizeScreenshots();
