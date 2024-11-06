import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,

    clearMocks: true,

    isolate: true,

    coverage: {
      extension: ['.ts'],
      exclude: ['**/src/**/index.ts', ...coverageConfigDefaults.exclude],
      reporter: ['lcov', 'text-summary'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },

    expect: {
      requireAssertions: true,
    },

    typecheck: {
      enabled: false,
    },
  },
});
