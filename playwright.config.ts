import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.TEST_TARGET) {
  dotenv.config({
    path: path.resolve(__dirname, './tests', `.env.${process.env.TEST_TARGET}`),
  });
}

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  outputDir: 'tests-output',
  expect: {
    timeout: 10000,
  },
  webServer: {
    command: 'yarn start:e2e',
    port: 3000,
  },
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    browserName: 'chromium',
    screenshot: 'on',
  },
};

export default config;
