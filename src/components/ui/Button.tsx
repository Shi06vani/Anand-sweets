import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-maroon-700 text-cream-50 shadow-lg shadow-maroon-900/20 hover:bg-maroon-800 hover:shadow-xl hover:shadow-maroon-900/25",
  saffron:
    "bg-saffron-500 text-ink-900 shadow-lg shadow-saffron-600/25 hover:bg-saffron-400 hover:shadow-xl",
  outline:
    "border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-cream-50",
  light:
    "bg-cream-50 text-maroon-800 shadow-lg shadow-black/10 hover:bg-white",
  ghost: "text-maroon-700 hover:bg-maroon-50",
  whatsapp:
    "bg-[#25D366] text-white shadow-lg shadow-green-900/20 hover:bg-[#1ebe5b]",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
  icon: "h-11 w-11 justify-center",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds a light sweep across the button on hover */
  shine?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = BaseProps & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    keyof BaseProps | "href"
  >;
type AsButton = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    keyof BaseProps
  >;

export type ButtonProps = AsLink | AsButton;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<BaseProps, "variant" | "size" | "className">) {
  return cn(
    "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold tracking-wide whitespace-nowrap",
    "transition-all duration-300 ease-out active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-0 -left-[75%] h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-shine"
    />
  );
}

/**
 * One button for the whole site.
 * - Pass `href` to render a link (internal → next/link, external/tel/wa → <a>).
 * - Otherwise renders a <button>.
 */
export function Button({ variant, size, shine, className, children, ...rest }: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {shine && <Shine />}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    const { href, external, ...anchorProps } = rest as Omit<AsLink, keyof BaseProps>;
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

    if (isExternal) {
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type, ...buttonProps } = rest as Omit<AsButton, keyof BaseProps>;
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
