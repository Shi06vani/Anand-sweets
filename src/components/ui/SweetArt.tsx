import { useId } from "react";
import type { ArtKind } from "@/data/menu";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn style SVG illustrations of Indian sweets & dishes.
 * Used as artwork until real photos are added (see `image` in data/menu.ts).
 */
export function SweetArt({ kind, className }: { kind: ArtKind; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const g = (name: string) => `${name}-${uid}`;
  const url = (name: string) => `url(#${g(name)})`;

  return (
    <svg viewBox="0 0 120 120" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <radialGradient id={g("laddu")} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FFD08A" />
          <stop offset="55%" stopColor="#F59E2B" />
          <stop offset="100%" stopColor="#C8641A" />
        </radialGradient>
        <radialGradient id={g("jamun")} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#B4572E" />
          <stop offset="60%" stopColor="#6E2A12" />
          <stop offset="100%" stopColor="#3D150A" />
        </radialGradient>
        <linearGradient id={g("silver")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="50%" stopColor="#EADFC8" />
          <stop offset="100%" stopColor="#D9C8A6" />
        </linearGradient>
        <linearGradient id={g("gold")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7C55A" />
          <stop offset="100%" stopColor="#D38A1E" />
        </linearGradient>
        <linearGradient id={g("pastry")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2B65A" />
          <stop offset="100%" stopColor="#B86A1C" />
        </linearGradient>
        <linearGradient id={g("clay")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8492A" />
          <stop offset="50%" stopColor="#C8643E" />
          <stop offset="100%" stopColor="#8E3A20" />
        </linearGradient>
        <linearGradient id={g("box")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A3283A" />
          <stop offset="100%" stopColor="#5F1721" />
        </linearGradient>
      </defs>

      {/* soft plate shadow, shared */}
      <ellipse cx="60" cy="104" rx="38" ry="6" fill="#2B1A12" opacity="0.12" />

      {kind === "laddu" && (
        <g>
          <circle cx="60" cy="62" r="36" fill={url("laddu")} />
          {[
            [44, 48], [56, 42], [70, 46], [80, 58], [48, 62], [62, 56], [74, 70], [52, 76], [64, 82], [40, 72], [68, 64], [58, 68],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill={i % 3 === 0 ? "#FFE1A8" : "#E07F1F"} opacity="0.9" />
          ))}
          <path d="M55 28 q5 -6 10 0" stroke="#5E9E3A" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="46" cy="44" rx="9" ry="5" fill="#fff" opacity="0.35" transform="rotate(-30 46 44)" />
        </g>
      )}

      {kind === "katli" && (
        <g>
          <path d="M60 22 L98 60 L60 98 L22 60 Z" fill="#CDB98F" transform="translate(0 5)" />
          <path d="M60 22 L98 60 L60 98 L22 60 Z" fill={url("silver")} stroke="#C9B48A" strokeWidth="1.5" />
          <path d="M60 30 L90 60 L60 90 L30 60 Z" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
          <path d="M40 48 L52 40" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        </g>
      )}

      {kind === "jamun" && (
        <g>
          <ellipse cx="60" cy="88" rx="44" ry="12" fill="#E2A24A" opacity="0.55" />
          <circle cx="46" cy="66" r="22" fill={url("jamun")} />
          <circle cx="74" cy="62" r="22" fill={url("jamun")} />
          <ellipse cx="40" cy="58" rx="7" ry="4" fill="#fff" opacity="0.4" transform="rotate(-30 40 58)" />
          <ellipse cx="68" cy="54" rx="7" ry="4" fill="#fff" opacity="0.4" transform="rotate(-30 68 54)" />
        </g>
      )}

      {kind === "jalebi" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M60 60 m0 -4 a4 4 0 1 1 -4 4 a10 10 0 1 1 10 10 a16 16 0 1 1 -16 -16 a22 22 0 1 1 22 22 a28 28 0 1 1 -30 -28"
            stroke="#C76A0E"
            strokeWidth="9"
          />
          <path
            d="M60 60 m0 -4 a4 4 0 1 1 -4 4 a10 10 0 1 1 10 10 a16 16 0 1 1 -16 -16 a22 22 0 1 1 22 22 a28 28 0 1 1 -30 -28"
            stroke="#F7A928"
            strokeWidth="6"
          />
          <path d="M44 38 q4 -3 9 -3" stroke="#FFE3A3" strokeWidth="2.5" />
        </g>
      )}

      {kind === "barfi" && (
        <g>
          <rect x="26" y="34" width="68" height="56" rx="6" fill="#E9DDBF" />
          <rect x="26" y="30" width="68" height="52" rx="6" fill="#FFF6E2" stroke="#E2D3AF" />
          {[[38, 42], [56, 48], [76, 40], [44, 64], [68, 66], [82, 58]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="7" height="3.5" rx="1.5" fill="#7FB04A" transform={`rotate(${i * 30} ${x} ${y})`} />
          ))}
        </g>
      )}

      {kind === "mysorepak" && (
        <g>
          <rect x="24" y="44" width="72" height="44" rx="5" fill="#C98A1C" />
          <rect x="24" y="38" width="72" height="44" rx="5" fill={url("gold")} />
          {[[34, 48], [48, 56], [62, 46], [78, 54], [40, 68], [56, 72], [72, 70], [86, 66], [30, 60]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 2.2 : 3} fill="#B8741A" opacity="0.7" />
          ))}
          <path d="M60 38 V82" stroke="#B8741A" strokeWidth="1.5" opacity="0.6" />
        </g>
      )}

      {kind === "rasmalai" && (
        <g>
          <path d="M18 58 Q60 112 102 58 Z" fill="#F4E9D8" stroke="#D7C3A2" strokeWidth="2" />
          <ellipse cx="60" cy="58" rx="42" ry="10" fill="#FBE7B8" />
          <ellipse cx="46" cy="56" rx="13" ry="6" fill="#FFFDF5" />
          <ellipse cx="74" cy="56" rx="13" ry="6" fill="#FFFDF5" />
          {[[40, 54], [52, 58], [70, 53], [80, 58], [60, 56]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} l4 -2`} stroke={i % 2 ? "#E8590C" : "#7FB04A"} strokeWidth="2" strokeLinecap="round" />
          ))}
        </g>
      )}

      {kind === "samosa" && (
        <g>
          <path d="M60 22 Q70 24 98 88 Q60 98 22 88 Q50 24 60 22 Z" fill={url("pastry")} />
          <path d="M60 22 Q64 60 60 94" stroke="#A55C17" strokeWidth="2" fill="none" opacity="0.5" />
          {[[48, 60], [70, 56], [56, 78], [76, 78], [42, 80], [64, 42]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#8E4A10" opacity="0.6" />
          ))}
          <ellipse cx="50" cy="46" rx="5" ry="10" fill="#fff" opacity="0.25" transform="rotate(20 50 46)" />
        </g>
      )}

      {kind === "kachori" && (
        <g>
          <ellipse cx="60" cy="70" rx="38" ry="24" fill={url("pastry")} />
          <ellipse cx="60" cy="58" rx="30" ry="12" fill="#FFF7E6" />
          <path d="M38 58 q8 -8 16 0 q8 8 16 0 q8 -8 12 0" stroke="#7FB04A" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M42 62 q10 6 18 0 q8 -6 16 2" stroke="#A3283A" strokeWidth="3" fill="none" strokeLinecap="round" />
          {[[44, 52], [56, 50], [70, 52], [62, 60], [50, 62]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="6" height="2" rx="1" fill="#F2B033" />
          ))}
        </g>
      )}

      {kind === "thali" && (
        <g>
          <circle cx="60" cy="62" r="42" fill="#E8E2D6" stroke="#C9BFAE" strokeWidth="2" />
          <circle cx="60" cy="62" r="36" fill="#F5F1EA" />
          <circle cx="42" cy="46" r="10" fill="#F2B033" stroke="#C9BFAE" />
          <circle cx="66" cy="40" r="10" fill="#C2410C" stroke="#C9BFAE" />
          <circle cx="84" cy="60" r="10" fill="#7FB04A" stroke="#C9BFAE" />
          <circle cx="76" cy="82" r="9" fill="#FFF" stroke="#C9BFAE" />
          <ellipse cx="44" cy="74" rx="16" ry="11" fill="#FFFDF5" />
          <circle cx="66" cy="62" r="6" fill={url("jamun")} />
        </g>
      )}

      {kind === "dosa" && (
        <g>
          <ellipse cx="60" cy="80" rx="46" ry="14" fill="#E8E2D6" />
          <path d="M14 76 Q60 30 106 76 Q60 86 14 76 Z" fill={url("gold")} />
          <path d="M24 74 Q60 42 96 74" stroke="#B8741A" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="30" cy="88" r="6" fill="#FFF" />
          <circle cx="90" cy="88" r="6" fill="#C2410C" />
        </g>
      )}

      {kind === "chai" && (
        <g>
          <path d="M34 44 L86 44 L78 96 Q60 102 42 96 Z" fill={url("clay")} />
          <ellipse cx="60" cy="44" rx="26" ry="6" fill="#C98A5A" />
          <ellipse cx="60" cy="45" rx="22" ry="4" fill="#D9A06A" />
          <path d="M40 58 L80 58" stroke="#7A2E16" strokeWidth="1.5" opacity="0.4" />
          <g stroke="#A08060" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6">
            <path d="M50 34 q-5 -7 0 -14 q5 -7 0 -12">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M62 32 q-5 -7 0 -14 q5 -7 0 -12">
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M74 34 q-5 -7 0 -14 q5 -7 0 -12">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.4s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
      )}

      {kind === "lassi" && (
        <g>
          <path d="M38 30 L82 30 L76 98 L44 98 Z" fill="#FFFFFF" opacity="0.6" stroke="#D7C3A2" strokeWidth="2" />
          <path d="M40 46 L80 46 L76 96 L44 96 Z" fill="#FFF3D6" />
          <path d="M38 34 Q60 22 82 34 Q72 46 60 42 Q48 46 38 34 Z" fill="#FFFDF5" />
          <circle cx="56" cy="32" r="2" fill="#E8590C" />
          <circle cx="66" cy="34" r="2" fill="#7FB04A" />
        </g>
      )}

      {kind === "giftbox" && (
        <g>
          <rect x="22" y="48" width="76" height="50" rx="4" fill={url("box")} />
          <rect x="18" y="38" width="84" height="16" rx="3" fill="#8B2233" />
          <rect x="54" y="38" width="12" height="60" fill="#D4A24C" />
          <path d="M60 38 q-20 -22 -26 -6 q4 8 26 6 q22 2 26 -6 q-6 -16 -26 6" fill="#E0B866" stroke="#B5862F" strokeWidth="1.5" />
          <circle cx="40" cy="74" r="6" fill="none" stroke="#E0B866" strokeWidth="1.5" opacity="0.7" />
          <circle cx="80" cy="74" r="6" fill="none" stroke="#E0B866" strokeWidth="1.5" opacity="0.7" />
        </g>
      )}
    </svg>
  );
}
