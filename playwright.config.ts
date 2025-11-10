import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 60000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:5173',
    ignoreHTTPSErrors: true,
  },
};

export default config;
