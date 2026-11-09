import { test as base } from '@playwright/test';
import { AIClient } from '../utils/aiClient';

type MyFixtures = { ai: AIClient; };
export const test = base.extend<MyFixtures>({
  ai: async ({}, use) => {
    const aiClient = new AIClient();
    await use(aiClient);
  },
});
export { expect } from '@playwright/test';