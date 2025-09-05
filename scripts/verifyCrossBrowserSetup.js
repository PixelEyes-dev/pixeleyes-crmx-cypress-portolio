#!/usr/bin/env node

/**
 * Simple Cross-Browser Test Verification Script
 * Tests the basic setup without running full E2E tests
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Cross-Browser E2E Testing Setup Verification');
console.log('==============================================');

// Check if required files exist
const requiredFiles = [
  'cypress.config.cjs',
  'cypress/support/crossBrowserUtils.js',
  'cypress/e2e/leads/crossBrowserLeadManagement.cy.js',
  'scripts/runCrossBrowserTests.js',
  'CROSS_BROWSER_TESTING.md'
];

console.log('\n📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = [
  'cypress:cross-browser',
  'cypress:cross-browser:chrome',
  'cypress:cross-browser:firefox',
  'cypress:cross-browser:edge'
];

requiredScripts.forEach(script => {
  const exists = packageJson.scripts && packageJson.scripts[script];
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${script}`);
  if (!exists) allFilesExist = false;
});

// Check Cypress config
console.log('\n⚙️ Checking Cypress configuration...');
try {
  const cypressConfig = await import('./cypress.config.cjs');
  const hasBrowsers = cypressConfig.default.e2e && cypressConfig.default.e2e.browsers;
  const hasCrossBrowser = cypressConfig.default.e2e && cypressConfig.default.e2e.crossBrowser;
  
  console.log(`${hasBrowsers ? '✅' : '❌'} Browser configuration`);
  console.log(`${hasCrossBrowser ? '✅' : '❌'} Cross-browser settings`);
  
  if (hasBrowsers) {
    console.log(`   📋 Configured browsers: ${cypressConfig.default.e2e.browsers.map(b => b.name).join(', ')}`);
  }
  
} catch (error) {
  console.log(`❌ Cypress config error: ${error.message}`);
  allFilesExist = false;
}

// Summary
console.log('\n📊 Setup Summary');
console.log('================');
if (allFilesExist) {
  console.log('✅ All components are properly configured!');
  console.log('\n🎯 Next steps:');
  console.log('1. Run: npm run cypress:cross-browser:chrome');
  console.log('2. Run: npm run cypress:cross-browser:firefox');
  console.log('3. Run: npm run cypress:cross-browser:edge');
  console.log('4. Or run all: npm run cypress:cross-browser');
} else {
  console.log('❌ Some components are missing or misconfigured');
  console.log('Please check the errors above and fix them.');
}

console.log('\n📚 Documentation: CROSS_BROWSER_TESTING.md');
console.log('🎉 Setup verification complete!');
