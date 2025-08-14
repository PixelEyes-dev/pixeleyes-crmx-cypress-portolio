import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SideNavBar from '../pageObjects/SideNavBar';
import TasksPage from '../pageObjects/TasksPage';

// Common step definitions that can be shared across multiple features
Given('I am logged into the application', () => {
  cy.login();
});

When('I navigate to the tasks page', () => {
  SideNavBar.tasksTab().click();
  TasksPage.tasksPageTitle().should('be.visible').should('have.text', 'Tasks');
});

// Task creation step is implemented differently in each feature file

Then('the task should be created successfully', () => {
  TasksPage.successConfirmationMessage().should('contain', 'Task created successfully');
});
