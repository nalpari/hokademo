"use client";

import Link from "next/link";
import Masthead from "@/components/Masthead";
import ProductCard from "@/components/ProductCard";
import { byId } from "@/lib/catalog";
import { useWishlist } from "@/lib/store";

export default function WishlistPage() {
  const { ids, ready } = useWishlist();
  const items = ids.map((id) => byId.get(id)).filter((p) => p != null);

  return (
    <>
      <Masthead title="찜" />
      <main style={{ paddingTop: 16 }}>
        {!ready ? (
          <div className="empty" aria-busy="true">
            <p>불러오는 중…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty">
            <strong>찜한 상품이 없습니다</strong>
            <p>상품의 하트를 눌러 저장해 두세요.</p>
            <Link className="btn" href="/products?tab=shoes" style={{ marginTop: 20 }}>
              상품 보러 가기
            </Link>
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
