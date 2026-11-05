# Lookvi

Lookvi is a visual-first mobile marketplace that connects customers with freelance
makeup artists offering at-home makeup services. It combines social content
(artist profiles, look discovery, immersive posts) with service listings and booking.

Core journey: **Discover Look → View Post → Explore Artist → Select Service →
Choose Service Variant → Request Booking.** Roles: Customer and Makeup Artist.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Expo SDK 58 · React Native 0.88 · React 19.3 |
| Language | TypeScript 6, strict mode |
| Navigation | Expo Router (typed routes) |
| Styling | React Native `StyleSheet` + design tokens in `src/theme` |
| UI utilities | `react-native-safe-area-context`, `expo-image`, `@expo/vector-icons` |
| Fonts & icons | Playfair Display + Plus Jakarta Sans (`@expo-google-fonts/*`), Material Symbols Outlined (bundled TTF) |
| Linting | ESLint 9 + `eslint-config-expo` |

No backend, auth, payments, state-management or styling framework is installed yet.

## Installation

Requirements: Node.js `^22.13` or `^24.3` (required by React Native 0.88), npm, Git.

```bash
npm install
```

Add dependencies with `npx expo install <package>` so versions match the Expo SDK.

## Running locally

```bash
npm start          # Expo dev server (scan the QR code with Expo Go)
npm run android    # open on a connected Android device / emulator
npm run ios        # open on the iOS simulator (macOS only)
```

### Android

- **Physical device:** install Expo Go from Google Play, connect to the same network
  as your computer, and scan the QR code shown by `npm start`.
- **Emulator:** install Android Studio, create an AVD, start it, then run `npm run android`.

### iOS

- **Physical device:** install Expo Go from the App Store and scan the QR code with the
  Camera app (same network as your computer).
- **Simulator:** requires macOS with Xcode; run `npm run ios`.

If your network blocks LAN connections, use `npx expo start --tunnel`.

## Quality checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint
npm run doctor      # expo-doctor
npm run validate    # all three
```

## Folder structure

```
app/                 Expo Router routes (navigation only)
  _layout.tsx        root layout (SafeAreaProvider + Stack)
  index.tsx          temporary bootstrap screen
src/
  components/ui      shared UI primitives
  components/layout  shared layout primitives
  features/          one folder per product feature
  domain/models/     domain types
  data/mock/         mock data (later)
  theme/             colors, typography, spacing, radii (provisional)
  hooks/ utils/ config/
assets/images, assets/fonts
docs/ARCHITECTURE.md
ui/                  Google Stitch design exports (visual reference)
.claude/             Claude Code settings and project-local skills
```

## Claude Code skills

| Skill | Source | Status |
|---|---|---|
| Expo plugin (24 Expo/EAS skills) | `expo@claude-plugins-official` v1.13.9 | Installed, project scope |
| mobile-taste suite (6 skills) | draftbit/mobile-taste-skill v0.2.0 | Installed in `.claude/skills/` |
| animate-expo | emilkowalski/skills | Installed in `.claude/skills/` |
| mobile-app-ux-design | reyjoypsabino/mobile-app-ux-design-skill | **Not installed** — repository contains only a README |

Teammates opening the project in Claude Code get the project-local skills automatically;
the Expo plugin is declared in `.claude/settings.json` (install with
`claude plugin install expo@claude-plugins-official --scope project` if prompted).

## Current status

Batches 1–2 of the UI phase are implemented: sign-in and onboarding for both roles, then the
customer tab bar with Home, Explore (style and occasion filters), full-screen Look detail and
Search (recent/suggested searches; All, Styles, Posts and Artists results). Batch 3 adds the
artist profile, booking request form, confirmation, My bookings and booking detail with the
2-hour free-cancellation rule. Batch 4 adds Saved (looks and artists), the customer Profile
(switch to artist mode, log out) and booking-scoped chat. Batch 5 adds the artist side:
dashboard, booking requests (accept/decline/complete/cancel), portfolio and packages &
rates. All Stitch screens are implemented. See `CLAUDE.md` §2.

## Next phase

Review the demo on devices, then decide the open items in `docs/PRODUCT_CONTEXT.md` (reviews
after completion, reschedule, post publishing, payments) before adding a backend.
Before the first EAS build, set the iOS bundle identifier and Android package.
