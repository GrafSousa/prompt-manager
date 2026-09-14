# App Layer

The `app` directory is the Next.js App Router entry point. It owns routes, layouts, framework providers, route states, and Server Actions.

## Responsibilities

- Define public routes and route segments.
- Compose Server and Client Components.
- Load initial server-rendered data.
- Expose Server Actions for mutations.
- Translate application failures into UI responses.
- Register global providers, metadata, styles, notifications, and layout.
- Host route-oriented E2E specifications.

## Current routes

```text
app/
├── layout.tsx                 # Root layout and application shell
├── page.tsx                   # Home/empty prompt state
├── providers.tsx              # Client-side providers
└── prompts/
    ├── actions/               # Create, edit, and delete Server Actions
    ├── new/page.tsx           # Creation page
    └── [id]/edit/
        ├── page.tsx           # Edit page
        └── not-found.tsx      # Missing prompt state
```

## Request flow

Mutation actions are thin framework entry points:

```text
Client mutation -> Server Action -> factory -> handler -> domain use case
```

They receive application DTOs and return a serializable `{ success, message }` response. Business validation belongs to domain use cases, not Server Actions.

Pages and the root layout are Server Components by default. Interactive forms, providers, and browser state remain Client Components. The initial prompt page is loaded on the server and passed into the client list.

## E2E specifications

E2E files are colocated with the routes they exercise and must use the custom test export:

```ts
import { expect, test } from '@/infra/test/e2e/setup-e2e';
```

This activates automatic per-test database isolation. Importing `test` directly from `@playwright/test` bypasses that fixture.

## Dependency rules

- May depend on `components`, `presentation`, `infra`, `domain`, and `core`.
- Keep framework types out of domain entities and use cases.
- Do not access Prisma directly; enter through factories, handlers, or server queries.
- Do not duplicate business validation already expressed by the domain.
