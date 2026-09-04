"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ANONYMOUS, loadTossPayments } from "@tosspayments/tosspayments-sdk";
import Masthead from "@/components/Masthead";
import { Bank, Card, Check } from "@/components/icons";
import { KakaoPayMark, NaverPayMark, TossMark } from "@/components/brand-marks";
import { byId, cdn, shippingFor, won } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import s from "./checkout.module.css";

/* 토스페이먼츠 문서에 공개된 결제창(API 개별 연동) 테스트 클라이언트 키.
   test_ 로 시작하는 키의 결제는 모의 결제라 실제로 청구되지 않는다. */
const CLIENT_KEY = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

const METHODS = [
  { id: "toss", label: "토스페이먼츠", note: "카드 · 계좌이체 · 간편결제", mark: <TossMark /> },
  { id: "kakaopay", label: "카카오페이", note: "준비 중", mark: <KakaoPayMark /> },
  { id: "naverpay", label: "네이버페이", note: "준비 중", mark: <NaverPayMark /> },
  { id: "card", label: "신용 · 체크카드", note: "준비 중", mark: <Card width={22} height={22} /> },
  { id: "vbank", label: "무통장입금", note: "준비 중", mark: <Bank width={22} height={22} /> },
];

export default function CheckoutPage() {
  const { lines, ready } = useCart();
  const [method, setMethod] = useState("toss");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = lines
    .map((l) => ({ line: l, p: byId.get(l.id) }))
    .filter((r) => r.p);

  const goods = rows.reduce((n, r) => n + r.p!.price * r.line.qty, 0);
  const ship = shippingFor(goods);
  const total = goods + ship;
  /* 토스페이먼츠 외의 카드는 고를 수만 있고 결제로는 이어지지 않는다. */
  const live = method === "toss";

  async function pay() {
    const first = rows[0]?.p;
    if (!first || !live) return;

    setBusy(true);
    setError(null);
    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);
      const payment = tossPayments.payment({ customerKey: ANONYMOUS });

      await payment.requestPayment({
        method: "CARD", // 카드 및 간편결제
        amount: { currency: "KRW", value: total },
        orderId: crypto.randomUUID(),
        orderName:
          rows.length > 1
            ? `${first.name.slice(0, 70)} 외 ${rows.length - 1}건`
            : first.name.slice(0, 90),
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (e) {
      // 사용자가 결제창을 닫아도 여기로 온다.
      setError(e instanceof Error ? e.message : "결제를 시작하지 못했습니다.");
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <>
        <Masthead title="주문 / 결제" back="/cart" />
        <main className={s.page} aria-busy="true" />
      </>
    );
  }

  if (rows.length === 0) {
    return (
      <>
        <Masthead title="주문 / 결제" back="/cart" />
        <main className={s.page}>
          <div className="empty">
            <strong>주문할 상품이 없습니다</strong>
            <p>장바구니에 상품을 담고 다시 시도해 주세요.</p>
            <Link className="btn" href="/cart" style={{ marginTop: 20 }}>
              장바구니로 가기
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Masthead title="주문 / 결제" back="/cart" />

      <main className={s.page}>
        <section className={s.block}>
          <h2>주문 상품 {rows.length}개</h2>
          <ul className={s.items}>
            {rows.map(({ line, p }) => (
              <li key={`${line.id}-${line.color}-${line.size}`}>
                <Image
                  className={s.thumb}
                  src={cdn(p!.image, "f300_300")}
                  alt=""
                  width={300}
                  height={300}
                  sizes="56px"
                />
                <div>
                  <strong>{p!.name}</strong>
                  <span>
                    {line.color ? `${line.color} · ` : ""}
                    {line.size} · {line.qty}개
                  </span>
                </div>
                <b>{won(p!.price * line.qty)}</b>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.block}>
          <h2>결제 수단</h2>
          <div className={s.methods} role="radiogroup" aria-label="결제 수단">
            {METHODS.map(({ id, label, note, mark }) => (
              <label
                key={id}
                className={id === "toss" ? s.method : `${s.method} ${s.soon}`}
              >
                <input
                  type="radio"
                  name="method"
                  value={id}
                  checked={method === id}
                  onChange={() => setMethod(id)}
                />
                <span className={s.mark} aria-hidden="true">
                  {mark}
                </span>
                <strong>{label}</strong>
                <em>{note}</em>
                <span className={s.check} aria-hidden="true">
                  <Check />
                </span>
              </label>
            ))}
          </div>
        </section>

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
            <dt>최종 결제금액</dt>
            <dd>{won(total)}</dd>
          </div>
        </dl>

        {error && (
          <p className={s.error} role="alert">
            {error}
          </p>
        )}

        <div className={s.pay}>
          <button className="btn" onClick={pay} disabled={busy || !live}>
            {!live
              ? "준비 중인 결제 수단입니다"
              : busy
                ? "결제창을 여는 중…"
                : `${won(total)} 결제하기`}
          </button>
        </div>
      </main>
    </>
  );
}
