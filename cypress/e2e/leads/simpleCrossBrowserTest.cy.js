/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import LeadsPage from '../../support/pageObjects/LeadsPage';
import { generateLeadData, generateCompanyDescription, generateEmail } from '../../support/testDataGenerator';
import { getBrowserInfo, takeScreenshot, validateElementVisibility, validateElementText, validateFormField, logBrowserTestResult, runAccessibilityCheck } from '../../support/crossBrowserUtils';

describe('Simple Cross-Browser Lead Creation Test', () => {
  let leadData;
  let createdLeadEmail;
  let browserInfo;

  before(() => {
    leadData = generateLeadData();
    createdLeadEmail = leadData.email;
    browserInfo = getBrowserInfo();

    // Log browser information
    cy.log(`🌐 Running cross-browser test on: ${browserInfo.name} ${browserInfo.version}`);
    cy.log(`👤 Browser Family: ${browserInfo.family}`);
    cy.log(`🎭 Headless Mode: ${browserInfo.isHeadless}`);

    // Log all generated test data
    cy.log('🎯 Generated Test Data:');
    cy.log('📧 Email:', leadData.email);
    cy.log('📧 Secondary Email:', leadData.secondaryEmail);
    cy.log('👤 Name:', `${leadData.firstName} ${leadData.lastName}`);
    cy.log('🏢 Company:', leadData.company);
    cy.log('💼 Position:', leadData.position);
    cy.log('📊 Status:', leadData.status);
    cy.log('📊 Status type:', typeof leadData.status);
  });

  it('should create a lead successfully', () => {
    cy.login();

    // Debug: Log the lead data at the start of the test
    cy.log('🔍 Debug: Test started');
    cy.log('🔍 Debug: leadData object:', leadData);
    cy.log('🔍 Debug: leadData.status:', leadData.status);
    cy.log('🔍 Debug: typeof leadData.status:', typeof leadData.status);

    // Navigate to leads page
    SideNavBar.leadsTab().click();
    LeadsPage.leadsPageTitle().should('be.visible').should('contain', 'Leads');

    // Click add lead button
    LeadsPage.addLeadButton().click();
    LeadsPage.addNewLeadBasicInfoTab().click();

    // Fill basic information
    cy.log('🔍 Debug: Filling basic info...');
    LeadsPage.addNewLeadFirstNameTextBox().type(leadData.firstName);
    LeadsPage.addNewLeadLastNameTextBox().type(leadData.lastName);
    LeadsPage.addNewLeadCompanyTextBox().type(leadData.company);
    LeadsPage.addNewLeadPositionTextBox().type(leadData.position);
    LeadsPage.addNewLeadEmailTextBox().type(createdLeadEmail);
    LeadsPage.addNewLeadSecondaryEmailTextBox().type(leadData.secondaryEmail);

    // Phone information
    cy.log('🔍 Debug: Filling phone info...');
    LeadsPage.addNewLeadPhoneCountryCodeSelect(leadData.phoneCountryCode);
    LeadsPage.addNewLeadPhoneNumberTextBox().type(leadData.phone);
    LeadsPage.addNewLeadMobileCountryCodeSelect(leadData.mobileCountryCode);
    LeadsPage.addNewLeadMobileNumberTextBox().type(leadData.phone);
    LeadsPage.addNewLeadWebsiteTextBox().type(leadData.website);

    // Social media information
    cy.log('🔍 Debug: Filling social media...');
    LeadsPage.addNewLeadSocialMediaTab().click();
    LeadsPage.addNewLeadXSocialMediaTextBox().type(leadData.socialMediaX);
    LeadsPage.addNewLeadInstagramSocialMediaTextBox().type(leadData.socialMediaInstagram);
    LeadsPage.addNewLeadFacebookSocialMediaTextBox().type(leadData.socialMediaFacebook);
    LeadsPage.addNewLeadTikTokSocialMediaTextBox().type(leadData.socialMediaTiktok);
    LeadsPage.addNewLeadSkypeSocialMediaTextBox().type(leadData.skypeId);

    // Business information
    cy.log('🔍 Debug: Filling business info...');
    LeadsPage.addNewLeadBusinessInformationTab().click();
    LeadsPage.addNewLeadBusinessSourceSelect(leadData.source);
    LeadsPage.addNewLeadBusinessSectorTextBox().type(leadData.sector);
    LeadsPage.addNewLeadBusinessAnnualRevenueTextBox().type(leadData.annualRevenue.toString());
    LeadsPage.addNewLeadBusinessEmployeesCountTextBox().type(leadData.employeesCount.toString());
    LeadsPage.addNewLeadBusinessQualificationTextBox().type(leadData.qualification.toString());

    // Debug: Log status before using it
    cy.log('🔍 Debug: About to use leadData.status:', leadData.status);
    cy.log('🔍 Debug: leadData.status.toLowerCase():', leadData.status.toLowerCase());

    // Try to select status with error handling
    try {
      LeadsPage.addNewLeadBusinessStatusSelect(leadData.status.toLowerCase());
    } catch (error) {
      cy.log('❌ Error selecting status:', error);
      cy.log('🔍 Debug: leadData.status is:', leadData.status);
      cy.log('🔍 Debug: typeof leadData.status is:', typeof leadData.status);
    }

    LeadsPage.addNewLeadBusinessEmailingStatusButton().click();
    LeadsPage.addNewLeadBusinessDescriptionTextBox().type(generateCompanyDescription());

    // Address information
    cy.log('🔍 Debug: Filling address info...');
    LeadsPage.addNewLeadAddressInformationTab().click();
    LeadsPage.addNewLeadAddressStreetTextBox().type(leadData.street);
    LeadsPage.addNewLeadAddressCountrySelect(leadData.country);
    LeadsPage.addNewLeadAddressStateOrProvinceSelect(leadData.state);
    LeadsPage.addNewLeadAddressCitySelect(leadData.city);
    LeadsPage.addNewLeadAddressPostalCodeTextBox().type(leadData.postalCode);

    // Save the lead
    cy.log('🔍 Debug: Saving lead...');
    LeadsPage.addNewLeadSaveButton().click();

    // Validate success message using the same approach as original test
    LeadsPage.successConfirmationMessage().should('contain', 'Lead created successfully');

    logBrowserTestResult('Lead Creation', 'PASSED', { email: createdLeadEmail });
  });

  it('should delete the created lead from the FE', () => {
    cy.login();
    SideNavBar.leadsTab().click();
    LeadsPage.leadsPageTitle().should('contain', 'Leads');
    let emailFound = false;
    cy.get('tr td:nth-child(4)')
      .each(($el, index, $list) => {
        const emailText = $el.text().trim();
        if (emailText === createdLeadEmail) {
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
          cy.log(`❌ Lead email not found in table: ${createdLeadEmail}`);
          throw new Error(`Lead with email "${createdLeadEmail}" was not found in the leads table`);
        }
      });

    cy.log('🔍 Verifying lead was deleted from frontend...');
    cy.get('tr td:nth-child(4)').each(($el, index, $list) => {
      const emailText = $el.text().trim();
      expect(emailText).to.not.equal(createdLeadEmail);
    });
    cy.log('✅ Lead successfully deleted from frontend');

    logBrowserTestResult('Lead Cleanup', 'PASSED', { email: createdLeadEmail });
  });
});
