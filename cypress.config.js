const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.crmx.mx", // Production environment
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      prodUrl: "https://www.crmx.mx",
      CYPRESS_USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
      CYPRESS_USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
