/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import CustomersPage from '../../support/pageObjects/CustomersPage';
import { generateCustomerData, generateRandomParagraph } from '../../support/testDataGenerator';

describe('Create a new Customer', () => {
  let customerData;
  let createdCustomerEmail;

  before(() => {
    customerData = generateCustomerData();
    createdCustomerEmail = customerData.email;

    // Log all generated test data
    cy.log('🎯 Generated Test Data:');
    cy.log('📧 Email:', customerData.email);
    cy.log('👤 Name:', `${customerData.firstName} ${customerData.lastName}`);
    cy.log('🏢 Company:', customerData.company);
    cy.log('💼 Position:', customerData.position);
    cy.log('📧 Secondary Email:', customerData.secondaryEmail);
    cy.log('📱 Phone:', customerData.phone);
    cy.log('📱 Mobile:', customerData.mobile);
    cy.log('📱 Phone Country Code:', customerData.phoneCountryCode);
    cy.log('📱 Mobile Country Code:', customerData.mobileCountryCode);
    cy.log('🌐 Website:', customerData.website);
    cy.log('📱 Social Media X:', customerData.socialMediaX);
    cy.log('📱 Social Media Instagram:', customerData.socialMediaInstagram);
    cy.log('📱 Social Media Facebook:', customerData.socialMediaFacebook);
    cy.log('📱 Social Media TikTok:', customerData.socialMediaTiktok);
    cy.log('📱 Skype ID:', customerData.skypeId);
    cy.log('📊 Source:', customerData.source);
    cy.log('🏭 Sector:', customerData.industry);
    cy.log('📈 Status:', customerData.status);
    cy.log('⭐ Qualification:', customerData.qualification);
    cy.log('💰 Annual Revenue:', customerData.annualRevenue);
    cy.log('👥 Employees Count:', customerData.employeesCount);
    cy.log('📍 Address Country:', customerData.country);
    cy.log('📍 Address State:', customerData.state);
    cy.log('📍 Address City:', customerData.city);
    cy.log('📍 Address Street:', customerData.street);
    cy.log('📍 Address Postal Code:', customerData.postalCode);
    cy.log('📝 Description:', customerData.description);
  });

  it('should create a new customer', () => {
    cy.login();
    SideNavBar.customersTab().click();
    CustomersPage.customersPageTitle().should('be.visible').should('have.text', 'Customers');
    CustomersPage.addCustomerButton().click();
    CustomersPage.addNewCustomerBasicInfoTab().click();
    CustomersPage.addNewCustomerFirstNameTextBox().type(customerData.firstName);
    CustomersPage.addNewCustomerLastNameTextBox().type(customerData.lastName);
    CustomersPage.addNewCustomerCompanyTextBox().type(customerData.company);
    CustomersPage.addNewCustomerPositionTextBox().type(customerData.position);
    CustomersPage.addNewCustomerEmailTextBox().type(customerData.email);
    CustomersPage.addNewCustomerSecondaryEmailTextBox().type(customerData.secondaryEmail);
    CustomersPage.addNewCustomerPhoneCountryCodeSelect(customerData.phoneCountryCode);
    CustomersPage.addNewCustomerPhoneNumberTextBox().type(customerData.phone);
    CustomersPage.addNewCustomerMobileCountryCodeSelect(customerData.mobileCountryCode);
    CustomersPage.addNewCustomerMobileNumberTextBox().type(customerData.mobile);
    CustomersPage.addNewCustomerWebsiteTextBox().type(customerData.website);
    CustomersPage.addNewCustomerSocialMediaTab().click();
    CustomersPage.addNewCustomerXSocialMediaTextBox().type(customerData.socialMediaX);
    CustomersPage.addNewCustomerInstagramSocialMediaTextBox().type(customerData.socialMediaInstagram);
    CustomersPage.addNewCustomerFacebookSocialMediaTextBox().type(customerData.socialMediaFacebook);
    CustomersPage.addNewCustomerTikTokSocialMediaTextBox().type(customerData.socialMediaTiktok);
    CustomersPage.addNewCustomerSkypeSocialMediaTextBox().type(customerData.skypeId);
    CustomersPage.addNewCustomerBusinessInformationTab().click();
    CustomersPage.addNewCustomerBusinessSourceSelect(customerData.source);
    CustomersPage.addNewCustomerBusinessSectorTextBox().type(customerData.industry);
    CustomersPage.addNewCustomerBusinessStatusSelect(customerData.status);
    CustomersPage.addNewCustomerBusinessAnnualRevenueTextBox().type(customerData.annualRevenue.toString());
    CustomersPage.addNewCustomerBusinessEmployeesCountTextBox().type(customerData.employeesCount.toString());
    CustomersPage.addNewCustomerBusinessQualificationTextBox().type(customerData.qualification.toString());
    CustomersPage.addNewCustomerBusinessEmailingStatusButton().click();
    CustomersPage.addNewCustomerBusinessDescriptionTextBox().type(customerData.description);
    CustomersPage.addNewCustomerAddressInformationTab().click();
    CustomersPage.addNewCustomerAddressStreetTextBox().type(customerData.street);
    CustomersPage.addNewCustomerAddressCountrySelect(customerData.country);
    CustomersPage.addNewCustomerAddressStateOrProvinceSelect(customerData.state);
    CustomersPage.addNewCustomerAddressCitySelect(customerData.city);
    CustomersPage.addNewCustomerAddressPostalCodeTextBox().type(customerData.postalCode);
    CustomersPage.addNewCustomerSaveButton().click();
    CustomersPage.successConfirmationMessage().should('contain', 'Customer created successfully');
  });

  it('verify the customer is created in the FE', () => {
    cy.login();
    SideNavBar.customersTab().click();
    CustomersPage.customersPageTitle().should('be.visible').should('have.text', 'Customers');
    let emailFound = false;
    cy.get('tr td:nth-child(4)')
      .each(($el, index, $list) => {
        const emailText = $el.text().trim();
        if (emailText === createdCustomerEmail) {
          emailFound = true;
          cy.log(`✅ Found customer email in row ${index + 1}: ${emailText}`);

          return false;
        }
      })
      .then(() => {
        if (!emailFound) {
          cy.log(`❌ Customer email not found in table: ${createdCustomerEmail}`);
          throw new Error(`Customer with email "${createdCustomerEmail}" was not found in the customers table`);
        }
      });
  });

  it('should delete the customer from the BE', () => {
    cy.log(`🗑️  Deleting customer with email: ${createdCustomerEmail}`);
    cy.task('deleteCustomerByEmail', createdCustomerEmail).then(result => {
      if (result.deleted) {
        cy.log('✅ Customer deleted successfully');
        cy.log('📋 Deleted customer:', JSON.stringify(result.customer, null, 2));
      } else {
        cy.log('❌ Failed to delete customer - customer not found');
        expect(result.deleted).to.be.true;
      }
    });

    cy.log('🔍 Verifying customer no longer exists in database...');
    cy.task('queryCustomerByEmail', createdCustomerEmail).then(customer => {
      expect(customer).to.be.null;
      cy.log('✅ Customer successfully removed from database');
    });
  });
});
