const fs = require('fs');
const path = require('path');

/**
 * Generates an HTML visual report from k6 performance test results
 * Usage: node generate-k6-visual-report.cjs <results-file>
 */

function generateVisualReport(resultsFile) {
  if (!fs.existsSync(resultsFile)) {
    console.error(`❌ Results file not found: ${resultsFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resultsFile, 'utf8');
  const lines = content.trim().split('\n');

  console.log('📊 Generating visual report from k6 results...');
  console.log(`📈 Processing ${lines.length} data points...`);

  // Parse the JSON stream and extract metrics
  const metrics = {
    http_reqs: { count: 0, failed: 0, success: 0 },
    http_req_duration: { values: [], timestamps: [] },
    checks: { passed: 0, failed: 0 },
    auth_errors: 0,
    vus: { values: [], timestamps: [] },
  };

  let testStartTime = null;
  let testEndTime = null;

  lines.forEach(line => {
    try {
      const data = JSON.parse(line);

      if (data.type === 'Point') {
        const metric = data.metric;
        const value = data.data.value;
        const timestamp = new Date(data.data.time).getTime();
        const tags = data.data.tags || {};

        if (!testStartTime) testStartTime = timestamp;
        testEndTime = timestamp;

        switch (metric) {
          case 'http_reqs':
            metrics.http_reqs.count++;
            if (tags.status && tags.status >= 400) {
              metrics.http_reqs.failed++;
            } else {
              metrics.http_reqs.success++;
            }
            break;

          case 'http_req_duration':
            metrics.http_req_duration.values.push(value);
            metrics.http_req_duration.timestamps.push(timestamp);
            break;

          case 'checks':
            if (value === 1) {
              metrics.checks.passed++;
            } else {
              metrics.checks.failed++;
            }
            break;

          case 'auth_errors':
            metrics.auth_errors += value;
            break;

          case 'vus':
            metrics.vus.values.push(value);
            metrics.vus.timestamps.push(timestamp);
            break;
        }
      }
    } catch (e) {
      // Skip invalid JSON lines
    }
  });

  // Calculate statistics
  const totalRequests = metrics.http_reqs.count;
  const failedRequests = metrics.http_reqs.failed;
  const successRequests = metrics.http_reqs.success;
  const errorRate = totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;

  const durations = metrics.http_req_duration.values;
  const avgResponseTime = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
  const sortedDurations = durations.sort((a, b) => a - b);
  const p95Index = Math.ceil(sortedDurations.length * 0.95) - 1;
  const p95ResponseTime = sortedDurations[p95Index] || 0;
  const minResponseTime = Math.min(...durations);
  const maxResponseTime = Math.max(...durations);

  const authErrorRate = totalRequests > 0 ? (metrics.auth_errors / totalRequests) * 100 : 0;
  const testDuration = testEndTime - testStartTime;

  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>k6 Performance Test Report</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
        }
        .header p {
            color: #7f8c8d;
            margin: 10px 0 0 0;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .stat-card.success {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        }
        .stat-card.warning {
            background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
        }
        .stat-card.error {
            background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
        }
        .stat-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .stat-card .value {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .chart-container {
            margin: 30px 0;
            padding: 20px;
            background: #fafafa;
            border-radius: 10px;
        }
        .chart-container h3 {
            margin-top: 0;
            color: #2c3e50;
        }
        .thresholds {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
        }
        .thresholds h3 {
            margin-top: 0;
            color: #2e7d32;
        }
        .threshold-item {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 10px;
            background: white;
            border-radius: 5px;
        }
        .threshold-item.passed {
            border-left: 4px solid #4CAF50;
        }
        .threshold-item.failed {
            border-left: 4px solid #f44336;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 k6 Performance Test Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card success">
                <h3>Total Requests</h3>
                <p class="value">${totalRequests.toLocaleString()}</p>
            </div>
            <div class="stat-card ${errorRate < 5 ? 'success' : errorRate < 20 ? 'warning' : 'error'}">
                <h3>Error Rate</h3>
                <p class="value">${errorRate.toFixed(2)}%</p>
            </div>
            <div class="stat-card ${avgResponseTime < 1000 ? 'success' : avgResponseTime < 2000 ? 'warning' : 'error'}">
                <h3>Avg Response Time</h3>
                <p class="value">${avgResponseTime.toFixed(0)}ms</p>
            </div>
            <div class="stat-card ${p95ResponseTime < 2000 ? 'success' : p95ResponseTime < 5000 ? 'warning' : 'error'}">
                <h3>95th Percentile</h3>
                <p class="value">${p95ResponseTime.toFixed(0)}ms</p>
            </div>
            <div class="stat-card">
                <h3>Test Duration</h3>
                <p class="value">${(testDuration / 1000).toFixed(0)}s</p>
            </div>
            <div class="stat-card">
                <h3>Max VUs</h3>
                <p class="value">${Math.max(...metrics.vus.values)}</p>
            </div>
        </div>

        <div class="chart-container">
            <h3>📈 Response Time Over Time</h3>
            <canvas id="responseTimeChart" width="400" height="200"></canvas>
        </div>

        <div class="chart-container">
            <h3>👥 Virtual Users Over Time</h3>
            <canvas id="vusChart" width="400" height="200"></canvas>
        </div>

        <div class="chart-container">
            <h3>📊 Request Success/Failure Distribution</h3>
            <canvas id="successChart" width="400" height="200"></canvas>
        </div>

        <div class="thresholds">
            <h3>🎯 Performance Thresholds</h3>
            <div class="threshold-item ${avgResponseTime < 1000 ? 'passed' : 'failed'}">
                <span>Average Response Time</span>
                <span>${avgResponseTime.toFixed(2)}ms / 1000ms</span>
            </div>
            <div class="threshold-item ${p95ResponseTime < 2000 ? 'passed' : 'failed'}">
                <span>95th Percentile Response Time</span>
                <span>${p95ResponseTime.toFixed(2)}ms / 2000ms</span>
            </div>
            <div class="threshold-item ${errorRate < 1 ? 'passed' : 'failed'}">
                <span>Error Rate</span>
                <span>${errorRate.toFixed(2)}% / 1%</span>
            </div>
            <div class="threshold-item ${authErrorRate < 1 ? 'passed' : 'failed'}">
                <span>Auth Error Rate</span>
                <span>${authErrorRate.toFixed(2)}% / 1%</span>
            </div>
        </div>
    </div>

    <script>
        // Response Time Chart
        const responseTimeCtx = document.getElementById('responseTimeChart').getContext('2d');
        new Chart(responseTimeCtx, {
            type: 'line',
            data: {
                labels: ${JSON.stringify(metrics.http_req_duration.timestamps.map(t => new Date(t).toLocaleTimeString()))},
                datasets: [{
                    label: 'Response Time (ms)',
                    data: ${JSON.stringify(metrics.http_req_duration.values)},
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Response Time (ms)'
                        }
                    }
                }
            }
        });

        // VUs Chart
        const vusCtx = document.getElementById('vusChart').getContext('2d');
        new Chart(vusCtx, {
            type: 'line',
            data: {
                labels: ${JSON.stringify(metrics.vus.timestamps.map(t => new Date(t).toLocaleTimeString()))},
                datasets: [{
                    label: 'Virtual Users',
                    data: ${JSON.stringify(metrics.vus.values)},
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Virtual Users'
                        }
                    }
                }
            }
        });

        // Success/Failure Chart
        const successCtx = document.getElementById('successChart').getContext('2d');
        new Chart(successCtx, {
            type: 'doughnut',
            data: {
                labels: ['Successful', 'Failed'],
                datasets: [{
                    data: [${successRequests}, ${failedRequests}],
                    backgroundColor: ['#4CAF50', '#f44336']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    </script>
</body>
</html>`;

  // Write HTML report
  const reportPath = path.join(path.dirname(resultsFile), 'k6-performance-report.html');
  fs.writeFileSync(reportPath, htmlReport);

  console.log(`✅ Visual report generated: ${reportPath}`);
  console.log(`📊 Summary:`);
  console.log(`   - Total Requests: ${totalRequests}`);
  console.log(`   - Error Rate: ${errorRate.toFixed(2)}%`);
  console.log(`   - Avg Response Time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`   - 95th Percentile: ${p95ResponseTime.toFixed(2)}ms`);
  console.log(`   - Test Duration: ${(testDuration / 1000).toFixed(2)}s`);

  return reportPath;
}

// Main execution
const resultsFile = process.argv[2];
if (!resultsFile) {
  console.error('Usage: node generate-k6-visual-report.cjs <results-file>');
  console.error('Example: node generate-k6-visual-report.cjs auth-results.json');
  process.exit(1);
}

generateVisualReport(resultsFile);
