import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    globals: true,            // Enables global test functions like describe, it
    environment: 'happy-dom',  // Use 'happy-dom' or 'jsdom' as the environment
    setupFiles: './vitest.setup.ts', // Path to global setup file
    coverage: {
      reporter: ['text', 'json', 'html'],  // Enables test coverage reports
    },
  },
});