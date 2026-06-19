import { getWPData } from "./wp";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  menuOrder: number;
  isCommonQuestion: boolean;
}

export interface FaqSection {
  name: string;
  slug: string;
  sortOrder: number;
  faqs: FaqItem[];
}

// ---------------------------------------------------------------------------
// Revalidation
// ---------------------------------------------------------------------------

const FAQ_REVALIDATE_SECONDS = Number(
  process.env.WP_FAQ_REVALIDATE_SECONDS ?? "300"
);

// ---------------------------------------------------------------------------
// GraphQL
// ---------------------------------------------------------------------------

const GET_FAQS_QUERY = `
  query GetFaqs {
    faqs(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        databaseId
        title
        content
        menuOrder
        isCommonQuestion
        faqSections {
          nodes {
            databaseId
            name
            slug
            sortOrder
          }
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapFaq(node: any): FaqItem & { sections: { name: string; slug: string; sortOrder: number }[] } {
  return {
    id: String(node.databaseId ?? ""),
    question: node.title ?? "",
    answer: node.content ?? "",
    menuOrder: node.menuOrder ?? 0,
    isCommonQuestion: node.isCommonQuestion ?? false,
    sections: (node.faqSections?.nodes ?? []).map((s: any) => ({
      name: s.name ?? "",
      slug: s.slug ?? "",
      sortOrder: s.sortOrder ?? 0,
    })),
  };
}

// ---------------------------------------------------------------------------
// getFaqSections — all FAQs grouped by section, sorted
// ---------------------------------------------------------------------------

export async function getFaqSections(): Promise<FaqSection[]> {
  const data = await getWPData(GET_FAQS_QUERY, {}, {
    revalidateSeconds: FAQ_REVALIDATE_SECONDS,
  });
  if (!data) return [];

  const nodes: any[] = data?.faqs?.nodes ?? [];
  const mapped = nodes.map(mapFaq);

  // Group by section
  const sectionMap = new Map<string, FaqSection>();

  for (const faq of mapped) {
    for (const section of faq.sections) {
      if (!sectionMap.has(section.slug)) {
        sectionMap.set(section.slug, {
          name: section.name,
          slug: section.slug,
          sortOrder: section.sortOrder,
          faqs: [],
        });
      }
      sectionMap.get(section.slug)!.faqs.push({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        menuOrder: faq.menuOrder,
        isCommonQuestion: faq.isCommonQuestion,
      });
    }
  }

  // Sort sections by sortOrder, then FAQs within each by menuOrder
  return Array.from(sectionMap.values())
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((section) => ({
      ...section,
      faqs: section.faqs.sort((a, b) => a.menuOrder - b.menuOrder),
    }));
}

// ---------------------------------------------------------------------------
// getCommonFaqs — just the ones marked as common, for other pages
// ---------------------------------------------------------------------------

export async function getCommonFaqs(): Promise<FaqItem[]> {
  const data = await getWPData(GET_FAQS_QUERY, {}, {
    revalidateSeconds: FAQ_REVALIDATE_SECONDS,
  });
  if (!data) return [];

  const nodes: any[] = data?.faqs?.nodes ?? [];
  return nodes
    .map(mapFaq)
    .filter((faq) => faq.isCommonQuestion)
    .sort((a, b) => a.menuOrder - b.menuOrder)
    .map(({ sections: _, ...faq }) => faq);
}

// ---------------------------------------------------------------------------
// getFaqsBySection — FAQs from a specific section slug
// ---------------------------------------------------------------------------

export async function getFaqsBySection(sectionSlug: string): Promise<FaqItem[]> {
  const data = await getWPData(GET_FAQS_QUERY, {}, {
    revalidateSeconds: FAQ_REVALIDATE_SECONDS,
  });
  if (!data) return [];

  const nodes: any[] = data?.faqs?.nodes ?? [];
  return nodes
    .map(mapFaq)
    .filter((faq) => faq.sections.some((s) => s.slug === sectionSlug))
    .sort((a, b) => a.menuOrder - b.menuOrder)
    .map(({ sections: _, ...faq }) => faq);
}
