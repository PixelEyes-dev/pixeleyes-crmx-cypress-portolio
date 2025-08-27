import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the homepage', () => {
  cy.visit('/');
});

When('I check the page title', () => {
  // Title element exists but is not visible (it's in <head>)
  cy.get('title').should('exist');
});

Then('the title should contain {string}', expectedTitle => {
  cy.title().should('contain', expectedTitle);
});
