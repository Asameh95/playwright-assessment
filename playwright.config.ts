import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
  use: {
    baseURL: process.env.BASE_URL,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
