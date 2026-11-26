"use client";

import { createStore } from "@/lib/local-store";

const favouritesStore = createStore<string[]>("favourites", []);

export const useFavourites = favouritesStore.useValue;

export const favourites = {
  toggle(id: string) {
    favouritesStore.set((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids]));
  },
  clear() {
    favouritesStore.reset();
  },
};
