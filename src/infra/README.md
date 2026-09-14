# Infrastructure Layer

The `infra` directory contains technical adapters and composition code connecting the domain to PostgreSQL, Prisma, and framework-facing entry points.

## Structure

```text
infra/
├── database/prisma/
│   ├── mappers/          # Domain entity <-> Prisma conversion
│   └── repositories/     # Prisma service and repository implementation
├── dtos/                 # Serializable outward-facing shapes
├── env/                  # Environment validation
├── factories/            # Dependency composition
├── handlers/             # Commands and queries
├── presenters/           # Domain entity -> view DTO conversion
└── test/
    ├── e2e/              # Playwright database lifecycle
    ├── factories/        # Test data factories
    └── repositories/     # In-memory repository
```

## Runtime infrastructure

`PrismaService` creates Prisma Client with the PostgreSQL adapter. `PrismaPromptsRepository` implements the domain repository contract. The mapper keeps Prisma records out of business code.

Handlers adapt use-case results for outer layers. Commands perform mutations, queries perform reads, and presenters produce serializable view DTOs. Business rules stay in use cases.

Factories form each concrete dependency graph:

```text
PrismaService -> PrismaPromptsRepository -> use case -> handler
```

`envSchema` validates `DATABASE_URL` and `PORT` before infrastructure is created.

## Test infrastructure

Unit tests use the in-memory repository and prompt factories. Playwright uses `E2EDatabase` and an automatic fixture. For every E2E test it:

1. Drops the dedicated `test` schema.
2. Runs `prisma migrate deploy`.
3. Runs the browser test.
4. Drops the schema from a `finally` block.

Global teardown adds final cleanup and disconnects Prisma. A schema-name guard prevents accidental deletion of non-test schemas. Specifications must import:

```ts
import { expect, test } from '@/infra/test/e2e/setup-e2e';
```

## Dependency rules

- May depend on `domain` and `core` to implement their contracts.
- Keep business rules out of repositories, handlers, presenters, and factories.
- Convert Prisma types at the mapper boundary.
- Database code must not depend on React components.
- Keep strict safety validation around destructive E2E helpers.
