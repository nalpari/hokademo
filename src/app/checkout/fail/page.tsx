import Link from "next/link";
import Masthead from "@/components/Masthead";
import s from "../checkout.module.css";

export const metadata = { title: "결제 실패 · 호카코리아" };

type Query = { code?: string; message?: string; orderId?: string };

export default async function FailPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { code, message, orderId } = await searchParams;

  return (
    <>
      <Masthead title="결제 결과" back="/cart" />

      <main className={s.page}>
        <div className="empty" style={{ paddingBottom: 20 }}>
          <strong>결제가 완료되지 않았습니다</strong>
          <p>{message ?? "결제가 중단되었거나 승인되지 않았습니다."}</p>
        </div>

        <dl className={s.receipt}>
          <div>
            <dt>오류코드</dt>
            <dd>{code ?? "—"}</dd>
          </div>
          <div>
            <dt>주문번호</dt>
            <dd>{orderId ?? "—"}</dd>
          </div>
        </dl>

        <div className={s.after}>
          <Link className="btn" href="/checkout">
            다시 시도하기
          </Link>
        </div>
      </main>
    </>
  );
}
