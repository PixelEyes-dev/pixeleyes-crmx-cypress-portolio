const fs = require('fs');

/**
 * Validates k6 performance test results from JSON stream format
 * Usage: node validate-k6-results-simple.cjs <results-file>
 */

function validateK6Results(resultsFile) {
  if (!fs.existsSync(resultsFile)) {
    console.error(`❌ Results file not found: ${resultsFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resultsFile, 'utf8');
  const lines = content.trim().split('\n');

  console.log('🔍 Validating k6 performance test results...');
  console.log(`📊 Total data points: ${lines.length}`);

  // Parse the JSON stream and extract metrics
  const metrics = {
    http_reqs: { count: 0, failed: 0 },
    http_req_duration: { values: [] },
    checks: { passed: 0, failed: 0 },
    auth_errors: 0,
  };

  let testDuration = 0;
  let maxVUs = 0;

  lines.forEach(line => {
    try {
      const data = JSON.parse(line);

      if (data.type === 'Point') {
        const metric = data.metric;
        const value = data.data.value;
        const tags = data.data.tags || {};

        switch (metric) {
          case 'http_reqs':
            metrics.http_reqs.count++;
            if (tags.status && tags.status >= 400) {
              metrics.http_reqs.failed++;
            }
            break;

          case 'http_req_duration':
            metrics.http_req_duration.values.push(value);
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
            maxVUs = Math.max(maxVUs, value);
            break;

          case 'test_duration':
            testDuration = Math.max(testDuration, value);
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
  const errorRate = totalRequests > 0 ? failedRequests / totalRequests : 0;

  const durations = metrics.http_req_duration.values;
  const avgResponseTime = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
  const sortedDurations = durations.sort((a, b) => a - b);
  const p95Index = Math.ceil(sortedDurations.length * 0.95) - 1;
  const p95ResponseTime = sortedDurations[p95Index] || 0;

  const authErrorRate = totalRequests > 0 ? metrics.auth_errors / totalRequests : 0;

  console.log(`⏱️  Test Duration: ${(testDuration / 1000).toFixed(2)}s`);
  console.log(`👥 Max Virtual Users: ${maxVUs}`);
  console.log(`📊 Total Requests: ${totalRequests}`);
  console.log(`❌ Failed Requests: ${failedRequests}`);
  console.log(`📈 Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`📈 95th Percentile: ${p95ResponseTime.toFixed(2)}ms`);
  console.log(`❌ HTTP Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  console.log(`🔐 Auth Error Rate: ${(authErrorRate * 100).toFixed(2)}%`);
  console.log(`✅ Checks Passed: ${metrics.checks.passed}`);
  console.log(`❌ Checks Failed: ${metrics.checks.failed}`);

  // Define performance thresholds - Production test thresholds
  const thresholds = {
    avgResponseTime: 1000, // 1 second average
    p95ResponseTime: 2000, // 2 seconds 95th percentile
    errorRate: 0.01, // 1% error rate (production quality)
    authErrorRate: 0.01, // 1% auth error rate (production quality)
  };

  let passed = true;
  const failures = [];

  // Check thresholds
  if (avgResponseTime > thresholds.avgResponseTime) {
    failures.push(`Average response time ${avgResponseTime.toFixed(2)}ms exceeds threshold ${thresholds.avgResponseTime}ms`);
    passed = false;
  }

  if (p95ResponseTime > thresholds.p95ResponseTime) {
    failures.push(`95th percentile response time ${p95ResponseTime.toFixed(2)}ms exceeds threshold ${thresholds.p95ResponseTime}ms`);
    passed = false;
  }

  if (errorRate > thresholds.errorRate) {
    failures.push(`HTTP error rate ${(errorRate * 100).toFixed(2)}% exceeds threshold ${thresholds.errorRate * 100}%`);
    passed = false;
  }

  if (authErrorRate > thresholds.authErrorRate) {
    failures.push(`Auth error rate ${(authErrorRate * 100).toFixed(2)}% exceeds threshold ${thresholds.authErrorRate * 100}%`);
    passed = false;
  }

  // Final result
  if (!passed) {
    console.error('\n❌ Performance tests FAILED:');
    failures.forEach(failure => console.error(`  - ${failure}`));
    console.error('\n💡 Consider:');
    console.error('  - Checking server resources');
    console.error('  - Reviewing database query performance');
    console.error('  - Optimizing API endpoints');
    console.error('  - Verifying test user credentials exist in database');
    process.exit(1);
  } else {
    console.log('\n✅ Performance tests PASSED!');
    console.log('🎉 All thresholds met successfully');
  }
}

// Main execution
const resultsFile = process.argv[2];
if (!resultsFile) {
  console.error('Usage: node validate-k6-results-simple.cjs <results-file>');
  console.error('Example: node validate-k6-results-simple.cjs auth-results.json');
  process.exit(1);
}

validateK6Results(resultsFile);
