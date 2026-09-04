"use client";

import { useCallback, useSyncExternalStore } from "react";

export type CartLine = { id: string; size: string; color: string | null; qty: number };

const CART = "hoka.cart";
const WISH = "hoka.wish";
const CHANGED = "hoka:store";

function raw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const v = raw(key);
  if (!v) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or quota: the page keeps working, it just stops remembering */
  }
  window.dispatchEvent(new Event(CHANGED));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/* useSyncExternalStore re-reads on every render, so the parsed value has to stay
   referentially stable while the underlying string is unchanged. */
const cache = new Map<string, { src: string | null; parsed: unknown }>();

function snapshot<T>(key: string, fallback: T): T {
  const src = raw(key);
  const hit = cache.get(key);
  if (hit && hit.src === src) return hit.parsed as T;
  const parsed = read(key, fallback);
  cache.set(key, { src, parsed });
  return parsed;
}

const EMPTY_LINES: CartLine[] = [];
const EMPTY_IDS: string[] = [];

export function useCart() {
  const lines = useSyncExternalStore(
    subscribe,
    () => snapshot<CartLine[]>(CART, EMPTY_LINES),
    () => EMPTY_LINES,
  );
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const add = useCallback((line: CartLine) => {
    const next = read<CartLine[]>(CART, []).map((l) => ({ ...l }));
    const hit = next.find(
      (l) => l.id === line.id && l.size === line.size && l.color === line.color,
    );
    if (hit) hit.qty += line.qty;
    else next.push(line);
    write(CART, next);
  }, []);

  const setQty = useCallback((index: number, qty: number) => {
    const next = read<CartLine[]>(CART, []).map((l) => ({ ...l }));
    if (!next[index]) return;
    if (qty <= 0) next.splice(index, 1);
    else next[index].qty = qty;
    write(CART, next);
  }, []);

  const remove = useCallback((index: number) => setQty(index, 0), [setQty]);
  const clear = useCallback(() => write(CART, []), []);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  return { lines, count, ready, add, setQty, remove, clear };
}

export function useWishlist() {
  const ids = useSyncExternalStore(
    subscribe,
    () => snapshot<string[]>(WISH, EMPTY_IDS),
    () => EMPTY_IDS,
  );
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((id: string) => {
    const next = read<string[]>(WISH, []).slice();
    const i = next.indexOf(id);
    if (i >= 0) next.splice(i, 1);
    else next.push(id);
    write(WISH, next);
  }, []);

  return { ids, ready, toggle, has: (id: string) => ids.includes(id) };
}
