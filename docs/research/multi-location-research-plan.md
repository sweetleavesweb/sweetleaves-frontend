# Multi-Location Research Plan

## Goal

Research how cannabis retailers and general retailers handle multi-location websites to inform Sweetleaves' expansion to a second location.

---

## Research Gameplan

### Phase 1: Cannabis Competitor Audit (2–3 hours)

Visit 8–10 multi-location cannabis retailers' websites. Focus on Minnesota operators first, then expand to mature markets (CO, OR, CA, MI).

**What to look at on each site:**
- How does the homepage handle location? (auto-detect, picker, splash page, no distinction)
- Does each location get its own URL? (`/locations/north-loop` vs query param vs subdomain)
- How does the shop/menu switch between locations? (separate embeds, Dutchie location toggle, separate pages)
- What content is shared vs per-location? (about, blog, rewards vs hours, address, menu)
- How does the nav/footer adapt?
- Mobile experience — is location switching easy on small screens?

**Target sites to audit:**
- [ ] Verts Neighborhood Dispensary (MN, multi-location)
- [ ] Nothing But Hemp (MN, multi-location)
- [ ] Sunnyside (multi-state chain)
- [ ] Curaleaf (multi-state chain)
- [ ] Green Thumb / RISE (multi-state chain)
- [ ] Native Roots (CO, multi-location)
- [ ] TreeHouse Cannabis Co (CO)
- [ ] La Mota (OR, multi-location)
- [ ] Planet 13 (NV/CA)
- [ ] Cookies (national brand)

### Phase 2: General Retail Patterns (1–1.5 hours)

Look at how non-cannabis multi-location retailers solve the same problem, since they've had longer to refine it.

**Target sites:**
- [ ] Starbucks store locator
- [ ] Warby Parker (retail + ecommerce hybrid)
- [ ] Trader Joe's (multiple stores, one brand)
- [ ] REI (store pages + ecommerce)
- [ ] Total Wine (location-aware inventory)

**Focus on:**
- Store locator UX patterns
- How location affects the shopping experience
- Whether location persists across page navigations (cookies, URL, session)

### Phase 3: Dutchie-Specific Research (1 hour)

Sweetleaves uses Dutchie for the embedded menu. Understanding Dutchie's multi-location support is critical.

- [ ] Check if Dutchie supports a location switcher within the embed
- [ ] Determine if second location gets a separate Dutchie embed script ID
- [ ] Look at Dutchie's retailer docs / support articles on multi-location
- [ ] Find examples of Dutchie retailers with multiple embedded menus on one site
- [ ] Check if Dutchie handles location-based URL params (`dtche` prefix) per-store

### Phase 4: Synthesize Findings (1–1.5 hours)

- Fill in the findings template (see `multi-location-findings.md`)
- Identify the 2–3 patterns that best fit Sweetleaves' brand and tech stack
- Note what's tablestakes vs what would differentiate
- Draft a recommendation

---

## Time Budget

| Phase | Time | Output |
|-------|------|--------|
| Cannabis competitor audit | 2–3 hrs | Filled competitor grid |
| General retail patterns | 1–1.5 hrs | Pattern notes |
| Dutchie research | 1 hr | Technical constraints doc |
| Synthesis | 1–1.5 hrs | Recommendation in findings doc |
| **Total** | **5.5–7 hrs** | |

---

## Tips for Staying Efficient

1. **Timebox each site to 15 min.** Open it, screenshot the key flows (homepage → location select → menu → footer), jot notes, move on.
2. **Use your phone too.** Multi-location UX often breaks on mobile. Check at least 3 sites on your phone.
3. **Don't go deep on sites that are clearly bad.** Note "bad example" and why, then move on.
4. **Do the Dutchie research early** — it might constrain your options and save you from evaluating patterns you can't implement.
5. **Screenshot everything.** Drop screenshots in a folder — they'll be useful when discussing with the team.
