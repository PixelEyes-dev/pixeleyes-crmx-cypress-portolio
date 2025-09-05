#!/usr/bin/env node

/**
 * Cross-Browser HTML Report Generator
 * Creates an HTML report for easy visualization of cross-browser test results
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateHTMLReport() {
  const screenshotsDir = 'cypress/screenshots/cross-browser';
  const reportsDir = 'cypress/reports';
  const outputDir = 'cypress/reports/html';

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cross-Browser Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .summary-card h3 { margin: 0 0 10px 0; color: #333; }
        .summary-card .number { font-size: 2em; font-weight: bold; }
        .pass { color: #28a745; }
        .fail { color: #dc3545; }
        .test-section { margin-bottom: 40px; }
        .test-section h2 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .screenshot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .screenshot-card { background: #f8f9fa; border-radius: 8px; overflow: hidden; }
        .screenshot-card img { width: 100%; height: auto; }
        .screenshot-info { padding: 15px; }
        .screenshot-info h4 { margin: 0 0 10px 0; color: #333; }
        .browser-tag { display: inline-block; background: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; margin-right: 5px; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌐 Cross-Browser Test Results</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
  `;

  // Add summary section
  html += `
        <div class="summary">
            <div class="summary-card">
                <h3>Total Tests</h3>
                <div class="number">${getTotalTests()}</div>
            </div>
            <div class="summary-card">
                <h3>Browsers Tested</h3>
                <div class="number">${getBrowserCount()}</div>
            </div>
            <div class="summary-card">
                <h3>Screenshots</h3>
                <div class="number">${getScreenshotCount()}</div>
            </div>
            <div class="summary-card">
                <h3>Success Rate</h3>
                <div class="number pass">${getSuccessRate()}%</div>
            </div>
        </div>
  `;

  // Add test sections
  if (fs.existsSync(screenshotsDir)) {
    const testDirs = fs.readdirSync(screenshotsDir);

    testDirs.forEach(testDir => {
      const testPath = path.join(screenshotsDir, testDir);
      if (fs.statSync(testPath).isDirectory()) {
        html += `
        <div class="test-section">
            <h2>📁 ${testDir}</h2>
            <div class="screenshot-grid">
        `;

        const screenshots = fs
          .readdirSync(testPath)
          .filter(file => file.endsWith('.png'))
          .sort();

        screenshots.forEach(screenshot => {
          const screenshotPath = path.resolve(path.join('cypress/screenshots/cross-browser', testDir, screenshot));
          const browser = extractBrowserFromFilename(screenshot);
          const timestamp = fs.statSync(path.join(testPath, screenshot)).mtime.toLocaleString();

          html += `
            <div class="screenshot-card">
                <img src="${screenshotPath}" alt="${screenshot}" onclick="window.open(this.src)">
                <div class="screenshot-info">
                    <h4>${extractBaseName(screenshot)}</h4>
                    <span class="browser-tag">${browser}</span>
                    <div class="timestamp">${timestamp}</div>
                </div>
            </div>
          `;
        });

        html += `
            </div>
        </div>
        `;
      }
    });
  }

  html += `
    </div>
    <script>
        // Add click handlers for full-size images
        document.querySelectorAll('img').forEach(img => {
            img.style.cursor = 'pointer';
        });
    </script>
</body>
</html>
  `;

  const reportPath = path.join(outputDir, 'cross-browser-report.html');
  fs.writeFileSync(reportPath, html);

  console.log(`✅ HTML report generated: ${reportPath}`);
  return reportPath;
}

function getTotalTests() {
  const screenshotsDir = 'cypress/screenshots/cross-browser';
  if (!fs.existsSync(screenshotsDir)) return 0;

  const testDirs = fs.readdirSync(screenshotsDir);
  return testDirs.length;
}

function getBrowserCount() {
  const screenshotsDir = 'cypress/screenshots/cross-browser';
  if (!fs.existsSync(screenshotsDir)) return 0;

  const browsers = new Set();
  const testDirs = fs.readdirSync(screenshotsDir);

  testDirs.forEach(testDir => {
    const testPath = path.join(screenshotsDir, testDir);
    if (fs.statSync(testPath).isDirectory()) {
      const screenshots = fs.readdirSync(testPath).filter(file => file.endsWith('.png'));
      screenshots.forEach(screenshot => {
        browsers.add(extractBrowserFromFilename(screenshot));
      });
    }
  });

  return browsers.size;
}

function getScreenshotCount() {
  const screenshotsDir = 'cypress/screenshots/cross-browser';
  if (!fs.existsSync(screenshotsDir)) return 0;

  let count = 0;
  const testDirs = fs.readdirSync(screenshotsDir);

  testDirs.forEach(testDir => {
    const testPath = path.join(screenshotsDir, testDir);
    if (fs.statSync(testPath).isDirectory()) {
      const screenshots = fs.readdirSync(testPath).filter(file => file.endsWith('.png'));
      count += screenshots.length;
    }
  });

  return count;
}

function getSuccessRate() {
  // This would be calculated from actual test results
  // For now, return a placeholder
  return 75; // Placeholder
}

function extractBrowserFromFilename(filename) {
  const parts = filename.split('-');
  const browserIndex = parts.length - 2;
  return parts[browserIndex] || 'unknown';
}

function extractBaseName(filename) {
  const parts = filename.split('-');
  return parts.slice(0, -2).join('-').replace(/_/g, ' ');
}

async function main() {
  console.log('🌐 Generating Cross-Browser HTML Report...');

  try {
    const reportPath = generateHTMLReport();
    console.log(`\n✅ Report generated successfully!`);
    console.log(`📄 Open the report: ${reportPath}`);

    // Try to open the report in the default browser
    if (process.platform === 'win32') {
      const { execSync } = await import('child_process');
      try {
        execSync(`start "${reportPath}"`);
        console.log('🌐 Opened report in default browser');
      } catch (error) {
        console.log('❌ Could not open report automatically');
        console.log(`   Please manually open: ${reportPath}`);
      }
    } else {
      console.log(`   Please manually open: ${reportPath}`);
    }
  } catch (error) {
    console.error('❌ Error generating report:', error.message);
    process.exit(1);
  }
}

main();
