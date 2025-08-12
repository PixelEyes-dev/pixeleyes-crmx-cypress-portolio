/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import TasksPage from '../../support/pageObjects/TasksPage';
import { generateTaskData, generateTaskDescription } from '../../support/testDataGenerator';

describe('Create a Task', () => {
  const customerName = 'Ricky Bobbeeey (Talladega)';

  // Generate task data with custom dates - exactly like createTaskAndDeleteFromBE.cy.js
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

  // Generate a different title for editing - ensure it's different from the original
  const editedTaskTitle = (() => {
    const baseData = generateTaskData();
    return baseData.title;
  })();

  before(() => {
    // Log the test data that will be used
    cy.log('=== Test Data Generated ===');
    cy.log(`Customer Name: ${customerName}`);
    cy.log(`Task Title: ${taskData.title}`);
    cy.log(`Task Type: ${taskData.type}`);
    cy.log(`Task Status: ${taskData.status}`);
    cy.log(`Task Priority: ${taskData.priority}`);
    cy.log(`Scheduled Date: ${taskData.scheduledDate}`);
    cy.log(`Execution Date: ${taskData.executionDate}`);
    cy.log(`Edited Task Title: ${editedTaskTitle}`);
    cy.log(`Task Description: ${taskData.description}`);
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

  it('should edit a Task in FE', () => {
    cy.login();
    SideNavBar.tasksTab().click();
    TasksPage.tasksPageTitle().should('be.visible').should('have.text', 'Tasks');
    let taskFound = false;
    cy.get('tr td:nth-child(3)')
      .each(($el, index, $list) => {
        const taskTitleText = $el.text().trim();
        if (taskTitleText === taskData.title) {
          taskFound = true;
          cy.log(`✅ Found task title in row ${index + 1}: ${taskTitleText}`);
          const row = $el.closest('tr');
          cy.wrap(row).find('#task-actions').click();
          TasksPage.editTaskButton().click();
          // TasksPage.editTaskModal().should('be.visible').should('have.text', 'Edit Task');
          TasksPage.taskTitleTextBox().clear();
          TasksPage.taskTitleTextBox().type(editedTaskTitle);
          TasksPage.saveTaskButton().click();
          TasksPage.successConfirmationMessage().should('contain', 'Task updated successfully');
          // break out of .each()
          return false;
        }
      })
      .then(() => {
        if (!taskFound) {
          cy.log(`❌ Task title not found in table: ${taskData.title}`);
          throw new Error(`Task with title "${taskData.title}" was not found in the tasks table`);
        }
      });
  });

  it('should verify the edited task title is updated in the FE', () => {
    cy.login();
    SideNavBar.tasksTab().click();
    TasksPage.tasksPageTitle().should('be.visible').should('have.text', 'Tasks');
    let taskFound = false;
    cy.get('tr td:nth-child(3)')
      .each(($el, index, $list) => {
        const taskTitleText = $el.text().trim();
        if (taskTitleText === editedTaskTitle) {
          taskFound = true;
          cy.log(`✅ Found edited task title in row ${index + 1}: ${taskTitleText}`);
          // break out of .each()
          return false;
        }
      })
      .then(() => {
        if (!taskFound) {
          cy.log(`❌ Edited task title not found in table: ${editedTaskTitle}`);
          throw new Error(`Task with title "${editedTaskTitle}" was not found in the tasks table`);
        }
      });
  });

  it('Delete a Task from FE', () => {
    cy.login();
    SideNavBar.tasksTab().click();
    TasksPage.tasksPageTitle().should('be.visible').should('have.text', 'Tasks');

    let taskFound = false;
    cy.get('tr td:nth-child(3)')
      .each(($el, index, $list) => {
        const taskTitleText = $el.text().trim();
        if (taskTitleText === editedTaskTitle) {
          taskFound = true;
          cy.log(`✅ Found task title in row ${index + 1}: ${taskTitleText}`);

          // Get the row and validate the scheduled date in column 6
          const row = $el.closest('tr');
          const scheduledDateCell = row.find('td:nth-child(6)');

          // Validate the scheduled date format and content
          cy.wrap(scheduledDateCell).should('be.visible');
          cy.wrap(scheduledDateCell)
            .invoke('text')
            .then(scheduledDateText => {
              const trimmedDate = scheduledDateText.trim();
              cy.log(`📅 Found scheduled date in column 6: ${trimmedDate}`);

              // Validate the date format (e.g., "Mar 11, 2025 05:49")
              const dateRegex = /^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}\s+\d{1,2}:\d{2}$/;
              expect(trimmedDate).to.match(dateRegex);
              cy.log(`✅ Scheduled date format is valid: ${trimmedDate}`);

              // Now proceed with deletion
              cy.wrap(row).find('#task-actions').click();
              TasksPage.deleteTaskButton().click();
              TasksPage.deleteTaskConfirmationButton().click();
              TasksPage.successConfirmationMessage().should('contain', 'Task deleted successfully');
            });

          // break out of .each()
          return false;
        }
      })
      .then(() => {
        if (!taskFound) {
          cy.log(`❌ Task title not found in table: ${editedTaskTitle}`);
          throw new Error(`Task with title "${editedTaskTitle}" was not found in the tasks table`);
        }
      });

    cy.log('🔍 Verifying task was deleted from frontend...');
    cy.get('tr td:nth-child(3)').each(($el, index, $list) => {
      const taskTitleText = $el.text().trim();
      expect(taskTitleText).to.not.equal(editedTaskTitle);
    });
    cy.log('✅ Task successfully deleted from frontend');
  });
});
