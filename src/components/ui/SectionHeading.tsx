import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Consistent heading block: small eyebrow, big serif title, short description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase",
            tone === "dark" ? "text-saffron-600" : "text-gold-300",
          )}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
          {centered && <span className="h-px w-8 bg-current" />}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-ink-900" : "text-cream-50",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-ink-500" : "text-cream-200/80")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
