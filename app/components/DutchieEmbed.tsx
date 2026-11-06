"use client";

import { useEffect, useRef } from "react";

interface Props {
  dutchieParams?: Record<string, string>;
  scriptSrc?: string;
  delivery?: boolean;
}

const REC_SCRIPT_SRC = "https://dutchie.com/api/v2/embedded-menu/65ae80f7dbecc7000934725c.js";
// Opens the menu on the delivery address search instead of the pickup menu.
const REC_DELIVERY_SCRIPT_SRC = `${REC_SCRIPT_SRC}?chainLocations=true&searchMethod=deliveryArea`;

export default function DutchieEmbed({ dutchieParams, scriptSrc, delivery }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const container = rootRef.current;

    // Dutchie's script reads dtche params from window.location.search at init time,
    // so they must be present before the script tag is appended.
    const url = new URL(window.location.href);
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("dtche")) url.searchParams.delete(key);
    }
    if (dutchieParams) {
      for (const [key, value] of Object.entries(dutchieParams)) {
        url.searchParams.set(key, value);
      }
    }
    window.history.replaceState(null, "", url.toString());

    // Remove any stale script so a fresh one loads with the updated params.
    document.getElementById("dutchie--embed__script")?.remove();

    const s = document.createElement("script");
    s.id = "dutchie--embed__script";
    s.src = scriptSrc ?? (delivery ? REC_DELIVERY_SCRIPT_SRC : REC_SCRIPT_SRC);
    s.async = true;
    s.defer = true;
    container.appendChild(s);

    return () => {
      s.remove();
      container.innerHTML = "";
      const cleanUrl = new URL(window.location.href);
      for (const key of [...cleanUrl.searchParams.keys()]) {
        if (key.startsWith("dtche")) cleanUrl.searchParams.delete(key);
      }
      window.history.replaceState(null, "", cleanUrl.toString());
    };
  }, [dutchieParams, scriptSrc, delivery]);

  return <div ref={rootRef} />;
}
