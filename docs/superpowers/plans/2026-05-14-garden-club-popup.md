# Garden Club Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dismissible Garden Club signup popup that appears after the age gate is confirmed, triggered by scrolling 25% down any page or navigating to a new page, suppressed for 24 hours after dismissal, and never shown on `/loyalty`.

**Architecture:** A single `"use client"` `GardenClubPopup` component owns all trigger logic, dismiss logic, and rendering. It reads age gate status via the existing `useAgeGateStatus()` hook and page changes via `usePathname()`. Registered in `app/layout.tsx` alongside `PageViewTracker` — no other files are affected.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `app/components/GardenClubPopup.tsx` | Popup component — triggers, dismiss logic, rendering |
| Modify | `app/layout.tsx` | Register `GardenClubPopup` next to `PageViewTracker` |

---

### Task 1: Create `GardenClubPopup.tsx`

**Files:**
- Create: `app/components/GardenClubPopup.tsx`

- [ ] **Step 1: Create the file with the complete implementation**

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgeGateStatus } from "./AgeGate";

const STORAGE_KEY = "gardenClub:dismissedAt";
const TTL_MS = 24 * 60 * 60 * 1000;

function isDismissedWithinTtl(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  return Date.now() - Number(raw) < TTL_MS;
}

export default function GardenClubPopup() {
  const [visible, setVisible] = useState(false);
  const status = useAgeGateStatus();
  const pathname = usePathname();
  const triggered = useRef(false);

  function maybeShow() {
    if (triggered.current) return;
    if (status !== "verified") return;
    if (pathname.startsWith("/loyalty")) return;
    if (isDismissedWithinTtl()) return;
    triggered.current = true;
    setVisible(true);
  }

  // Scroll trigger: fires once when the user has scrolled 25% of the page
  useEffect(() => {
    if (status !== "verified") return;

    function handleScroll() {
      const ratio =
        window.scrollY / document.documentElement.scrollHeight;
      if (ratio >= 0.25) {
        maybeShow();
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigation trigger: fires on any pathname change while verified
  useEffect(() => {
    maybeShow();
  }, [pathname, status]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-almost-black/40 px-6">
      <div className="relative bg-dark-green rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-white text-xl leading-none hover:opacity-70 transition-opacity"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/rewards/garden-club-text.png"
            alt="Garden Club"
            width={220}
            height={38}
            className="h-auto"
          />
          <div className="flex-shrink-0 w-12 h-12 bg-light-gold rounded-full flex items-center justify-center">
            <Image
              src="/logos-and-icons/icon/Sweetleaves_Icon_DarkGreen.svg"
              alt=""
              width={28}
              height={28}
            />
          </div>
        </div>

        <p className="text-ivory text-sm mb-6">
          Earn points with every purchase and get exclusive access to new
          products and giveaways.
        </p>

        <Link
          href="/loyalty#signup"
          onClick={handleDismiss}
          className="block w-full bg-light-gold text-dark-green font-semibold uppercase text-sm text-center rounded-full py-3 hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/GardenClubPopup.tsx
git commit -m "feat: add GardenClubPopup component"
```

---

### Task 2: Register in layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add the import**

In `app/layout.tsx`, add after the `PageViewTracker` import line:

```tsx
import GardenClubPopup from "./components/GardenClubPopup";
```

- [ ] **Step 2: Render the component**

In `app/layout.tsx`, add `<GardenClubPopup />` directly after `<PageViewTracker />`:

```tsx
<AlpineIQProvider />
<PageViewTracker />
<GardenClubPopup />
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: register GardenClubPopup in root layout"
```

---

### Task 3: Manual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify scroll trigger**

1. Open `http://localhost:3000` in a browser
2. Clear localStorage (`localStorage.clear()` in DevTools console) to reset dismiss state
3. Pass the age gate
4. Scroll down until roughly a quarter of the page is above the viewport
5. Expected: popup appears with Garden Club heading, leaf badge, body text, and SIGN UP button

- [ ] **Step 3: Verify dismiss and TTL**

1. Click the ✕ button
2. Expected: popup closes
3. In DevTools console, run `localStorage.getItem("gardenClub:dismissedAt")`
4. Expected: a numeric timestamp string
5. Scroll back down past 25% — popup should NOT reappear (triggered ref prevents it)
6. Hard-refresh the page and scroll past 25% — popup should NOT reappear (localStorage TTL blocks it)

- [ ] **Step 4: Verify navigation trigger**

1. In DevTools console, run `localStorage.clear()` to reset
2. Hard-refresh the page
3. Pass the age gate but do NOT scroll
4. Click a nav link (e.g., Shop)
5. Expected: popup appears on the new page

- [ ] **Step 5: Verify /loyalty exclusion**

1. Clear localStorage and hard-refresh
2. Pass the age gate
3. Navigate directly to `/loyalty`
4. Expected: popup does NOT appear
5. Scroll past 25% on `/loyalty` — popup should still NOT appear

- [ ] **Step 6: Verify 24-hour suppression via time override**

1. Clear localStorage and hard-refresh
2. Pass the age gate and trigger the popup, then dismiss it
3. In DevTools console, set the timestamp to 25 hours ago:
   ```js
   localStorage.setItem("gardenClub:dismissedAt", (Date.now() - 25 * 60 * 60 * 1000).toString())
   ```
4. Hard-refresh and pass age gate, then trigger popup
5. Expected: popup appears again (TTL expired)

- [ ] **Step 7: Stop the dev server when done**

`Ctrl+C`
