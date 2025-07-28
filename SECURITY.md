# Security Guidelines for CRMx Cypress Test Suite

## 🔒 Security Overview

This repository contains automated test scripts for a CRM application. While the tests themselves are safe to run, proper configuration is essential to prevent security risks.

## ⚠️ Critical Security Requirements

### 1. Environment Configuration

- **NEVER** use production credentials in this test suite
- **ALWAYS** configure tests to run against test/staging environments
- **USE** dedicated test user accounts only

### 2. Database Access

- Tests include database cleanup operations
- **ENSURE** database credentials point to test database only
- **VERIFY** test database is isolated from production data

### 3. Environment Variables

Required environment variables (see `env.example`):

```
CYPRESS_BASE_URL=https://your-test-environment.com
CYPRESS_USER_EMAIL=test@example.com
CYPRESS_USER_PASSWORD=test_password_only
SUPABASE_DB_HOST=your-test-db-host
SUPABASE_DB_PASSWORD=test_db_password_only
```

## 🛡️ Security Best Practices

### Before Running Tests

1. Copy `env.example` to `.env`
2. Configure with test environment values only
3. Verify no production URLs or credentials are used
4. Ensure test database is properly isolated

### During Development

1. Use test data generators for realistic but fake data
2. Implement proper test data cleanup
3. Avoid hardcoding any sensitive information
4. Use environment variables for all configuration

### Repository Management

1. `.env` files are gitignored (never commit real credentials)
2. `env.example` shows required variables without real values
3. All sensitive data is externalized to environment variables

## 🚨 Security Risks Addressed

- ✅ No hardcoded credentials in source code
- ✅ Environment variables for all sensitive data
- ✅ Test environment configuration
- ✅ Database connection validation
- ✅ Proper .gitignore configuration

## 📞 Security Contact

If you discover any security vulnerabilities in this test suite, please:

1. Do not create public issues
2. Contact the repository maintainer privately
3. Provide detailed information about the vulnerability

## 🔍 Security Checklist

Before making this repository public:

- [ ] All hardcoded credentials removed
- [ ] Environment variables properly configured
- [ ] Test environment URLs only
- [ ] Database credentials point to test DB
- [ ] No production data access
- [ ] Security documentation updated
- [ ] README includes security warnings
