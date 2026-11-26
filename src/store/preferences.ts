"use client";

import { createStore } from "@/lib/local-store";

/** Small per-visitor UI preferences. */
export const menuViewStore = createStore<"grid" | "row">("menu-view", "grid");
export const useMenuView = menuViewStore.useValue;
