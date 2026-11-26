"use client";

import { createStore } from "@/lib/local-store";
import type { CartLine } from "./cart";
import type { OrderType } from "./customer";

export type PastOrder = {
  id: string;
  createdAt: number;
  lines: CartLine[];
  total: number;
  orderType: OrderType;
  pickupTime?: string;
  note?: string;
};

const MAX_ORDERS = 20;

/** Orders the visitor has sent to the shop on WhatsApp (kept on their device only). */
const ordersStore = createStore<PastOrder[]>("orders", []);

export const useOrders = ordersStore.useValue;

export const orders = {
  add(order: Omit<PastOrder, "id" | "createdAt">) {
    const entry: PastOrder = {
      ...order,
      id: `AS${Date.now().toString(36).toUpperCase()}`,
      createdAt: Date.now(),
    };
    ordersStore.set((list) => [entry, ...list].slice(0, MAX_ORDERS));
    return entry;
  },
  remove(id: string) {
    ordersStore.set((list) => list.filter((o) => o.id !== id));
  },
  clear() {
    ordersStore.reset();
  },
};
