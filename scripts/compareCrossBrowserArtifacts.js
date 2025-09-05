#!/usr/bin/env node

/**
 * Cross-Browser Artifact Comparison Tool
 * Compares screenshots and generates comparison reports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function compareScreenshots() {
  const screenshotsDir = 'cypress/screenshots/cross-browser';
  
  if (!fs.existsSync(screenshotsDir)) {
    log('❌ Screenshots directory not found', 'red');
    return;
  }

  log('🔍 Analyzing cross-browser screenshots...', 'blue');
  
  const testDirs = fs.readdirSync(screenshotsDir);
  
  testDirs.forEach(testDir => {
    const testPath = path.join(screenshotsDir, testDir);
    if (fs.statSync(testPath).isDirectory()) {
      log(`\n📁 Test: ${testDir}`, 'yellow');
      
      const screenshots = fs.readdirSync(testPath)
        .filter(file => file.endsWith('.png'))
        .sort();
      
      // Group by screenshot name (without browser suffix)
      const groupedScreenshots = {};
      
      screenshots.forEach(screenshot => {
        // Extract base name (e.g., "dashboard-loaded" from "dashboard-loaded-chrome-139.0.7258.155.png")
        const baseName = screenshot.split('-').slice(0, -2).join('-');
        if (!groupedScreenshots[baseName]) {
          groupedScreenshots[baseName] = [];
        }
        groupedScreenshots[baseName].push(screenshot);
      });
      
      // Report on each group
      Object.entries(groupedScreenshots).forEach(([baseName, files]) => {
        log(`  📸 ${baseName}:`, 'cyan');
        files.forEach(file => {
          const browser = file.split('-').slice(-2, -1)[0];
          const version = file.split('-').slice(-1)[0].replace('.png', '');
          log(`    ✅ ${browser} ${version}`, 'green');
        });
        
        if (files.length > 1) {
          log(`    🔍 ${files.length} browser versions available for comparison`, 'magenta');
        }
      });
    }
  });
}

function generateComparisonReport() {
  const reportsDir = 'cypress/reports';
  
  if (!fs.existsSync(reportsDir)) {
    log('❌ Reports directory not found', 'red');
    return;
  }
  
  const reportFiles = fs.readdirSync(reportsDir)
    .filter(file => file.startsWith('cross-browser-report-'))
    .sort()
    .reverse(); // Most recent first
  
  if (reportFiles.length === 0) {
    log('❌ No cross-browser reports found', 'red');
    return;
  }
  
  log('\n📊 Latest Cross-Browser Test Reports:', 'blue');
  
  reportFiles.slice(0, 3).forEach(reportFile => {
    try {
      const reportPath = path.join(reportsDir, reportFile);
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      
      const timestamp = new Date(report.timestamp).toLocaleString();
      const successRate = ((report.summary.passed / report.summary.total) * 100).toFixed(1);
      
      log(`\n📋 Report: ${reportFile}`, 'yellow');
      log(`   📅 Date: ${timestamp}`, 'cyan');
      log(`   📊 Total: ${report.summary.total}`, 'cyan');
      log(`   ✅ Passed: ${report.summary.passed}`, 'green');
      log(`   ❌ Failed: ${report.summary.failed}`, 'red');
      log(`   📈 Success Rate: ${successRate}%`, 'magenta');
      
      log(`   🌐 Browser Results:`, 'cyan');
      report.results.forEach(result => {
        const status = result.success ? '✅ PASS' : '❌ FAIL';
        const color = result.success ? 'green' : 'red';
        log(`     ${status} ${result.browser}`, color);
      });
      
    } catch (error) {
      log(`❌ Error reading report ${reportFile}: ${error.message}`, 'red');
    }
  });
}

async function openArtifactsFolder() {
  const artifactsDir = path.resolve('cypress');
  
  log('\n📂 Opening artifacts folder...', 'blue');
  log(`   📸 Screenshots: ${artifactsDir}/screenshots/cross-browser`, 'cyan');
  log(`   🎥 Videos: ${artifactsDir}/videos/cross-browser`, 'cyan');
  log(`   📊 Reports: ${artifactsDir}/reports`, 'cyan');
  
  // On Windows, use explorer
  if (process.platform === 'win32') {
    const { execSync } = await import('child_process');
    try {
      execSync(`explorer "${artifactsDir}"`);
      log('✅ Opened artifacts folder in Windows Explorer', 'green');
    } catch (error) {
      log('❌ Could not open folder automatically', 'red');
      log(`   Please manually open: ${artifactsDir}`, 'yellow');
    }
  } else {
    log(`   Please manually open: ${artifactsDir}`, 'yellow');
  }
}

async function main() {
  log('🔍 Cross-Browser Artifact Comparison Tool', 'bright');
  log('==========================================', 'bright');
  
  compareScreenshots();
  generateComparisonReport();
  openArtifactsFolder();
  
  log('\n🎯 Next Steps:', 'blue');
  log('1. Run tests: npm run cypress:cross-browser', 'cyan');
  log('2. Compare screenshots manually', 'cyan');
  log('3. Review video recordings', 'cyan');
  log('4. Check JSON reports for detailed results', 'cyan');
}

main().catch(error => {
  log(`💥 Error: ${error.message}`, 'red');
  process.exit(1);
});
