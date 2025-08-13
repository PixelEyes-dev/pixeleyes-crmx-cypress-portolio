import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pageObjects/LoginPage';

Given('I am on the home page', () => {
  cy.visit('/');
});

When('I view the login page elements', () => {
  // This step is just for readability, no action needed
});

Then('the login body should not be empty', () => {
  LoginPage.loginBody().should('not.be.empty');
});

Then('the logo should be visible', () => {
  LoginPage.logo().should('be.visible');
});

Then('the title should display {string}', expectedTitle => {
  LoginPage.title().should('be.visible').should('have.text', expectedTitle);
});

Then('the page container should be visible', () => {
  LoginPage.pageContainer().should('be.visible');
});
