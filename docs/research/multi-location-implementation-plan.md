# Multi-Location Implementation Plan

> Fill in the "Recommended Approach" section of `multi-location-findings.md` before refining this plan. The estimates below assume a location-aware Next.js site with per-location Dutchie embeds — adjust if research points to a different pattern.

---

## Phase 1: Data Layer & Location Config (3–5 hours)

Create a single source of truth for location data that the rest of the site reads from.

- [ ] Create `lib/locations.ts` with typed location data (name, slug, address, phone, hours, coordinates, Dutchie script ID, license number, Google Maps URL, social links)
- [ ] Decide on location persistence: cookie vs URL path vs session storage
- [ ] Add a `getLocation(slug)` and `getLocations()` helper
- [ ] Add the second location's data once it's known

**Depends on:** Knowing the second location's address, hours, Dutchie embed ID, and license number.

---

## Phase 2: URL Strategy & Routing (2–4 hours)

Set up the URL structure so each location has its own namespace where needed.

- [ ] Choose URL pattern (e.g., `/locations/[slug]/` for location pages, `/shop/[slug]/` for per-location menus)
- [ ] Create location landing page template (`/locations/[slug]/page.tsx`)
- [ ] Update sitemap generation to include location pages
- [ ] Add redirects if any existing URLs change
- [ ] Set up `robots.txt` if needed

---

## Phase 3: Location Switcher Component (3–5 hours)

Let users choose and change their location.

- [ ] Build `LocationSwitcher` component (dropdown or modal)
- [ ] Decide placement — nav bar, above the fold, or both
- [ ] Persist selection (cookie or localStorage)
- [ ] Mobile-friendly design
- [ ] Handle first-visit experience (default location or force a choice?)

---

## Phase 4: Shop/Menu Per Location (2–4 hours)

Wire up the Dutchie embed to show the correct location's menu.

- [ ] Update `DutchieEmbed` to accept location-based script source from config
- [ ] Create per-location shop routes or a dynamic route
- [ ] Test that Dutchie URL params (`dtche*`) work correctly per location
- [ ] Handle deep links to specific products at a specific location

---

## Phase 5: Footer & Contact Updates (2–3 hours)

Make the footer and contact page location-aware.

- [ ] Refactor `Footer.tsx` to read from location config instead of hardcoded values
- [ ] Show both locations in footer, or show selected location with a toggle
- [ ] Update Google Maps embed per location
- [ ] Update contact page to list both locations
- [ ] Update phone number display per location

---

## Phase 6: SEO & Structured Data (2–3 hours)

- [ ] Add `LocalBusiness` JSON-LD schema per location
- [ ] Create or update Google Business Profiles per location
- [ ] Set up proper canonical URLs
- [ ] Update meta descriptions for location pages
- [ ] Verify location pages are crawlable and indexed

---

## Phase 7: Testing & QA (2–3 hours)

- [ ] Test location switching across all key pages
- [ ] Test Dutchie embed loads correct menu per location
- [ ] Test on mobile (location switcher, footer, maps)
- [ ] Test SEO: structured data validator, sitemap, meta tags
- [ ] Test location persistence across page navigations and sessions
- [ ] Verify no regressions on existing single-location experience

---

## Summary

| Phase | Estimate | Can Start |
|-------|----------|-----------|
| 1. Data layer & config | 3–5 hrs | After research complete |
| 2. URL strategy & routing | 2–4 hrs | After Phase 1 |
| 3. Location switcher | 3–5 hrs | After Phase 1 |
| 4. Shop/menu per location | 2–4 hrs | After Phase 1, needs Dutchie ID |
| 5. Footer & contact | 2–3 hrs | After Phase 1 |
| 6. SEO & structured data | 2–3 hrs | After Phase 2 |
| 7. Testing & QA | 2–3 hrs | After all above |
| **Total** | **16–27 hrs** | |

Phases 2–5 can be parallelized once the data layer is in place.

---

## Hardcoded Values to Extract

These are the places in the current codebase where single-location data is hardcoded and will need to read from the location config:

| File | What's Hardcoded |
|------|-----------------|
| `app/components/DutchieEmbed.tsx` | Dutchie script source URL (line 10) |
| `app/components/Footer.tsx` | Address (line 112–115), phone (line 118–120), hours (lines 132–152), Google Maps embed (lines 158–167, 175–183), license number (line 239) |
| `app/components/Footer.tsx` | "Located in North Loop Minneapolis" tagline (line 28) |
| _others found during implementation_ | |

---

## Open Questions (Answer During Research)

1. Does the second location share the same rewards/loyalty program?
2. Will both locations have the same hours?
3. Same social media accounts or separate?
4. Does the Dutchie embed ID differ per location, or is it one account with location filtering?
5. Will both locations be operational at launch, or a staggered rollout?
6. Any location-specific compliance or license display requirements?
