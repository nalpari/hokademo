"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useSyncExternalStore } from "react";
import { Home, Grid, Chart, Heart, Bag } from "./icons";
import { useCart } from "@/lib/store";

/* The approved first viewport ends on the rank card breaking the bottom edge, so
   on the home the dock stays out of it and arrives once the hero is scrolled
   past. Every other surface has no hero and shows it from the start.
   The hero's presence follows the route, so there is no first-paint flash. */
let heroPassed = false;

function subscribeHero(onChange: () => void) {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return () => {};
  const io = new IntersectionObserver(
    ([e]) => {
      const next = !e.isIntersecting;
      if (next !== heroPassed) {
        heroPassed = next;
        onChange();
      }
    },
    { rootMargin: "-40% 0px 0px 0px" },
  );
  io.observe(hero);
  return () => {
    io.disconnect();
    heroPassed = false;
  };
}

function useDockVisible(hasHero: boolean) {
  const subscribe = useCallback(
    (onChange: () => void) => (hasHero ? subscribeHero(onChange) : () => {}),
    [hasHero],
  );
  const passed = useSyncExternalStore(
    subscribe,
    () => (hasHero ? heroPassed : true),
    () => !hasHero,
  );
  return passed;
}

function DockNav() {
  const path = usePathname();
  const tab = useSearchParams().get("tab");
  const { count, ready } = useCart();
  const visible = useDockVisible(path === "/");

  const onProducts = path === "/products";
  const items = [
    { href: "/", label: "홈", Icon: Home, on: path === "/" },
    { href: "/products?tab=shoes", label: "전체상품", Icon: Grid, on: onProducts && tab !== "sale" },
    { href: "/products?tab=sale", label: "세일", Icon: Chart, on: onProducts && tab === "sale" },
    { href: "/wishlist", label: "찜", Icon: Heart, on: path === "/wishlist" },
    { href: "/cart", label: "장바구니", Icon: Bag, on: path === "/cart", badge: true },
  ];

  return (
    <nav
      className={`dock${visible ? " is-up" : ""}`}
      aria-label="주요 메뉴"
      aria-hidden={!visible}
    >
      {items.map(({ href, label, Icon, on, badge }) => (
        <Link
          key={label}
          href={href}
          aria-current={on ? "page" : undefined}
          tabIndex={visible ? 0 : -1}
        >
          <span className={badge ? "badge" : undefined}>
            <Icon />
            {badge && ready && count > 0 && <span>{count > 99 ? "99+" : count}</span>}
          </span>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function Dock() {
  return (
    <Suspense fallback={<nav className="dock" aria-label="주요 메뉴" aria-hidden="true" />}>
      <DockNav />
    </Suspense>
  );
}
