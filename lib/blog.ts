import { getWPData } from "./wp";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  content: string;
  eventDate: string | null;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
  categories: {
    name: string;
    slug: string;
  }[];
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface PostsResult {
  posts: WPPost[];
  pageCount: number;
}

// ---------------------------------------------------------------------------
// Revalidation
// ---------------------------------------------------------------------------

const BLOG_REVALIDATE_SECONDS = Number(
  process.env.WP_BLOG_REVALIDATE_SECONDS ?? "300"
);

// ---------------------------------------------------------------------------
// GraphQL queries
// ---------------------------------------------------------------------------

const POST_LIST_FIELDS = `
  id
  title
  slug
  excerpt
  date
  eventFields {
    eventDate
  }
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
`;

const GET_POSTS_QUERY = `
  query GetPosts($first: Int!, $after: String, $categoryName: String, $search: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: $categoryName
        search: $search
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${POST_LIST_FIELDS}
      }
    }
  }
`;

// Fetches only IDs — used to count total posts matching a filter set.
const COUNT_POSTS_QUERY = `
  query CountPosts($categoryName: String, $search: String) {
    posts(
      first: 1000
      where: {
        categoryName: $categoryName
        search: $search
      }
    ) {
      nodes {
        id
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

// Fetches cursor IDs only — used to skip to a specific page offset.
const GET_CURSOR_QUERY = `
  query GetCursor($skip: Int!, $categoryName: String, $search: String) {
    posts(
      first: $skip
      where: {
        categoryName: $categoryName
        search: $search
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        endCursor
      }
    }
  }
`;

const GET_POST_QUERY = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_LIST_FIELDS}
      content
    }
  }
`;

const GET_CATEGORIES_QUERY = `
  query GetCategories {
    categories(where: { hideEmpty: true, orderby: NAME }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

const GET_ADJACENT_POST_QUERY = `
  query GetAdjacentPosts {
    posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function mapPost(node: any): WPPost {
  const img = node?.featuredImage?.node ?? null;
  return {
    id: node.id ?? "",
    title: node.title ?? "",
    slug: node.slug ?? "",
    excerpt: node.excerpt ?? "",
    date: node.date ?? "",
    content: node.content ?? "",
    eventDate: node.eventFields?.eventDate ?? null,
    featuredImage: img
      ? { url: img.sourceUrl ?? "", alt: img.altText ?? "" }
      : null,
    categories: (node.categories?.nodes ?? []).map((c: any) => ({
      name: c.name ?? "",
      slug: c.slug ?? "",
    })),
  };
}

// ---------------------------------------------------------------------------
// getPosts
// ---------------------------------------------------------------------------

export async function getPosts({
  page = 1,
  perPage = 6,
  categorySlug,
  search,
}: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
  search?: string;
} = {}): Promise<PostsResult> {
  const categoryName = categorySlug ?? null;
  const searchTerm = search ?? null;
  const skipCount = (page - 1) * perPage;
  const fetchOpts = { revalidateSeconds: BLOG_REVALIDATE_SECONDS };

  // For page 1: count + fetch in parallel. For page > 1: count + cursor in parallel, then fetch.
  const countPromise = getWPData(
    COUNT_POSTS_QUERY,
    { categoryName, search: searchTerm },
    fetchOpts
  );

  let afterCursor: string | null = null;

  if (skipCount > 0) {
    const [countData, cursorData] = await Promise.all([
      countPromise,
      getWPData(GET_CURSOR_QUERY, { skip: skipCount, categoryName, search: searchTerm }, fetchOpts),
    ]);
    const total = (countData?.posts?.nodes ?? []).length;
    const pageCount = total === 0 ? 1 : Math.ceil(total / perPage);
    afterCursor = cursorData?.posts?.pageInfo?.endCursor ?? null;

    const postsData = await getWPData(
      GET_POSTS_QUERY,
      { first: perPage, after: afterCursor, categoryName, search: searchTerm },
      fetchOpts
    );
    const nodes: any[] = postsData?.posts?.nodes ?? [];
    return { posts: nodes.map(mapPost), pageCount };
  }

  const [countData, postsData] = await Promise.all([
    countPromise,
    getWPData(GET_POSTS_QUERY, { first: perPage, after: null, categoryName, search: searchTerm }, fetchOpts),
  ]);
  const total = (countData?.posts?.nodes ?? []).length;
  const pageCount = total === 0 ? 1 : Math.ceil(total / perPage);
  const nodes: any[] = postsData?.posts?.nodes ?? [];

  return {
    posts: nodes.map(mapPost),
    pageCount,
  };
}

export const EMPTY_POSTS_RESULT: PostsResult = { posts: [], pageCount: 1 };

// ---------------------------------------------------------------------------
// getPost
// ---------------------------------------------------------------------------

export async function getPost(slug: string): Promise<WPPost | null> {
  const data = await getWPData(
    GET_POST_QUERY,
    { slug },
    { revalidateSeconds: BLOG_REVALIDATE_SECONDS }
  );
  if (!data) return null;
  const node = data?.post ?? null;
  return node ? mapPost(node) : null;
}

// ---------------------------------------------------------------------------
// getCategories
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<WPCategory[]> {
  const data = await getWPData(
    GET_CATEGORIES_QUERY,
    {},
    { revalidateSeconds: BLOG_REVALIDATE_SECONDS }
  );
  if (!data) return [];
  const nodes: any[] = data?.categories?.nodes ?? [];
  return nodes
    .filter(
      (c) => c.slug !== "uncategorized" && typeof c.count === "number" && c.count > 0
    )
    .map((c) => ({
      id: c.id ?? "",
      name: c.name ?? "",
      slug: c.slug ?? "",
      count: c.count ?? 0,
    }));
}

// ---------------------------------------------------------------------------
// getAdjacentPost
// ---------------------------------------------------------------------------

export async function getAdjacentPost(
  slug: string,
  direction: "next" | "previous"
): Promise<{ slug: string; title: string } | null> {
  // WPGraphQL does not expose previous/next fields on Post, so we fetch all
  // posts ordered by date DESC and find neighbors by position.
  const data = await getWPData(
    GET_ADJACENT_POST_QUERY,
    {},
    { revalidateSeconds: BLOG_REVALIDATE_SECONDS }
  );
  if (!data) return null;
  const nodes: { slug: string; title: string }[] = data?.posts?.nodes ?? [];
  const index = nodes.findIndex((p) => p.slug === slug);

  if (index === -1) return null;

  // Posts are ordered newest-first (DESC).
  // "next" in reading direction = newer post = lower index.
  // "previous" in reading direction = older post = higher index.
  const neighborIndex = direction === "next" ? index - 1 : index + 1;

  if (neighborIndex < 0 || neighborIndex >= nodes.length) return null;

  const neighbor = nodes[neighborIndex];
  return { slug: neighbor.slug, title: neighbor.title };
}
