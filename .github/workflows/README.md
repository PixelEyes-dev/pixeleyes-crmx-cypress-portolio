# GitHub Actions Workflows

This repository demonstrates **enterprise-grade CI/CD automation** with **6 specialized workflows** that showcase comprehensive testing capabilities across multiple quality dimensions. Each workflow is designed for specific testing purposes with clear separation of concerns and professional artifact management.

## 🏗️ Workflow Architecture

### **1. 🧪 API Tests (`api-tests.yml`)**

**Purpose**: Comprehensive API testing with sequential CRUD operations and independent API validation  
**Environment**: Production CRMx.mx application  
**Triggers**:

- Changes to `cypress/e2e/api/**`
- Changes to `cypress/e2e/leads/**`
- Changes to `cypress.config.js`
- Manual dispatch

**Key Features**:

- **Sequential CRUD Execution**: Create → Read → Update → Delete operations
- **Independent API Tests**: Non-CRUD API operations run separately
- **Environment Validation**: Comprehensive secret validation with detailed error reporting
- **Professional Reporting**: Detailed PR comments with test statistics and failure analysis
- **Artifact Management**: Screenshots, videos, and JSON results with 7-day retention

**Test Coverage**:

- Authentication APIs with token management
- Lead management CRUD operations
- Database integration validation
- Error handling and response validation

### **2. 🧪 E2E Tests (`e2e-tests.yml`)**

**Purpose**: End-to-end testing against production environment with comprehensive user workflows  
**Environment**: Production CRMx.mx application (https://www.crmx.mx)  
**Triggers**:

- Changes to `cypress/e2e/**/*.cy.js` (excluding `.feature` files)
- Changes to `cypress/support/**/*.js`
- Changes to `cypress.config.js`

**Key Features**:

- **Production Testing**: Tests against live production application
- **Comprehensive Coverage**: 13+ test files covering all application modules
- **Database Integration**: Direct PostgreSQL/Supabase operations
- **Cypress Cloud Integration**: Professional test recording and analytics
- **Parallel Execution**: Optimized test execution with parallel containers

**Test Coverage**:

- User authentication and onboarding flows
- Lead, customer, sales, and task management
- Database connection testing
- Responsive design validation
- Sanity checks and critical user journeys

### **3. 🥒 Cucumber BDD Tests (`cucumber-tests.yml`)**

**Purpose**: Behavior-Driven Development testing using Cucumber and Gherkin syntax  
**Environment**: Production CRMx.mx application  
**Triggers**:

- Changes to `cypress/e2e/**/*.feature`
- Changes to `cypress/support/step_definitions/**/*.js`
- Changes to `cypress.config.js`
- Manual dispatch

**Key Features**:

- **BDD Implementation**: Gherkin syntax with step definitions
- **Business-readable Tests**: Stakeholder-friendly test scenarios
- **Feature Discovery**: Automatic feature file detection and reporting
- **Professional Reporting**: Dedicated Cucumber test results and analytics
- **Database Integration**: Full database operations for comprehensive validation

**Test Coverage**:

- Home page sanity checks
- Task management workflows
- User onboarding processes
- Business process validation

### **4. 🌐 Cross-Browser Tests (`cross-browser-tests.yml`)**

**Purpose**: Multi-browser compatibility testing with functional and visual regression validation  
**Environment**: Production CRMx.mx application  
**Browsers**: Chrome, Firefox, Edge  
**Triggers**:

- Pull requests to main/develop branches
- Push to main/develop branches

**Key Features**:

- **Matrix Strategy**: Parallel execution across multiple browsers
- **Dual Testing**: Functional tests + Visual regression tests
- **Browser-specific Artifacts**: Separate artifacts for each browser
- **Extended Retention**: 14-day artifact retention for cross-browser analysis
- **Professional Reporting**: Browser-specific PR comments with detailed results

**Test Coverage**:

- **Functional Tests**: Cross-browser lead management workflows
- **Visual Regression**: 12 critical UI states across browsers
- **Multilingual Support**: English/Spanish text validation
- **Responsive Design**: Cross-device compatibility

### **5. 🚀 K6 Performance Tests (`k6-performance-tests.yml`)**

**Purpose**: Professional load and stress testing with K6 performance validation  
**Environment**: Production CRMx.mx application  
**Triggers**:

- Changes to `performance-tests/k6/**`
- Changes to API-related source files
- Manual dispatch

**Key Features**:

- **K6 Integration**: Professional load testing with custom metrics
- **Performance Validation**: Automated threshold validation
- **Custom Reporting**: JSON output with validation scripts
- **Extended Retention**: 30-day performance data retention
- **PR Integration**: Performance metrics in pull request comments

**Test Coverage**:

- Authentication API performance
- Load testing with multiple users
- Response time analysis
- Error rate monitoring
- Custom performance metrics

### **6. 🔒 Security Tests (`security-tests.yml`)**

**Purpose**: Comprehensive security testing with vulnerability detection and code analysis  
**Environment**: Production CRMx.mx application  
**Triggers**:

- Pull requests to main/develop branches
- Push to main branch
- **Scheduled**: Nightly at 2 AM UTC

**Key Features**:

- **Comprehensive Security**: Authentication, authorization, and input validation
- **Real Vulnerability Detection**: Actual security issues identification
- **Code Analysis**: ESLint security rules and dependency auditing
- **Scheduled Testing**: Automated nightly security validation
- **Professional Reporting**: Detailed security test summaries

**Test Coverage**:

- Authentication bypass testing
- Input validation (XSS, SQL injection)
- Token security and expiration
- Authorization testing
- Dependency vulnerability scanning

## 🎯 Professional Workflow Benefits

### **✅ Enterprise-Grade Architecture**

- **Clear Separation of Concerns**: Each workflow handles specific testing types
- **Professional Artifact Management**: Screenshots, videos, reports with appropriate retention
- **Comprehensive Reporting**: Detailed PR comments with test statistics and failure analysis
- **Environment Validation**: Robust secret validation with detailed error reporting

### **✅ Advanced CI/CD Features**

- **Parallel Execution**: Matrix strategies for cross-browser and multi-environment testing
- **Cypress Cloud Integration**: Professional test recording and analytics
- **Automated Scheduling**: Nightly security testing for continuous validation
- **Manual Dispatch**: On-demand workflow execution for testing and debugging

### **✅ Production-Ready Implementation**

- **Real-world Testing**: Tests against live production application
- **Database Integration**: Direct PostgreSQL/Supabase operations
- **Professional Tools**: K6 performance testing, Cypress Cloud, ESLint security rules
- **Comprehensive Coverage**: All major testing paradigms and quality dimensions

## 📊 Workflow Trigger Matrix

| File Type                                  | API Tests | E2E Tests | Cucumber | Cross-Browser | K6 Performance | Security |
| ------------------------------------------ | --------- | --------- | -------- | ------------- | -------------- | -------- |
| `cypress/e2e/api/**/*.cy.js`               | ✅        | ❌        | ❌       | ❌            | ❌             | ❌       |
| `cypress/e2e/**/*.cy.js`                   | ❌        | ✅        | ❌       | ❌            | ❌             | ❌       |
| `cypress/e2e/**/*.feature`                 | ❌        | ❌        | ✅       | ❌            | ❌             | ❌       |
| `cypress/support/step_definitions/**/*.js` | ❌        | ❌        | ✅       | ❌            | ❌             | ❌       |
| `cypress/support/**/*.js`                  | ❌        | ✅        | ❌       | ❌            | ❌             | ❌       |
| `performance-tests/k6/**`                  | ❌        | ❌        | ❌       | ❌            | ✅             | ❌       |
| `cypress/e2e/security/**/*.cy.js`          | ❌        | ❌        | ❌       | ❌            | ❌             | ✅       |
| `cypress.config.js`                        | ✅        | ✅        | ✅       | ❌            | ❌             | ❌       |
| Pull Requests                              | ✅        | ✅        | ✅       | ✅            | ✅             | ✅       |
| Scheduled (Nightly)                        | ❌        | ❌        | ❌       | ❌            | ❌             | ✅       |

## 🏆 Portfolio Highlights

### **Professional QA Automation Expertise**

- **6 Specialized Workflows**: Comprehensive testing across all quality dimensions
- **Production Testing**: Real-world application testing with live systems
- **Enterprise Architecture**: Professional CI/CD implementation with proper separation of concerns
- **Advanced Features**: Cross-browser testing, performance validation, security scanning

### **Technical Implementation Excellence**

- **Matrix Strategies**: Parallel execution across browsers and environments
- **Professional Tools**: K6, Cypress Cloud, ESLint security rules
- **Comprehensive Reporting**: Detailed analytics and failure analysis
- **Automated Scheduling**: Continuous validation with nightly security testing

### **Real-world Application**

- **Live Production Testing**: Tests against actual CRMx.mx production application
- **Database Integration**: Direct PostgreSQL/Supabase operations
- **Security Validation**: Real vulnerability detection and comprehensive security testing
- **Performance Monitoring**: Professional load testing with custom metrics

## 🔧 Best Practices Demonstrated

1. **Workflow Separation**: Each workflow handles specific testing concerns
2. **Path Triggers**: Efficient triggering based on relevant file changes
3. **Professional Naming**: Clear, descriptive workflow and job names
4. **Comprehensive Error Handling**: `if: always()` for artifact uploads and reporting
5. **Detailed Reporting**: Professional PR comments with test statistics and failure analysis
6. **Environment Validation**: Robust secret validation with detailed error reporting
7. **Artifact Management**: Appropriate retention periods and organized artifact structure

## 🚀 Advanced Features

### **Professional Artifact Management**

- **Screenshots**: Automatic capture on test failures with descriptive naming
- **Videos**: Complete test execution recordings with compression
- **Reports**: JSON results, HTML reports, and performance analytics
- **Retention Policies**: 7-30 day retention based on artifact type and importance

### **Comprehensive Reporting**

- **PR Comments**: Detailed test results with statistics and failure analysis
- **Cypress Cloud**: Professional test recording and analytics
- **Performance Metrics**: K6 performance data with threshold validation
- **Security Summaries**: Comprehensive security test results and vulnerability reports

### **Environment Management**

- **Secret Validation**: Comprehensive environment variable validation
- **Production Safety**: Proper test credentials and environment configuration
- **Database Integration**: Direct database operations with SSL support
- **Multi-environment**: Support for different testing environments

This workflow architecture demonstrates **senior-level QA automation expertise** with enterprise-grade CI/CD implementation, comprehensive testing coverage, and professional best practices for modern software development.
