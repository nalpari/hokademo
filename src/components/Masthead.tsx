"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { TABS, type TabId } from "@/lib/catalog";
import { Search, Heart, Bag, Back } from "./icons";

type Props = {
  /** Renders the tab row; omit on screens that are not the catalogue. */
  tab?: TabId;
  /** Replaces the wordmark with a back arrow and a title. */
  title?: string;
  back?: string;
};

export default function Masthead({ tab, title, back }: Props) {
  const { count, ready } = useCart();

  return (
    <header className="masthead">
      <div className="masthead-bar">
        {title ? (
          <>
            <Link href={back ?? "/"} className="tap" aria-label="뒤로">
              <Back />
            </Link>
            <strong className="masthead-title">{title}</strong>
          </>
        ) : (
          <Link href="/" aria-label="호카코리아 홈">
            <Image
              className="wordmark"
              src="/brand/wordmark.png"
              alt="HOKA"
              width={1500}
              height={411}
              priority
            />
          </Link>
        )}

        <div className="utils">
          <Link href="/search" className="tap" aria-label="검색">
            <Search />
          </Link>
          <Link href="/wishlist" className="tap" aria-label="찜 목록">
            <Heart />
          </Link>
          <Link href="/cart" className="tap badge" aria-label="장바구니">
            <Bag />
            {ready && count > 0 && <span>{count > 99 ? "99+" : count}</span>}
          </Link>
        </div>
      </div>

      {tab && (
        <nav className="tabs" aria-label="카테고리">
          {TABS.map((t) => (
            <Link
              key={t.id}
              href={`/products?tab=${t.id}`}
              aria-current={t.id === tab ? "page" : undefined}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
