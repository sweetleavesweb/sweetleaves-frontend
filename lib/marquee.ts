import { getWPData } from "./wp";

const GET_MARQUEE_ITEMS_QUERY = `
  query GetMarqueeItems {
    marqueeItems(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        title
      }
    }
  }
`;

export async function getMarqueeItems(): Promise<string[]> {
  const data = await getWPData(GET_MARQUEE_ITEMS_QUERY);
  if (!data) return [];
  const nodes: { title: string }[] = data?.marqueeItems?.nodes ?? [];
  return nodes.map((node) => node.title ?? "").filter(Boolean);
}
