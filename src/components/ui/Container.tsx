import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Centers content with consistent side padding on every page. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-5", className)} {...props} />;
}
