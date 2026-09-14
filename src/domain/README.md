# Domain Layer

The `domain` directory contains the business model and application rules. It is independent from Next.js, React, Prisma, PostgreSQL, and browser behavior.

## Structure

```text
domain/prompt/
├── enterprise/entities/      # Prompt domain entity
└── application/
    ├── dtos/                 # Use-case boundary contracts
    ├── repositories/         # Persistence abstractions
    └── use-cases/            # Application operations and tests
```

The `Prompt` entity represents identity, title, content, and timestamps without persistence annotations or UI formatting.

Current application operations are create, fetch, get, edit, and delete. Use cases coordinate entities and repository contracts. Expected failures use `Either`, including invalid title/content and missing resources.

`PromptsRepository` defines the persistence capabilities required by the domain. Production supplies a Prisma implementation; unit tests supply an in-memory implementation:

```text
Use case -> repository interface <- Prisma or in-memory implementation
```

Application DTOs contain plain boundary values and must not depend on HTTP, React, or Prisma.

## Unit tests

Tests are colocated with use cases:

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

## Dependency rules

- May depend on `core`.
- Must not depend on `infra`, `presentation`, `components`, or `app`.
- Must not import Prisma models or Next.js APIs.
- Expected business failures should be explicit in return types.
- Persistence must be accessed through repository contracts.
