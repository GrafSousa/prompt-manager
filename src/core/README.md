# Core Layer

The `core` directory contains domain-independent building blocks shared across the application. It has no dependency on Next.js, React, Prisma, or UI libraries.

## Structure

```text
core/
├── @types/          # Shared TypeScript utility types
├── entities/        # Entity and UniqueEntityId abstractions
├── errors/          # Errors shared across use cases
├── repositories/    # Shared repository inputs
└── either.ts        # Explicit success/failure result type
```

`Entity` provides identity and equality behavior. `UniqueEntityId` encapsulates identifiers. `Either` lets use cases return `left(error)` for expected failures and `right(value)` for success without using exceptions as domain control flow. Infrastructure decides how those outcomes reach outer layers.

`PaginationParams` currently defines shared cursor, limit, and search inputs. Errors such as `ResourceNotFoundError` are reusable, while feature-specific errors remain in their domain.

## Dependency rules

- Must remain independent from frameworks and external services.
- May be imported by every other layer.
- Must not import from `domain`, `infra`, `presentation`, `components`, or `app`.
- Add code here only when it is genuinely reusable across domains.
