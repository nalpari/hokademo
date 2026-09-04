import Image from "next/image";
import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import Buy from "./Buy";
import { byId, cdn, products, won } from "@/lib/catalog";
import s from "./pdp.module.css";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const p = byId.get((await params).id);
  return { title: p ? `${p.name} · 호카코리아` : "호카코리아" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const p = byId.get((await params).id);
  if (!p) notFound();

  const shots = [p.image, ...p.gallery].slice(0, 6);
  const fee = p.delivery;

  return (
    <>
      <Masthead title={p.category ?? "상품"} back={`/products?tab=${p.tab}`} />

      <main className={s.page}>
        <div className={s.gallery}>
          {shots.map((src, i) => (
            <Image
              key={src}
              src={cdn(src, "f750_974")}
              alt={i === 0 ? p.name : `${p.name} 상세 이미지 ${i}`}
              width={750}
              height={974}
              priority={i === 0}
              sizes="(max-width: 520px) 84vw, 420px"
            />
          ))}
        </div>

        <div className={s.summary}>
          <h1>{p.name}</h1>

          <p className={s.price}>
            {p.off > 0 && <span className={s.off}>{p.off}%</span>}
            <strong>{won(p.price)}</strong>
            {p.off > 0 && <s>{won(p.listPrice)}</s>}
          </p>

          {p.rating != null && (
            <p className={s.rating}>
              <b>{p.rating.toFixed(2)}</b>
              <span>리뷰 {p.reviews.toLocaleString("ko-KR")}건</span>
            </p>
          )}
        </div>

        {p.desc && <p className={s.desc}>{p.desc}</p>}

        <Buy product={p} />

        <section className={s.info} aria-labelledby="delivery-h">
          <h2 id="delivery-h">배송</h2>
          <dl>
            <div>
              <dt>배송비</dt>
              <dd>
                {fee.baseFee ? won(fee.baseFee) : "무료"}
                {fee.freeOver ? ` · ${won(fee.freeOver)} 이상 무료` : ""}
              </dd>
            </div>
            {fee.company && (
              <div>
                <dt>택배사</dt>
                <dd>{fee.company}</dd>
              </div>
            )}
            {fee.today && (
              <div>
                <dt>출고</dt>
                <dd>오늘출발</dd>
              </div>
            )}
          </dl>
        </section>
      </main>
    </>
  );
}
