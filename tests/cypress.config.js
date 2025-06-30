const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://frontend', // Matches your Docker service name
    env: {
      apiUrl: 'http://backend:3001' // Add this for API requests
    },
    supportFile: 'cypress/support/e2e.js',
    video: false,
    defaultCommandTimeout: 8000,
  },
});