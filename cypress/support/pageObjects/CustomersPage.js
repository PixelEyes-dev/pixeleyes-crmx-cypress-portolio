class CustomersPage {
  customersPageTitle() {
    return cy.get('#customersHeaderText');
  }
  actionsButton() {
    return cy.get('#customer-actions');
  }
  editCustomerButton() {
    return cy.get('#customerEditMenuItem');
  }
  viewCustomerDetailsButton() {
    return cy.get('#customerViewDetailsMenuItem');
  }
  deleteCustomerButton() {
    return cy.get('#customerDeleteMenuItem');
  }
  confirmDeleteCustomerButton() {
    return cy.get('#confirmDeleteButton');
  }
  successConfirmationMessage() {
    return cy.get('li[role="status"]');
  }
  addCustomerButton() {
    return cy.get('#addCustomerButton');
  }
  addNewCustomerBasicInfoTab() {
    return cy.get('#customer-tab-basic');
  }
  addNewCustomerSocialMediaTab() {
    return cy.get('#customer-tab-social');
  }
  addNewCustomerBusinessInformationTab() {
    return cy.get('#customer-tab-business');
  }
  addNewCustomerAddressInformationTab() {
    return cy.get('#customer-tab-address');
  }
  addNewCustomerFirstNameTextBox() {
    return cy.get('#customer-input-first-name');
  }
  addNewCustomerLastNameTextBox() {
    return cy.get('#customer-input-last-name');
  }
  addNewCustomerCompanyTextBox() {
    return cy.get('#customer-input-company');
  }
  addNewCustomerPositionTextBox() {
    return cy.get('#customer-input-position');
  }
  addNewCustomerEmailTextBox() {
    return cy.get('#customer-input-email');
  }
  addNewCustomerSecondaryEmailTextBox() {
    return cy.get('#customer-input-secondary-email');
  }
  addNewCustomerPhoneCountryCodeSelect(countryCode) {
    cy.get('#customer-input-phone-country').select(countryCode);
  }
  addNewCustomerPhoneNumberTextBox() {
    return cy.get('#customer-input-phone');
  }
  addNewCustomerMobileCountryCodeSelect(countryCode) {
    cy.get('#customer-input-mobile-country').select(countryCode);
  }
  addNewCustomerMobileNumberTextBox() {
    return cy.get('#customer-input-mobile');
  }
  addNewCustomerWebsiteTextBox() {
    return cy.get('#customer-input-website');
  }
  addNewCustomerXSocialMediaTextBox() {
    return cy.get('#customer-input-x');
  }
  addNewCustomerInstagramSocialMediaTextBox() {
    return cy.get('#customer-input-instagram');
  }
  addNewCustomerFacebookSocialMediaTextBox() {
    return cy.get('#customer-input-facebook');
  }
  addNewCustomerTikTokSocialMediaTextBox() {
    return cy.get('#customer-input-tiktok');
  }
  addNewCustomerSkypeSocialMediaTextBox() {
    return cy.get('#customer-input-skype-id');
  }
  addNewCustomerBusinessSourceSelect(sourceLabel) {
    cy.get('#customer-input-source').select(sourceLabel);
  }
  addNewCustomerBusinessSectorTextBox() {
    return cy.get('#customer-input-sector');
  }
  addNewCustomerBusinessStatusSelect(statusLabel) {
    cy.get('#customer-input-status').select(statusLabel);
  }
  addNewCustomerBusinessAnnualRevenueTextBox() {
    return cy.get('#customer-input-annual-revenue');
  }
  addNewCustomerBusinessEmployeesCountTextBox() {
    return cy.get('#customer-input-employees-count');
  }
  addNewCustomerBusinessQualificationTextBox() {
    return cy.get('#customer-input-qualification');
  }
  addNewCustomerBusinessEmailingStatusButton() {
    return cy.get('#customer-input-no-email-participation');
  }
  addNewCustomerBusinessDescriptionTextBox() {
    return cy.get('#customer-input-description');
  }
  addNewCustomerBusinessSourceSelect(sourceLabel) {
    cy.get('#customer-input-source').select(sourceLabel);
  }
  addNewCustomerBusinessSectorTextBox() {
    return cy.get('#customer-input-sector');
  }
  addNewCustomerBusinessStatusSelect(statusLabel) {
    cy.get('#customer-input-status').select(statusLabel);
  }
  addNewCustomerBusinessAnnualRevenueTextBox() {
    return cy.get('#customer-input-annual-revenue');
  }
  addNewCustomerBusinessEmployeesCountTextBox() {
    return cy.get('#customer-input-employees-count');
  }
  addNewCustomerBusinessQualificationTextBox() {
    return cy.get('#customer-input-qualification');
  }
  addNewCustomerBusinessEmailingStatusButton() {
    return cy.get('#customer-input-no-email-participation');
  }
  addNewCustomerBusinessDescriptionTextBox() {
    return cy.get('#customer-input-description');
  }
  addNewCustomerAddressStreetTextBox() {
    return cy.get('#customer-input-street');
  }
  addNewCustomerAddressCountrySelect(countryName) {
    cy.get('#customer-input-country').select(countryName);
    // Wait for state dropdown to be enabled and have options
    cy.get('#customer-input-state-province').should('not.be.disabled');
    cy.get('#customer-input-state-province option').should('have.length.greaterThan', 1);
  }
  addNewCustomerAddressStateOrProvinceSelect(stateName) {
    cy.get('#customer-input-state-province').select(stateName);
    // Wait for city dropdown to be enabled and have options
    cy.get('#customer-input-city').should('not.be.disabled');
    cy.get('#customer-input-city option').should('have.length.greaterThan', 1);
  }
  addNewCustomerAddressCitySelect(cityName) {
    cy.get('#customer-input-city').select(cityName);
  }
  addNewCustomerAddressPostalCodeTextBox() {
    return cy.get('#customer-input-postal-code');
  }
  addNewCustomerSaveButton() {
    return cy.get('#customer-btn-save');
  }
  addNewCustomerCancelButton() {
    return cy.get('#customer-btn-cancel');
  }
  editCustomerTitle() {
    return cy.get('#editCustomerTitle');
  }
}

export default new CustomersPage();
