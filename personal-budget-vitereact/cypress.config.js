import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      pluginsFile: false
    },
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    env: {
      "IMAGE_SNAPSHOT": "cypress/snapshots"
    },
  },
})
