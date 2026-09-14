import { envSchema } from '@/infra/env/env';
import { E2EDatabase } from './database-e2e';

export default async function teardown() {
  const env = envSchema.parse(process.env);
  const database = E2EDatabase.create(env.DATABASE_URL);

  try {
    await database.drop();
  } finally {
    await database.disconnect();
  }
}
