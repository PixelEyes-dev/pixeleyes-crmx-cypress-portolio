import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the homepage', () => {
  cy.visit('/');
});

When('I see the page title', () => {
  cy.get('title').should('be.visible');
});

Then('the title should contain {string}', expectedTitle => {
  cy.title().should('contain', expectedTitle);
});
