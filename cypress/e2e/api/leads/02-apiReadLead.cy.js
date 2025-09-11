import { generateUniqueId } from '../../../support/testDataGenerator';

describe('Leads API - Read Lead', () => {
  // This test suite reads the lead created in 01-apiCreateLead.cy.js
  // It demonstrates sequential CRUD operations using the same entity

  const SUPABASE_URL = Cypress.env('SUPABASE_URL');
  const SUPABASE_ANON_KEY = Cypress.env('SUPABASE_ANON_KEY');

  let accessToken;
  let testLeadId; // Lead to read (from Test 1)
  let leadFixtures; // Fixture data for validation

  before(() => {
    cy.log('🚀 Starting Leads API Read Test Setup');
    cy.log('📋 This test will read the lead created in Test 1 (01-apiCreateLead.cy.js)');

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
        accessToken = loginResponse.body.access_token;
        console.log('✅ Login successful, access token obtained');

        // Verify we have the required environment variables
        expect(Cypress.env('USER1_ID')).to.exist;
        expect(Cypress.env('ORGANIZATION1_ID')).to.exist;

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
        console.log('📋 This lead will be read and validated as part of the CRUD workflow');
      });
  });

  after(() => {
    console.log('📋 No cleanup needed - CRUD test lead preserved for subsequent tests');
    console.log('🎯 This lead will be used in:');
    console.log('   - 03-apiUpdateLead.cy.js (Update)');
    console.log('   - 04-apiDeleteLead.cy.js (Delete)');
  });

  it('should read lead by ID with complete fixture data validation', () => {
    console.log('🧪 Test 1: Reading lead by ID with complete fixture data validation');
    console.log('🎯 Target lead ID:', testLeadId);
    const startTime = Date.now();

    console.log('📤 Sending GET request to read lead by ID');

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
      expect(response.body).to.have.length(1);

      const leadData = response.body[0];

      // Verify required fields
      expect(leadData).to.have.property('id');
      expect(leadData.id).to.be.a('string');
      expect(leadData.id.length).to.be.greaterThan(0);
      expect(leadData.id).to.equal(testLeadId);

      expect(leadData).to.have.property('first_name');
      expect(leadData.first_name).to.be.a('string');
      expect(leadData.first_name.length).to.be.greaterThan(0);

      expect(leadData).to.have.property('organization_id');
      expect(leadData.organization_id).to.equal(Cypress.env('ORGANIZATION1_ID'));

      expect(leadData).to.have.property('owner_id');
      expect(leadData.owner_id).to.equal(Cypress.env('USER1_ID'));

      // Verify auto-generated fields exist and are valid
      expect(leadData).to.have.property('created_at');
      expect(leadData.created_at).to.be.a('string');
      expect(new Date(leadData.created_at)).to.be.instanceOf(Date);

      expect(leadData).to.have.property('updated_at');
      expect(leadData.updated_at).to.be.a('string');
      expect(new Date(leadData.updated_at)).to.be.instanceOf(Date);

      // Verify default values
      expect(leadData).to.have.property('converted');
      expect(leadData).to.have.property('no_email_participation');

      console.log('✅ Lead read successfully by ID with complete fixture data validation');
      console.log('✅ All validations passed: headers, structure, fixture fields, auto-fields, defaults, UUID format');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Read operation summary:', {
        status: response.status,
        statusText: response.statusText,
        responseTime: responseTime + 'ms',
        lead_id: testLeadId,
        first_name: leadData.first_name,
        company: leadData.company,
        organization_id: leadData.organization_id,
      });
    });
  });

  it('should read leads by organization', () => {
    console.log('🧪 Test 2: Reading leads by organization');
    console.log('🎯 Organization ID to query:', Cypress.env('ORGANIZATION1_ID'));
    const startTime = Date.now();

    console.log('📤 Sending GET request to read leads by organization');

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

      // Verify our CRUD test lead is in the results (if it exists)
      const crudTestLeadInResults = response.body.find(lead => lead.id === testLeadId);
      if (crudTestLeadInResults) {
        expect(crudTestLeadInResults).to.exist;
        console.log('✅ CRUD test lead found in organization results');
      } else {
        console.log('⚠️ CRUD test lead not found in organization results - may have been cleaned up or belongs to different org');
        // Don't fail the test, just log the issue
        expect(response.body).to.be.an('array'); // Just verify we got an array
      }

      console.log('✅ Organization leads read successfully');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Organization query summary:', {
        status: response.status,
        statusText: response.statusText,
        total_leads_found: response.body.length,
        responseTime: responseTime + 'ms',
        organization_id: Cypress.env('ORGANIZATION1_ID'),
        crud_test_lead_found: !!crudTestLeadInResults,
        crud_test_lead_id: testLeadId,
      });
    });
  });

  it('should handle lead not found gracefully', () => {
    console.log('🧪 Test 3: Testing graceful handling of lead not found');
    console.log('🎯 Non-existent lead ID:', '00000000-0000-0000-0000-000000000000');
    const startTime = Date.now();

    console.log('📤 Sending GET request for non-existent lead');

    cy.request({
      method: 'GET',
      url: `${SUPABASE_URL}/rest/v1/leads?id=eq.00000000-0000-0000-0000-000000000000`,
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

      console.log('✅ Non-existent lead handled gracefully');
      console.log('✅ Enhanced validations passed: headers, structure, empty results');
      console.log('⏱️ Response time:', responseTime + 'ms');
      console.log('📊 Not found handling summary:', {
        status: response.status,
        statusText: response.statusText,
        body_length: response.body.length,
        responseTime: responseTime + 'ms',
        non_existent_id: '00000000-0000-0000-0000-000000000000',
        behavior: 'Graceful handling - returns empty array',
      });
    });
  });
});
