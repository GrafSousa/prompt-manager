# Prompt Manager

Prompt Manager is a full-stack application for creating, finding, editing, copying, and deleting reusable prompts. It is built with the Next.js App Router and applies Clean Architecture principles to keep business rules independent from the framework, database, and UI.

## Preview

<p align="center">
  <img
    src="./docs/prompt-manager-demo.gif"
    alt="Prompt Manager demonstration"
    width="900"
  />
</p>

## Features

- Create prompts with title and content validation.
- Browse prompts ordered by creation date.
- Search prompts by title and load more results with cursor pagination.
- Edit, copy, and delete prompts.
- Responsive sidebar and mobile navigation.
- Toast feedback for mutations.
- Unit and browser-based end-to-end tests.

## Technology stack

| Area                 | Technologies                                       |
| -------------------- | -------------------------------------------------- |
| Framework            | Next.js 16, React 19, TypeScript                   |
| Styling              | Tailwind CSS 4, Base UI, CVA, Lucide React, Motion |
| Forms and validation | React Hook Form, Zod, Hookform Resolvers           |
| Server and URL state | TanStack Query, nuqs                               |
| Database             | PostgreSQL 17, Prisma 7, Prisma PostgreSQL adapter |
| Testing              | Vitest, Testing Library, Faker, Playwright         |
| Code quality         | ESLint, Prettier, Lefthook                         |
| Package manager      | pnpm                                               |

## Architecture

```text
src/
├── app/             # Next.js routes, layouts, providers and Server Actions
├── components/      # Feature components and reusable UI primitives
├── core/            # Shared domain-independent building blocks
├── domain/          # Entities, repository contracts and use cases
├── infra/           # Prisma, handlers, presenters, factories, DTOs and tests
├── presentation/    # Hooks, server queries and UI state orchestration
├── styles/          # Global styles and Tailwind theme
├── generated/       # Generated Prisma Client (not committed)
└── lib/             # Shared UI and test utilities
```

Layer-specific documentation:

- [`app`](./src/app/README.md)
- [`core`](./src/core/README.md)
- [`domain`](./src/domain/README.md)
- [`infra`](./src/infra/README.md)
- [`presentation`](./src/presentation/README.md)

### Dependency direction

The domain contains application rules and repository abstractions. Infrastructure implements those abstractions and assembles concrete dependencies. Next.js and the presentation layer enter the application through handlers and factories.

```text
Next.js routes / React components
             |
             v
Server Actions / presentation queries and hooks
             |
             v
Infrastructure factories and handlers
             |
             v
Domain use cases and repository contracts
             ^
             |
Prisma repository implementation
```

## Application flow

### Initial prompt list

1. `PromptSidebar`, a Server Component, requests the initial page.
2. A factory assembles the query handler, use case, and Prisma repository.
3. The use case calls the domain repository contract.
4. Prisma reads records from PostgreSQL.
5. A presenter converts domain entities into serializable DTOs.
6. The initial page is passed to the client prompt list.

### Search and pagination

1. `nuqs` stores the search term in the URL.
2. `useFetchPrompts` creates an infinite query keyed by that term.
3. Later requests call a server query.
4. The server query follows the factory, handler, use-case, and repository pipeline.
5. TanStack Query stores the pages and next cursor.

### Create, edit, and delete

1. The UI triggers a TanStack Query mutation.
2. The mutation calls a Next.js Server Action.
3. The action invokes a command created by an infrastructure factory.
4. The command executes the domain use case.
5. The Prisma repository persists the change.
6. A successful response invalidates the prompt cache.

## Requirements

- Node.js 20.9 or newer.
- pnpm 11 (the repository declares pnpm 11.21.0).
- Docker with Docker Compose, or a PostgreSQL 17-compatible instance.
- Playwright browser binaries for E2E tests.

## Environment variables

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://postgres:docker@localhost:5432/prompt_manager?schema=public"
PORT=3000
```

Create `.env.test` for E2E tests:

```env
DATABASE_URL="postgresql://postgres:docker@localhost:5432/prompt_manager?schema=test"
PORT=3001
```

The E2E helper refuses to drop a schema whose name is not exactly `test`. Never point `.env.test` to production or important data.

## Running locally

```bash
pnpm install
docker compose up -d
pnpm db:generate
pnpm db:migrate:dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

Provide `DATABASE_URL`, apply migrations, build, and start:

```bash
pnpm exec prisma migrate deploy
pnpm build
pnpm start
```

## Tests

### Unit tests

Unit tests exercise prompt use cases with an in-memory repository. They cover creation, validation, retrieval, pagination, editing, deletion, and expected failures without PostgreSQL.

```bash
pnpm test           # Run once
pnpm test:watch     # Watch mode
pnpm test:coverage  # Text and HTML coverage
```

The HTML coverage report is generated under `coverage/`.

### End-to-end tests

Playwright exercises the application in real browsers and covers the home, create, edit, and delete flows. Make sure PostgreSQL is running, create `.env.test`, and install the browser binaries once:

```bash
pnpm exec playwright install
pnpm test:e2e
```

For UI Mode:

```bash
pnpm test:e2e:ui
```

The Playwright configuration starts a dedicated Next.js server. An automatic fixture drops the `test` schema, applies every Prisma migration before each test, and drops the schema afterward in a `finally` block. A global teardown performs final cleanup. Tests use one worker because they share the isolated schema.

Failure artifacts are written to `test-results/`; the HTML report is written to `playwright-report/`.

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm format .
```

## Database commands

```bash
pnpm db:generate       # Generate Prisma Client
pnpm db:migrate:dev    # Create/apply development migrations
pnpm db:seed           # Run the configured seed command, when available
```

The Docker database persists its data in the `postgres_data` volume.
