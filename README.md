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

Cypress provides built-in reporting features:

- Video recordings of test runs
- Screenshots on failures
- Detailed test logs
- HTML reports (with additional plugins)

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

---

**Note**: This portfolio demonstrates comprehensive QA automation skills using Cypress for CRM application testing. The tests cover various scenarios including authentication, data management, reporting, and user interface validation.
