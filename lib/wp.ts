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
) {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT || "https://cms.sweetleaves.co/graphql";

  if (!endpoint) {
    throw new Error("Missing WP_GRAPHQL_ENDPOINT env var");
  }

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

  const res = await fetch(endpoint, fetchOptions);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP GraphQL error ${res.status}: ${text}`);
  }
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}
