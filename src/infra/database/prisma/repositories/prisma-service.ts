import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

export class PrismaService extends PrismaClient {
  private static instance: PrismaService | undefined;

  constructor() {
    super({
      adapter: PrismaService.createPrismaAdapter(process.env.DATABASE_URL),
    });
  }

  private static createPrismaAdapter(databaseUrl: string | undefined) {
    if (!databaseUrl) {
      throw new Error('Please provide a DATABASE_URL environment variable.');
    }

    const url = new URL(databaseUrl);
    const schema = url.searchParams.get('schema') ?? 'public';

    return new PrismaPg({ connectionString: databaseUrl }, { schema });
  }

  static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }

    return PrismaService.instance;
  }
}
