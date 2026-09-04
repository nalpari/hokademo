import Image from "next/image";
import Link from "next/link";
import Masthead from "@/components/Masthead";
import { bestBoard, byId, won } from "@/lib/catalog";
import { Star } from "@/components/icons";
import s from "./home.module.css";

/* The campaign product the approved comp names, read live from the catalogue
   rather than hardcoded, so its price follows the store. */
const HERO_ID = "11979542597";
const CAMPAIGN_REST = ["10577131026", "10806150327"];

const RESULTS = [
  { who: "고민철", clock: "16:55:51", race: "트랜스제주 by UTMB® 제주 100마일 · Tecton X 2", place: "우승" },
  { who: "김지수", clock: "05:36:54", race: "트랜스제주 by UTMB® 제주 70K · Tecton X 2", place: "전체 4위" },
  { who: "이병도", clock: "02:29:16", race: "2025 JTBC 서울마라톤 풀코스", place: "완주" },
  { who: "박소영", clock: "03:09:18", race: "2025 JTBC 서울마라톤 풀코스", place: "완주" },
];

function Tile({ at, lead = false }: { at: number; lead?: boolean }) {
  const p = bestBoard[at];
  if (!p) return null;
  return (
    <Link
      className={`${s.tile} ${lead ? s.lead : ""}`}
      href={`/products/${p.id}`}
      aria-label={p.name}
    >
      <span className={s.rank}>
        {p.bestRank}
        <sup>위</sup>
      </span>
      <div className={s.shot}>
        <Image
          src={`/cutouts/${p.id}.png`}
          alt=""
          width={660}
          height={320}
          sizes={lead ? "(max-width: 520px) 62vw, 320px" : "(max-width: 520px) 40vw, 190px"}
        />
      </div>
      <div className={s.body}>
        <h3>{p.name}</h3>
        <p className="price">
          {p.off > 0 && <span className="off">{p.off}%</span>}
          {won(p.price)}
          {p.off > 0 && <span className="was">{won(p.listPrice)}</span>}
        </p>
        {p.rating != null && (
          <p className={s.stars}>
            <Star style={{ width: 11, height: 11, color: "var(--coral-ink)" }} />
            <b>{p.rating.toFixed(2)}</b>
            <span>({p.reviews.toLocaleString("ko-KR")})</span>
          </p>
        )}
      </div>
    </Link>
  );
}

export default function HomePage() {
  const hero = byId.get(HERO_ID)!;
  /* The rail carries the campaign's own line-up: the Speedgoat 6 the comp names,
     then the variants the store actually stocks, so the peeking card is real. */
  const campaign = [hero, ...CAMPAIGN_REST.map((id) => byId.get(id)).filter((p) => p != null)];

  return (
    <>
      <Masthead tab="shoes" />

      <section className={s.hero} aria-label="캠페인" data-hero>
        <div className={`${s.at} ${s.photo}`}>
          {/* 첫 프레임과 끝 프레임이 같은 러닝 사이클이라 이어 붙어도 끊기지 않는다. */}
          <video
            src="/brand/hero-loop.mp4"
            poster="/brand/hero-loop.jpg"
            aria-label="새벽 능선을 달리는 트레일 러너"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <h1 className={`${s.at} ${s.headline}`}>
          <span>Together we</span>
          <span>fly higher</span>
        </h1>
        <p className={`${s.at} ${s.subline}`}>함께일 때, 더 높이</p>
        <Link className={`${s.at} ${s.cta}`} href="/products?tab=shoes">
          캠페인 보기
        </Link>

        <div className={`${s.at} ${s.rankRail}`}>
          {campaign.map((p, i) => (
            <Link key={p.id} className={s.rankCard} href={`/products/${p.id}`}>
              <span className={s.rankShoe}>
                <Image
                  src={i === 0 ? "/brand/product-shoe.png" : `/cutouts/${p.id}.png`}
                  alt=""
                  width={1800}
                  height={770}
                />
              </span>
              <span className={s.rankName}>{p.name.replace(/\s\d{7}-[A-Z]+$/, "")}</span>
              <span className={s.rankPrice}>
                {p.off > 0 && <s>{won(p.listPrice)}</s>}
                <em>{won(p.price)}</em>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <main>
        <section aria-labelledby="best-h">
          <div className="head">
            <h2 id="best-h">베스트</h2>
            <Link href="/products?tab=shoes">전체보기</Link>
          </div>
          <div className={s.podium}>
            <Tile at={0} lead />
            <Tile at={1} />
            <Tile at={2} />
          </div>
        </section>

        <section aria-label="베스트 4위부터 8위">
          <div className={s.rail}>
            {[3, 4, 5, 6, 7].map((i) => (
              <Tile key={i} at={i} />
            ))}
          </div>
        </section>

        <Link className={s.campaign} href={`/products/${hero.id}`} aria-labelledby="goat-h">
          <h2 id="goat-h">
            Trail has only
            <br />
            one GOAT.
          </h2>
          <p className={s.ko}>트레일에는 단 하나의 GOAT. 스피드고트 6</p>
          <dl>
            <div>
              <dt>아웃솔</dt>
              <dd>Vibram® Megagrip</dd>
            </div>
            <div>
              <dt>러그</dt>
              <dd>5mm</dd>
            </div>
          </dl>
          <Image src="/brand/product-shoe.png" alt="호카 스피드고트 6" width={1800} height={770} />
        </Link>

        <section aria-labelledby="team-h">
          <div className="head">
            <h2 id="team-h">팀호카의 기록</h2>
          </div>
          <div className={s.results}>
            <ol>
              {RESULTS.map((r) => (
                <li key={r.who}>
                  <span className={s.who}>{r.who}</span>
                  <span className={s.clock}>{r.clock}</span>
                  <span className={s.race}>{r.race}</span>
                  <span className={s.place}>{r.place}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer>
          <p className="brand">호카코리아</p>
          <p>
            관심고객수 389,247
            <br />
            오프라인 스토어 · 호카 롯데월드몰 잠실점
          </p>
        </footer>
      </main>
    </>
  );
}
