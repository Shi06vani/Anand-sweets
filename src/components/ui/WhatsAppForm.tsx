"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/data/site";
import { customer } from "@/store/customer";
import { Button } from "./Button";
import { WhatsAppIcon } from "./SocialIcons";

type WhatsAppFormProps = {
  /** Heading line at the top of the WhatsApp message */
  subject: string;
  /** Labels for each named field, in the order they should appear in the message */
  labels: Record<string, string>;
  submitLabel?: string;
  children: ReactNode;
};

/**
 * A form that needs no backend: on submit it turns the answers into a neat
 * WhatsApp message to the shop. The owner gets every enquiry on their phone.
 */
export function WhatsAppForm({ subject, labels, submitLabel = "Send on WhatsApp", children }: WhatsAppFormProps) {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-fill name & phone the visitor used before (saved on this device)
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const saved = customer.get();
    for (const key of ["name", "phone"] as const) {
      const field = form.elements.namedItem(key);
      if (field instanceof HTMLInputElement && !field.value && saved[key]) field.value = saved[key];
    }
  }, [sent]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    customer.update({ ...(name && { name }), ...(phone && { phone }) });
    const lines = Object.entries(labels)
      .map(([name, label]) => {
        const value = String(data.get(name) ?? "").trim();
        return value ? `*${label}:* ${value}` : null;
      })
      .filter(Boolean);
    const message = [`*${subject}*`, "", ...lines].join("\n");
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center py-12 text-center"
        >
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf-500/10 text-leaf-500"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">Almost done!</h3>
          <p className="mt-2 max-w-sm text-ink-500">
            We’ve opened WhatsApp with your details filled in — just press <strong>send</strong> and we’ll get back to you shortly.
          </p>
          <Button variant="ghost" className="mt-6" onClick={() => setSent(false)}>
            <RotateCcw className="h-4 w-4" /> Send another enquiry
          </Button>
        </motion.div>
      ) : (
        <motion.form key="form" ref={formRef} onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="grid gap-5 sm:grid-cols-2">{children}</div>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-500">Your details go only to us, via WhatsApp. No spam, ever.</p>
            <Button type="submit" variant="whatsapp" size="lg" shine className="w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5" /> {submitLabel}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
