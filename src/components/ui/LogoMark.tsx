/**
 * Anand Sweets emblem: maroon roundel inside a gold scalloped (mandala) rim,
 * with a serif "A" whose crossbar is a kaju-katli diamond.
 * Keep in sync with src/app/icon.svg (the browser-tab favicon).
 */
export function LogoMark({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI * 2) / 16;
    return { cx: 32 + Math.cos(a) * 27.5, cy: 32 + Math.sin(a) * 27.5 };
  });

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="as-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dc9e" />
          <stop offset="0.5" stopColor="#e0b866" />
          <stop offset="1" stopColor="#b5862f" />
        </linearGradient>
        <radialGradient id="as-maroon" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#a3283a" />
          <stop offset="1" stopColor="#5f1721" />
        </radialGradient>
      </defs>

      {/* Scalloped mandala rim */}
      <g fill="url(#as-gold)">
        <circle cx="32" cy="32" r="27.5" />
        {petals.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="4.2" />
        ))}
      </g>

      {/* Roundel */}
      <circle cx="32" cy="32" r="25" fill="url(#as-maroon)" />
      <circle cx="32" cy="32" r="22.2" fill="none" stroke="url(#as-gold)" strokeWidth="0.9" />
      <circle cx="32" cy="32" r="20.6" fill="none" stroke="#e0b866" strokeOpacity="0.45" strokeWidth="0.5" strokeDasharray="1 1.6" />

      {/* Monogram "A" with serifs */}
      <path
        fill="url(#as-gold)"
        d="M30.2 15h3.6l10 28.5h2.3v2.5h-8.6v-2.5h2.4L32 24.6l-7.9 18.9h2.4V46h-8.6v-2.5h2.3z"
      />
      {/* Kaju-katli diamond crossbar */}
      <path fill="#fffcf7" d="M32 31.6l4.6 4.6L32 40.8l-4.6-4.6z" />
      <path fill="#e0b866" d="M32 33.6l2.6 2.6L32 38.8l-2.6-2.6z" opacity="0.55" />
    </svg>
  );
}
