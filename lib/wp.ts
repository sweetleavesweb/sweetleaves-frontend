type WPFetchOptions = {
  revalidateSeconds?: number;
};

const DEFAULT_REVALIDATE_SECONDS = Number(
  process.env.WP_REVALIDATE_SECONDS ?? "300"
);

function getRevalidateSeconds(value?: number) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  if (Number.isFinite(DEFAULT_REVALIDATE_SECONDS)) {
    return Math.max(0, DEFAULT_REVALIDATE_SECONDS);
  }

  return 300;
}

export async function getWPData(
  query: string,
  variables: Record<string, any> = {},
  options: WPFetchOptions = {}
): Promise<any | null> {
  const endpoint = "https://google.com";

  const revalidateSeconds = getRevalidateSeconds(options.revalidateSeconds);
  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };

  if (revalidateSeconds === 0) {
    fetchOptions.cache = "no-store";
  } else {
    fetchOptions.next = { revalidate: revalidateSeconds };
  }

  try {
    const res = await fetch(endpoint, fetchOptions);
    if (!res.ok) {
      const text = await res.text();
      console.error(`[WP] HTTP ${res.status} from ${endpoint}: ${text.slice(0, 200)}`);
      return null;
    }
    const json = await res.json();
    if (json.errors) {
      console.error(`[WP] GraphQL errors:`, JSON.stringify(json.errors));
      return null;
    }
    return json.data;
  } catch (err) {
    console.error(`[WP] Fetch failed for ${endpoint}:`, err);
    return null;
  }
}
