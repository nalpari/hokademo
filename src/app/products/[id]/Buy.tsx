"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { inStock, type Product } from "@/lib/catalog";
import { useCart, useWishlist } from "@/lib/store";
import { Heart } from "@/components/icons";
import s from "./pdp.module.css";

export default function Buy({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const { has, toggle, ready } = useWishlist();

  const colors = product.colors.length
    ? product.colors
    : [{ name: null, sizes: [] as { label: string; stock: number }[] }];

  const [colorIx, setColorIx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const sizes = colors[colorIx]?.sizes ?? [];
  const orderable = useMemo(() => inStock(product), [product]);
  const wished = ready && has(product.id);

  function submit() {
    if (!size) return;
    add({ id: product.id, size, color: colors[colorIx].name, qty: 1 });
    setAdded(true);
  }

  return (
    <section className={s.buy} aria-labelledby="buy-h">
      <h2 id="buy-h" className={s.srOnly}>
        구매 옵션
      </h2>

      {colors.length > 1 && (
        <div className={s.optionGroup}>
          <p className={s.optionLabel}>컬러</p>
          <div className={s.chips}>
            {colors.map((c, i) => (
              <button
                key={c.name ?? i}
                aria-pressed={i === colorIx}
                onClick={() => {
                  setColorIx(i);
                  setSize(null);
                  setAdded(false);
                }}
              >
                {c.name ?? "기본"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={s.optionGroup}>
        <p className={s.optionLabel}>사이즈</p>
        {sizes.length === 0 ? (
          <p className={s.noSize}>사이즈 정보가 없는 상품입니다.</p>
        ) : (
          <div className={s.sizes}>
            {sizes.map((z) => (
              <button
                key={z.label}
                disabled={z.stock <= 0}
                aria-pressed={size === z.label}
                onClick={() => {
                  setSize(z.label);
                  setAdded(false);
                }}
              >
                {z.label}
                {z.stock > 0 && z.stock <= 3 && <em>{z.stock}개</em>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={s.actions}>
        <button
          className="btn btn-ghost tap"
          aria-label="찜하기"
          aria-pressed={wished}
          onClick={() => toggle(product.id)}
          style={{ flex: "0 0 54px", width: 54 }}
        >
          <Heart filled={wished} style={{ color: wished ? "var(--coral)" : "currentColor" }} />
        </button>

        {added ? (
          <button className="btn" onClick={() => router.push("/cart")}>
            장바구니로 이동
          </button>
        ) : (
          <button className="btn" disabled={!orderable || !size} onClick={submit}>
            {!orderable ? "품절" : size ? "장바구니 담기" : "사이즈를 선택하세요"}
          </button>
        )}
      </div>
    </section>
  );
}
