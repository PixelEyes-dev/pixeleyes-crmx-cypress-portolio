Feature: Create, Edit, and Delete a Task from Frontend
  As a user
  I want to create a task with random data, edit it, and then delete it from the frontend
  So that I can test the complete task lifecycle including editing functionality

  Scenario: Create, edit, and delete a task from the frontend
    Given I am logged into the application
    And I have generated random task data including an edited title
    When I navigate to the tasks page
    And I create a new task with the generated data for frontend testing
    Then the task should be created successfully
    
    When I edit the task title with the edited title
    Then the task should be updated successfully
    
    When I verify the edited task title is displayed in the frontend
    Then the edited task title should be visible in the tasks table
    
    When I delete the task from the frontend
    Then the task should be deleted successfully
    And the task should no longer be visible in the frontend
