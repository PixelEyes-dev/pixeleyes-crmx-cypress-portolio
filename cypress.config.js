const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      userEmail: process.env.CYPRESS_USER_EMAIL,
      userPassword: process.env.CYPRESS_USER_PASSWORD,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
