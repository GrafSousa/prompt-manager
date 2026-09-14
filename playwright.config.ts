import { config } from 'dotenv';
import { randomUUID } from 'node:crypto';

import { envSchema } from '@/infra/env/env';
import { defineConfig, devices } from '@playwright/test';

config({ path: '.env' });
config({ path: '.env.test', override: true });

const env = envSchema.parse(process.env);

const PORT = env.PORT ?? '3000';
const BASE_URL = `http://localhost:${PORT}`;

export const schemaId = process.env.E2E_SCHEMA_ID ?? randomUUID();

const databaseURL = env.DATABASE_URL;

export default defineConfig({
  testDir: './src/app',
  testMatch: '*.e2e-spec.ts',
  globalTeardown: './src/infra/test/e2e/teardown-e2e.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    wait: {
      stdout: /Ready in/,
    },
    timeout: 180 * 1000,
    reuseExistingServer: false,
    env: {
      ...process.env,
      DATABASE_URL: databaseURL,
      E2E_SCHEMA_ID: schemaId,
    },
  },
});
