const { defineConfig } = require('cypress');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dbUtils = require('./cypress/support/dbUtils.js');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const browserify = require('@cypress/browserify-preprocessor');
const { preprendTransformerToOptions } = require('@badeball/cypress-cucumber-preprocessor/browserify');

// Explicitly load .env from the project root
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.crmx.mx', // Production environment
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'CRMx Test Results',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more.
      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', browserify(preprendTransformerToOptions(config, browserify.defaultOptions)));

      // Add cypress-mochawesome-reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // Add custom Supabase query task
      on('task', {
        async querySupabase({ table, filter }) {
          const supabase = createClient(process.env.CYPRESS_SUPABASE_URL, process.env.CYPRESS_SUPABASE_ANON_KEY);
          let query = supabase.from(table).select('*');
          if (filter) {
            Object.entries(filter).forEach(([key, value]) => {
              query = query.eq(key, value);
            });
          }
          const { data, error } = await query;
          if (error) throw new Error(error.message);
          return data;
        },
        async queryOrganizations() {
          await dbUtils.connect();
          const result = await dbUtils.query('SELECT * FROM organizations;');
          await dbUtils.disconnect();
          return result.rows;
        },
        async queryProfileByEmail(email) {
          console.log(`🔌 Connecting to database to query profile for email: ${email}`);
          await dbUtils.connect();
          console.log(`🔍 Executing query for profile with email: ${email}`);
          const profile = await dbUtils.findProfileByEmail(email);
          console.log(`📊 Query result:`, profile ? 'Profile found' : 'No profile found');
          await dbUtils.disconnect();
          console.log(`🔌 Database connection closed`);
          return profile;
        },
        async deleteProfileByEmail(email) {
          console.log(`🗑️  Deleting user with email: ${email}`);
          await dbUtils.connect();

          // First, delete from auth.users table
          console.log(`🔐 Deleting from auth.users table...`);
          const authResult = await dbUtils.query('DELETE FROM auth.users WHERE email = $1 RETURNING id, email', [email]);

          // Then, delete from profiles table
          console.log(`👤 Deleting from profiles table...`);
          const profileResult = await dbUtils.query('DELETE FROM profiles WHERE email = $1 RETURNING *', [email]);

          await dbUtils.disconnect();

          const authDeleted = authResult.rows.length > 0;
          const profileDeleted = profileResult.rows.length > 0;

          console.log(`✅ Auth user deleted: ${authDeleted ? 'Yes' : 'No'}`);
          console.log(`✅ Profile deleted: ${profileDeleted ? 'Yes' : 'No'}`);

          return {
            deleted: authDeleted || profileDeleted,
            authUser: authDeleted ? authResult.rows[0] : null,
            profile: profileDeleted ? profileResult.rows[0] : null,
          };
        },
        async deleteOrganizationByName(orgName) {
          console.log(`🗑️  Deleting organization: ${orgName}`);
          await dbUtils.connect();
          const org = await dbUtils.findOrganizationByName(orgName);
          if (org) {
            const result = await dbUtils.query('DELETE FROM organizations WHERE name = $1 RETURNING *', [orgName]);
            console.log(`✅ Organization deleted:`, result.rows[0]);
            await dbUtils.disconnect();
            return { deleted: true, organization: result.rows[0] };
          } else {
            console.log(`❌ No organization found to delete: ${orgName}`);
            await dbUtils.disconnect();
            return { deleted: false, organization: null };
          }
        },
        async queryLeadByEmail(email) {
          console.log(`🔌 Connecting to database to query lead for email: ${email}`);
          await dbUtils.connect();
          console.log(`🔍 Executing query for lead with email: ${email}`);
          const lead = await dbUtils.findLeadByEmail(email);
          console.log(`📊 Query result:`, lead ? 'Lead found' : 'No lead found');
          await dbUtils.disconnect();
          console.log(`🔌 Database connection closed`);
          return lead;
        },
        async deleteLeadByEmail(email) {
          console.log(`🗑️  Deleting lead with email: ${email}`);
          await dbUtils.connect();
          const result = await dbUtils.deleteLeadByEmail(email);
          await dbUtils.disconnect();
          return result;
        },
        async queryCustomerByEmail(email) {
          console.log(`🔌 Connecting to database to query customer for email: ${email}`);
          await dbUtils.connect();
          console.log(`🔍 Executing query for customer with email: ${email}`);
          const customer = await dbUtils.findCustomerByEmail(email);
          console.log(`📊 Query result:`, customer ? 'Customer found' : 'No customer found');
          await dbUtils.disconnect();
          console.log(`🔌 Database connection closed`);
          return customer;
        },
        async deleteCustomerByEmail(email) {
          console.log(`🗑️  Deleting customer with email: ${email}`);
          await dbUtils.connect();
          const result = await dbUtils.deleteCustomerByEmail(email);
          await dbUtils.disconnect();
          return result;
        },
        async querySaleByInvoiceNumber(invoiceNumber) {
          console.log(`🔌 Connecting to database to query sale for invoice number: ${invoiceNumber}`);
          await dbUtils.connect();
          console.log(`🔍 Executing query for sale with invoice number: ${invoiceNumber}`);
          const sale = await dbUtils.findSaleByInvoiceNumber(invoiceNumber);
          console.log(`📊 Query result:`, sale ? 'Sale found' : 'No sale found');
          await dbUtils.disconnect();
          console.log(`🔌 Database connection closed`);
          return sale;
        },
        async deleteSaleByInvoiceNumber(invoiceNumber) {
          console.log(`🗑️  Deleting sale with invoice number: ${invoiceNumber}`);
          await dbUtils.connect();
          const result = await dbUtils.deleteSaleByInvoiceNumber(invoiceNumber);
          await dbUtils.disconnect();
          return result;
        },
        async queryTaskByTitle(title) {
          console.log(`🔌 Connecting to database to query task for title: ${title}`);
          await dbUtils.connect();
          console.log(`🔍 Executing query for task with title: ${title}`);
          const task = await dbUtils.findTaskByTitle(title);
          console.log(`📊 Query result:`, task ? 'Task found' : 'No task found');
          await dbUtils.disconnect();
          console.log(`🔌 Database connection closed`);
          return task;
        },
        async deleteTaskByTitle(title) {
          console.log(`🗑️  Deleting task with title: ${title}`);
          await dbUtils.connect();
          const result = await dbUtils.deleteTaskByTitle(title);
          await dbUtils.disconnect();
          return result;
        },
      });
      // Ensure environment variables are properly loaded
      config.env = {
        ...config.env,
        SUPABASE_URL: process.env.CYPRESS_SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.CYPRESS_SUPABASE_ANON_KEY,
        USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
        USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD,
        // Also include all other process.env variables
        ...process.env,
      };

      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    // Enhanced recording settings
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotOnHeadlessFailure: true,
    trashAssetsBeforeRuns: true,
    // Better error reporting
    retries: {
      runMode: 1,
      openMode: 0,
    },
    // Additional settings for better recording
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
});
