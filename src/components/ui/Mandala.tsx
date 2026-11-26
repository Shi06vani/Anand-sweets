import { cn } from "@/lib/utils";

/** Decorative rangoli/mandala ring. Purely visual. */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const dots = Array.from({ length: 32 }, (_, i) => i * 11.25);
  return (
    <svg viewBox="0 0 200 200" className={cn("pointer-events-none", className)} aria-hidden fill="none">
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
      {dots.map((a) => (
        <circle key={a} cx="100" cy="10" r="1.6" fill="currentColor" transform={`rotate(${a} 100 100)`} />
      ))}
      {petals.map((a) => (
        <path
          key={a}
          d="M100 22 C110 40 110 56 100 70 C90 56 90 40 100 22 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.8" />
      {petals.map((a) => (
        <path
          key={`i${a}`}
          d="M100 72 Q106 80 100 88 Q94 80 100 72 Z"
          fill="currentColor"
          opacity="0.5"
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/** Thin decorative divider with a diamond in the middle. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold-500", className)} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-current" />
      <span className="h-2 w-2 rotate-45 bg-current" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-current" />
    </div>
  );
}
