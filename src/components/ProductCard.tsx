"use client";

import Image from "next/image";
import Link from "next/link";
import { cdn, inStock, won, type Product } from "@/lib/catalog";
import { useWishlist } from "@/lib/store";
import { Heart, Star } from "./icons";

export default function ProductCard({
  p,
  priority = false,
}: {
  p: Product;
  priority?: boolean;
}) {
  const { has, toggle, ready } = useWishlist();
  const wished = ready && has(p.id);
  const available = inStock(p);

  return (
    <div className="card">
      <button
        className="wish tap"
        aria-label={`${p.name} 찜하기`}
        aria-pressed={wished}
        onClick={() => toggle(p.id)}
      >
        <Heart filled={wished} />
      </button>

      <Link href={`/products/${p.id}`}>
        <div className="shot">
          <Image
            src={cdn(p.image, "f500_500")}
            alt={p.name}
            width={500}
            height={500}
            sizes="(max-width: 520px) 50vw, 260px"
            priority={priority}
          />
          {!available && <span className="soldout">품절</span>}
        </div>

        <div className="meta">
          <h3>{p.name}</h3>
          <p className="price">
            {p.off > 0 && <span className="off">{p.off}%</span>}
            {won(p.price)}
            {p.off > 0 && <span className="was">{won(p.listPrice)}</span>}
          </p>
          {p.rating != null && (
            <p className="stars">
              <Star style={{ width: 11, height: 11, color: "var(--coral-ink)" }} />
              <b>{p.rating.toFixed(2)}</b>
              <span>({p.reviews.toLocaleString("ko-KR")})</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
