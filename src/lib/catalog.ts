import raw from "@/data/catalog.json";

export type Size = { label: string; stock: number };
export type Colorway = { name: string | null; sizes: Size[] };

export type Product = {
  id: string;
  /** Position on the store's own 베스트 board, 1-20. null outside the top 20. */
  bestRank: number | null;
  /** Position in the store's all-time TOTALSALE sort. Not the 베스트 board. */
  saleRank: number;
  name: string;
  tab: TabId;
  gender: "남성" | "여성" | "공용" | null;
  trail: boolean;
  category: string | null;
  listPrice: number;
  price: number;
  off: number;
  rating: number | null;
  reviews: number;
  image: string;
  gallery: string[];
  desc: string | null;
  colors: Colorway[];
  delivery: {
    feeType: string | null;
    baseFee: number | null;
    freeOver: number | null;
    company: string | null;
    today: boolean;
  };
};

export type TabId = "shoes" | "apparel" | "acc" | "sale";

export const TABS: { id: TabId; label: string }[] = [
  { id: "shoes", label: "신발" },
  { id: "apparel", label: "의류" },
  { id: "acc", label: "액세서리" },
  { id: "sale", label: "세일" },
];

export const products = raw as unknown as Product[];

export const byId = new Map(products.map((p) => [p.id, p]));

/** The store's 베스트 board, in its own order. */
export const bestBoard = products
  .filter((p): p is Product & { bestRank: number } => p.bestRank != null)
  .sort((a, b) => a.bestRank - b.bestRank);

export function inTab(p: Product, tab: TabId) {
  return tab === "sale" ? p.off > 0 : p.tab === tab;
}

export function tabProducts(tab: TabId) {
  return products.filter((p) => inTab(p, tab));
}

/** Naver serves fixed variants; anything else 404s. */
export function cdn(url: string, variant: "f300_300" | "f500_500" | "f750_974") {
  return `${url}?type=${variant}`;
}

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

/** Sizes are per colourway; a product is orderable while any size has stock. */
export function inStock(p: Product) {
  return p.colors.some((c) => c.sizes.some((s) => s.stock > 0));
}

export function search(q: string, limit = 60) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  const terms = t.split(/\s+/);
  return products
    .filter((p) => {
      const hay = `${p.name} ${p.category ?? ""}`.toLowerCase();
      return terms.every((w) => hay.includes(w));
    })
    .slice(0, limit);
}

/* Delivery policy as the store states it, read from the catalogue. */
const policy = products.find((p) => p.delivery.freeOver)?.delivery;
export const FREE_OVER = policy?.freeOver ?? 100000;
export const BASE_FEE = policy?.baseFee ?? 3500;

/** Shipping is free on an empty cart and once the goods total clears the threshold. */
export function shippingFor(goods: number) {
  return goods === 0 || goods >= FREE_OVER ? 0 : BASE_FEE;
}
