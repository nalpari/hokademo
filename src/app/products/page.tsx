import Link from "next/link";
import { Suspense } from "react";
import Masthead from "@/components/Masthead";
import ProductCard from "@/components/ProductCard";
import { TABS, tabProducts, type TabId } from "@/lib/catalog";

export const metadata = { title: "전체상품 · 호카코리아" };

type Search = { tab?: string; trail?: string };

function isTab(v: string | undefined): v is TabId {
  return TABS.some((t) => t.id === v);
}

async function Listing({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const tab: TabId = isTab(sp.tab) ? sp.tab : "shoes";
  const trailOnly = sp.trail === "1";

  const all = tabProducts(tab);
  const items = trailOnly ? all.filter((p) => p.trail) : all;
  const trailCount = all.filter((p) => p.trail).length;

  return (
    <>
      <Masthead tab={tab} />

      <main>
        <div className="head">
          <h2>{TABS.find((t) => t.id === tab)!.label}</h2>
          <span className="count">{items.length.toLocaleString("ko-KR")}개</span>
        </div>

        {trailCount > 0 && (
          <div className="chips">
            <Link
              href={`/products?tab=${tab}`}
              aria-current={!trailOnly ? "true" : undefined}
            >
              전체
            </Link>
            <Link
              href={`/products?tab=${tab}&trail=1`}
              aria-current={trailOnly ? "true" : undefined}
            >
              트레일 {trailCount}
            </Link>
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty">
            <strong>아직 상품이 없습니다</strong>
            <p>
              이 조건에 맞는 상품이 없습니다.
              <br />
              다른 카테고리를 둘러보세요.
            </p>
          </div>
        ) : (
          <div className="grid">
            {items.map((p, i) => (
              <ProductCard key={p.id} p={p} priority={i < 4} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default function ProductsPage(props: { searchParams: Promise<Search> }) {
  return (
    <Suspense fallback={<Masthead tab="shoes" />}>
      <Listing {...props} />
    </Suspense>
  );
}
