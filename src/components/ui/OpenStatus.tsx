"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus as Status } from "@/lib/hours";
import { cn } from "@/lib/utils";

/*
 * The shop's open/closed status depends on the current time, so it is read
 * only in the browser (server render shows a neutral placeholder) and is
 * refreshed every minute.
 */
let cached: Status | null = null;

function subscribe(onChange: () => void) {
  const id = setInterval(() => {
    cached = null;
    onChange();
  }, 60_000);
  return () => clearInterval(id);
}

function getSnapshot() {
  cached ??= getOpenStatus();
  return cached;
}

function getServerSnapshot() {
  return null;
}

export function useOpenStatus(): Status | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Index of today's day (India time), or null during server render. */
export function useTodayIndex() {
  return useOpenStatus()?.today ?? null;
}

/** Live "Open now / Closed" pill. */
export function OpenStatus({ className }: { className?: string }) {
  const status = useOpenStatus();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
        status === null && "bg-cream-200 text-ink-500",
        status?.isOpen && "bg-leaf-500/10 text-leaf-500",
        status && !status.isOpen && "bg-maroon-50 text-maroon-700",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {status?.isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-500 opacity-60" />}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", status?.isOpen ? "bg-leaf-500" : "bg-maroon-500")} />
      </span>
      {status?.label ?? "Checking hours…"}
    </span>
  );
}
