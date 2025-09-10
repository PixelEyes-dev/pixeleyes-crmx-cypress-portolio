// Security Test Configuration
// This file contains security-specific test configurations and utilities

const securityConfig = {
  // Test timeouts for security tests (longer than regular tests)
  timeouts: {
    defaultCommandTimeout: 15000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    pageLoadTimeout: 30000,
  },

  // Security test data
  testData: {
    // XSS payloads for testing
    xssPayloads: [
      '<script>alert("XSS")</script>',
      '<img src="x" onerror="alert(\'XSS\')">',
      'javascript:alert("XSS")',
      '<svg onload="alert(\'XSS\')">',
      '<iframe src="javascript:alert(\'XSS\')"></iframe>',
    ],

    // SQL injection payloads
    sqlInjectionPayloads: ["'; DROP TABLE users; --", "' OR '1'='1", "' UNION SELECT * FROM users --", "'; INSERT INTO users VALUES ('hacker', 'hacker@evil.com'); --"],

    // Weak passwords for testing
    weakPasswords: ['password', '123456', 'admin', 'root', 'qwerty', 'letmein', 'welcome', 'monkey'],

    // Invalid tokens for testing
    invalidTokens: ['invalid.token.here', 'Bearer invalid', 'not-a-jwt-token', '', null],
  },

  // Security test utilities
  utilities: {
    // Create expired token for testing
    createExpiredToken: originalToken => {
      try {
        const parts = originalToken.split('.');
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));

        // Set expiration to past time (1 hour ago)
        payload.exp = Math.floor(Date.now() / 1000) - 3600;

        // Re-encode the token
        const newHeader = btoa(JSON.stringify(header));
        const newPayload = btoa(JSON.stringify(payload));

        return `${newHeader}.${newPayload}.${parts[2]}`;
      } catch (error) {
        console.warn('Error creating expired token:', error.message);
        return 'invalid.expired.token';
      }
    },

    // Create token with invalid signature
    createTokenWithInvalidSignature: originalToken => {
      try {
        const parts = originalToken.split('.');
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));

        const newHeader = btoa(JSON.stringify(header));
        const newPayload = btoa(JSON.stringify(payload));
        const invalidSignature = 'invalid-signature-here';

        return `${newHeader}.${newPayload}.${invalidSignature}`;
      } catch (error) {
        console.warn('Error creating invalid signature token:', error.message);
        return 'invalid.signature.token';
      }
    },

    // Generate random test data
    generateRandomData: type => {
      const randomId = Math.random().toString(36).substring(7);
      switch (type) {
        case 'email':
          return `test-${randomId}@example.com`;
        case 'name':
          return `Test User ${randomId}`;
        case 'uuid':
          return `00000000-0000-0000-0000-${randomId.padEnd(12, '0')}`;
        default:
          return `test-${randomId}`;
      }
    },
  },

  // Security test assertions
  assertions: {
    // Check if response indicates security issue
    isSecurityIssue: response => {
      return response.status === 200 && response.body && response.body.length > 0;
    },

    // Check if response is properly secured
    isProperlySecured: response => {
      return response.status === 401 || response.status === 403 || (response.status === 200 && Array.isArray(response.body) && response.body.length === 0);
    },
  },
};

module.exports = securityConfig;
