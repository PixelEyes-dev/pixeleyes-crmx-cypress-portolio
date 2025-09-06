import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const authErrorRate = new Rate('auth_errors');

// Test configuration - Stress test (1 to 3 users)
export let options = {
  stages: [
    { duration: '30s', target: 1 }, // Start with 1 user
    { duration: '30s', target: 2 }, // Ramp to 2 users
    { duration: '30s', target: 3 }, // Ramp to 3 users
    { duration: '30s', target: 3 }, // Stay at 3 users
    { duration: '30s', target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.15'], // <15% error rate (allowing for rate limiting)
    auth_errors: ['rate<0.15'], // <15% auth error rate (allowing for rate limiting)
  },
};

// Environment variables - All values must be provided via environment
const SUPABASE_URL = __ENV.SUPABASE_URL;
const SUPABASE_ANON_KEY = __ENV.SUPABASE_ANON_KEY;

// Validate required environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY must be set');
}

// Test data - using environment variables for user credentials
const testUsers = [
  { email: __ENV.CYPRESS_USER_EMAIL, password: __ENV.CYPRESS_USER_PASSWORD },
  { email: __ENV.CYPRESS_USER2_EMAIL, password: __ENV.CYPRESS_USER2_PASSWORD },
  { email: __ENV.CYPRESS_USER3_EMAIL, password: __ENV.CYPRESS_USER3_PASSWORD },
];

// Validate that all user credentials are provided
const missingCredentials = testUsers.filter(user => !user.email || !user.password);
if (missingCredentials.length > 0) {
  throw new Error(`Missing user credentials: ${missingCredentials.length} users missing email/password`);
}

export default function () {
  // Select a random test user
  const user = testUsers[Math.floor(Math.random() * testUsers.length)];

  // Test Supabase authentication
  const authPayload = JSON.stringify({
    email: user.email,
    password: user.password,
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
  };

  // Make authentication request
  const authResponse = http.post(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, authPayload, { headers: authHeaders });

  // Check authentication response
  const authSuccess = check(authResponse, {
    'auth status is 200': r => r.status === 200,
    'auth response time < 2s': r => r.timings.duration < 2000,
    'auth response has access_token': r => {
      try {
        const body = JSON.parse(r.body);
        return body.access_token !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  // Track auth errors
  authErrorRate.add(!authSuccess);

  // If authentication successful, test a simple API call
  if (authSuccess && authResponse.status === 200) {
    try {
      const authBody = JSON.parse(authResponse.body);
      const accessToken = authBody.access_token;

      // Test a simple API call with the token
      const apiHeaders = {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY,
      };

      const apiResponse = http.get(`${SUPABASE_URL}/rest/v1/leads?select=count`, { headers: apiHeaders });

      check(apiResponse, {
        'API call status is 200': r => r.status === 200,
        'API call response time < 1s': r => r.timings.duration < 1000,
      });
    } catch (e) {
      console.error('Error parsing auth response:', e);
    }
  }

  // Wait between requests - more realistic user behavior
  sleep(2);
}

export function handleSummary(data) {
  return {
    'auth-stress-test-summary.json': JSON.stringify(data, null, 2),
  };
}
