"use client";

import { createStore } from "@/lib/local-store";

export type OrderType = "pickup" | "delivery";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  orderType: OrderType;
};

const emptyCustomer: Customer = { name: "", phone: "", address: "", orderType: "pickup" };

/** The visitor's own details, remembered so they never type them twice. */
const customerStore = createStore<Customer>("customer", emptyCustomer);

export const useCustomer = customerStore.useValue;

export const customer = {
  get: customerStore.get,
  update(patch: Partial<Customer>) {
    customerStore.set((c) => ({ ...c, ...patch }));
  },
  forget() {
    customerStore.reset();
  },
};
