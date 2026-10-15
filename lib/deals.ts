import { getWPData } from "./wp";
import { SITE_URL } from "./site";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DealSlide {
  url: string;
  alt: string;
  href: string | null;
}

type DealNode = {
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  dealFields: { dealUrl: string | null } | null;
};

// ---------------------------------------------------------------------------
// GraphQL
// ---------------------------------------------------------------------------

const GET_DEALS_QUERY = `
  query GetDeals {
    deals(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        dealFields {
          dealUrl
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Link normalisation
// ---------------------------------------------------------------------------

function stripWww(hostname: string): string {
  return hostname.replace(/^www\./, "");
}

const SITE_HOST = stripWww(new URL(SITE_URL).hostname);

function toSlideHref(dealUrl: string | null | undefined): string | null {
  const url = dealUrl?.trim();
  if (!url) return null;
  try {
    const parsed = new URL(url, SITE_URL);
    if (stripWww(parsed.hostname) !== SITE_HOST) return parsed.href;
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// getDealsBannerSlides
// ---------------------------------------------------------------------------

export async function getDealsBannerSlides(): Promise<DealSlide[]> {
  const data = await getWPData(GET_DEALS_QUERY);
  if (!data) return [];
  const nodes: DealNode[] = data?.deals?.nodes ?? [];
  return nodes
    .filter((node) => node?.featuredImage?.node?.sourceUrl)
    .map((node) => ({
      url: node.featuredImage!.node.sourceUrl,
      alt: node.title ?? "",
      href: toSlideHref(node.dealFields?.dealUrl),
    }));
}
