Feature: Create a Task and Delete it from the Backend
  As a user
  I want to create a task with random data and then delete it from the backend
  So that I can test the complete task lifecycle and cleanup

  Scenario: Create a task and delete it from the backend
    Given I am logged into the application
    And I have generated random task data
    When I navigate to the tasks page
    And I create a new task with the generated data for backend testing
    Then the task should be created successfully
    And the task should exist in the database
    And I manually verify the task in the application
    
    When I delete the task from the backend
    Then the task should be successfully deleted from the database
    And the task should no longer exist in the database
