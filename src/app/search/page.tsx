"use client";

import { useMemo, useState } from "react";
import Masthead from "@/components/Masthead";
import ProductCard from "@/components/ProductCard";
import { products, search } from "@/lib/catalog";
import { Search as SearchIcon, Close } from "@/components/icons";
import s from "./search.module.css";

/* Popular terms are the franchise names actually present in the catalogue,
   ranked by how many products carry them. */
const SUGGESTIONS = (() => {
  const names = [
    "클리프톤", "본다이", "아라히", "마하", "스피드고트", "마파테",
    "카하", "리커버리", "스카이워드", "트랜스포트",
  ];
  return names
    .map((n) => ({ n, c: products.filter((p) => p.name.includes(n)).length }))
    .filter((x) => x.c > 0)
    .sort((a, b) => b.c - a.c)
    .slice(0, 8);
})();

export default function SearchPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => search(q), [q]);
  const typed = q.trim().length > 0;

  return (
    <>
      <Masthead title="검색" />

      <main className={s.page}>
        <div className={s.field}>
          <SearchIcon />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="모델명, 품번으로 검색"
            aria-label="상품 검색"
            autoFocus
            enterKeyHint="search"
          />
          {typed && (
            <button className="tap" aria-label="지우기" onClick={() => setQ("")}>
              <Close />
            </button>
          )}
        </div>

        {!typed ? (
          <section className={s.suggest} aria-labelledby="sug-h">
            <h2 id="sug-h">많이 찾는 모델</h2>
            <div className={s.chips}>
              {SUGGESTIONS.map(({ n, c }) => (
                <button key={n} onClick={() => setQ(n)}>
                  {n}
                  <em>{c}</em>
                </button>
              ))}
            </div>
          </section>
        ) : hits.length === 0 ? (
          <div className="empty">
            <strong>검색 결과가 없습니다</strong>
            <p>
              &lsquo;{q.trim()}&rsquo;와(과) 일치하는 상품을 찾지 못했습니다.
              <br />
              모델명이나 품번으로 다시 검색해 보세요.
            </p>
          </div>
        ) : (
          <>
            <p className={s.count} aria-live="polite">
              {hits.length}개 상품
            </p>
            <div className="grid">
              {hits.map((p, i) => (
                <ProductCard key={p.id} p={p} priority={i < 2} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
