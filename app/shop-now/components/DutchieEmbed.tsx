"use client";

import { useEffect, useRef } from "react";

interface Props {
  dutchieParams?: Record<string, string>;
}

const SCRIPT_SRC = "https://dutchie.com/api/v2/embedded-menu/65ae80f7dbecc7000934725c.js";

export default function DutchieEmbed({ dutchieParams }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const container = rootRef.current;

    // Capture original before any interception so cleanup can fully restore it.
    const origReplaceState = window.history.replaceState.bind(window.history);

    // Dutchie reads dtche params from window.location.search, but it does so
    // *after* an async ensureFeatureFlagsReady() network request. On mobile,
    // that round-trip is slow enough that Next.js router effects fire in the
    // meantime and call replaceState with the bare pathname, stripping our
    // params. Intercept replaceState so any call that would remove dtche params
    // silently adds them back. Calls that already carry dtche params (e.g.
    // Dutchie navigating to a product page inside the embed) pass through.
    if (dutchieParams) {
      const params = dutchieParams;
      window.history.replaceState = function (
        data: unknown,
        unused: string,
        newUrl?: string | URL | null
      ): void {
        if (newUrl != null) {
          try {
            const u = new URL(newUrl.toString(), window.location.href);
            if (![...u.searchParams.keys()].some((k) => k.startsWith("dtche"))) {
              for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
              origReplaceState(data, unused, u.toString());
              return;
            }
          } catch {
            // malformed URL – fall through to origReplaceState
          }
        }
        origReplaceState(data, unused, newUrl);
      };
    }

    // Write dtche params into the URL now so Dutchie finds them immediately
    // if the feature-flags request is fast.
    const url = new URL(window.location.href);
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("dtche")) url.searchParams.delete(key);
    }
    if (dutchieParams) {
      for (const [key, value] of Object.entries(dutchieParams)) {
        url.searchParams.set(key, value);
      }
    }
    origReplaceState(null, "", url.toString());

    // Remove any stale script so a fresh one loads with the updated params.
    document.getElementById("dutchie--embed__script")?.remove();

    const s = document.createElement("script");
    s.id = "dutchie--embed__script";
    s.src = SCRIPT_SRC;
    s.async = true;
    container.appendChild(s);

    return () => {
      window.history.replaceState = origReplaceState;
      s.remove();
      container.innerHTML = "";
      const cleanUrl = new URL(window.location.href);
      for (const key of [...cleanUrl.searchParams.keys()]) {
        if (key.startsWith("dtche")) cleanUrl.searchParams.delete(key);
      }
      origReplaceState(null, "", cleanUrl.toString());
    };
  }, [dutchieParams]);

  return <div ref={rootRef} />;
}
