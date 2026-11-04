"use client";

import { useEffect, useState } from "react";

// THROWAWAY SPIKE: shows the dtche params Dutchie writes back to our URL.

export default function UrlReadout() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const id = setInterval(() => setSearch(decodeURIComponent(window.location.search)), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <code className="block p-2 rounded bg-parchment text-xs break-all">
      {search || "(no query params)"}
    </code>
  );
}
