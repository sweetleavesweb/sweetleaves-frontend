import { getWPData } from "./wp";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DealSlide {
  url: string;
  alt: string;
}

type DealNode = {
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
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
      }
    }
  }
`;

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
    }));
}
