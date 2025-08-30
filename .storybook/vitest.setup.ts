import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as globalStorybookConfig from './preview';

// Set up Storybook's global configuration for tests
beforeAll(() => {
  setProjectAnnotations([globalStorybookConfig]);
});