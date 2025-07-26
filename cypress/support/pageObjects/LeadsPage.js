class LeadsPage {
  leadsPageTitle() {
    return cy.get("#leadsTitle");
  }
  addLeadButton() {
    return cy.get("#addLeadButton");
  }
  addNewLeadBasicInfoTab() {
    return cy.get("#lead-tab-basic");
  }
  addNewLeadSocialMediaTab() {
    return cy.get("#lead-tab-social");
  }
  addNewLeadBusinessInformationTab() {
    return cy.get("#lead-tab-business");
  }
  addNewLeadAddressInformationTab() {
    return cy.get("#lead-tab-address");
  }
  addNewLeadFirstNameTextBox() {
    return cy.get("#lead-input-first-name");
  }
  addNewLeadLastNameTextBox() {
    return cy.get("#lead-input-last-name");
  }
  addNewLeadCompanyTextBox() {
    return cy.get("#lead-input-company");
  }
  addNewLeadPositionTextBox() {
    return cy.get("#lead-input-position");
  }
  addNewLeadEmailTextBox() {
    return cy.get("#lead-input-email");
  }
  addNewLeadSecondaryEmailTextBox() {
    return cy.get("#lead-input-secondary-email");
  }
  addNewLeadPhoneCountryCodeSelect(countryCode) {
    cy.get("#lead-input-phone-country").select(countryCode);
  }
  addNewLeadPhoneNumberTextBox() {
    return cy.get("#lead-input-phone");
  }
  addNewLeadMobileCountryCodeSelect(countryCode) {
    cy.get("#lead-input-mobile-country").select(countryCode);
  }
  addNewLeadMobileNumberTextBox() {
    return cy.get("#lead-input-mobile");
  }
  addNewLeadWebsiteTextBox() {
    return cy.get("#lead-input-website");
  }
  addNewLeadXSocialMediaTextBox() {
    return cy.get("#lead-input-x");
  }
  addNewLeadInstagramSocialMediaTextBox() {
    return cy.get("#lead-input-instagram");
  }
  addNewLeadFacebookSocialMediaTextBox() {
    return cy.get("#lead-input-facebook");
  }
  addNewLeadTikTokSocialMediaTextBox() {
    return cy.get("#lead-input-tiktok");
  }
  addNewLeadSkypeSocialMediaTextBox() {
    return cy.get("#lead-input-skype-id");
  }
  addNewLeadBusinessSourceSelect(sourceLabel) {
    cy.get("#lead-input-source").select(sourceLabel);
  }
  addNewLeadBusinessSectorTextBox() {
    return cy.get("#lead-input-sector");
  }
  addNewLeadBusinessStatusSelect(statusLabel) {
    cy.get("#lead-input-status").select(statusLabel);
  }
  addNewLeadBusinessAnnualRevenueTextBox() {
    return cy.get("#lead-input-annual-revenue");
  }
  addNewLeadBusinessEmployeesCountTextBox() {
    return cy.get("#lead-input-employees-count");
  }
  addNewLeadBusinessQualificationTextBox() {
    return cy.get("#lead-input-qualification");
  }
  addNewLeadBusinessEmailingStatusButton() {
    return cy.get("#lead-input-no-email-participation");
  }
  addNewLeadBusinessDescriptionTextBox() {
    return cy.get("#lead-input-description");
  }
  addNewLeadAddressStreetTextBox() {
    return cy.get("#lead-input-street");
  }
  addNewLeadAddressCountrySelect(countryName) {
    cy.get("#lead-input-country").select(countryName);
    // Wait for state dropdown to be enabled and have options
    cy.get("#lead-input-state-province").should("not.be.disabled");
    cy.get("#lead-input-state-province option").should(
      "have.length.greaterThan",
      1
    );
  }
  addNewLeadAddressStateOrProvinceSelect(stateName) {
    cy.get("#lead-input-state-province").select(stateName);
    // Wait for city dropdown to be enabled and have options
    cy.get("#lead-input-city").should("not.be.disabled");
    cy.get("#lead-input-city option").should("have.length.greaterThan", 1);
  }
  addNewLeadAddressCitySelect(cityName) {
    cy.get("#lead-input-city").select(cityName);
  }
  addNewLeadAddressPostalCodeTextBox() {
    return cy.get("#lead-input-postal-code");
  }
  addNewLeadSaveButton() {
    return cy.get("#lead-btn-save");
  }
  addNewLeadCancelButton() {
    return cy.get("#lead-btn-cancel");
  }
  successConfirmationMessage() {
    return cy.get('li[role="status"]');
  }
  actionsButton() {
    return cy.get("#lead-actions");
  }
  deleteLeadButton() {
    return cy.get("#leadDeleteMenuItem");
  }
  convertLeadToCustomerButton() {
    return cy.get("#leadConvertMenuItem");
  }
  editLeadButton() {
    return cy.get("#leadEditMenuItem");
  }
  viewLeadDetailsButton() {
    return cy.get("#leadViewDetailsMenuItem");
  }
  confirmDeleteLeadButton() {
    return cy.get("#confirmDeleteLeadButton");
  }
  leadEditTitle() {
    return cy.get("#leadEditTitle");
  }
  convertLeadToCustomerTitle() {
    return cy.get("#convertLeadDialogTitle");
  }
  convertLeadToCustomerSaveButton() {
    return cy.get("#customer-btn-save");
  }
}

export default new LeadsPage();
