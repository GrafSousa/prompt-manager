import { expect, test as base } from '@playwright/test';

import { envSchema } from '@/infra/env/env';
import { E2EDatabase } from './database-e2e';

const env = envSchema.parse(process.env);

const database = E2EDatabase.create(env.DATABASE_URL);

type E2EFixtures = {
  database: void;
};

export const test = base.extend<E2EFixtures>({
  database: [
    async ({}, runTest) => {
      await database.reset();

      try {
        await runTest();
      } finally {
        await database.drop();
      }
    },
    {
      auto: true,
    },
  ],
});

export { expect };
