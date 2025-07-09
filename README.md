# CRMx Cypress QA Automation Portfolio

A comprehensive Cypress test automation portfolio showcasing QA testing skills for the CRMx.mx application.

## 🚀 Features

- **End-to-End Testing**: Complete test coverage for CRM application workflows
- **Authentication Testing**: Login/logout functionality validation
- **Dashboard Testing**: Statistics and data visualization verification
- **Customer Management**: CRUD operations for customer data
- **Deal Pipeline**: Sales process automation testing
- **Reports & Analytics**: Data reporting functionality validation
- **Responsive Design**: Cross-device compatibility testing
- **Custom Commands**: Reusable test utilities and helpers

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

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

## 🧪 Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
# or
npm run test:open
```

### Run Tests in Headless Mode

```bash
npm run cypress:run
# or
npm test
```

### Run Tests with Specific Browser

```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

### Run Tests in Headed Mode (with browser visible)

```bash
npm run cypress:run:headed
```

## 📁 Project Structure

```
cypress/
├── e2e/                    # End-to-end test files
│   ├── sample.cy.js       # Basic sample tests
│   └── crm-tests.cy.js    # Comprehensive CRM test suite
├── support/               # Support files and custom commands
│   ├── commands.js        # Custom Cypress commands
│   └── e2e.js            # Main support file
├── fixtures/              # Test data files (to be added)
└── downloads/             # Downloaded files during tests
```

## 🧪 Test Suites

### 1. Sample Tests (`sample.cy.js`)

- Basic page load testing
- Page structure validation
- Navigation testing
- Responsive design verification

### 2. CRM Application Tests (`crm-tests.cy.js`)

- **Authentication Module**

  - Login form validation
  - Required field validation
  - Successful login flow

- **Dashboard Module**

  - Dashboard elements verification
  - Statistics display validation

- **Customer Management**

  - Customer list display
  - Add new customer functionality
  - Customer search functionality

- **Deal Management**

  - Deal pipeline display
  - Create new deal functionality

- **Reports & Analytics**

  - Report options display
  - Sales report generation

- **Settings & Profile**
  - User settings display
  - Profile update functionality

## 🔧 Custom Commands

The project includes several custom Cypress commands for common operations:

- `cy.login(email, password)` - Automated login process
- `cy.logout()` - Automated logout process
- `cy.createCustomer(customerData)` - Create customer with provided data
- `cy.createDeal(dealData)` - Create deal with provided data

## ⚙️ Configuration

The project uses `cypress.config.js` with the following key settings:

- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Video Recording**: Enabled
- **Screenshots**: On failure
- **Timeouts**: 10 seconds for commands, requests, and responses

## 📊 Test Data Management

Test data can be managed through:

- Fixture files (JSON format)
- Inline data within test files
- API calls for dynamic data

## 🎯 Best Practices Implemented

1. **Page Object Model**: Organized test structure
2. **Custom Commands**: Reusable test utilities
3. **Data-Driven Testing**: Flexible test data management
4. **Responsive Testing**: Cross-device compatibility
5. **Error Handling**: Comprehensive error scenarios
6. **Clean Test Structure**: Well-organized test suites

## 🚀 CI/CD Integration

The project is ready for CI/CD integration with:

- GitHub Actions
- Jenkins
- GitLab CI
- Azure DevOps

## 📈 Reporting

### Built-in Cypress Reporting

Cypress provides built-in reporting features:

- Video recordings of test runs
- Screenshots on failures
- Detailed test logs

### Cypress Mochawesome HTML Reports

This project includes cypress-mochawesome-reporter for beautiful, interactive HTML reports specifically designed for Cypress:

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
cy.takeScreenshot("my-screenshot");

// Take screenshot at specific test step
cy.screenshotAtStep("login-attempt");

// Take screenshot of specific element
cy.screenshotElement(".login-form", "form-screenshot");

// Take full page screenshot
cy.screenshotFullPage("complete-page");

// Take viewport-only screenshot
cy.screenshotViewport("visible-area");
```

#### Advanced Recording Commands

```javascript
// Record a complete test session
cy.startRecording("login-test-session");
// ... your test steps ...
cy.endRecording("login-test-session");

// Record individual steps with before/after screenshots
cy.recordStep("enter-credentials", () => {
  cy.get("#email").type("user@example.com");
  cy.get("#password").type("password123");
});

// Take screenshots around any action
cy.screenshotAroundAction(() => {
  cy.click("#submit-button");
}, "submit-form");
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
describe("Feature Test", () => {
  beforeEach(() => {
    cy.startRecording("feature-test-session");
  });

  it("should perform specific action", () => {
    cy.recordStep("setup", () => {
      // Setup code
    });

    cy.recordStep("main-action", () => {
      // Main test action
    });

    cy.recordStep("verification", () => {
      // Verification code
    });
  });

  afterEach(() => {
    cy.endRecording("feature-test-session");
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

**Note**: This portfolio demonstrates comprehensive QA automation skills using Cypress for CRM application testing. The tests cover various scenarios including authentication, data management, reporting, and user interface validation
#   T e s t   c o m m i t 
 
 

Minor change to Readme to verify changes in GH run
