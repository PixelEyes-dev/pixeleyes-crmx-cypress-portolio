const fs = require('fs');
const path = require('path');

/**
 * Validates k6 performance test results
 * Usage: node validate-k6-results.js <results-file>
 */

function validateK6Results(resultsFile) {
  if (!fs.existsSync(resultsFile)) {
    console.error(`❌ Results file not found: ${resultsFile}`);
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));

  console.log('🔍 Validating k6 performance test results...');
  console.log(`📊 Test: ${results.root_group.name || 'Performance Test'}`);
  console.log(`⏱️  Duration: ${results.metrics.test_duration?.values?.avg || 'N/A'}ms`);
  console.log(`👥 Virtual Users: ${results.metrics.vus?.values?.max || 'N/A'}`);

  // Define performance thresholds
  const thresholds = {
    avgResponseTime: 1000, // 1 second average
    p95ResponseTime: 2000, // 2 seconds 95th percentile
    errorRate: 0.01, // 1% error rate
    authErrorRate: 0.01, // 1% auth error rate
  };

  let passed = true;
  const failures = [];

  // Check HTTP response times
  const httpMetrics = results.metrics.http_req_duration;
  if (httpMetrics) {
    const avgResponseTime = httpMetrics.values.avg;
    const p95ResponseTime = httpMetrics.values['p(95)'];

    if (avgResponseTime > thresholds.avgResponseTime) {
      failures.push(`Average response time ${avgResponseTime.toFixed(2)}ms exceeds threshold ${thresholds.avgResponseTime}ms`);
      passed = false;
    }

    if (p95ResponseTime > thresholds.p95ResponseTime) {
      failures.push(`95th percentile response time ${p95ResponseTime.toFixed(2)}ms exceeds threshold ${thresholds.p95ResponseTime}ms`);
      passed = false;
    }

    console.log(`📈 Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`📈 95th Percentile: ${p95ResponseTime.toFixed(2)}ms`);
  }

  // Check error rates
  const errorMetrics = results.metrics.http_req_failed;
  if (errorMetrics) {
    const errorRate = errorMetrics.values.rate;
    if (errorRate > thresholds.errorRate) {
      failures.push(`HTTP error rate ${(errorRate * 100).toFixed(2)}% exceeds threshold ${thresholds.errorRate * 100}%`);
      passed = false;
    }
    console.log(`❌ HTTP Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  }

  // Check auth error rate
  const authErrorMetrics = results.metrics.auth_errors;
  if (authErrorMetrics) {
    const authErrorRate = authErrorMetrics.values.rate;
    if (authErrorRate > thresholds.authErrorRate) {
      failures.push(`Auth error rate ${(authErrorRate * 100).toFixed(2)}% exceeds threshold ${thresholds.authErrorRate * 100}%`);
      passed = false;
    }
    console.log(`🔐 Auth Error Rate: ${(authErrorRate * 100).toFixed(2)}%`);
  }

  // Check request count
  const requestCount = results.metrics.http_reqs?.values?.count || 0;
  console.log(`📊 Total Requests: ${requestCount}`);

  // Final result
  if (!passed) {
    console.error('\n❌ Performance tests FAILED:');
    failures.forEach(failure => console.error(`  - ${failure}`));
    console.error('\n💡 Consider:');
    console.error('  - Checking server resources');
    console.error('  - Reviewing database query performance');
    console.error('  - Optimizing API endpoints');
    process.exit(1);
  } else {
    console.log('\n✅ Performance tests PASSED!');
    console.log('🎉 All thresholds met successfully');
  }
}

// Main execution
const resultsFile = process.argv[2];
if (!resultsFile) {
  console.error('Usage: node validate-k6-results.js <results-file>');
  console.error('Example: node validate-k6-results.js auth-load-test-summary.json');
  process.exit(1);
}

validateK6Results(resultsFile);
