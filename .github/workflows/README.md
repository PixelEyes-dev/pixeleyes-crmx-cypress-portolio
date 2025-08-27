# GitHub Actions Workflows

This repository uses three separate GitHub Actions workflows to organize different types of tests and ensure clear separation of concerns.

## Workflow Structure

### 1. 🧪 API Tests (`api-tests.yml`)

**Purpose**: Runs API-specific tests with sequential CRUD operations
**Triggers**:

- Changes to `cypress/e2e/api/**`
- Changes to `cypress/e2e/leads/**`
- Changes to `cypress.config.js`
- Manual dispatch

**Key Features**:

- Sequential execution of CRUD tests (Create → Read → Update → Delete)
- Independent execution of other API tests
- Comprehensive error reporting and artifact uploads
- PR comments with detailed test results

### 2. 🧪 E2E Tests (`e2e-tests.yml`)

**Purpose**: Runs end-to-end tests against production environment
**Triggers**:

- Changes to `cypress/e2e/**/*.cy.js` (excluding `.feature` files)
- Changes to `cypress/support/**/*.js`
- Changes to `cypress.config.js`
- Manual dispatch

**Key Features**:

- Tests against production environment (https://www.crmx.mx)
- Database connection testing
- User authentication and onboarding flows
- CRUD operations for leads, customers, sales, and tasks

### 3. 🥒 Cucumber BDD Tests (`cucumber-tests.yml`)

**Purpose**: Runs Behavior-Driven Development tests using Cucumber feature files
**Triggers**:

- Changes to `cypress/e2e/**/*.feature`
- Changes to `cypress/support/step_definitions/**/*.js`
- Changes to `cypress.config.js`
- Manual dispatch

**Key Features**:

- BDD test execution using Gherkin syntax
- Feature file discovery and reporting
- Step definition validation
- Dedicated Cucumber test results and reporting

## Workflow Separation Benefits

### ✅ **Clear Separation of Concerns**

- Each workflow has a specific purpose and responsibility
- Easier to understand what each workflow does
- Better organization of test types

### ✅ **Independent Execution**

- Tests can run in parallel without conflicts
- Different test types can be triggered by different file changes
- Easier to debug specific test failures

### ✅ **Better Resource Management**

- API tests can run quickly without waiting for E2E tests
- Cucumber tests can have different timeout and resource requirements
- More efficient use of GitHub Actions minutes

### ✅ **Improved Reporting**

- Separate artifacts for each test type
- Dedicated PR comments for each workflow
- Easier to track performance and failures by test category

### ✅ **Flexible Triggering**

- API tests trigger on API-related changes
- E2E tests trigger on test file changes (excluding features)
- Cucumber tests trigger on feature file changes
- Manual dispatch available for all workflows

## File Change Triggers

| File Type                                  | API Tests | E2E Tests | Cucumber Tests |
| ------------------------------------------ | --------- | --------- | -------------- |
| `cypress/e2e/api/**/*.cy.js`               | ✅        | ❌        | ❌             |
| `cypress/e2e/**/*.cy.js`                   | ❌        | ✅        | ❌             |
| `cypress/e2e/**/*.feature`                 | ❌        | ❌        | ✅             |
| `cypress/support/step_definitions/**/*.js` | ❌        | ❌        | ✅             |
| `cypress/support/**/*.js`                  | ❌        | ✅        | ❌             |
| `cypress.config.js`                        | ✅        | ✅        | ✅             |

## Best Practices

1. **Keep workflows focused**: Each workflow should handle one specific type of testing
2. **Use path triggers**: Avoid unnecessary workflow runs by specifying relevant paths
3. **Consistent naming**: Use clear, descriptive names for workflows and jobs
4. **Proper error handling**: Always include `if: always()` for artifact uploads
5. **Comprehensive reporting**: Provide detailed feedback in PR comments

## Troubleshooting

### Workflow Not Triggering

- Check if file changes match the path triggers
- Verify branch restrictions (`main`, `develop`)
- Ensure workflow file syntax is correct

### Test Failures

- Check environment variables and secrets
- Review test logs and artifacts
- Verify test data and dependencies

### Performance Issues

- Consider parallel execution where possible
- Optimize test execution time
- Monitor GitHub Actions usage
