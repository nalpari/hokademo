"use client";

import Image from "next/image";
import Link from "next/link";
import Masthead from "@/components/Masthead";
import { byId, cdn, FREE_OVER, shippingFor, won } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { Close } from "@/components/icons";
import s from "./cart.module.css";

export default function CartPage() {
  const { lines, setQty, remove, clear, ready } = useCart();

  const rows = lines
    .map((l, index) => ({ line: l, index, p: byId.get(l.id) }))
    .filter((r) => r.p);

  const goods = rows.reduce((n, r) => n + r.p!.price * r.line.qty, 0);
  const ship = shippingFor(goods);

  if (!ready) {
    return (
      <>
        <Masthead title="장바구니" />
        <main className={s.page} aria-busy="true">
          <div className={s.skeleton} />
          <div className={s.skeleton} />
        </main>
      </>
    );
  }

  if (rows.length === 0) {
    return (
      <>
        <Masthead title="장바구니" />
        <main className={s.page}>
          <div className="empty">
            <strong>장바구니가 비어 있습니다</strong>
            <p>마음에 드는 러닝화를 담아보세요.</p>
            <Link className="btn" href="/products?tab=shoes" style={{ marginTop: 20 }}>
              상품 보러 가기
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Masthead title="장바구니" />

      <main className={s.page}>
        <div className={s.top}>
          <span>{rows.length}개 상품</span>
          <button onClick={clear}>전체 삭제</button>
        </div>

        <ul className={s.lines}>
          {rows.map(({ line, index, p }) => (
            <li key={`${line.id}-${line.color}-${line.size}`}>
              <Link href={`/products/${p!.id}`} className={s.thumb}>
                <Image
                  src={cdn(p!.image, "f300_300")}
                  alt=""
                  width={300}
                  height={300}
                  sizes="(min-width: 1024px) 140px, 88px"
                />
              </Link>

              <div className={s.meta}>
                <Link href={`/products/${p!.id}`}>
                  <h3>{p!.name}</h3>
                </Link>
                <p className={s.opt}>
                  {line.color ? `${line.color} · ` : ""}
                  {line.size}
                </p>
                <p className={s.linePrice}>{won(p!.price * line.qty)}</p>

                <div className={s.qty}>
                  <button
                    aria-label="수량 줄이기"
                    onClick={() => setQty(index, line.qty - 1)}
                  >
                    −
                  </button>
                  <span aria-live="polite">{line.qty}</span>
                  <button
                    aria-label="수량 늘리기"
                    onClick={() => setQty(index, line.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className={`${s.drop} tap`}
                aria-label={`${p!.name} 삭제`}
                onClick={() => remove(index)}
              >
                <Close />
              </button>
            </li>
          ))}
        </ul>

        <dl className={s.total}>
          <div>
            <dt>상품금액</dt>
            <dd>{won(goods)}</dd>
          </div>
          <div>
            <dt>배송비</dt>
            <dd>{ship === 0 ? "무료" : won(ship)}</dd>
          </div>
          <div className={s.grand}>
            <dt>결제예정금액</dt>
            <dd>{won(goods + ship)}</dd>
          </div>
        </dl>

        {ship > 0 && (
          <p className={s.nudge}>
            {won(FREE_OVER - goods)} 더 담으면 배송비가 무료입니다.
          </p>
        )}

        <div className={s.checkout}>
          <Link className="btn" href="/checkout">
            {won(goods + ship)} 주문하기
          </Link>
        </div>
      </main>
    </>
  );
}
