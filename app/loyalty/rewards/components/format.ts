export function formatDate(seconds: number): string {
  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatExpiration(expiration: number): string | null {
  if (!expiration) return null;
  const date = new Date(expiration * 1000);
  if (date.getTime() < Date.now()) return null;
  return formatDate(expiration);
}
