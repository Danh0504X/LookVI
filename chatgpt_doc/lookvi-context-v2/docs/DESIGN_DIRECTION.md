# Lookvi — Mobile UX & Visual Direction

**Status:** Design guidelines; Stitch exports take precedence for appearance of existing screens.  
**Applies to:** React Native / Expo application for iOS and Android.  
**Current phase:** Design review and mapping only; do not implement screens yet.

## 1. Experience thesis

Lookvi is a **visual discovery → bookable makeup service** experience. The first impression should be a beauty/editorial content app, not a service directory. Users begin with an inspiring look and should progressively understand *who created it*, *what service is available*, *at what transparent price*, and *how to request a booking at home*.

- **Pinterest:** image-first, dense but breathable Explore grid and look taxonomy.
- **Instagram:** recognizable artist identity, portfolio, saved interactions and familiar tabs.
- **TikTok:** optional immersive **image-first** post detail, not an automatic video experience.
- **Facebook:** compact Search / All / Styles / Posts / Artists and highly scannable results.
- Take interaction patterns as references, **do not clone branding or layouts verbatim**.

## 2. Approved appearance / design source

- Main visual language: light/warm editorial beauty aesthetic, minimalist, high-quality makeup photos, compact cards, generous whitespace where content hierarchy benefits.
- Prefer exact values from `ui/stitch_glow_beauty_app_ui/**/DESIGN.md`, styles, and exported assets **after inspecting source**. Do **not invent** a global palette, fonts, icons, or spacing scale before extracting them.
- Mixed legacy texts `GLOW`, `LOOKVI`, `lookvi.` refer to **one app: Lookvi**. Preserve the editorial `lookvi.` wordmark style if present but normalize product identifiers and strings consistently. Verify before mass replacement.
- Local image assets from exports first. Do not invent external URLs; inventory missing assets.

## 3. Screen-by-screen direction (from provided screenshots)

| Surface | Core experience | Guardrail |
|---|---|---|
| Welcome / Login | Calm editorial entry, restrained calls to action, Google sign-in UI | Visual only; no real OAuth until requested |
| First-time profile | Minimal profile/location collection | Do not request GPS permissions yet |
| Home | Curated discovery with look shortcuts and recommended artists | Separate from Explore when Stitch shows both |
| Explore Grid | Compact 2-column visual cards; image is dominant; subtle price/artist metadata | Image-first, no bulky service dashboard |
| Search Discovery | Search field, recent/suggested queries, optional filter affordance | No fabricated advanced filter rules |
| Search Results | One query with tabs All / Styles / Posts / Artists; grid for styles, rows for posts/artists | These are states of **one** Search feature |
| Look Feed / Detail | Immersive full-screen image with legible overlay, artist credit and CTA | Two designs are data variants of **one** detail screen |
| Bottom navigation | Familiar, compact, consistent touch targets and active states | Some destinations remain unimplemented |

## 4. Content and price presentation

- A `Look` is **inspiration**; a `Post` is published content; a `Service` is a priced offering. Do not conflate their models.
- A card can show **“From X VND”** only if an eligible, valid service variant is linked; **not** a misleading universal price for every purpose.
- Service variants (casual, party, wedding guest) and optional add-ons are a **proposed** solution; no booking UI has been approved yet.
- Never quietly show a low price for a complex look when that package may be incompatible. This is an **open product decision**.

## 5. Interaction / native constraints

- Native `View`, `Text`, `Pressable`, `FlatList`, `ScrollView`, `expo-image`, `StyleSheet`; no rendered HTML/CSS in native screens.
- Safe areas for iOS/Android; keyboard-aware inputs when implemented; accessible contrast and touch areas; loading/empty/error states where needed.
- Animations must be purposeful and subtle. Do not add heavy video, carousels or gesture logic simply because TikTok is a reference.
- Reusable theme extracted from Stitch; global tokens in `src/theme`; shared primitives in `src/components/ui`; screen-specific pieces within the owning feature.
- Never reproduce each screenshot as a wholly independent codebase; share Search state/components and a data-driven Look Detail.

## 6. Skills and priorities

- **mobile-taste / mobile-design-system / mobile-design-review:** aesthetic review and extraction of design tokens, respecting project's `StyleSheet` choice (do not adopt NativeWind automatically).
- **Expo official skills:** Expo Router/native component correctness, asset/SDK conventions.
- **animate-expo:** only during a separately requested motion/gesture implementation phase.
- `mobile-app-ux-design` not installed, and **not a blocker**.

## 7. Acceptance rubric for later UI implementation

1. High fidelity to exported Stitch visual hierarchy and images.
2. Lookvi branding consistent without destructive source edits.
3. Feature-based architecture; minimal route files.
4. Search results reuse one feature and preserved query state.
5. Look detail renders by content ID rather than duplicate hardcoded screens.
6. Transparent, scoped pricing copy; no misleading “booked” when merely “requested”.
7. Typecheck, lint, expo-doctor; emulator/device appearance should be visually reviewed once available.
