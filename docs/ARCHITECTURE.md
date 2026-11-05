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
| `src/components/cards` | Shared presentational content cards (look, artist, post, style); props only, no data access | `@/theme`, `@/components/ui`, `@/domain` (types) |
| `src/domain/models` | Plain TypeScript types for domain entities; no React, no I/O | nothing |
| `src/data/mock` | Mock data for development, typed with domain models | `@/domain` |
| `src/theme` | Design tokens (single source of visual values) | nothing |
| `src/hooks`, `src/utils`, `src/config` | Cross-feature hooks, pure helpers, app constants | `@/domain`, `@/theme`, each other |

Dependencies point one way: `app → features → shared (components, domain, theme, utils)`.

**Feature public API:** every feature has an `index.ts`. Routes and other features import
from `@/features/<name>` only, never from a feature's inner folders. Cross-cutting app state
(e.g. `session`) is a feature too, consumed through its public API.

## Feature folder

Create only what a feature needs:

```
src/features/onboarding/
  index.ts                         public API (screens, hooks other code may use)
  screens/ArtistOnboardingScreen.tsx
  components/ServiceRadiusPicker.tsx
  hooks/useArtistProfileForm.ts    form state + validation
  services/areaService.ts          data access (mock now, API later)
```

Route files only re-export a screen:

```tsx
// app/onboarding/artist.tsx
export { ArtistOnboardingScreen as default } from '@/features/onboarding';
```

## Current routes

| Route | Screen | Feature |
|---|---|---|
| `/` | Redirects by session (`getEntryRoute`) | session |
| `/welcome`, `/login`, `/role` | Welcome, Login, Role select | auth (`app/(auth)/`) |
| `/onboarding/customer`, `/onboarding/artist` | First-time setup per role | onboarding |
| `/home` | Customer home (tab) | home |
| `/explore?filter=` | Explore grid (tab); `filter` = `all`, `style:<id>`, `occasion:<id>` | explore |
| `/explore/search?tab=` | Search, inside the Explore tab stack | search |
| `/bookings` | My bookings (tab): Pending / Upcoming / History | bookings |
| `/saved` | Saved looks and artists (tab) | saved |
| `/profile` | Customer profile and account (tab) | profile |
| `/artist/[artistId]` | Artist profile (customer view): services, portfolio, reviews | artists |
| `/book/[artistId]?postId=&variantId=` | Booking request form | bookings |
| `/booking/[bookingId]/sent` | "Request sent" confirmation (no swipe back) | bookings |
| `/booking/[bookingId]` | Booking detail, cancel | bookings |
| `/dashboard` | Artist home (tab) | studio |
| `/requests` | Artist bookings (tab): New / Upcoming / History | bookings |
| `/portfolio` | Artist's posts with linked packages (tab) | studio |
| `/account` | Artist profile and account (tab) | studio |
| `/request/[bookingId]` | Artist booking detail: accept, decline, complete, cancel | bookings |
| `/services`, `/services/new`, `/services/edit/[variantId]` | Packages and rates | studio |
| `/post/[postId]` | Full-screen look detail (shared; artists get a read-only view) | looks |
| `/chat/[bookingId]` | Booking-scoped chat (shared by both roles) | messaging |

`app/(customer)/_layout.tsx` guards the customer area (redirects to `/` without a finished
customer setup) and mounts `SearchHistoryProvider`; `app/(artist)/_layout.tsx` guards the artist
area the same way. `/post` and `/chat` live at the root because both roles use them.
`BookingsProvider`, `MessagesProvider` and `SavedProvider` are mounted in `app/_layout.tsx`,
outside the session, so data survives role switches.

Navigation after a session change uses `useGoToEntry()` (clears the stack, then `/` decides).

## Features

| Feature | Responsibility |
|---|---|
| `session` | Mock sign-in, role, setup profiles, entry routing |
| `catalog` | Read access to areas, artists, posts, styles, services and derived offers ("From X") |
| `auth`, `onboarding` | Sign-in, role choice, first-time setup screens |
| `location` | Customer header with area picker |
| `home`, `explore`, `search`, `looks` | Discovery screens |
| `saved` | In-memory saved looks and artists, Saved screen |
| `profile` | Customer profile, account rows, switch to artist mode, log out |
| `messaging` | Messages store, chat screen, contact policy (no phone numbers) |
| `studio` | Artist workspace: dashboard, portfolio, services and rates, artist account |
| `artists` | Artist profile as customers see it |
| `bookings` | Bookings store, booking rules (groups, 2-hour cancellation), demo availability, booking screens |

## App state

`SessionProvider` (React context + reducer) holds the mocked account, role and setup
profiles; `SavedProvider` and `SearchHistoryProvider` hold saved looks and recent searches.
Service packages live in a small external store (`catalog/services/serviceStore.ts`, built on
`useSyncExternalStore`) so artist edits reach customer screens.
Everything is **in memory**: a cold start always returns to Welcome. No state library is used.

## Data flow

Screen → hook → service → (mock data / future API). Components receive data through
props and stay free of fetching logic. When a backend is chosen, only services change.

## Styling

`StyleSheet.create` with values from `@/theme` (tokens taken from the Stitch Tailwind
config, reduced to a lean set). Text goes through `AppText` (type scale + colour tokens);
icons through `Icon` (Material Symbols Outlined, `filled` for active states).

Custom fonts: each weight is its own family (`fontFamilies.*`); never combine them with
`fontWeight`.

## Assets

- `assets/fonts/` — Material Symbols Outlined (outlined + filled static TTFs, Apache 2.0)
  and `MaterialSymbolsOutlined.json` (icon name → codepoint).
- `assets/images/mock/` — compressed Stitch images; `manifest.json` lists their source alt
  texts and screens. Only images referenced in `src/data/mock/images.ts` are bundled.
