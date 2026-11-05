# Lookvi — Product Context

Curated from the owner's direct answers and from the reference pack in `chatgpt_doc/`
(ChatGPT-generated, **reference only**, not binding). Last reviewed: 2026-11-05.

Status key: **Confirmed** = stated by the owner · **Proposed** = recommended, not approved ·
**Open** = undecided, do not hard-code.

Source precedence: owner's latest instruction → Confirmed items here → Stitch
screens (visual fidelity) → Proposed items → `chatgpt_doc/` reference text.
If a Stitch screen conflicts with product rules, flag it instead of implementing it silently.

## 1. Identity and positioning — Confirmed

- Product name **Lookvi**; slug/package `lookvi`. Wordmark `lookvi.` as in Stitch.
  "Glow" was the former working name of the same project.
- Positioning: *Turn makeup inspiration into a bookable at-home service.*
- The entry point is a **look** (desired appearance), not a provider directory.
- Not a salon scheduler, not a TikTok clone, not hair/nail/spa (out of scope).

## 2. MVP scope

| Topic | Status | Decision |
|---|---|---|
| Build type | Confirmed | **MVP demo**: mock data, no backend |
| Market | Confirmed | **Vietnam**; prices in VND (`450.000 ₫`) |
| Launch area | Proposed | One limited area first (Stitch shows Da Nang); boundary TBD |
| Category | Confirmed | At-home makeup only |
| Purposes | Proposed | Personal, party, event, wedding guest; bridal as a separate service |
| Media | Proposed | Photos only; no video feed in MVP |
| Customer content | Confirmed | Customers **cannot post**; they search and browse the feed |
| Artist content | Confirmed | Artists publish posts and services, set their own prices |
| Payments | Confirmed | **Not in the demo**; added later |
| Commission | Proposed | One fixed % for all artists; rate Open |
| Ratings & reviews | Confirmed | Star rating **per completed booking** + written review |
| Artist verification | Confirmed | Planned (admin-verified); **optional in the demo** |
| Travel / area fee | Confirmed | **Not charged**; no separate travel line in price breakdowns, only a "Travel included" note |
| Service radius | Proposed | Artist sets a service radius (shown in Stitch artist setup) |
| Cancellation | Confirmed | Free until **2 hours before** the appointment; after that the cancel action is locked |
| Reschedule | Confirmed | Wanted, but **deferred**: not in the demo |
| Role entry | Confirmed | User **chooses Customer or Artist right after login** (new screen, not in Stitch) |
| Messaging | Proposed | In-app chat per booking; never expose phone numbers |
| Visual style | Confirmed | Lean, restrained, not flashy (see `DESIGN_DIRECTION` notes in CLAUDE.md §7) |
| UI language | Confirmed | **English only**, exactly as in the Stitch designs (no i18n for now); currency stays VND |

## 3. Roles

- **Customer** — browse feed/explore, search, view artist/portfolio/services, request,
  chat, track, cancel, rate and review.
- **Makeup Artist** — profile setup, posts, services and variants, booking requests
  (accept/decline), mark completion.
- **Admin** — future operational role (verification, complaints). No UI without a spec.

## 4. Domain model — Proposed

| Entity | Meaning |
|---|---|
| `User` | Authenticated account with role(s) |
| `Artist` | Service-capable profile: bio, area/radius, verification state, rating |
| `Post` | Artist-owned photo content; optional link to a service and style tags |
| `Look` / `MakeupStyle` | Visual style taxonomy (Korean, Douyin, Soft Glam…); **not purchasable** |
| `Service` | Artist-defined bookable offer |
| `ServiceVariant` | Purpose/package with explicit price and duration |
| `ServiceAddon` | Optional extra with its own price (lashes, hairstyling) |
| `Booking` | Request → appointment; holds a **price snapshot** |
| `Conversation` / `Message` | Customer–artist chat, usually tied to a booking |
| `Review` | Rating + text tied to a completed booking |
| `Dispute` | Complaint on a booking (future) |

Rules:
- Never merge `Post`, `Look`, `Service`, `Booking` into one model.
- Price belongs to the **service variant**, never to the image.
- **Open:** standalone `Look` entity vs. style taxonomy.
- **Proposed:** the full-screen look detail is keyed by `postId` (every image is an
  artist-owned post); use it consistently.

## 5. Pricing UX — Proposed

1. Cards may show **"From X ₫"** only when a valid priced service is linked.
2. Before requesting, the customer picks variant + add-ons + date/time + address and sees an
   itemized total.
3. A booking keeps a price snapshot; later service edits do not change it.
4. Never advertise a cheaper variant that cannot achieve the selected look.

**Open:** which looks each variant can achieve, time-of-day/complexity surcharges,
commission basis, re-quote approval. Sample prices in any doc are fake.

## 6. Booking lifecycle — Confirmed core, Proposed state names

Confirmed: the customer sends a **request**; the artist accepts or declines; a pending request
is not a confirmed appointment; the artist marks completion; either side can cancel free of
charge until 2 hours before the appointment.

**Demo status flow — Confirmed (shortened):** the Stitch 5-step tracker
(Requested → Confirmed → On The Way → Arrived → Done) is reduced to 3 steps.

```text
PENDING   → CONFIRMED | DECLINED | CANCELLED
CONFIRMED → COMPLETED | CANCELLED
```

`CANCELLED` records who cancelled (customer or artist). Progress trackers in the UI show
Requested → Confirmed → Completed. "On my way" / "Arrived" actions from Stitch are dropped.

**Implemented in the demo (Batch 3):**
- A request snapshots variant, duration and price; "Book again" starts a new request.
- Booking from a look offers only the variants that can achieve it; booking from a profile
  offers all variants.
- Demo availability: 14 days ahead, fixed daily slots, at least 2 hours from now, minus slots
  overlapping the artist's pending/confirmed bookings (real calendars come with a backend).
- The customer's area must be within the artist's service radius to send a request.
- Address is prefilled from the customer's most recent booking.
- Cancel is available while PENDING/CONFIRMED and more than 2 hours before start.
- Payment copy: "No advance payment … you pay after the service" (payments not in the demo).

**Deferred:** reschedule; rating/review after completion (no Stitch design yet).

**Chat (Batch 4):** one conversation per booking, shared by both roles. Messages containing a
phone-number-like run of 9+ digits cannot be sent (confirmed: contact stays in the app).
Closed bookings (declined/cancelled) keep a read-only history. No attachments or voice yet. **Open:** response SLA (Stitch copy "usually accepts within 15
minutes" is illustrative), review window, dispute flow.

## 7. Stitch screen inventory (`ui/stitch_glow_beauty_app_ui/`)

Read-only. **All** screens are current MVP reference. `glow_*` screens are Lookvi screens made before the rename (owner, 2026-11-05); normalize any `Glow` text to `Lookvi`.

| Area | `lookvi_*` screens |
|---|---|
| Customer · discovery | `refined_minimal_home`, `explore_grid_aligned_with_home`, `search_discovery`, `search_results_all` / `_styles` / `_posts` / `_artists` |
| Customer · artist & booking | `customer_artist_profile`, `customer_booking_form`, `customer_booking_confirmation`, `customer_booking_detail`, `customer_my_bookings`, `customer_booking_chat` |
| Customer · account | `customer_saved_looks_artists`, `customer_profile_account` |
| Artist | `artist_profile_setup`, `artist_dashboard`, `artist_portfolio`, `my_services`, `create_edit_service`, `booking_requests`, `artist_booking_detail` |

`glow_*`: `welcome_editorial_collage`, `login_ultra_minimal`, `first_time_profile_setup`,
`look_feed_douyin_shimmer_glow`, `look_feed_korean_soft_glam`.

Design system: `warm_editorial_beauty/DESIGN.md`. Known issue: its YAML tokens and prose
values disagree. Resolve before writing `src/theme`.

Notes:
- The four search screens are **states of one Search feature**; the two look-feed screens
  are **data variants of one detail screen**.
- Welcome, login, onboarding and look detail come from the `glow_*` exports.

## 8. UI implementation decisions — Confirmed (2026-11-05)

| Topic | Decision |
|---|---|
| Fidelity | Keep Stitch **layouts**, but simplify: drop redundant badges/chips, spa-style copy ("Rituals", "VIP Client", "Concierge", "Curated"), excess accent color; fix obvious bugs (wrong titles, broken images). Glow → Lookvi everywhere. |
| Images | Download the Stitch images, compress them, store under `assets/images/mock/`. No remote Google URLs in the app. Owner may replace them with real photos later. |
| Icons | Material Symbols Outlined (exact match to Stitch), bundled as a local icon font. |
| Fonts | Playfair Display (editorial titles) + Plus Jakarta Sans (UI); both support Vietnamese. |
| Tokens | Use the values actually rendered in the Stitch `code.html` Tailwind config, simplified to a lean set. |
| Delivery | In **batches**; stop after each batch so the owner can test on Expo Go before continuing. |
| New screen | Role selection after login (Customer / Artist), designed in the Stitch style. |

## 9. Open decisions (do not invent)

- `Look` entity vs. taxonomy.
- Reschedule flow (deferred); response SLA.
- Commission rate and basis; payment method (direct vs. in-app); debt settlement.
- Look ↔ variant compatibility rule; surcharges.
- Reputation beyond star rating (no formula yet).

## 10. Demo acceptance scenarios — Proposed

- **A — discovery:** Explore grid → search a query → switch All/Styles/Posts/Artists
  without losing the query → open a result.
- **B — look to artist:** open a look → see the artist and linked "From X ₫" → navigate on;
  missing destinations show an explicit demo notice.
- **C — booking (later):** pick variant/add-ons/time/address → itemized total → submit →
  `PENDING` → artist accepts → `CONFIRMED` → artist completes → `COMPLETED`.
