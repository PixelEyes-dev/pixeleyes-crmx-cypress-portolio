/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import TasksPage from '../../support/pageObjects/TasksPage';
import { generateTaskData, generateTaskDescription } from '../../support/testDataGenerator';

describe('Create a Task and Delete it from the BE', () => {
  const customerName = 'Ricky Bobbeeey (Talladega)';

  // Generate task data with custom dates
  const taskData = (() => {
    const baseData = generateTaskData();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Set specific times: scheduled for 9:00 AM today, execution for 2:00 PM tomorrow
    today.setHours(9, 0, 0, 0);
    tomorrow.setHours(14, 0, 0, 0);

    return {
      ...baseData,
      scheduledDate: today.toISOString().slice(0, 16), // Format: "2025-08-11T09:00"
      executionDate: tomorrow.toISOString().slice(0, 16), // Format: "2025-08-11T14:00"
      description: generateTaskDescription(), // Use the new task-specific description
    };
  })();

  before(() => {
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

  it('Create a Task', () => {
    cy.login();
    SideNavBar.tasksTab().click();
    TasksPage.tasksPageTitle().should('be.visible').should('have.text', 'Tasks');
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
    TasksPage.successConfirmationMessage().should('contain', 'Task created successfully');
  });

  it('Should delete the Task from the BE', () => {
    // First, verify the task exists in the database
    cy.task('queryTaskByTitle', taskData.title).then(task => {
      expect(task).to.not.be.null;
      expect(task.title).to.equal(taskData.title);
      expect(task.task_type).to.equal(taskData.type);
      expect(task.status).to.equal(taskData.status);
      expect(task.priority).to.equal(taskData.priority);

      cy.log(`✅ Task found in database with title: ${taskData.title}`);

      // Now delete the task from the database
      cy.task('deleteTaskByTitle', taskData.title).then(result => {
        expect(result.deleted).to.be.true;
        expect(result.task).to.not.be.null;
        expect(result.task.title).to.equal(taskData.title);

        cy.log(`✅ Task successfully deleted from database`);

        // Verify the task no longer exists
        cy.task('queryTaskByTitle', taskData.title).then(deletedTask => {
          expect(deletedTask).to.be.null;
          cy.log(`✅ Task confirmed to be deleted from database`);
        });
      });
    });
  });
});
