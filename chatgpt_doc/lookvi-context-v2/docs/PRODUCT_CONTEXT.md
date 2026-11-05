# Lookvi — Product Context & Requirements

**Document type:** Product context for Claude Code / future engineering team  
**Last reviewed:** 2026-11-05
**Repository status:** Expo SDK 58 initialized; source designs staged under `ui/stitch_glow_beauty_app_ui/`; UI conversion has NOT started.  
**Status key:** **Confirmed** = agreed direction; **Proposed** = recommended implementation; **Open decision** = not finalized.  
**Purpose:** Preserve business intent and UX constraints across AI coding sessions; avoid speculative feature growth.

## Product identity — Confirmed

- **Official product name:** Lookvi.
- **Repo and Expo slug:** `lookvi` (recommended).
- **Former working name:** Glow. Any older references to Glow represent the same project and should be updated when migrating the UI and configuration.
- **Visual wordmark:** `lookvi.` is acceptable when matching the existing Stitch design; the canonical written name is **Lookvi**.

## 1. Product vision — Confirmed

**Lookvi** is a mobile-first, image-first two-sided marketplace that connects customers with freelance makeup artists who travel to customers' locations. The entry point is a **desired appearance (LOOK)**, not a directory of providers. The ideal customer journey is:

**See an inspiring makeup image → open the post/look → identify the artist → see eligible services and transparent prices → select package/date/time/place → submit booking request → artist accepts/declines → service occurs → completion/review.**

English positioning: **"Turn makeup inspiration into a bookable at-home service."**

Lookvi is **not** merely a salon appointment scheduler, nor a broad TikTok clone, nor (in this MVP) a nail/spa/hair marketplace. Longer-term ideas for broader Beauty & Wellness are deliberately out of current scope.

### Business problem
Today people often discover looks on social apps, search for artists elsewhere, ask about prices and availability across messages, and finally attempt to book. Lookvi brings **inspiration, provider discovery, transparent service choice and booking into one connected journey**.

### User roles — Confirmed
- **Customer:** explores images, searches styles/posts/artists, views portfolio/service/prices, requests booking, chats, tracks bookings, leaves feedback.
- **Artist:** publishes looks/posts and services, prices their own offerings, sets service radius, handles incoming booking requests and service completion.
- **Admin (future operational role):** verifies artists before activation; handles governance/complaints. Do not implement Admin UI without a separate design/spec.

## 2. MVP boundaries — Confirmed

- **Service category:** at-home makeup only.
- **Typical purposes:** personal/casual, party, event, wedding guest; bridal may be modeled separately.
- **Geography:** initial trial in one limited service area (exact boundary TBD).
- **Primary media:** photographs; video feed is not an MVP requirement.
- **Acquisition/content model:** artists publish portfolio posts, optionally linking a relevant bookable service.
- **Interaction:** customers send booking **requests**; artists accept/decline, rather than instant guaranteed booking.
- **Communication:** in-app messaging; avoid publishing phone numbers.
- **Trust:** admin artist verification prior to operation, ratings/reviews after bookings, complaint option.
- **Revenue:** platform commission, intended as one fixed artist commission percentage (rate TBD).

## 3. Present UI inventory (Stitch export) — Confirmed from supplied screenshots

**Actual repository path:** `ui/stitch_glow_beauty_app_ui/`. This directory is read-only design/source reference. File names and screens must be inventoried from disk; the following is the screenshot-level inventory, not a verified source-file manifest.

| Feature | UI/reference currently shown | Suggested React Native implementation |
|---|---|---|
| `auth` | Welcome, Login with Google CTA | `WelcomeScreen`, `LoginScreen`; mock auth only |
| `onboarding` | First-time profile setup | `CustomerOnboardingScreen` |
| `home` | Home / discovery with categories and artists | `HomeScreen` |
| `explore` | Explore image grid, categories, look cards | `ExploreScreen` |
| `search` | Search discovery and recent/suggested queries | `SearchScreen` empty-query state |
| `search` | All results | `SearchScreen` category=`all` |
| `search` | Styles result grid | `SearchScreen` category=`styles` |
| `search` | Posts result list | `SearchScreen` category=`posts` |
| `search` | Artists result list | `SearchScreen` category=`artists` |
| `looks` | Two fullscreen Look Feed examples | One `LookDetailScreen` driven by `postId` / selected content ID |

**Important:** A Stitch screenshot is not evidence of implemented logic. Source exports need inspection. Tabs/CTAs referencing Artist Profile, Saved, Booking or Profile may appear in designs even though corresponding screens have not been exported.

**Branding:** Screens currently mix `GLOW/Glow` with `LOOKVI/lookvi`. The confirmed, official product name is **Lookvi**; replace only obsolete Glow branding in app strings and metadata, while preserving the approved layout and visual style.

## 4. Experience principles — Confirmed design intent

- **Social-first discovery:** Explore feels like Pinterest/Instagram; photo is dominant, copy compact, cards not overdecorated.
- **Familiar search:** Search supports **All / Styles / Posts / Artists**, a single query and category-specific result components. More detailed filters are initially behind one filter icon.
- **Profiles and post interactions:** Instagram-like patterns for portfolio grids, artist identity and saving; TikTok inspiration for immersive *image* detail only, not a video clone.
- **Transparent pricing:** avoid "Inbox for price" as default UX. Advertised price must be clearly scoped to a defined eligible service/package.
- **Mobile-first design:** native-feeling, consistent bottom tabs, safe areas, readable typography and reliable touch targets.
- **Rating ≠ Reputation:** a star rating alone cannot represent trustworthiness. Future reputation signals may include verified bookings, completion and cancellation behavior; do not invent formulas now.

## 5. Business entities and relationships — Confirmed conceptual distinction, Proposed schema

| Entity | Meaning | Ownership / link |
|---|---|---|
| `User` | authenticated person | role(s), account data |
| `Artist` | verified/service-capable professional | profile, service area, portfolio |
| `MakeupStyle` or `Look` | taxonomy / visual style | tags/categories, not directly purchasable |
| `Post` | artist-owned image content | `artistId`, optional `styleId`, associated service(s) |
| `Service` | artist-defined bookable offer | `artistId`, title, description, eligibility |
| `ServiceVariant` | package with specific purpose, price, duration | `serviceId`, explicit pricing |
| `ServiceAddon` | optional purchasable addition | service or variant, additional price |
| `Booking` | request for artist work | customer, artist, service/variant, time/place, status, price snapshot |
| `Conversation/Message` | in-app customer–artist contact | booking context when applicable |
| `Review` | feedback tied to qualifying completed work | booking + rater + artist |
| `Dispute` | complaint record | booking, reasons, state |

**Do not collapse** `Post`, `Look`, `Service` and `Booking` into one schema. Displayed "look" images may originate from artist posts; whether `Look` needs a standalone entity vs. a style/category taxonomy is an **Open decision**. Keep migration flexible.

Example (illustrative only): An artist has 20 posts displaying Korean, Douyin and Soft Glam looks, but just one `Personal Makeup` service with three variants. The posts can link to the same service without copying prices to every post.

### Identifiers and data access — Proposed
- Use stable IDs for records and references.
- Store mock fixtures under `src/data/mock/` or feature-local mocks; screens should not define duplicate inline records.
- Put domain models under `src/domain/models/`.
- Make remote data/repository substitution possible later, without adding unnecessary layers now.

## 6. Pricing strategy — Proposed (requires future validation)

**Principle:** The same visual look can be commissioned for multiple occasions with different preparation, durability and time requirements. The price belongs to the service variant, **not the look image**.

Illustrative variants for `Personal Makeup`:

| Variant | Mock price | Mock duration |
|---|---:|---:|
| Casual / going out | 250,000 VND | 60 min |
| Party makeup | 350,000 VND | 75 min |
| Wedding guest | 450,000 VND | 90 min |

Optional examples: simple hairstyling +100,000 VND, false lashes +30,000 VND. **All sample numbers are fake, not approved Lookvi pricing.** Artist sets real prices. Separate bridal service when requirements materially differ.

### Pricing UX rules — Proposed
1. On Explore/Post cards, display **"From {lowest eligible advertised variant price}"** (if a valid priced service is linked).
2. Before booking, customer selects **variant/purpose**, optional add-ons, schedule and destination.
3. Recalculate subtotal; show travel fee separately if configured; show all known charges and a clear total before sending request.
4. A booking retains a **price snapshot**; confirmed prices should not silently change after a profile/service edit.
5. Never advertise a variant incompatible with the selected look just because it is cheaper.
6. Commission calculations use the appropriate confirmed/eligible order amount, but the precise basis and fee handling need product decisions.

### Pricing open decisions
- How does an artist indicate **which looks are achievable under which service variants**?
- Does appointment time of day, early travel, complexity, or group size change price?
- Travel fee formula and radius boundaries?
- Are style-specific surcharges permitted, and when/how are they presented?
- Which price components count towards platform commission?
- How are price changes/requotes approved and audited?

Do not silently implement an arbitrary rule for these unresolved items.

## 7. Booking lifecycle — Confirmed core / Proposed state names

**Core agreed behavior:** Customer submits request; artist accepts or declines; completed work can be marked by artist and challenged by customer. Cancellations by either side are free in initial MVP concept. Same-day requests should receive faster responses than future-date bookings, but exact SLAs are not set.

**Proposed technical statuses** (names not yet contractually fixed):

```text
PENDING_ARTIST_RESPONSE
  ├─> CONFIRMED (artist accepts)
  ├─> DECLINED (artist declines)
  ├─> CANCELLED_BY_CUSTOMER
  └─> EXPIRED (only if an explicit deadline is later defined)

CONFIRMED
  ├─> COMPLETED_BY_ARTIST
  ├─> CANCELLED_BY_CUSTOMER
  └─> CANCELLED_BY_ARTIST

COMPLETED_BY_ARTIST
  ├─> DISPUTED
  └─> CLOSED (after an agreed customer confirmation/dispute window)
```

Final status semantics and timers must be agreed before implementing real booking/payment logic. A pending request is **not** a confirmed appointment.

## 8. Payment, commission, dispute — Confirmed strategic concepts / implementation deferred

Previously discussed options:
- Customer can pay **directly** or through Lookvi.
- Lookvi earns commission from artist transactions, intended as a single rate across artists (percentage unspecified).
- If paid directly, artist may owe daily commission debt; end-of-day calculation/settlement was discussed.
- Overdue debt may suspend new booking intake.
- Disputed bookings should be excluded/held from debt settlement until resolved.
- Artist marks completion; customer can complain.

**Not MVP frontend tasks today:** Escrow/payment gateway, reconciliation ledger, debt scheduler, payment automation, chargebacks, a complete dispute engine. These require legal, operational and lifecycle rules. UI can later simulate the concepts, clearly labeled mock.

## 9. Trust and communication — Confirmed direction

- Artists require admin verification before providing services.
- Do not expose direct telephone contact in the product UX; use app chat.
- Reviews should ideally reflect actual fulfilled booking interactions.
- Separate public star ratings from a broader reputation notion; no reputation score formula is agreed.
- Privacy, safety, disputes, cancellations and no-show processes require later detailed specifications.

## 10. React Native engineering strategy — Proposed standard

**Stack:** React Native + Expo + TypeScript strict + Expo Router. Native `View`, `Text`, `Pressable`, `FlatList`, `ScrollView`, `expo-image`, safe-area handling. `StyleSheet` for initial styling; animations only where useful; choose compatible library versions.

```text
lookvi/
  app/                         # ROUTES ONLY
    _layout.tsx
    index.tsx
    (auth)/
      _layout.tsx
      welcome.tsx
      login.tsx
      onboarding.tsx
    (customer)/
      _layout.tsx
      (tabs)/
        _layout.tsx
        home.tsx
        explore.tsx
        saved.tsx              # only once implemented or explicit temporary state
        bookings.tsx           # only once implemented or explicit temporary state
        profile.tsx            # only once implemented or explicit temporary state
      search.tsx               # may be stack screen, as per existing Stitch UX
      posts/[postId].tsx       # or looks/[lookId].tsx; settle ID semantics consistently
  src/
    components/ui/
    components/layout/
    features/
      auth/
      onboarding/
      home/
      explore/
      search/
      looks/
    domain/models/
    data/mock/
    theme/
    utils/
  assets/images/
  CLAUDE.md
  docs/PRODUCT_CONTEXT.md
```

Do not auto-create empty architecture scaffolding for unimplemented features. Note: whether the detail route is `posts/[postId]` or `looks/[lookId]` depends on the actual entity shown by the Stitch view. **Choose and document one**, do not silently mix `postId` and `lookId` across the app.

### Feature conventions
- `src/features/search/screens/SearchScreen.tsx`: contains orchestration for search variants.
- `src/features/search/components/`: result cards, category tabs and query entry.
- `src/features/looks/screens/LookDetailScreen.tsx`: data-driven content detail.
- `src/features/explore/screens/ExploreScreen.tsx`: image grid and filter interaction.
- Cross-feature components only when genuinely reused.
- Business logic not in `app/` route files.
- Canonical models not duplicated across features.
- Route group `(artist)` is a future extension, not currently implemented.

## 11. Demo acceptance scenarios — Proposed

### Scenario A — discovery and search
1. User views Explore grid.
2. User searches "Natural glam".
3. User changes tabs All → Styles → Posts → Artists without losing query.
4. User opens a matching post/look detail.

### Scenario B — image-to-artist journey
1. User opens a makeup look.
2. UI identifies the artist and linked service/starting price.
3. Relevant buttons navigate to implemented screens; if missing, show an explicit demo limitation rather than pretend completion.

### Scenario C — next-phase booking journey (not implemented yet)
1. User selects service/variant and add-ons.
2. User picks schedule and address, reviews an itemized price.
3. User submits REQUEST → `PENDING_ARTIST_RESPONSE`.
4. Artist accepts → `CONFIRMED`.

## 12. Decision log and open questions

| Topic | Current status | Guidance |
|---|---|---|
| Makeup at home, narrow launch area | **Confirmed** | Enforce MVP focus |
| Visual look-first discovery | **Confirmed** | Primary UX |
| React Native + Expo for actual app | **Confirmed** | Do not generate web app |
| Stitch is reference for current screens | **Confirmed** | Preserve designs |
| English UI, naming Lookvi | **Confirmed in current implementation request** | Normalize legacy Glow branding to Lookvi |
| Artist controls services, price and radius | **Confirmed** | Keep in domain design |
| Customer requests, artist approves | **Confirmed** | Pending != confirmed |
| Fixed commission rate percentage | **Open decision** | Do not invent number |
| Exact booking response SLA | **Open decision** | Do not invent timings |
| Travel fee formula | **Open decision** | Not yet implemented |
| Separate `Look` entity vs style taxonomy | **Open decision** | Avoid premature schema lock |
| Package/complex-look compatibility rule | **Open decision** | Must settle before live booking |
| Service variants and add-ons UX | **Proposed** | Strong recommended direction |
| Direct vs in-app payment implementation | **Deferred** | Avoid payment backend |
| Admin, Artist dashboards, chat screens | **Future** | Build only on request/design |

## 13. When Claude receives a new task

1. Read this file and `CLAUDE.md` first.
2. Inspect the current codebase before inventing new folders or modifying established models.
3. Identify whether the request is **screen implementation**, **business rule**, **refactor**, or **future concept**.
4. Preserve existing UI, routes, feature names and contracts unless migration is explicitly required.
5. Mention unresolved product decisions before hardcoding behavior that depends on them.
6. Make focused changes and run available checks; report exactly what was or was not validated.
7. Update this file if the user confirms a new product decision.

## 13. Current development handoff — Verified from local setup report (2026-11-05)

- Expo SDK 58 (`expo ~58.0.23`), React Native 0.88.1, React 19.3.0, strict TypeScript; Expo Router, React Native `StyleSheet`, light-mode bootstrap.
- Root `app/_layout.tsx` and `app/index.tsx` exist; `src/` is prepared for feature-based implementation. No business feature is implemented yet.
- Original Stitch export is present under `ui/stitch_glow_beauty_app_ui/` and must not be modified or deleted.
- Expo official plugin, Draftbit Mobile Taste and `animate-expo` installed; `mobile-app-ux-design` is unavailable. Do not block UI work on the missing skill.
- `npx tsc --noEmit`, lint and `expo-doctor` passed at initialization; Android/iOS bundles created. Physical device/simulator testing remains unverified.
- 5 medium `npm audit` advisories reported in transitive dependencies. Treat as a tracking item; do not use `npm audit fix --force` or silently upgrade outside Expo SDK compatibility.
- Existing Git remote is configured; do not commit or push without explicit approval.
- The next authorized phase is **read-only design inventory and implementation planning**, not code generation. See `docs/DESIGN_DIRECTION.md` and `docs/STITCH_INTEGRATION_PLAN.md`.

### Source precedence

1. User's latest explicit instruction.
2. Confirmed product decisions in this document.
3. Approved Stitch screens/assets for visual fidelity.
4. `docs/DESIGN_DIRECTION.md` for interaction and consistency guidance.
5. Proposals/open decisions are recommendations, **not** fixed requirements.

If a Stitch screenshot conflicts with the booking/product semantics, flag the issue instead of silently implementing incorrect business logic.
