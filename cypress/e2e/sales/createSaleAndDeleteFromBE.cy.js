/// <reference types="cypress" />

import SideNavBar from '../../support/pageObjects/SideNavBar';
import SalesPage from '../../support/pageObjects/SalesPage';
import { generateSaleData } from '../../support/testDataGenerator';

describe('Create a Sale', () => {
  const customerName = 'Ricky Bobbeeey';
  const saleData = generateSaleData();

  before(() => {
    // Log the test data that will be used
    cy.log('=== Test Data Generated ===');
    cy.log(`Customer Name: ${customerName}`);
    cy.log(`Sale Amount: ${saleData.amount}`);
    cy.log(`Sale Date: ${saleData.saleDate}`);
    cy.log(`Invoice Number: ${saleData.invoiceNumber}`);
    cy.log(`Payment Status: ${saleData.paymentStatus}`);
    cy.log(`Payment Method: ${saleData.paymentMethod}`);
    cy.log(`Description: ${saleData.description}`);
    cy.log('==========================');
  });

  it('Create a Sale', () => {
    cy.login();
    SideNavBar.salesTab().click();
    SalesPage.salesPageTitle().should('be.visible').should('have.text', 'Sales');
    SalesPage.addSalesButton().click();
    SalesPage.addNewSaleModal().should('be.visible');
    SalesPage.addNewSaleCustomerSelect().select(customerName);
    SalesPage.addNewSaleAmountTextBox().type(saleData.amount.toString());
    SalesPage.addNewSaleDateTextBox().type(saleData.saleDate);
    SalesPage.addNewSaleInvoiceNumberTextBox().type(saleData.invoiceNumber);
    SalesPage.addNewSalePaymentStatusSelect().select(saleData.paymentStatus);
    SalesPage.addNewSalePaymentMethodSelect().select(saleData.paymentMethod);
    SalesPage.addNewSaleDescriptionTextBox().type(saleData.description);
    SalesPage.addNewSaleCreateButton().click();
    SalesPage.successConfirmationMessage().should('contain', 'Sale created successfully');
  });

  it('Delete a Sale from BE', () => {
    // First, verify the sale exists in the database
    cy.task('querySaleByInvoiceNumber', saleData.invoiceNumber).then(sale => {
      expect(sale).to.not.be.null;
      expect(sale.invoice_number).to.equal(saleData.invoiceNumber);
      expect(parseFloat(sale.amount)).to.equal(saleData.amount);
      expect(sale.payment_status).to.equal(saleData.paymentStatus);
      expect(sale.payment_method).to.equal(saleData.paymentMethod);

      cy.log(`✅ Sale found in database with invoice number: ${saleData.invoiceNumber}`);

      // Now delete the sale from the database
      cy.task('deleteSaleByInvoiceNumber', saleData.invoiceNumber).then(result => {
        expect(result.deleted).to.be.true;
        expect(result.sale).to.not.be.null;
        expect(result.sale.invoice_number).to.equal(saleData.invoiceNumber);

        cy.log(`✅ Sale successfully deleted from database`);

        // Verify the sale no longer exists
        cy.task('querySaleByInvoiceNumber', saleData.invoiceNumber).then(deletedSale => {
          expect(deletedSale).to.be.null;
          cy.log(`✅ Sale confirmed to be deleted from database`);
        });
      });
    });
  });
});
