/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import LeadsPage from '../../support/pageObjects/LeadsPage';
import { generateLeadData } from '../../support/testDataGenerator';

describe('Visual Regression Tests - Critical UI States', () => {
  let leadData;

  before(() => {
    leadData = generateLeadData();
  });

  describe('Authentication Page', () => {
    it('should capture login page screenshot', () => {
      cy.visit('/auth');
      cy.wait(1000); // Wait for UI stabilization

      // Hide dynamic elements
      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.screenshot('login-page');
    });

    it('should capture login form screenshot', () => {
      cy.visit('/auth');
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.get('#authPageContainer').screenshot('login-form');
    });
  });

  describe('Dashboard Page', () => {
    beforeEach(() => {
      cy.login();
    });

    it('should capture dashboard layout screenshot', () => {
      cy.visit('/');
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.screenshot('dashboard-layout');
    });

    it('should capture sidebar navigation screenshot', () => {
      cy.visit('/');
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      // Use a more generic selector for sidebar - capture the main navigation area
      cy.get('nav').screenshot('sidebar-navigation');
    });

    it('should capture top navigation bar screenshot', () => {
      cy.visit('/');
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      // Use a more generic selector for top navigation - capture the header area
      cy.get('header').screenshot('top-navbar');
    });
  });

  describe('Leads Page', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/leads');
    });

    it('should capture leads list page screenshot', () => {
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.screenshot('leads-list-page');
    });

    it('should capture leads table screenshot', () => {
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      // Use table selector based on existing tests
      cy.get('table').screenshot('leads-table');
    });
  });

  describe('Create Lead Modal', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/leads');
      LeadsPage.addLeadButton().click();
    });

    it('should capture create lead modal - basic info tab', () => {
      LeadsPage.addNewLeadBasicInfoTab().click();
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      // Use the correct modal selector from LeadsPage
      cy.get('#addLeadDialogContent').screenshot('create-lead-modal-basic-info');
    });

    it('should capture create lead modal - filled form', () => {
      LeadsPage.addNewLeadBasicInfoTab().click();
      LeadsPage.addNewLeadFirstNameTextBox().type(leadData.firstName);
      LeadsPage.addNewLeadLastNameTextBox().type(leadData.lastName);
      LeadsPage.addNewLeadCompanyTextBox().type(leadData.company);
      LeadsPage.addNewLeadEmailTextBox().type(leadData.email);

      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      // Use the correct modal selector from LeadsPage
      cy.get('#addLeadDialogContent').screenshot('create-lead-modal-filled-form');
    });
  });

  describe('Success Messages', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/leads');
    });

    it('should capture lead creation success message', () => {
      LeadsPage.addLeadButton().click();
      LeadsPage.addNewLeadBasicInfoTab().click();

      LeadsPage.addNewLeadFirstNameTextBox().type(leadData.firstName);
      LeadsPage.addNewLeadLastNameTextBox().type(leadData.lastName);
      LeadsPage.addNewLeadCompanyTextBox().type(leadData.company);
      LeadsPage.addNewLeadEmailTextBox().type(leadData.email);

      LeadsPage.addNewLeadSaveButton().click();
      cy.wait(3000); // Wait for success message

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.screenshot('lead-creation-success-message');
    });

    it('should cleanup the created lead', () => {
      cy.visit('/leads');
      let emailFound = false;
      cy.get('tr td:nth-child(4)')
        .each(($el, index, $list) => {
          const emailText = $el.text().trim();
          if (emailText === leadData.email) {
            emailFound = true;
            cy.log(`✅ Found lead email in row ${index + 1}: ${emailText}`);
            const row = $el.closest('tr');
            cy.wrap(row).find('#lead-actions').click();
            LeadsPage.deleteLeadButton().click();
            LeadsPage.confirmDeleteLeadButton().click();
            LeadsPage.successConfirmationMessage().should('contain', 'Lead deleted successfully');
            // break out of .each()
            return false;
          }
        })
        .then(() => {
          if (!emailFound) {
            cy.log(`❌ Lead email not found in table: ${leadData.email}`);
            throw new Error(`Lead with email "${leadData.email}" was not found in the leads table`);
          }
        });

      cy.log('🔍 Verifying lead was deleted from frontend...');
      cy.get('tr td:nth-child(4)').each(($el, index, $list) => {
        const emailText = $el.text().trim();
        expect(emailText).to.not.equal(leadData.email);
      });
      cy.log('✅ Lead successfully deleted from frontend');
    });
  });

  describe('Responsive Design', () => {
    beforeEach(() => {
      cy.login();
    });

    it('should capture mobile viewport screenshot', () => {
      cy.viewport(768, 1024); // Mobile landscape
      cy.visit('/');
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.screenshot('dashboard-mobile-view');
    });

    it('should capture desktop viewport screenshot', () => {
      cy.viewport(1920, 1080); // Desktop
      cy.visit('/');
      cy.wait(1000);

      cy.get('body').then($body => {
        $body.find('[data-timestamp], .timestamp, .date').hide();
        $body.find('.user-info, .profile-name').hide();
        $body.find('.loading, .spinner, [data-loading]').hide();
      });

      cy.screenshot('dashboard-desktop-view');
    });
  });
});
