interface Topic {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  commentsCount: number;
  createdAt: string;
  disabledWhenScheduled: boolean;
  featuredAt: string;
  featuredComment: string | null;
  hasVoted: boolean;
  id: string;
  name: string;
  pricingType: string;
  productState: string;
  shortenedUrl: string;
  slug: string;
  tagline: string;
  topics: { edges: { node: Topic }[] };
  updatedAt: string;
  thumbnail: { id: string; imageUuid: string };
}
