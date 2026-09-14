# Presentation Layer

The `presentation` directory coordinates client-side server state, URL state, mutations, and server query entry points used by interactive React components.

## Structure

```text
presentation/
├── lib/react-query/      # Query Client configuration
├── prompts/
│   ├── hooks/            # Queries, mutations, and URL search state
│   └── queries/          # Server-side query functions
└── utils/                # Presentation utilities such as debounce
```

## State and queries

Prompt mutation hooks wrap create, edit, and delete Server Actions. Successful mutations invalidate the `['prompts']` query family so visible data refreshes.

`useFetchPrompts` uses `useInfiniteQuery` for cursor pagination. Its key includes the normalized search term:

```ts
['prompts', 'search', normalizedSearch];
```

The server-rendered first page is used as `initialData` only for an empty search. Searches and later pages call `fetchPromptsQuery` on the server.

`useSearch` uses `nuqs` to store search state in the `q` URL parameter, keeping that concern out of sidebar components.

Server query files are thin server-only entry points:

```text
Client hook -> server query -> factory -> handler -> domain use case
```

## Dependency rules

- May depend on Server Actions, infrastructure DTOs/factories, domain DTOs, and shared utilities.
- Must not access Prisma directly.
- Hooks should expose UI-ready state rather than persistence details.
- Cache keys must include every input that changes query results.
- Mark server-only functions with `'use server'` and hooks with `'use client'`.
