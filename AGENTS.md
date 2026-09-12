# Dungeons Manager: Agent Guide

## Project at a glance

Dungeons Manager is a portrait-oriented D&D 5e companion built with React Native,
Expo SDK 55, Expo Router, TypeScript, and NativeWind. It supports English and
Portuguese, offline-friendly cached data, and real-time multiplayer campaign tables.

Use Yarn Classic (`yarn@1.22.22`), not npm or pnpm.

## Map the change before editing

- `app/` contains Expo Router file-based routes and layouts. Route groups such as
  `(auth)`, `(authenticated)`, `(drawer)`, and `(tabs)` are organizational and do
  not appear in URLs.
- `components/` contains UI, organized mostly by feature. Reuse `components/ui/`
  primitives before adding another generic control.
- `services/<domain>/` owns API integration for a domain. A `*.service.ts` file
  makes HTTP requests; `*.api.tsx` owns React Query hooks, query keys, mutations,
  invalidation, and API-error presentation.
- `contexts/` and `providers/` hold app-wide feature context. The selected
  character and its derived data flow through `CharacterProvider`/
  `CharacterContext`.
- `core/` holds shared infrastructure: Axios, query client, persistence, Zustand
  stores, reusable helpers, enums, and error handling.
- `types/` holds shared TypeScript models. `modules/` contains domain aggregates.
- `i18n/locales/en.ts` and `i18n/locales/pt.ts` are the source of all visible
  copy.

## Follow the established data flow

For a new server-backed feature, prefer this path:

1. Define or extend types in `types/`.
2. Add request functions in `services/<domain>/<domain>.service.ts` using the
   shared `api` client.
3. Add typed query/mutation hooks and stable query-key helpers in the matching
   `*.api.tsx`; invalidate the narrowest affected key after mutations.
4. Call those hooks from feature components. Keep screens and route files thin.

Do not bypass `@/core/api/api`. Its interceptors add bearer authentication,
refresh expired tokens, synchronize server time, transform payload keys between
camelCase and snake_case, send the active locale, and attach the current table ID.
The refresh client is deliberately separate to avoid recursive auth refreshes.

React Query is the source of truth for server data. Its client is persisted through
MMKV for 24 hours and configured for offline-friendly use. Use existing context for
the active character and Zustand/MMKV stores for small, durable client state (for
example settings and character selection); do not mirror server state in another
store.

## UI, localization, and navigation

- Use NativeWind `className` styling and the existing palette/primitives. Inline
  React Native styles trigger a lint warning; use them only where a dynamic value
  cannot be expressed with classes.
- Use `i18n.t(...)` for user-visible text. When introducing a key, add it to both
  English and Portuguese locale files in the same change.
- Make navigation changes through Expo Router files and the relevant `_layout.tsx`.
  The authenticated layout gates routes through `useGetCurrentUser()`.
- Use `FlashList` for substantial scrolling collections, following existing lists.
- Account for safe-area and keyboard/bottom-sheet providers already configured in
  `app/_layout.tsx`; do not add duplicate root providers.

## TypeScript and linting rules

- TypeScript is strict. Prefer explicit domain types and `import type` for
  type-only imports.
- Use `@/` aliases for all internal imports. Relative imports are prohibited by
  ESLint.
- React Compiler is enabled. Do not introduce `useMemo`, `useCallback`, or
  `React.memo`; ESLint warns that manual memoization is unnecessary.
- Avoid raw text outside React Native `<Text>` components. Prefer existing error
  handling (`handleErrorMessage`) for API mutation failures.
- Respect the existing formatting: single quotes, 100-character width, two spaces,
  trailing commas where valid, and Tailwind class sorting via Prettier.

## Configuration and secrets

Runtime configuration uses public Expo variables such as `EXPO_PUBLIC_API_URL` and
`EXPO_PUBLIC_WEBSOCKET_URL`. Anything prefixed `EXPO_PUBLIC_` is bundled into the
client: never put secrets there. Do not commit or expose `.env` contents. Preserve
unrelated local changes, especially environment files.

## Validation

Run the focused checks appropriate to the change, then run:

```bash
yarn lint
```

`yarn lint` runs ESLint and checks Prettier formatting. The repository currently
has a helper test (`core/helpers/spellCastingStats.test.ts`) but no general test
script; add focused tests when changing testable, non-UI logic and do not claim a
test suite passed unless you ran the exact command.

Useful development commands:

```bash
yarn start
yarn android
yarn ios
yarn web
```

Avoid running `expo prebuild` or editing generated `android/` files unless the task
requires a native configuration or dependency change.
