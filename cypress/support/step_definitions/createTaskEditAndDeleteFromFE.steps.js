import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SideNavBar from '../pageObjects/SideNavBar';
import TasksPage from '../pageObjects/TasksPage';
import { generateTaskData, generateTaskDescription } from '../testDataGenerator';

// Store the generated task data and customer name for use across steps
let taskData;
let editedTaskTitle;
let customerName;

// Login step is now defined in common.steps.js

Given('I have generated random task data including an edited title', () => {
  customerName = 'Ricky Bobbeeey (Talladega)';

  // Generate task data with custom dates - exactly like the original test
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

  // Generate a different title for editing - ensure it's different from the original
  const editedBaseData = generateTaskData();
  editedTaskTitle = editedBaseData.title;

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

// Navigation step is now defined in common.steps.js

When('I create a new task with the generated data for frontend testing', () => {
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

When('I edit the task title with the edited title', () => {
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
        TasksPage.taskTitleTextBox().clear();
        TasksPage.taskTitleTextBox().type(editedTaskTitle);
        TasksPage.saveTaskButton().click();
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

Then('the task should be updated successfully', () => {
  TasksPage.successConfirmationMessage().should('contain', 'Task updated successfully');
});

When('I verify the edited task title is displayed in the frontend', () => {
  // This step is just for navigation - the verification happens in the Then step
  cy.log('Verifying edited task title in frontend...');
});

Then('the edited task title should be visible in the tasks table', () => {
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

When('I delete the task from the frontend', () => {
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
});

Then('the task should be deleted successfully', () => {
  TasksPage.successConfirmationMessage().should('contain', 'Task deleted successfully');
});

Then('the task should no longer be visible in the frontend', () => {
  cy.log('🔍 Verifying task was deleted from frontend...');
  cy.get('tr td:nth-child(3)').each(($el, index, $list) => {
    const taskTitleText = $el.text().trim();
    expect(taskTitleText).to.not.equal(editedTaskTitle);
  });
  cy.log('✅ Task successfully deleted from frontend');
});
