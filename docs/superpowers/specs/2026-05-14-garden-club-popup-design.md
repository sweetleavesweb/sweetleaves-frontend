# Garden Club Popup — Design Spec

## Overview

A dismissible popup promoting Garden Club signup. Appears after the age gate is confirmed, triggered by either scrolling 25% down the page or navigating to a new page. Suppressed for 24 hours after dismissal. Never shown on the `/loyalty` page.

---

## Component

**File:** `app/components/GardenClubPopup.tsx`
**Type:** `"use client"` component
**Placement:** Registered in `app/layout.tsx` alongside `PageViewTracker` (no other files affected; does not impact SSR of siblings or page tree)

---

## Trigger Logic

Two independent triggers — whichever fires first shows the popup:

1. **Scroll trigger:** A `scroll` event listener on `window` checks `window.scrollY / document.body.scrollHeight >= 0.25`. Fires once, then the listener removes itself.
2. **Navigation trigger:** A `useEffect` watching `usePathname()` — any pathname change while the age gate is verified counts as a trigger.

Both triggers gate on:
- `useAgeGateStatus() === "verified"`
- `usePathname() !== "/loyalty"`
- `localStorage.getItem("gardenClub:dismissedAt")` is either absent or older than 24 hours

---

## Dismiss Behavior

On X button click:
- Popup closes (local `visible` state set to `false`)
- `localStorage.setItem("gardenClub:dismissedAt", Date.now().toString())` is written
- Popup will not reappear for 24 hours

---

## Visual Design

Matches the provided screenshot exactly:

- **Backdrop:** `fixed inset-0 z-50 bg-almost-black/40`, centers the card
- **Card:** `bg-dark-green rounded-2xl p-8 w-full max-w-sm shadow-2xl relative`
- **X button:** Absolute top-right corner (`absolute top-4 right-4`), plain `×` character, `text-white`, dismisses the popup
- **Heading row:** `/rewards/garden-club-text.png` (the "Garden Club" wordmark) displayed inline with a `Sweetleaves_Icon_DarkGreen.svg` leaf icon in a `bg-light-gold` rounded-full circle badge, positioned to the right
- **Body text:** `"Earn points with every purchase and get exclusive access to new products and giveaways."` — `text-ivory text-sm`
- **CTA button:** Full-width, `bg-light-gold text-dark-green font-semibold uppercase rounded-full py-3`, text `"SIGN UP"`, links to `/loyalty#signup` via Next.js `<Link>`

---

## Assets Used

| Asset | Path |
|---|---|
| Garden Club wordmark | `/rewards/garden-club-text.png` |
| Leaf icon | `/logos-and-icons/icon/Sweetleaves_Icon_DarkGreen.svg` |

---

## What Is Not In Scope

- Animation/transition on popup enter/exit
- Analytics tracking on popup show or dismiss
- Any A/B testing or flag-gating
