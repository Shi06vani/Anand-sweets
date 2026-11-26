"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny state store backed by localStorage.
 *
 * - Works with server rendering (server always sees `initial`).
 * - Survives page reloads and syncs between open tabs.
 * - Never crashes if storage is blocked (private mode, full quota, etc.) —
 *   it just keeps the data in memory for that visit.
 *
 * Pass `persist: false` for UI-only state that shouldn't be saved.
 */
export function createStore<T>(key: string, initial: T, { persist = true, version = 1 } = {}) {
  const storageKey = `anand-sweets:${key}:v${version}`;
  const listeners = new Set<() => void>();
  let state: T = initial;
  let loaded = !persist;

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) state = JSON.parse(raw) as T;
    } catch {
      /* corrupted or blocked storage — keep the initial value */
    }
  }

  function save() {
    if (!persist) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* storage full or blocked — data stays in memory */
    }
  }

  function emit() {
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    // Keep multiple tabs in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      try {
        state = e.newValue === null ? initial : (JSON.parse(e.newValue) as T);
      } catch {
        state = initial;
      }
      emit();
    };
    if (persist) window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      if (persist) window.removeEventListener("storage", onStorage);
    };
  }

  function get() {
    load();
    return state;
  }

  function set(next: T | ((prev: T) => T)) {
    load();
    state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
    save();
    emit();
  }

  function reset() {
    set(initial);
  }

  /** React hook: re-renders when the value changes. */
  function useValue(): T {
    return useSyncExternalStore(subscribe, get, () => initial);
  }

  return { get, set, reset, subscribe, useValue };
}

/**
 * True only after the first client render. Use it to avoid showing
 * saved data (e.g. cart counts) during the server-rendered first paint.
 */
const noop = () => () => {};
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
