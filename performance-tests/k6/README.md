# k6 Performance Testing

This directory contains k6 performance tests for the multitenant CRM application.

## Setup

1. Install k6:

   ```bash
   # Windows (using Chocolatey)
   choco install k6

   # macOS (using Homebrew)
   brew install k6

   # Linux
   sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   sudo apt-get update
   sudo apt-get install k6
   ```

2. Verify installation:
   ```bash
   k6 version
   ```

## Environment Variables

**Required Environment Variables:**

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `CYPRESS_USER_EMAIL` - First test user email
- `CYPRESS_USER_PASSWORD` - First test user password
- `CYPRESS_USER2_EMAIL` - Second test user email
- `CYPRESS_USER2_PASSWORD` - Second test user password
- `CYPRESS_USER3_EMAIL` - Third test user email
- `CYPRESS_USER3_PASSWORD` - Third test user password

### GitHub Secrets

For GitHub Actions, add these secrets in your repository settings:

- `CYPRESS_USER_EMAIL`
- `CYPRESS_USER_PASSWORD`
- `CYPRESS_USER2_EMAIL`
- `CYPRESS_USER2_PASSWORD`
- `CYPRESS_USER3_EMAIL`
- `CYPRESS_USER3_PASSWORD`

## Running Tests

### Production-Ready Test (Recommended)

```bash
# Run production test with 2 users (0% error threshold)
npm run k6:auth:full
```

### Stress Test

```bash
# Run stress test with 1-3 users (15% error threshold)
npm run k6:stress:full
```

### Manual Testing

```bash
# Run single test
k6 run auth-load-test.js

# Run with custom options
k6 run --vus 10 --duration 30s auth-load-test.js

# Run with output
k6 run --out json=results.json auth-load-test.js
```

## Test Structure

- `auth-load-test.js` - **Production-ready authentication performance testing** (2 users, 0% error threshold)
- `auth-stress-test.js` - Stress test version (1-3 users, 15% error threshold)
- `scripts/` - Validation and utility scripts
  - `validate-k6-results-simple.cjs` - Results validation
  - `generate-k6-visual-report.cjs` - HTML report generation

## Test Results

The production test targets:

- **2 concurrent users** (realistic production load)
- **0% error rate** (production quality)
- **<2s response time** (95th percentile)
- **1-minute sustained load** (realistic usage pattern)

## Performance Thresholds

Current thresholds are set to:

- **Average Response Time**: < 1000ms
- **95th Percentile Response Time**: < 2000ms
- **Error Rate**: < 1%
- **Authentication Error Rate**: < 1%

These can be adjusted in the validation script based on your requirements.

## CI/CD Integration $

Tests are integrated into GitHub Actions workflow:

- Automatic execution on push/PR
- Environment variables from GitHub Secrets
- Artifact upload of performance reports
- Pass/fail validation based on thresholds
