/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import LeadsPage from '../../support/pageObjects/LeadsPage';
import { generateLeadData, generateCompanyDescription } from '../../support/testDataGenerator';

describe('Generate Leads', () => {
  let leadData;
  let createdLeadEmail;

  before(() => {
    leadData = generateLeadData();
    createdLeadEmail = leadData.email;

    // Log all generated test data
    cy.log('🎯 Generated Test Data:');
    cy.log('📧 Email:', leadData.email);
    cy.log('👤 Name:', `${leadData.firstName} ${leadData.lastName}`);
    cy.log('🏢 Company:', leadData.company);
    cy.log('💼 Position:', leadData.position);
    cy.log('📧 Secondary Email:', leadData.secondaryEmail);
    cy.log('📱 Phone:', leadData.phone);
    cy.log('📱 Phone Country Code:', leadData.phoneCountryCode);
    cy.log('📱 Mobile Country Code:', leadData.mobileCountryCode);
    cy.log('🌐 Website:', leadData.website);
    cy.log('📱 Social Media X:', leadData.socialMediaX);
    cy.log('📱 Social Media Instagram:', leadData.socialMediaInstagram);
    cy.log('📱 Social Media Facebook:', leadData.socialMediaFacebook);
    cy.log('📱 Social Media TikTok:', leadData.socialMediaTiktok);
    cy.log('📱 Skype ID:', leadData.skypeId);
    cy.log('📊 Source:', leadData.source);
    cy.log('🏭 Sector:', leadData.sector);
    cy.log('📈 Status:', leadData.status);
    cy.log('⭐ Qualification:', leadData.qualification);
    cy.log('💰 Annual Revenue:', leadData.annualRevenue);
    cy.log('👥 Employees Count:', leadData.employeesCount);
    cy.log('📍 Address Country:', leadData.country);
    cy.log('📍 Address State:', leadData.state);
    cy.log('📍 Address City:', leadData.city);
    cy.log('📍 Address Street:', leadData.street);
    cy.log('📍 Address Postal Code:', leadData.postalCode);
    cy.log('📝 Notes:', leadData.notes);
  });

  it('should create a lead', () => {
    cy.login();
    SideNavBar.leadsTab().click();
    LeadsPage.leadsPageTitle().should('be.visible').should('contain', 'Leads');
    LeadsPage.addLeadButton().click();
    LeadsPage.addNewLeadBasicInfoTab().click();
    LeadsPage.addNewLeadFirstNameTextBox().type(leadData.firstName);
    LeadsPage.addNewLeadLastNameTextBox().type(leadData.lastName);
    LeadsPage.addNewLeadCompanyTextBox().type(leadData.company);
    LeadsPage.addNewLeadPositionTextBox().type(leadData.position);
    LeadsPage.addNewLeadEmailTextBox().type(leadData.email);
    LeadsPage.addNewLeadSecondaryEmailTextBox().type(leadData.secondaryEmail);
    LeadsPage.addNewLeadPhoneCountryCodeSelect(leadData.phoneCountryCode);
    LeadsPage.addNewLeadPhoneNumberTextBox().type(leadData.phone);
    LeadsPage.addNewLeadMobileCountryCodeSelect(leadData.mobileCountryCode);
    LeadsPage.addNewLeadMobileNumberTextBox().type(leadData.phone);
    LeadsPage.addNewLeadWebsiteTextBox().type(leadData.website);
    LeadsPage.addNewLeadSocialMediaTab().click();
    LeadsPage.addNewLeadXSocialMediaTextBox().type(leadData.socialMediaX);
    LeadsPage.addNewLeadInstagramSocialMediaTextBox().type(leadData.socialMediaInstagram);
    LeadsPage.addNewLeadFacebookSocialMediaTextBox().type(leadData.socialMediaFacebook);
    LeadsPage.addNewLeadTikTokSocialMediaTextBox().type(leadData.socialMediaTiktok);
    LeadsPage.addNewLeadSkypeSocialMediaTextBox().type(leadData.skypeId);

    LeadsPage.addNewLeadBusinessInformationTab().click();
    LeadsPage.addNewLeadBusinessSourceSelect(leadData.source);
    LeadsPage.addNewLeadBusinessSectorTextBox().type(leadData.sector);
    LeadsPage.addNewLeadBusinessAnnualRevenueTextBox().type(leadData.annualRevenue.toString());
    LeadsPage.addNewLeadBusinessEmployeesCountTextBox().type(leadData.employeesCount.toString());
    LeadsPage.addNewLeadBusinessQualificationTextBox().type(leadData.qualification.toString());
    LeadsPage.addNewLeadBusinessStatusSelect(leadData.status.toLowerCase());
    LeadsPage.addNewLeadBusinessEmailingStatusButton().click();
    LeadsPage.addNewLeadBusinessDescriptionTextBox().type(generateCompanyDescription());
    LeadsPage.addNewLeadAddressInformationTab().click();
    LeadsPage.addNewLeadAddressStreetTextBox().type(leadData.street);
    LeadsPage.addNewLeadAddressCountrySelect(leadData.country);
    LeadsPage.addNewLeadAddressStateOrProvinceSelect(leadData.state);
    LeadsPage.addNewLeadAddressCitySelect(leadData.city);
    LeadsPage.addNewLeadAddressPostalCodeTextBox().type(leadData.postalCode);
    LeadsPage.addNewLeadSaveButton().click();
    LeadsPage.successConfirmationMessage().should('contain', 'Lead created successfully');
  });

  it('verify the lead is created in the FE', () => {
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

          return false;
        }
      })
      .then(() => {
        if (!emailFound) {
          cy.log(`❌ Lead email not found in table: ${createdLeadEmail}`);
          throw new Error(`Lead with email "${createdLeadEmail}" was not found in the leads table`);
        }
      });
  });

  it('should delete the lead from the BE', () => {
    cy.log(`🗑️  Deleting lead with email: ${createdLeadEmail}`);
    cy.task('deleteLeadByEmail', createdLeadEmail).then(result => {
      if (result.deleted) {
        cy.log('✅ Lead deleted successfully');
        cy.log('📋 Deleted lead:', JSON.stringify(result.lead, null, 2));
      } else {
        cy.log('❌ Failed to delete lead - lead not found');
        expect(result.deleted).to.be.true;
      }
    });

    cy.log('🔍 Verifying lead no longer exists in database...');
    cy.task('queryLeadByEmail', createdLeadEmail).then(lead => {
      expect(lead).to.be.null;
      cy.log('✅ Lead successfully removed from database');
    });
  });
});
