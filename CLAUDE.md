# CLAUDE.md — Lookvi

Guidance for Claude Code (and other agents) working in this repository.
Read this file, `README.md` and `docs/ARCHITECTURE.md` before implementing anything.

## 1. Product

**Lookvi** is a visual-first mobile marketplace (iOS + Android) that connects customers
with freelance **Makeup Artists** who offer **at-home makeup services**. The MVP covers
at-home services only.

It should feel like a modern social consumer app — Instagram-style artist profiles,
Pinterest-style look discovery, TikTok-inspired content presentation — with marketplace
booking on top. It must not feel like a booking platform or an enterprise dashboard.

Core journey:

```
Discover Look → View Post → Explore Artist → Select Service → Choose Service Variant → Request Booking
```

Roles: **Customer** and **Makeup Artist**.

### Confirmed product decisions (MVP demo)

| Topic | Decision |
|---|---|
| Market | Vietnam. Prices in VND (`850.000 ₫`), UI copy in Vietnamese. |
| Payments | Not in the MVP demo; added in a later phase. |
| Ratings & reviews | Rating per completed booking + written review. |
| Artist verification | Planned, optional for the demo. |
| Travel / service-area fee | Not charged for now. |
| Customer content | Customers cannot post; they search and browse the feed only. |
| Cancel / reschedule | Required booking logic. |
| Visual direction | Lean and restrained: minimal, not flashy. |

## 2. Current status

**Phase: project setup only.** The app contains a single temporary bootstrap screen
(`app/index.tsx`). No product features, product screens, navigation tabs, mock data,
backend, auth or payments exist yet. Do not start the next phase unless asked.

## 3. Tech stack

- Expo SDK 58, React Native 0.88, React 19.3, TypeScript 6 (strict)
- Expo Router (file-based routing, typed routes enabled; React Compiler enabled)
- Styling: React Native `StyleSheet` + tokens from `src/theme` — nothing else
- `react-native-safe-area-context`, `expo-image`, `@expo/vector-icons`
- ESLint via `eslint-config-expo` (flat config)
- No state-management library, no styling framework, no backend SDK

### Expo changes fast — do not trust memory

Expo ships breaking changes every SDK. Before touching an Expo / RN API, check the
versioned docs for the SDK in `package.json` (`https://docs.expo.dev/versions/v58.0.0/`)
or `https://docs.expo.dev/llms.txt`.

```bash
npx expo install <pkg>   # ALWAYS use instead of npm install for runtime deps
npm run typecheck        # tsc --noEmit
npm run lint             # expo lint
npm run doctor           # expo-doctor
npx expo install --fix   # repair SDK-incompatible versions
```

Run typecheck and lint before declaring any task done.

- Prefer Expo Go-compatible packages. Adding a library with custom native code means the
  team needs a development build — ask before doing that.
- `ios/` and `android/` are generated (CNG) and git-ignored. Never create or edit them by
  hand; configure native behaviour in `app.json` / config plugins.

## 4. Architecture (feature-based)

```
app/                 Expo Router routes ONLY (thin files)
src/components/ui     shared presentational primitives (Button, Avatar, …)
src/components/layout shared layout primitives (Screen, Section, …)
src/features/<name>/  one folder per product feature
src/domain/models/    framework-free types for domain entities
src/data/mock/        mock data (only when a task asks for it)
src/theme/            design tokens: colors, typography, spacing, radii
src/hooks/            cross-feature hooks
src/utils/            pure helpers
src/config/           app-wide constants / configuration
assets/images, assets/fonts
docs/                 project documentation
ui/                   Google Stitch design exports (read-only reference, not app code)
```

Import from `src` with the `@/` alias (`@/theme`, `@/features/looks/...`).
Assets: `@/assets/...`. See `docs/ARCHITECTURE.md` for a feature folder's layout.

## 5. Naming conventions

| Kind | Convention | Example |
|---|---|---|
| React component | `PascalCase.tsx` | `ArtistAvatar.tsx` |
| Hook | `useFeatureName.ts` | `useSavedLooks.ts` |
| Utility | `camelCase.ts` | `formatPrice.ts` |
| Domain model | `camelCase.ts` | `serviceVariant.ts` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_UPLOAD_SIZE` |
| Routes | Expo Router conventions | `app/(tabs)/index.tsx`, `app/artist/[id].tsx` |
| Feature folder | lowercase noun | `src/features/bookings/` |

Package name `lookvi`, display name `Lookvi`, slug `lookvi`, URL scheme `lookvi`.
iOS `bundleIdentifier` and Android `package` are **not set yet** — they must be decided
by the team (and added to `app.json`) before the first EAS build. Do not invent them.

## 6. Mandatory rules

1. Read project documentation (this file, README, `docs/`) before implementing features.
2. Preserve the existing architecture; propose changes instead of silently restructuring.
3. Use React Native components (`View`, `Text`, `Pressable`, `expo-image`'s `Image`), never HTML elements.
4. Do not introduce new styling frameworks (NativeWind, Tamagui, styled-components…) or
   state libraries (Redux, Zustand…) without explicit approval.
5. Reuse design tokens from `@/theme`; never hard-code colors, font sizes, spacing or radii.
6. Keep business logic separate from presentation (hooks/services vs. components).
7. Keep Expo Router route files lightweight: a route imports a screen from
   `src/features/<feature>/screens/` and renders it, plus route-level options only.
8. Follow the supplied Google Stitch designs — they are the primary visual reference.
9. Do not implement unrequested features, screens or mock data.
10. Prioritize maintainable, production-oriented, strictly typed code.

### Creating a new feature

1. Confirm the matching Stitch screen(s) in `ui/stitch_glow_beauty_app_ui/`.
2. Create `src/features/<feature>/` with only the subfolders it needs
   (`screens/`, `components/`, `hooks/`, `services/`, `types.ts`).
3. Put shared entity types in `src/domain/models/`, not inside the feature.
4. Add a thin route file in `app/` that renders the feature screen.
5. A feature may import from `@/components`, `@/domain`, `@/theme`, `@/hooks`, `@/utils`,
   `@/config`. Avoid importing another feature's internals; promote shared code instead.

### Reusing shared components

- Search `src/components/` before creating a component.
- Promote a component to `src/components/ui` only when a second feature needs it
  (or the Stitch designs clearly show it as a system-wide primitive).
- Shared components are presentational: props in, UI out — no data fetching, no
  feature-specific logic.
- Every shared component reads tokens from `@/theme` and meets 44pt / 48dp touch
  targets with `accessibilityRole` / `accessibilityLabel` set.

## 7. Design principles

Minimalist, image-first social app. References: Instagram (profiles, grids, navigation),
Pinterest (visual discovery), TikTok (immersive content, interactions), Facebook
(compact search, filtering).

Use: clean typography, neutral backgrounds, elegant consistent spacing, one icon set,
image-focused layouts, minimal borders and shadows, native interactions.

Avoid: large dashboard cards, heavy gradients, gratuitous animation, inconsistent
padding, multiple competing design systems.

### Stitch designs

Google Stitch exports live in `ui/stitch_glow_beauty_app_ui/` (`code.html` + `screen.png`
per screen, plus `warm_editorial_beauty/DESIGN.md` describing the visual system).
`lookvi_*` screens are the current MVP reference. `glow_*` screens are a **future design
direction**: do not implement them in the MVP unless asked. The HTML is a visual
reference only — translate it to React Native; never copy HTML/Tailwind into the app.

The tokens in `src/theme` are **provisional neutral placeholders**. Replacing them with
tokens derived from the Stitch design system is the first step of the UI phase.

## 8. Installed Claude Code skills

| Skill(s) | Source | Location | Use for |
|---|---|---|---|
| Expo plugin (24 skills, e.g. `expo-overview`, `expo-router`, `expo-project-structure`, `expo-design-system`, `expo-native-ui`, `expo-animation`, `expo-upgrade`, `eas-*`) | `expo@claude-plugins-official` v1.13.9 | plugin, project scope (`.claude/settings.json`) | Any Expo/EAS API, routing, upgrades, builds |
| `mobile-taste`, `mobile-nav-plan`, `mobile-design-system`, `mobile-design-review`, `mobile-redesign-screen`, `mobile-redesign-app` | draftbit/mobile-taste-skill v0.2.0 | `.claude/skills/` (+ `_shared/`) | Visual quality, layout, nav planning, design review |
| `animate-expo` | emilkowalski/skills | `.claude/skills/animate-expo/` | Motion, gestures, transitions, haptics |

How to use them in this project:

- Start Expo work with `expo-overview`; use `expo-router` for route structure.
- Before the first product screen, use `mobile-nav-plan` to plan the route tree, then
  `mobile-design-system` to turn the Stitch `DESIGN.md` into `src/theme` tokens.
  **Override:** mobile-taste defaults to NativeWind — this project uses `StyleSheet`
  only; tell the skill so (its stack sniff should detect it).
- Build screens with `mobile-taste`; audit with `mobile-design-review`.
- Use `animate-expo` (or `expo-animation`) only when motion is requested. Reanimated and
  Gesture Handler are **not installed** yet; add them with `npx expo install` when needed.
- The skills may write a `MOBILE-DESIGN.md`; the Stitch designs remain the source of truth.
- The `mobile-app-ux-design` skill (reyjoypsabino) could not be installed: its
  repository currently contains only a README. Apply HIG / Material 3 / WCAG 2.2 AA
  basics manually (44pt/48dp targets, contrast, labels, Dynamic Type) until it is added.

## 9. Domain terminology

| Term | Meaning |
|---|---|
| Customer | User who discovers looks and requests bookings |
| Makeup Artist (Artist) | Freelancer who publishes looks and offers services |
| Look | A finished makeup style shown in visual content |
| Post | A piece of content by an artist showing one or more looks |
| Portfolio | An artist's collection of posts |
| Service | A bookable offering by an artist (e.g. bridal makeup) |
| Service Variant | A priced option of a service (e.g. duration, level, add-ons) |
| Booking Request | A customer's request for a service variant at a time and address |
| Booking | A booking request accepted by the artist |
| At-home service | The artist travels to the customer's address (only mode in MVP) |
| Saved | Looks/artists a customer bookmarks |

Planned features (not implemented): auth, onboarding, home, explore, search, looks,
artists, services, bookings, messaging, saved, profile.

## 10. Merging future context

If a previous `CLAUDE.md` or `PRODUCT_CONTEXT.md` is supplied later, merge its relevant
rules into this file without discarding the setup rules above.
