import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-2xl bg-cream-50 px-4 text-[15px] text-ink-900 ring-1 ring-cream-300 transition outline-none placeholder:text-ink-500/60 focus:ring-2 focus:ring-saffron-500 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-maroon-500";

type FieldShellProps = { label: string; hint?: string; children: ReactNode; className?: string };

function FieldShell({ label, hint, children, className }: FieldShellProps) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-semibold text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
    </label>
  );
}

type InputFieldProps = ComponentProps<"input"> & { label: string; hint?: string; wrapperClassName?: string };

export function InputField({ label, hint, className, wrapperClassName, placeholder = " ", ...props }: InputFieldProps) {
  return (
    <FieldShell label={label} hint={hint} className={wrapperClassName}>
      <input className={cn(control, "h-12", className)} placeholder={placeholder} {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = ComponentProps<"select"> & { label: string; hint?: string; options: readonly string[]; wrapperClassName?: string };

export function SelectField({ label, hint, options, className, wrapperClassName, ...props }: SelectFieldProps) {
  return (
    <FieldShell label={label} hint={hint} className={wrapperClassName}>
      <select className={cn(control, "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%237a1f2b%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10", className)} {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextareaFieldProps = ComponentProps<"textarea"> & { label: string; hint?: string; wrapperClassName?: string };

export function TextareaField({ label, hint, className, wrapperClassName, ...props }: TextareaFieldProps) {
  return (
    <FieldShell label={label} hint={hint} className={wrapperClassName}>
      <textarea className={cn(control, "min-h-28 resize-y py-3", className)} {...props} />
    </FieldShell>
  );
}
