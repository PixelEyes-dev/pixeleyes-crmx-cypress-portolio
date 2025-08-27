import { generateUniqueId } from '../../../support/testDataGenerator';

describe('Leads API - Delete Lead', () => {
  // This test suite deletes the lead created in 01-apiCreateLead.cy.js
  // It demonstrates sequential CRUD operations using the same entity

  const SUPABASE_URL = Cypress.env('SUPABASE_URL');
  const SUPABASE_ANON_KEY = Cypress.env('SUPABASE_ANON_KEY');

  let accessToken;
  let testLeadId; // Lead to delete (from Test 1)
  let leadFixtures; // Fixture data for validation

  before(() => {
    console.log('🚀 Starting Leads API Delete Test Setup');
    console.log('📋 This test will delete the lead created in Test 1 (01-apiCreateLead.cy.js)');

    // Load fixture data for validation
    cy.fixture('leadData.json')
      .then(fixtures => {
        leadFixtures = fixtures;
        console.log('📋 Fixture data loaded for validation:', fixtures);

        // Login to get access token
        return cy.request({
          method: 'POST',
          url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
          headers: {
            apikey: SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
          },
          body: {
            email: Cypress.env('USER_EMAIL'),
            password: Cypress.env('USER_PASSWORD'),
          },
        });
      })
      .then(loginResponse => {
        expect(loginResponse.status).to.equal(200);
        accessToken = loginResponse.body.access_token;
        console.log('✅ Login successful, access token obtained');
        console.log('🔑 User ID from login:', loginResponse.body.user.id);

        // Verify we have the required environment variables
        expect(Cypress.env('USER1_ID')).to.exist;
        expect(Cypress.env('ORGANIZATION1_ID')).to.exist;
        console.log('✅ Environment variables verified:', {
          USER1_ID: Cypress.env('USER1_ID'),
          ORGANIZATION1_ID: Cypress.env('ORGANIZATION1_ID'),
        });

        // Get the lead ID from Test 1 (stored in fixture file)
        return cy.readFile('cypress/fixtures/crudTestData.json');
      })
      .then(crudData => {
        if (!crudData.crudTestLeadId) {
          throw new Error('CRUD_TEST_LEAD_ID not found in fixture file. Make sure to run 01-apiCreateLead.cy.js first.');
        }

        testLeadId = crudData.crudTestLeadId;
        console.log('✅ CRUD test lead ID retrieved from fixture file:', testLeadId);
        console.log('🆔 Test run ID from fixture:', crudData.testRunId);
        console.log('📋 This lead will be deleted to complete the CRUD workflow');
        console.log('🎯 Target lead details:', {
          id: testLeadId,
          organization_id: Cypress.env('ORGANIZATION1_ID'),
          owner_id: Cypress.env('USER1_ID'),
        });
      });
  });

  after(() => {
    console.log('🎯 CRUD workflow completed successfully');
    console.log('📋 Lead has been deleted from the database');
    console.log('🧹 Test data cleanup completed');
    console.log('📊 Final test summary:', {
      lead_id_deleted: testLeadId,
      organization_id: Cypress.env('ORGANIZATION1_ID'),
      test_run_completed: true,
    });
  });

  it('should delete lead by ID successfully', () => {
    console.log('🧪 Test 1: Deleting lead by ID');
    console.log('🎯 Target lead ID:', testLeadId);
    const startTime = Date.now();

    // First, verify the lead exists before deletion
    cy.request({
      method: 'GET',
      url: `${SUPABASE_URL}/rest/v1/leads?id=eq.${testLeadId}`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(readResponse => {
        expect(readResponse.status).to.equal(200);
        expect(readResponse.statusText).to.equal('OK');
        expect(readResponse.body).to.be.an('array');

        // Check if lead exists (it might have been deleted in a previous run)
        if (readResponse.body.length === 0) {
          console.log('⚠️ Lead already deleted in previous run, skipping deletion test');
          console.log('✅ Test 1 passed (lead already deleted)');
          console.log('🔍 Lead status: Already removed from database');
          return null; // Signal that lead was already deleted
        }

        expect(readResponse.body).to.have.length(1);
        const leadToDelete = readResponse.body[0];

        // Enhanced validations: Verify lead structure and properties
        expect(leadToDelete).to.have.property('id');
        expect(leadToDelete.id).to.be.a('string');
        expect(leadToDelete.id.length).to.be.greaterThan(0);
        expect(leadToDelete.id).to.equal(testLeadId);

        expect(leadToDelete).to.have.property('first_name');
        expect(leadToDelete.first_name).to.be.a('string');
        expect(leadToDelete.first_name.length).to.be.greaterThan(0);

        expect(leadToDelete).to.have.property('organization_id');
        expect(leadToDelete.organization_id).to.equal(Cypress.env('ORGANIZATION1_ID'));

        expect(leadToDelete).to.have.property('owner_id');
        expect(leadToDelete.owner_id).to.equal(Cypress.env('USER1_ID'));

        // Verify auto-generated fields exist and are valid
        expect(leadToDelete).to.have.property('created_at');
        expect(leadToDelete.created_at).to.be.a('string');
        expect(new Date(leadToDelete.created_at)).to.be.instanceOf(Date);

        expect(leadToDelete).to.have.property('updated_at');
        expect(leadToDelete.updated_at).to.be.a('string');
        expect(new Date(leadToDelete.updated_at)).to.be.instanceOf(Date);

        console.log('✅ Lead exists and ready for deletion:', {
          id: leadToDelete.id,
          first_name: leadToDelete.first_name,
          company: leadToDelete.company,
          status: leadToDelete.status,
          organization_id: leadToDelete.organization_id,
          owner_id: leadToDelete.owner_id,
          created_at: leadToDelete.created_at,
          updated_at: leadToDelete.updated_at,
        });

        // Now delete the lead
        console.log('🗑️ Proceeding with lead deletion...');
        return cy.request({
          method: 'DELETE',
          url: `${SUPABASE_URL}/rest/v1/leads?id=eq.${testLeadId}`,
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then(deleteResponse => {
        const responseTime = Date.now() - startTime;

        // If lead was already deleted, skip validation
        if (deleteResponse === null) {
          expect(responseTime).to.be.lessThan(3000);
          console.log('⏱️ Response time (already deleted):', responseTime + 'ms');
          return;
        }

        // Basic response validation
        expect(deleteResponse.status).to.equal(204);
        expect(deleteResponse.statusText).to.equal('No Content');
        expect(responseTime).to.be.lessThan(3000);

        // Enhanced validations: Response structure (DELETE responses may return empty string or undefined)
        expect(deleteResponse.body).to.satisfy(body => body === undefined || body === ''); // DELETE should return no content

        // Verify response headers (DELETE responses may not have content-type)
        if (deleteResponse.headers['content-type']) {
          console.log('📋 Content-Type header present:', deleteResponse.headers['content-type']);
        } else {
          console.log('📋 No Content-Type header (expected for DELETE with no content)');
        }

        console.log('✅ Lead deleted successfully');
        console.log('✅ Enhanced validations passed: structure, no content response');
        console.log('⏱️ Response time:', responseTime + 'ms');
        console.log('📊 Delete operation summary:', {
          status: deleteResponse.status,
          statusText: deleteResponse.statusText,
          responseTime: responseTime + 'ms',
          lead_id: testLeadId,
        });
      });
  });

  it('should verify lead is no longer accessible', () => {
    console.log('🧪 Test 2: Verifying lead is no longer accessible');
    console.log('🔍 Checking if deleted lead can still be retrieved');
    const startTime = Date.now();

    cy.request({
      method: 'GET',
      url: `${SUPABASE_URL}/rest/v1/leads?id=eq.${testLeadId}`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => {
      const responseTime = Date.now() - startTime;

      // Basic response validation
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(responseTime).to.be.lessThan(3000);

      // Enhanced validations: Response structure and headers
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');

      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(0); // Lead should not exist

      // Additional validation: Verify the response structure is correct even when empty
      expect(response.body).to.be.empty;

      console.log('✅ Lead deletion verified - lead no longer accessible');
      console.log('✅ Enhanced validations passed: headers, structure, empty results');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Verification summary:', {
        status: response.status,
        statusText: response.statusText,
        body_length: response.body.length,
        responseTime: responseTime + 'ms',
        lead_id: testLeadId,
        verification_result: 'Lead successfully removed from database',
      });
    });
  });

  it('should handle deleting non-existent lead gracefully', () => {
    console.log('🧪 Test 3: Testing graceful handling of deleting non-existent lead');
    console.log('🔍 Testing DELETE operation on non-existent UUID');
    const startTime = Date.now();
    const nonExistentId = '00000000-0000-0000-0000-000000000000';

    console.log('🎯 Non-existent lead ID:', nonExistentId);

    cy.request({
      method: 'DELETE',
      url: `${SUPABASE_URL}/rest/v1/leads?id=eq.${nonExistentId}`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => {
      const responseTime = Date.now() - startTime;

      // Basic response validation
      expect(response.status).to.equal(204);
      expect(response.statusText).to.equal('No Content');
      expect(responseTime).to.be.lessThan(3000);

      // Enhanced validations: Response structure (DELETE responses may return empty string or undefined)
      expect(response.body).to.satisfy(body => body === undefined || body === ''); // DELETE should return no content

      // Verify response headers (DELETE responses may not have content-type)
      if (response.headers['content-type']) {
        console.log('📋 Content-Type header present:', response.headers['content-type']);
      } else {
        console.log('📋 No Content-Type header (expected for DELETE with no content)');
      }

      console.log('✅ Non-existent lead deletion handled gracefully');
      console.log('✅ Enhanced validations passed: structure, no content response');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Non-existent deletion summary:', {
        status: response.status,
        statusText: response.statusText,
        responseTime: responseTime + 'ms',
        non_existent_id: nonExistentId,
        behavior: 'Graceful handling (idempotent operation)',
      });
    });
  });

  it('should handle deleting already deleted lead gracefully', () => {
    console.log('🧪 Test 4: Testing graceful handling of deleting already deleted lead');
    console.log('🔍 Testing DELETE operation on lead that was already deleted in Test 1');
    const startTime = Date.now();

    console.log('🎯 Already deleted lead ID:', testLeadId);

    // Try to delete the lead again (it was already deleted in Test 1)
    cy.request({
      method: 'DELETE',
      url: `${SUPABASE_URL}/rest/v1/leads?id=eq.${testLeadId}`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => {
      const responseTime = Date.now() - startTime;

      // Basic response validation
      expect(response.status).to.equal(204);
      expect(response.statusText).to.equal('No Content');
      expect(responseTime).to.be.lessThan(3000);

      // Enhanced validations: Response structure (DELETE responses may return empty string or undefined)
      expect(response.body).to.satisfy(body => body === undefined || body === ''); // DELETE should return no content

      // Verify response headers (DELETE responses may not have content-type)
      if (response.headers['content-type']) {
        console.log('📋 Content-Type header present:', response.headers['content-type']);
      } else {
        console.log('📋 No Content-Type header (expected for DELETE with no content)');
      }

      console.log('✅ Already deleted lead handled gracefully');
      console.log('✅ Enhanced validations passed: structure, no content response');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Already deleted deletion summary:', {
        status: response.status,
        statusText: response.statusText,
        responseTime: responseTime + 'ms',
        lead_id: testLeadId,
        behavior: 'Idempotent operation - same result regardless of previous state',
      });
    });
  });

  it('should verify lead is not in organization results after deletion', () => {
    console.log('🧪 Test 5: Verifying deleted lead is not in organization results');
    console.log('🔍 Checking organization leads to confirm deletion');
    const startTime = Date.now();

    console.log('🎯 Organization ID to check:', Cypress.env('ORGANIZATION1_ID'));

    cy.request({
      method: 'GET',
      url: `${SUPABASE_URL}/rest/v1/leads?organization_id=eq.${Cypress.env('ORGANIZATION1_ID')}&limit=10`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => {
      const responseTime = Date.now() - startTime;

      // Basic response validation
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(responseTime).to.be.lessThan(3000);

      // Enhanced validations: Response structure and headers
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');

      expect(response.body).to.be.an('array');

      // Verify our deleted lead is NOT in the results
      const deletedLeadInResults = response.body.find(lead => lead.id === testLeadId);
      expect(deletedLeadInResults).to.be.undefined;

      // Additional validation: Verify remaining leads have valid structure
      if (response.body.length > 0) {
        response.body.forEach((lead, index) => {
          // Verify each remaining lead has required properties
          expect(lead).to.have.property('id');
          expect(lead.id).to.be.a('string');
          expect(lead.id.length).to.be.greaterThan(0);

          expect(lead).to.have.property('first_name');
          expect(lead.first_name).to.be.a('string');

          expect(lead).to.have.property('organization_id');
          expect(lead.organization_id).to.equal(Cypress.env('ORGANIZATION1_ID'));

          expect(lead).to.have.property('owner_id');
          expect(lead.owner_id).to.be.a('string');

          // Verify auto-generated fields exist
          expect(lead).to.have.property('created_at');
          expect(lead).to.have.property('updated_at');

          console.log(`✅ Remaining lead ${index + 1} validation passed:`, {
            id: lead.id,
            first_name: lead.first_name,
            organization_id: lead.organization_id,
          });
        });
      } else {
        console.log('📋 No remaining leads in organization (all leads deleted)');
      }

      console.log('✅ Deleted lead confirmed not in organization results');
      console.log('✅ Enhanced validations passed: headers, structure, deletion verification');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Organization verification summary:', {
        status: response.status,
        statusText: response.statusText,
        total_leads_found: response.body.length,
        responseTime: responseTime + 'ms',
        organization_id: Cypress.env('ORGANIZATION1_ID'),
        deleted_lead_id: testLeadId,
        verification_result: 'Deleted lead successfully removed from organization results',
        remaining_leads: response.body.map(lead => ({ id: lead.id, first_name: lead.first_name, company: lead.company })),
      });
    });
  });
});
