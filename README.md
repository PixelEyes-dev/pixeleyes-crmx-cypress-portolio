# CRMx Cypress QA Automation Portfolio

A **production-ready, enterprise-grade QA automation portfolio** showcasing comprehensive testing capabilities for the CRMx.mx CRM application. This portfolio demonstrates **senior-level QA automation expertise** with real-world application testing and professional framework implementation.

## 🎯 Portfolio Overview

This portfolio showcases expertise in building enterprise-grade test automation solutions that can identify real issues and provide valuable quality assurance for production applications. It demonstrates comprehensive coverage of modern testing practices across multiple dimensions of quality assurance.

## 🚀 Comprehensive Testing Capabilities

### **Core Testing Types**

- **End-to-End Testing**: Complete user workflows with database integration and cleanup
- **API Testing**: Full CRUD operations with authentication and response validation
- **Cross-Browser Testing**: Multi-browser compatibility with platform-aware execution
- **BDD Testing**: Behavior-driven development with Cucumber and Gherkin syntax
- **Visual Regression Testing**: UI consistency validation across browsers and viewports
- **Performance Testing**: K6 load and stress testing with custom metrics
- **Security Testing**: Real vulnerability detection and comprehensive security validation

### **Advanced Features**

- **Database Integration**: Direct PostgreSQL/Supabase operations for data validation
- **CSV Data Integration**: Structured test data from CSV files
- **Dynamic Data Generation**: Random test data for realistic testing scenarios
- **Comprehensive Cleanup**: Automated data removal from Frontend and Backend
- **Table Iteration**: Advanced techniques for dynamic data location and manipulation
- **Multilingual Support**: English/Spanish text validation across browsers
- **CI/CD GitHub Actions Integration**: Complete automated testing pipeline with artifact management

## 🎯 Professional QA Services Demonstrated

This portfolio showcases expertise in:

### **Test Automation Strategy**

- **Complete Test Automation Framework**: Design and implementation of enterprise-grade testing solutions
- **Quality Assurance**: Comprehensive testing across all quality dimensions (functionality, security, performance, usability, reliability, maintainability)
- **Framework Development**: Custom testing frameworks and utilities for specific business needs

### **Specialized Testing Services**

- **Security Testing**: Real vulnerability detection and comprehensive security validation
- **Performance Testing**: Load and stress testing with professional tools (K6)
- **Cross-browser Testing**: Multi-browser compatibility validation across platforms
- **API Testing**: Complete API validation and integration testing
- **Visual Regression Testing**: UI consistency validation across browsers and devices

### **Technical Implementation**

- **CI/CD Integration**: Automated testing pipeline implementation
- **Database Integration**: Direct database operations for comprehensive data validation
- **Advanced Data Management**: CSV integration, dynamic data generation, and comprehensive cleanup
- **Professional Reporting**: Comprehensive test reporting and analytics
- **Production Testing**: Real-world application testing with live systems

### **Enterprise Capabilities**

- **Production-Ready Solutions**: Tests against live production applications
- **Real Vulnerability Detection**: Security tests that identify actual security issues
- **Cross-platform Support**: Works across different operating systems and browsers
- **Maintainable Architecture**: Clean code structure with reusable components
- **Complete Documentation**: Comprehensive documentation and security guidelines

## 📊 Portfolio Statistics

- **50+ Test Files**: Comprehensive test coverage across all application modules
- **7 Testing Paradigms**: E2E, API, BDD, Visual Regression, Performance, Security, Cross-browser
- **10+ Page Objects**: Complete Page Object Model implementation
- **20+ Custom Commands**: Reusable test utilities and helpers
- **Multiple Data Sources**: Environment variables, fixtures, CSV files, random generators
- **Professional Reporting**: Mochawesome reports with comprehensive analytics
- **Real-world Application**: Testing against live CRMx.mx production application

## 🏆 Technical Highlights

- **Production Testing**: Tests actual production application with real security testing
- **Comprehensive Coverage**: All major testing types and quality dimensions covered
- **Enterprise-Grade**: Professional framework with proper architecture and documentation
- **Real Vulnerability Detection**: Security tests that identify actual security issues
- **Cross-platform Support**: Works across different operating systems and browsers
- **Maintainable Code**: Clean architecture with reusable components
- **Complete Documentation**: Comprehensive README and security guidelines
- **CI/CD Ready**: Full GitHub Actions integration with artifact management
- **Advanced Data Handling**: CSV integration, dynamic data generation, and comprehensive cleanup
- **Professional Reporting**: Mochawesome reports with comprehensive analytics

## 🔒 Security Notice

⚠️ **IMPORTANT**: This repository contains test automation code for a CRM application. Before running these tests:

1. **Use Test Environment**: Configure tests to run against a test/staging environment, not production
2. **Test Credentials Only**: Use dedicated test user accounts, never production credentials
3. **Environment Variables**: Copy `env.example` to `.env` and configure with your test environment values
4. **Database Access**: Ensure database credentials are for a test database only

## 📁 Enterprise-Grade Project Structure

```
cypress/
├── e2e/                           # Comprehensive test suites
│   ├── api/                       # API testing
│   │   ├── auth/                  # Authentication API tests
│   │   └── leads/                 # Lead management API tests
│   ├── authentication/            # Login/logout functionality
│   ├── crossBrowser/              # Cross-browser compatibility tests
│   ├── customers/                 # Customer management tests
│   ├── leads/                     # Lead management tests
│   ├── sales/                     # Sales process tests
│   ├── tasks/                     # Task management tests
│   ├── security/                  # Security testing suite
│   ├── visual-regression/         # UI consistency tests
│   └── sanity/                    # Sanity check tests
├── support/                       # Professional framework components
│   ├── pageObjects/               # Page Object Model implementation
│   │   ├── LoginPage.js           # Authentication page objects
│   │   ├── LeadsPage.js           # Lead management page objects
│   │   ├── DashboardPage.js       # Dashboard page objects
│   │   └── [8 more page objects]  # Complete POM coverage
│   ├── commands.js                # Custom Cypress commands
│   ├── dbUtils.js                 # Database integration utilities
│   ├── crossBrowserUtils.js       # Cross-browser testing utilities
│   ├── visualRegressionUtils.js  # Visual testing utilities
│   ├── security-config.js         # Security testing configuration
│   └── step_definitions/          # BDD step definitions
├── fixtures/                      # Test data management
│   ├── leadData.csv               # CSV test data
│   ├── leadData.json              # JSON test data
│   └── crudTestData.json          # CRUD operation test data
└── reports/                       # Professional reporting
    └── html/                      # Mochawesome HTML reports

performance-tests/
└── k6/                           # Performance testing suite
    ├── auth-load-test.js         # Production load testing
    ├── auth-stress-test.js       # Stress testing scenarios
    └── scripts/                   # K6 reporting scripts

scripts/                          # Automation utilities
├── runCrossBrowserTests.js       # Cross-browser test runner
├── compareVisualRegression.js    # Visual regression comparison
├── generateHTMLReport.js         # Report generation
└── [6 more automation scripts]   # Complete automation toolkit
```

## 🧪 Comprehensive Test Coverage

### **End-to-End Testing (50+ Test Files)**

- **Authentication Module**: Login/logout, user registration, password validation
- **Dashboard Module**: Statistics display, navigation, responsive design
- **Lead Management**: Complete CRUD operations, conversion to customers, status management
- **Customer Management**: Full customer lifecycle, profile management, search functionality
- **Sales Management**: Deal creation, invoice management, payment tracking
- **Task Management**: Task creation, editing, status updates, scheduling
- **User Profile**: Profile management, settings, organization management

### **API Testing Suite**

- **Authentication APIs**: Login/logout API validation with token management
- **CRUD Operations**: Complete API testing for leads, customers, sales, and tasks
- **Data Validation**: API response validation and error handling
- **Chaining Operations**: API request chaining for complex workflows
- **Backend Integration**: Direct database verification of API operations

### **Cross-Browser Testing**

- **Multi-browser Support**: Chrome, Firefox, Edge, Safari (macOS)
- **Platform-aware Execution**: Automatic browser detection and platform-specific configurations
- **Browser-specific Utilities**: Custom handling for different browser behaviors
- **Multilingual Support**: English/Spanish text validation across browsers

### **BDD Testing (Behavior-Driven Development)**

- **Cucumber Integration**: Feature files with Gherkin syntax
- **Step Definitions**: Reusable step implementations across multiple features
- **Business-readable Tests**: Stakeholder-friendly test scenarios
- **Feature Coverage**: Home page sanity, task management, and comprehensive scenarios

### **Visual Regression Testing**

- **Critical UI States**: Login pages, dashboards, forms, modals
- **Cross-browser Baselines**: Browser-specific baseline image generation
- **Dynamic Element Handling**: Automatic hiding of timestamps, user info, loading states
- **Responsive Design**: Mobile and desktop viewport testing

### **Performance Testing (K6)**

- **Load Testing**: Production-ready 2-user authentication testing
- **Stress Testing**: 1-3 user stress scenarios with rate limiting considerations
- **Custom Metrics**: Authentication error rates and response time tracking
- **Environment-aware**: Production vs. stress test configurations

### **Security Testing**

- **Authentication Bypass**: SQL injection, brute force, empty credentials testing
- **Input Validation**: XSS prevention, SQL injection protection, data type validation
- **Token Security**: Expired token handling, malformed token rejection, refresh token validation
- **Authorization Testing**: Cross-user and cross-organization data access prevention
- **Real Vulnerability Detection**: Actual security issues identified and documented

## 🔧 Professional Framework Components

### **Page Object Model (POM)**

- **Comprehensive Page Objects**: LoginPage, LeadsPage, DashboardPage, CustomersPage, SalesPage, TasksPage, ProfilePage, SideNavBar, TopNavBar
- **Element Abstraction**: All UI elements properly abstracted with descriptive methods
- **Reusable Components**: Consistent element interaction patterns across pages

### **Custom Commands & Utilities**

- **Authentication Commands**: `cy.login()`, `cy.logout()` with environment variable support
- **Form Interaction**: `cy.fillForm()`, `cy.clearAndType()` for dynamic form handling
- **Navigation Commands**: `cy.navigateTo()`, `cy.clickMenuItem()` for consistent navigation
- **Data Management**: `cy.createRecord()`, `cy.searchRecord()` for CRUD operations
- **Validation Commands**: `cy.shouldContainText()`, `cy.shouldBeVisibleAndEnabled()`
- **Screenshot Commands**: Advanced screenshot utilities with timestamps and context

### **Database Integration**

- **Direct Database Access**: PostgreSQL connection with SSL support
- **CRUD Operations**: Complete database operations for all entities
- **Connection Management**: Proper connection lifecycle with error handling
- **Test Data Cleanup**: Automated cleanup of test data after test execution

### **Cross-Browser Utilities**

- **Browser Detection**: Automatic browser and platform detection
- **Multilingual Support**: English/Spanish text validation
- **Browser-specific Interactions**: Custom click and type handling for different browsers
- **Performance Measurement**: Page load time tracking and validation

## ⚙️ Enterprise Configuration

## 🚀 Advanced CI/CD Integration

### **GitHub Actions Ready**

- **Complete Workflow Configuration**: Automated testing pipeline implementation
- **Artifact Management**: Screenshots, videos, and reports upload
- **Environment-aware**: Different configurations for local vs. CI environments
- **Automated Reporting**: HTML reports with embedded assets

### **CI/CD Platforms Supported**

- **GitHub Actions**: Complete workflow configuration with artifact management
- **Jenkins**: Enterprise CI/CD integration ready
- **GitLab CI**: Comprehensive pipeline support
- **Azure DevOps**: Full DevOps integration capabilities

### **Automated Features**

- **Cross-browser Testing**: Automated multi-browser test execution
- **Performance Testing**: K6 integration with automated reporting
- **Security Testing**: Automated security validation in CI pipeline
- **Visual Regression**: Automated UI consistency checking

### **Cypress Configuration**

- **Production Environment**: Tests against live CRMx.mx application
- **Cucumber Integration**: BDD support with feature file processing
- **Visual Regression**: Screenshot comparison with configurable thresholds
- **Database Tasks**: Custom Cypress tasks for database operations
- **Environment Management**: Comprehensive environment variable handling

### **Global Configuration Management**

- **Base URLs**: Centralized URL management for different environments
- **Timeouts**: Configurable timeouts for commands (10s), requests (10s), and responses (10s)
- **Viewports**: Responsive design testing with multiple viewport configurations (1280x720, 1920x1080, 768x1024)
- **Error Retries**: Intelligent retry mechanisms (runMode: 1, openMode: 0)
- **Environment-aware**: Different configurations for local vs. CI environments

### **Performance Testing Setup**

- **K6 Integration**: Professional load testing with custom metrics
- **Environment Validation**: Required environment variable validation
- **Multiple Test Scenarios**: Load and stress testing configurations
- **Automated Reporting**: JSON output with validation scripts and HTML reports

## 📊 Advanced Test Data Management

### **Data Sources**

- **Environment Variables**: For sensitive data (credentials, URLs, database connections)
- **Fixtures**: JSON and CSV files for structured test data
- **Random Data Generators**: Dynamic test data generation for realistic testing
- **CSV Integration**: Structured data from CSV files (`leadData.csv`) for comprehensive test scenarios

### **Data Management Best Practices**

- **No Hardcoded Data**: All test data is externalized using variables, fixtures, or random data generators
- **Comprehensive Cleanup**: Automated data removal from both Frontend (UI) and Backend (SQL queries)
- **Table Iteration**: Advanced techniques for dynamic data location and manipulation in tables
- **Data Validation**: Backend verification of frontend operations through direct database queries

### **Cleanup Strategies**

- **Frontend Cleanup**: UI-based deletion through application interface
- **Backend Cleanup**: Direct SQL queries for comprehensive data removal
- **Automated Cleanup**: Hooks (`before()`, `after()`, `beforeEach()`, `afterEach()`) for test isolation
- **Database Integration**: Direct PostgreSQL/Supabase operations for data validation and cleanup

## 🎯 Professional QA Best Practices

### **Test Structure & Organization**

- **Hooks Implementation**:
  - `before()` and `after()` blocks for suite-level setup and cleanup
  - `beforeEach()` and `afterEach()` blocks for test-level setup and cleanup
  - Proper test isolation and data cleanup
- **Page Object Model**: Complete abstraction of UI elements and interactions
- **Custom Commands**: Reusable test utilities and helpers
- **Modular Architecture**: Well-organized test structure with clear separation of concerns

### **Data Management Best Practices**

- **No Hardcoded Data**: All test data is externalized using:
  - **Environment Variables**: For sensitive data (credentials, URLs, database connections)
  - **Fixtures**: JSON and CSV files for structured test data
  - **Random Data Generators**: Dynamic test data generation for realistic testing
  - **CSV Integration**: Structured data from CSV files for comprehensive test scenarios
- **Data Cleanup**: Automated cleanup from both Frontend and Backend
- **Table Iteration**: Advanced techniques for dynamic data location and manipulation

### **Security & Configuration**

- **Environment Variables**: All sensitive data externalized to environment variables
- **Git Ignore**: Proper `.gitignore` configuration to prevent credential exposure
- **Security Testing**: Comprehensive security validation including real vulnerability detection
- **Production Safety**: Tests configured for production environment with proper safety measures

### **Reporting & Documentation**

- **Mochawesome Local Reporting**: Beautiful HTML reports with charts and statistics
- **Comprehensive Documentation**: Detailed README and security guidelines
- **Video Recording**: Complete test execution recordings for debugging
- **Screenshot Capture**: Automatic failure screenshots with context

### **Global Configuration Management**

- **Base URLs**: Centralized URL management for different environments
- **Timeouts**: Configurable timeouts for commands, requests, and responses
- **Viewports**: Responsive design testing with multiple viewport configurations
- **Error Retries**: Intelligent retry mechanisms for flaky tests
- **Environment-aware**: Different configurations for local vs. CI environments

### **API Testing Best Practices**

- **Complete API Coverage**: Full CRUD operations testing
- **Authentication Validation**: Token-based authentication testing
- **Response Validation**: Comprehensive API response validation
- **Error Handling**: Proper API error scenario testing
- **Backend Integration**: Direct database validation of API operations

## 📈 Professional Reporting & Analytics

### **Mochawesome HTML Reports**

- **Interactive Dashboard**: Beautiful, responsive HTML reports with charts and statistics
- **Test Results Summary**: Pass/fail statistics with visual charts
- **Detailed Test Logs**: Step-by-step test execution details
- **Screenshots Integration**: Automatic screenshot capture on failures
- **Video Integration**: Embedded video recordings of test execution
- **Search & Filter**: Easy navigation through test results
- **Export Options**: Share reports as HTML files

### **Performance Testing Reports**

- **K6 Visual Reports**: Professional performance testing analytics
- **Load Testing Metrics**: Response time, error rates, and throughput analysis
- **Stress Testing Results**: System behavior under load validation
- **Custom Metrics**: Authentication error rates and performance indicators

### **Cross-Browser Analytics**

- **Browser-specific Results**: Individual browser test result tracking
- **Platform Analytics**: Cross-platform compatibility reporting
- **Performance Comparison**: Browser performance metrics comparison
- **Visual Regression Reports**: UI consistency validation across browsers

### **Security Testing Reports**

- **Vulnerability Detection**: Real security issues identified and documented
- **Security Metrics**: Authentication, authorization, and input validation results
- **Compliance Reporting**: Security best practices validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Access to test environment (not production)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/gp-pixeleyes/pixeleyes-crmx-cypress-portolio.git
cd pixeleyes-crmx-cypress-portolio
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp env.example .env
# Edit .env with your test environment credentials
```

## 🧪 Running Tests

### **Interactive Mode (Cypress Test Runner)**

```bash
npm run cypress:open
npm run test:open
```

### **Headless Mode Execution**

```bash
npm run cypress:run
npm run cypress:run:headed
npm test
```

### **Cross-Browser Testing**

```bash
# Individual browsers
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
npm run cypress:run:safari

# Cross-browser automation
npm run cypress:cross-browser
npm run cypress:cross-browser:chrome
npm run cypress:cross-browser:firefox
npm run cypress:cross-browser:edge
npm run cypress:cross-browser:safari
```

### **Visual Regression Testing**

```bash
# Generate baselines
npm run visual:generate-baselines
npm run visual:generate-browser-baselines

# Run visual tests
npm run visual:run-tests
npm run visual:run-cross-browser
npm run visual:open

# Compare and analyze
npm run visual:compare
npm run visual:compare-local
npm run visual:compare-chrome
npm run visual:compare-firefox
npm run visual:compare-edge
npm run visual:compare-all-browsers
npm run visual:compare-main

# View results
npm run visual:open-viewer
npm run visual:open-side-by-side
npm run visual:open-directories
```

### **Performance Testing (K6)**

```bash
# Load testing
npm run k6:auth
npm run k6:auth:validate
npm run k6:auth:report
npm run k6:auth:full

# Stress testing
npm run k6:stress
npm run k6:stress:validate
npm run k6:stress:report
npm run k6:stress:full
```

### **Security Testing**

```bash
npm run cypress:run:security
npm run cypress:run:security:headless
npm run cypress:open:security
npm run security:test
npm run security:lint
npm run security:audit
```

### **Reporting & Analysis**

```bash
# Generate HTML reports
npm run cypress:generate-html-report
npm run test:report

# Clean up reports
npm run clean-reports
```

#### Generate Reports

```bash
# Run all tests and generate HTML report
npm run test:report

# Run specific test file and generate report
npx cypress run --spec cypress/e2e/mochawesome-test.cy.js --headed --browser chrome

# Run tests in headless mode
npx cypress run --spec cypress/e2e/mochawesome-test.cy.js

# Clean previous reports
npm run clean-reports
```

#### View Reports

After running tests, the HTML report is automatically generated in:

```
cypress/reports/html/index.html
```

**To open the report:**

1. **Direct file path in browser:**

   ```
   file:///C:/Users/Guille/Documents/programming/projects/pixeleyes-crmx-cypress-portolio/cypress/reports/html/index.html
   ```

2. **From File Explorer:**

   - Navigate to: `cypress/reports/html/`
   - Double-click on `index.html`

3. **From terminal:**
   ```bash
   start cypress\reports\html\index.html
   ```

#### Report Features

- **Interactive Dashboard**: Beautiful, responsive HTML reports
- **Test Results Summary**: Pass/fail statistics with charts
- **Detailed Test Logs**: Step-by-step test execution details
- **Screenshots Integration**: Automatic screenshot capture on failures
- **Video Integration**: Embedded video recordings
- **Search & Filter**: Easy navigation through test results
- **Export Options**: Share reports as HTML files
- **Cypress-Specific**: Optimized for Cypress test results

#### Report Location

Reports are automatically generated in the `cypress/reports/` directory:

- `cypress/reports/mochawesome.html` - Interactive HTML report
- `cypress/reports/mochawesome.json` - Test results data
- `cypress/reports/assets/` - Report assets (CSS, JS, images)

#### Report Configuration

The reporter is configured in `cypress.config.js` with:

- **Plugin Registration**: `require('cypress-mochawesome-reporter/plugin')(on)`
- **Support Registration**: `import 'cypress-mochawesome-reporter/register'`
- **Reporter Options**: Charts, embedded screenshots, and custom page title

#### Report Override Behavior

The project uses environment-aware configuration for report management:

**Local Development (Default):**

- **HTML Reports**: Each run replaces `cypress/reports/html/index.html`
- **Videos**: Previous videos are deleted before new runs
- **Screenshots**: Previous screenshots are deleted before new runs
- **Setting**: `trashAssetsBeforeRuns: true` (keeps workspace clean)

**CI/CD Environment:**

- **Reports Preserved**: Historical data kept for analysis
- **Videos**: Previous videos are preserved
- **Screenshots**: Previous screenshots are preserved
- **Setting**: `trashAssetsBeforeRuns: false` (when `process.env.CI` is true)

**Configuration:**

```javascript
trashAssetsBeforeRuns: process.env.CI ? false : true;
```

This automatically adapts based on the environment - clean runs locally, preserved history in CI/CD.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or contributions, please reach out through GitHub issues or pull requests.

## Screenshot and Video Recording in GitHub Actions

This project includes enhanced screenshot and video recording capabilities for Cypress tests running in GitHub Actions. Here's how it works:

### 🎥 Automatic Recording Features

#### Screenshots

- **Automatic on failure**: Screenshots are automatically captured when tests fail
- **Step-by-step recording**: Each test step can be recorded with before/after screenshots
- **Custom naming**: Screenshots include timestamps and descriptive names
- **Full page capture**: Option to capture entire page or just viewport

#### Videos

- **Automatic recording**: All test runs are recorded as MP4 videos
- **Compressed format**: Videos are compressed for faster upload/download
- **Retention policy**: Videos are kept for 30 days in GitHub Actions artifacts

### 📸 Available Commands

#### Basic Screenshot Commands

```javascript
// Take a simple screenshot
cy.takeScreenshot('my-screenshot');

// Take screenshot at specific test step
cy.screenshotAtStep('login-attempt');

// Take screenshot of specific element
cy.screenshotElement('.login-form', 'form-screenshot');

// Take full page screenshot
cy.screenshotFullPage('complete-page');

// Take viewport-only screenshot
cy.screenshotViewport('visible-area');
```

#### Advanced Recording Commands

```javascript
// Record a complete test session
cy.startRecording('login-test-session');
// ... your test steps ...
cy.endRecording('login-test-session');

// Record individual steps with before/after screenshots
cy.recordStep('enter-credentials', () => {
  cy.get('#email').type('user@example.com');
  cy.get('#password').type('password123');
});

// Take screenshots around any action
cy.screenshotAroundAction(() => {
  cy.click('#submit-button');
}, 'submit-form');
```

### 🔧 Configuration

#### Cypress Configuration (`cypress.config.js`)

```javascript
module.exports = defineConfig({
  e2e: {
    // Enhanced recording settings
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotOnHeadlessFailure: true,
    trashAssetsBeforeRuns: true,

    // Better error reporting
    retries: {
      runMode: 1,
      openMode: 0,
    },

    // Timeout settings
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
});
```

#### GitHub Actions Workflow (`.github/workflows/cypress-tests.yml`)

The workflow automatically:

- Runs tests with video recording enabled
- Uploads screenshots on test failure
- Uploads videos for all test runs
- Creates artifacts with run numbers for easy identification
- Comments on PRs with test results and artifact information

### 📦 Artifact Management

#### Artifact Types

1. **Screenshots** (`cypress-screenshots-{run-number}`)

   - Uploaded only on test failure
   - Contains PNG files with descriptive names
   - Retained for 30 days

2. **Videos** (`cypress-videos-{run-number}`)

   - Uploaded for all test runs
   - Contains MP4 files of test execution
   - Retained for 30 days

3. **Test Results** (`cypress-results-{run-number}`)
   - Contains detailed test execution data
   - Useful for debugging and analysis

#### Accessing Artifacts

1. Go to your GitHub repository
2. Navigate to Actions tab
3. Click on the specific workflow run
4. Scroll down to "Artifacts" section
5. Download the desired artifact type

### 🚀 Best Practices

#### Test Structure

```javascript
describe('Feature Test', () => {
  beforeEach(() => {
    cy.startRecording('feature-test-session');
  });

  it('should perform specific action', () => {
    cy.recordStep('setup', () => {
      // Setup code
    });

    cy.recordStep('main-action', () => {
      // Main test action
    });

    cy.recordStep('verification', () => {
      // Verification code
    });
  });

  afterEach(() => {
    cy.endRecording('feature-test-session');
  });
});
```

#### Screenshot Naming Convention

- Use descriptive names: `login-success`, `form-validation-error`
- Include test context: `user-login-test-before-credentials`
- Add timestamps automatically: `login-2024-01-15T10-30-45-123Z`

#### Video Optimization

- Keep tests focused and concise
- Avoid unnecessary waits or delays
- Use `cy.wait()` sparingly
- Consider test isolation to reduce video size

### 🔍 Debugging with Recordings

#### When Tests Fail

1. Check the GitHub Actions run
2. Download the screenshots artifact
3. Look for screenshots with `-FAILURE` suffix
4. Review the video recording for the complete test flow
5. Use the test results artifact for detailed logs

#### Common Issues

- **Large video files**: Reduce test complexity or increase video compression
- **Missing screenshots**: Ensure `screenshotOnRunFailure: true` is set
- **Slow uploads**: Consider using `trashAssetsBeforeRuns: true`

### 📊 Monitoring and Analytics

The workflow provides:

- Automatic PR comments with test results
- Artifact retention management
- Run number tracking for easy reference
- Failure analysis with visual evidence

This setup ensures you have comprehensive visual documentation of your test execution, making debugging and quality assurance much more effective.

---

**Note**: This portfolio demonstrates **senior-level QA automation expertise** with comprehensive coverage of modern testing practices, real-world application testing, and professional framework implementation. It showcases the ability to build enterprise-grade test automation solutions that can identify real issues and provide valuable quality assurance for production applications.

---

## 📝 Recent Updates

- Enhanced screenshot and video recording capabilities
- Added comprehensive test data management with CSV integration
- Improved CI/CD integration with GitHub Actions
- Updated documentation with professional best practices
- Added comprehensive security testing with real vulnerability detection
- Implemented advanced cross-browser testing capabilities
- Added K6 performance testing with professional reporting
