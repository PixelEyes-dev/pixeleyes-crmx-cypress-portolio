Feature: Home Page Sanity Check
  As a user
  I want to verify the home page displays correctly
  So that I can ensure the application is working properly

  Scenario: Login page should display correctly
    Given I am on the home page
    When I view the login page elements
    Then the login body should not be empty
    And the logo should be visible
    And the title should display "Welcome to CRMx"
    And the page container should be visible
