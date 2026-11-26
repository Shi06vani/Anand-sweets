"use client";

import { createStore } from "@/lib/local-store";
import type { MenuItem } from "@/data/menu";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  image: string;
  qty: number;
};

export const MAX_QTY = 50;

const cartStore = createStore<CartLine[]>("cart", []);

/** UI-only: whether the cart drawer is open (not saved). */
export const cartOpenStore = createStore<boolean>("cart-open", false, { persist: false });

export const useCart = cartStore.useValue;
export const useCartOpen = cartOpenStore.useValue;

export const cart = {
  add(item: Pick<MenuItem, "id" | "name" | "price" | "unit" | "image">, qty = 1) {
    cartStore.set((lines) => {
      const existing = lines.find((l) => l.id === item.id);
      if (existing) {
        return lines.map((l) => (l.id === item.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...lines, { id: item.id, name: item.name, price: item.price, unit: item.unit, image: item.image, qty }];
    });
  },
  setQty(id: string, qty: number) {
    cartStore.set((lines) =>
      qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  },
  remove(id: string) {
    cartStore.set((lines) => lines.filter((l) => l.id !== id));
  },
  clear() {
    cartStore.reset();
  },
  /** Replace the cart (used by "Reorder"). */
  replace(lines: CartLine[]) {
    cartStore.set(lines);
  },
  open() {
    cartOpenStore.set(true);
  },
  close() {
    cartOpenStore.set(false);
  },
};

export function cartTotals(lines: CartLine[]) {
  return {
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((sum, l) => sum + l.qty * l.price, 0),
  };
}
