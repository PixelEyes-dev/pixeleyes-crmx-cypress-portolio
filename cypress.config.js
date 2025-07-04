const { defineConfig } = require("cypress");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const dbUtils = require("./cypress/support/dbUtils.cjs");

// Explicitly load .env from the project root
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.crmx.mx", // Production environment
    setupNodeEvents(on, config) {
      // Add custom Supabase query task
      on("task", {
        async querySupabase({ table, filter }) {
          const supabase = createClient(
            process.env.CYPRESS_SUPABASE_URL,
            process.env.CYPRESS_SUPABASE_ANON_KEY
          );
          let query = supabase.from(table).select("*");
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
          const result = await dbUtils.query("SELECT * FROM organizations;");
          await dbUtils.disconnect();
          return result.rows;
        },
        async queryProfileByEmail(email) {
          console.log(
            `🔌 Connecting to database to query profile for email: ${email}`
          );
          await dbUtils.connect();
          console.log(`🔍 Executing query for profile with email: ${email}`);
          const profile = await dbUtils.findProfileByEmail(email);
          console.log(
            `📊 Query result:`,
            profile ? "Profile found" : "No profile found"
          );
          await dbUtils.disconnect();
          console.log(`🔌 Database connection closed`);
          return profile;
        },
        async deleteProfileByEmail(email) {
          console.log(`🗑️  Deleting user with email: ${email}`);
          await dbUtils.connect();

          // First, delete from auth.users table
          console.log(`🔐 Deleting from auth.users table...`);
          const authResult = await dbUtils.query(
            "DELETE FROM auth.users WHERE email = $1 RETURNING id, email",
            [email]
          );

          // Then, delete from profiles table
          console.log(`👤 Deleting from profiles table...`);
          const profileResult = await dbUtils.query(
            "DELETE FROM profiles WHERE email = $1 RETURNING *",
            [email]
          );

          await dbUtils.disconnect();

          const authDeleted = authResult.rows.length > 0;
          const profileDeleted = profileResult.rows.length > 0;

          console.log(`✅ Auth user deleted: ${authDeleted ? "Yes" : "No"}`);
          console.log(`✅ Profile deleted: ${profileDeleted ? "Yes" : "No"}`);

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
            const result = await dbUtils.query(
              "DELETE FROM organizations WHERE name = $1 RETURNING *",
              [orgName]
            );
            console.log(`✅ Organization deleted:`, result.rows[0]);
            await dbUtils.disconnect();
            return { deleted: true, organization: result.rows[0] };
          } else {
            console.log(`❌ No organization found to delete: ${orgName}`);
            await dbUtils.disconnect();
            return { deleted: false, organization: null };
          }
        },
      });
      config.env = {
        ...config.env,
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
