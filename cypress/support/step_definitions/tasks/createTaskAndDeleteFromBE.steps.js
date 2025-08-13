import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SideNavBar from '../../pageObjects/SideNavBar';
import TasksPage from '../../pageObjects/TasksPage';
import { generateTaskData, generateTaskDescription } from '../../testDataGenerator';

// Store the generated task data and customer name for use across steps
let taskData;
let customerName;

// Login step is now defined in common.steps.js

Given('I have generated random task data', () => {
  customerName = 'Ricky Bobbeeey (Talladega)';

  // Generate task data with custom dates
  const baseData = generateTaskData();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Set specific times: scheduled for 9:00 AM today, execution for 2:00 PM tomorrow
  today.setHours(9, 0, 0, 0);
  tomorrow.setHours(14, 0, 0, 0);

  taskData = {
    ...baseData,
    scheduledDate: today.toISOString().slice(0, 16), // Format: "2025-08-11T09:00"
    executionDate: tomorrow.toISOString().slice(0, 16), // Format: "2025-08-11T14:00"
    description: generateTaskDescription(), // Use the new task-specific description
  };

  // Log the test data that will be used
  cy.log('=== Test Data Generated ===');
  cy.log(`Task Title: ${taskData.title}`);
  cy.log(`Task Type: ${taskData.type}`);
  cy.log(`Task Status: ${taskData.status}`);
  cy.log(`Task Priority: ${taskData.priority}`);
  cy.log(`Scheduled Date: ${taskData.scheduledDate}`);
  cy.log(`Execution Date: ${taskData.executionDate}`);
  cy.log(`Task Description: ${taskData.description}`);
  cy.log(`Assigned To: ${taskData.assignedTo}`);
  cy.log(`Related To: ${taskData.relatedTo}`);
  cy.log('==========================');
});

// Navigation step is now defined in common.steps.js

When('I create a new task with the generated data for backend testing', () => {
  TasksPage.addNewTaskButton().click();
  TasksPage.addTaskModal().should('be.visible');
  TasksPage.assignmentTypeCustomerRadioButton().click();
  TasksPage.selectCustomerSelectInput().select(customerName);
  TasksPage.taskTitleTextBox().type(taskData.title);
  TasksPage.taskTypeSelectInput().select(taskData.type);
  TasksPage.taskStatusSelectInput().select(taskData.status);
  TasksPage.taskPrioritySelectInput().select(taskData.priority);
  TasksPage.taskScheduledDateInput().type(taskData.scheduledDate);
  TasksPage.taskExecutionDateInput().type(taskData.executionDate);
  TasksPage.taskDescriptionTextBox().type(taskData.description);
  TasksPage.saveTaskButton().click();
});

// Success message step is now defined in common.steps.js

Then('the task should exist in the database', () => {
  cy.task('queryTaskByTitle', taskData.title).then(task => {
    expect(task).to.not.be.null;
    expect(task.title).to.equal(taskData.title);
    expect(task.task_type).to.equal(taskData.type);
    expect(task.status).to.equal(taskData.status);
    expect(task.priority).to.equal(taskData.priority);

    cy.log(`✅ Task found in database with title: ${taskData.title}`);
  });
});

Then('I manually verify the task in the application', () => {
  // Manual verification step - no action needed
});

When('I delete the task from the backend', () => {
  // Delete the task from the database
  cy.task('deleteTaskByTitle', taskData.title).then(result => {
    expect(result.deleted).to.be.true;
    expect(result.task).to.not.be.null;
    expect(result.task.title).to.equal(taskData.title);

    cy.log(`✅ Task successfully deleted from database`);
  });
});

Then('the task should be successfully deleted from the database', () => {
  cy.log('Task deletion was successful');
});

Then('the task should no longer exist in the database', () => {
  // Verify the task no longer exists
  cy.task('queryTaskByTitle', taskData.title).then(deletedTask => {
    expect(deletedTask).to.be.null;
    cy.log(`✅ Task confirmed to be deleted from database`);
  });
});
