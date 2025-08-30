import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // Main test configuration
  './vitest.config.ts',
  // Storybook test configuration
  {
    extends: './vitest.config.ts',
    test: {
      name: 'storybook',
      setupFiles: ['./.storybook/vitest.setup.ts'],
      include: ['src/**/*.stories.tsx'],
    },
  },
]);