import Link from "next/link";
import Masthead from "@/components/Masthead";
import { won } from "@/lib/catalog";
import s from "../checkout.module.css";

export const metadata = { title: "결제 인증 완료 · 호카코리아" };

type Query = { paymentKey?: string; orderId?: string; amount?: string };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { paymentKey, orderId, amount } = await searchParams;
  const value = Number(amount);

  return (
    <>
      <Masthead title="결제 결과" back="/cart" />

      <main className={s.page}>
        <div className="empty" style={{ paddingBottom: 20 }}>
          <strong>결제창 인증이 완료되었습니다</strong>
          <p>토스페이먼츠가 결제 인증 결과를 돌려주었습니다.</p>
        </div>

        <dl className={s.receipt}>
          <div>
            <dt>주문번호</dt>
            <dd>{orderId ?? "—"}</dd>
          </div>
          <div>
            <dt>결제금액</dt>
            <dd>{Number.isFinite(value) && amount ? won(value) : "—"}</dd>
          </div>
          <div>
            <dt>paymentKey</dt>
            <dd>{paymentKey ?? "—"}</dd>
          </div>
        </dl>

        <p className={s.note}>
          이 데모는 결제창까지만 연동되어 있습니다. 승인(confirm) API를 호출하지
          않으므로 실제 결제는 이뤄지지 않으며, 인증된 건은 일정 시간 뒤 자동
          취소됩니다.
        </p>

        <div className={s.after}>
          <Link className="btn" href="/">
            홈으로
          </Link>
        </div>
      </main>
    </>
  );
}
