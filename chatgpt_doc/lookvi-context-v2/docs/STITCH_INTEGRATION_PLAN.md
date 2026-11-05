# Lookvi — Stage 2: Stitch Source Audit (NO UI IMPLEMENTATION YET)

## Current state

- Existing Expo project is initialized and passes TypeScript, lint, `expo-doctor` and export checks per setup report.
- Source references: `ui/stitch_glow_beauty_app_ui/` (keep unmodified).
- Official brand: **Lookvi**; some screenshots and export directories retain older naming.
- Only a single bootstrap screen exists in running Expo app.

## Immediate task for Claude Code

Perform a **read-only audit**. No creating screens, routing groups, mock data or dependencies yet.

1. List every Stitch source screen, file type, size, image/font/icon asset and available `DESIGN.md` or styling reference.
2. Make a precise mapping: `source path → visual screen → proposed owning feature → proposed React Native screen/state → shared UI candidates`.
3. Identify which samples are different states of the same screen (Search, Look detail), not independent features.
4. Extract **proposed** design tokens from actual files: palettes, typography, spacing, radius, image ratios; highlight inconsistencies across exports.
5. Identify web-only implementation constructs and their RN equivalents (`div→View`, CSS Grid→FlatList/columns, browser icons→Expo vector icons, CSS background image→expo-image overlay, etc.).
6. Identify missing assets, UI references to unimplemented destinations, navigation gaps, and brand names to normalize.
7. Propose implementation order and acceptance checklist for each batch. Do not claim an unexported screen exists.
8. Report any conflicts between Stitch assumptions and Product Context, especially look-level pricing, booking CTAs and role flows.

## Suggested next implementation batches (require explicit user approval)

- **Batch A:** Extract design tokens, assets, common UI primitives; implement Welcome/Login/Onboarding.
- **Batch B:** Home + Explore with shared visual components and typed local fixtures.
- **Batch C:** Search discovery + All/Styles/Posts/Artists as one feature/stateful screen.
- **Batch D:** One reusable image-first Post/Look Detail; connect supported routes, audit missing destinations.
- **Later:** Artist Profile, Services, booking variant selection, booking request, Artist booking management, chat, review, admin only after separate designs/specification.

## Required audit deliverable

A concise Vietnamese report containing:

- Confirmed screen inventory with **real source paths**.
- Mapped feature ownership and naming decisions.
- Proposed design tokens and how they relate to source files.
- Reusable component shortlist.
- Dependency changes that might later be needed (do not install yet).
- Conflicts, missing source, unresolved decisions.
- A Phase 2 implementation sequence requiring approval.

## Hard boundaries

- Do **not** change files under `ui/`.
- Do **not** overwrite existing `CLAUDE.md`, `README.md`, `src/`, `app/` in the audit phase.
- Do **not** commit/push without explicit approval.
- Do **not** run `npm audit fix --force` or update Expo packages unilaterally.
- Do **not** auto-generate missing screens or backend APIs.
