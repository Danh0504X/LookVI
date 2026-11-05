# Architecture

Lookvi uses a **feature-based** structure. Expo Router owns navigation; everything else
lives in `src/`.

## Layers

| Folder | Responsibility | May import from |
|---|---|---|
| `app/` | Route files and navigators (`_layout.tsx`). Thin: render a feature screen, set route options. | `@/features`, `@/components`, `@/theme` |
| `src/features/<feature>/` | Screens, feature components, hooks and services for one product area | `@/components`, `@/domain`, `@/theme`, `@/hooks`, `@/utils`, `@/config` |
| `src/components/ui` | Shared presentational primitives | `@/theme`, `@/utils` |
| `src/components/layout` | Shared layout primitives (screen container, sections) | `@/theme`, `@/components/ui` |
| `src/domain/models` | Plain TypeScript types for domain entities; no React, no I/O | nothing |
| `src/data/mock` | Mock data for development, typed with domain models | `@/domain` |
| `src/theme` | Design tokens (single source of visual values) | nothing |
| `src/hooks`, `src/utils`, `src/config` | Cross-feature hooks, pure helpers, app constants | `@/domain`, `@/theme`, each other |

Dependencies point one way: `app → features → shared (components, domain, theme, utils)`.
Features do not import each other's internals; shared code is promoted instead.

## Feature folder

Create only what a feature needs:

```
src/features/looks/
  screens/LookDetailScreen.tsx   composed screen, rendered by a route
  components/LookCard.tsx        feature-only components
  hooks/useLook.ts               state and data access for the screen
  services/looksService.ts       data source (mock now, API later)
  types.ts                       feature-local types
```

Route example (`app/look/[id].tsx`):

```tsx
import { LookDetailScreen } from '@/features/looks/screens/LookDetailScreen';
export default LookDetailScreen;
```

## Data flow

Screen → hook → service → (mock data / future API). Components receive data through
props and stay free of fetching logic. When a backend is chosen, only services change.

## Styling

`StyleSheet.create` with values from `@/theme`. Current tokens are provisional and will
be replaced with tokens derived from the Stitch designs in `ui/`.
