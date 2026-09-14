import { PrismaService } from '@/infra/database/prisma/repositories/prisma-service';
import { execFileSync } from 'node:child_process';

export class E2EDatabase {
  private constructor(
    private readonly databaseUrl: string,
    private readonly schema: string,
    private readonly prisma: PrismaService
  ) {}

  static create(databaseUrl: string) {
    const schema = new URL(databaseUrl).searchParams.get('schema');

    if (schema !== 'test') {
      throw new Error(
        `Refusing to modify unsafe schema: ${schema ?? 'undefined'}`
      );
    }

    return new E2EDatabase(databaseUrl, schema, PrismaService.getInstance());
  }

  migrate() {
    execFileSync('pnpm', ['exec', 'prisma', 'migrate', 'deploy'], {
      env: {
        ...process.env,
        DATABASE_URL: this.databaseUrl,
      },
      stdio: 'inherit',
    });
  }

  async drop() {
    await this.prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`
    );
  }

  async reset() {
    await this.drop();

    this.migrate();
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
