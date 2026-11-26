"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Bike, CheckCircle2, History, ShoppingBag, Store, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { site, whatsappHref } from "@/data/site";
import { cn, formatPrice } from "@/lib/utils";
import { cart, cartTotals, useCart, useCartOpen, type CartLine } from "@/store/cart";
import { customer, useCustomer, type OrderType } from "@/store/customer";
import { orders, type PastOrder } from "@/store/orders";
import { QtyStepper } from "./CartControls";

type Step = "cart" | "details" | "done";

const pickupTimes = ["As soon as possible", "In 30 minutes", "In 1 hour", "In 2 hours", "This evening", "Tomorrow morning"];

function buildMessage(lines: CartLine[], total: number, details: { name: string; phone: string; orderType: OrderType; address: string; time: string; note: string }) {
  const items = lines.map((l, i) => `${i + 1}. ${l.name}${l.unit ? ` (${l.unit})` : ""} × ${l.qty} = ${formatPrice(l.price * l.qty)}`);
  return [
    `*New order — ${site.name} ${site.branch}*`,
    "",
    `*Name:* ${details.name}`,
    `*Phone:* ${details.phone}`,
    `*Order type:* ${details.orderType === "pickup" ? "Pickup from shop" : "Home delivery"}`,
    ...(details.orderType === "delivery" ? [`*Address:* ${details.address}`] : []),
    `*When:* ${details.time}`,
    "",
    "*Items:*",
    ...items,
    "",
    `*Total: ${formatPrice(total)}*`,
    ...(details.note ? ["", `*Note:* ${details.note}`] : []),
  ].join("\n");
}

const inputCls =
  "h-12 w-full rounded-2xl bg-cream-50 px-4 text-[15px] text-ink-900 ring-1 ring-cream-300 outline-none transition focus:ring-2 focus:ring-saffron-500 placeholder:text-ink-500/60";

export function CartDrawer() {
  const open = useCartOpen();
  const lines = useCart();
  const me = useCustomer();
  const { count, total } = cartTotals(lines);
  const [step, setStep] = useState<Step>("cart");
  const [time, setTime] = useState(pickupTimes[0]);
  const [note, setNote] = useState("");
  const [lastOrder, setLastOrder] = useState<PastOrder | null>(null);

  // Reset to the first step whenever the drawer is closed
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setStep("cart");
  }

  // Lock page scroll and close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function placeOrder(e: FormEvent) {
    e.preventDefault();
    const message = buildMessage(lines, total, { ...me, time, note: note.trim() });
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    const saved = orders.add({ lines, total, orderType: me.orderType, pickupTime: time, note: note.trim() || undefined });
    setLastOrder(saved);
    cart.clear();
    setNote("");
    setStep("done");
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your cart">
          <motion.div
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cart.close}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream-100 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-cream-300 px-5 py-4">
              <div className="flex items-center gap-3">
                {step === "details" ? (
                  <button type="button" onClick={() => setStep("cart")} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream-200" aria-label="Back to cart">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-700 text-cream-50">
                    <ShoppingBag className="h-5 w-5" />
                  </span>
                )}
                <div>
                  <h2 className="font-display text-xl font-bold text-ink-900">
                    {step === "details" ? "Your details" : step === "done" ? "Order sent" : "Your order"}
                  </h2>
                  {step === "cart" && <p className="text-xs text-ink-500">{count} {count === 1 ? "item" : "items"}</p>}
                </div>
              </div>
              <button type="button" onClick={cart.close} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream-200" aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </header>

            <AnimatePresence mode="wait" initial={false}>
              {/* STEP 1 — items */}
              {step === "cart" && (
                <motion.div key="cart" className="flex min-h-0 flex-1 flex-col" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {lines.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                      <motion.span
                        initial={{ scale: 0.6, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="flex h-24 w-24 items-center justify-center rounded-full bg-saffron-100 text-saffron-600"
                      >
                        <ShoppingBag className="h-10 w-10" />
                      </motion.span>
                      <h3 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h3>
                      <p className="mt-2 text-ink-500">Add some sweets and snacks — we’ll keep them here even if you close the page.</p>
                      <Button href="/menu" className="mt-6" onClick={cart.close}>
                        Browse the menu
                      </Button>
                      <Link href="/my-orders" onClick={cart.close} className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-maroon-700 hover:underline">
                        <History className="h-4 w-4" /> My past orders
                      </Link>
                    </div>
                  ) : (
                    <>
                      <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                        <AnimatePresence initial={false}>
                          {lines.map((l) => (
                            <motion.li
                              key={l.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: 60, height: 0, marginTop: 0 }}
                              className="flex gap-3 rounded-2xl bg-cream-50 p-3 ring-1 ring-cream-300"
                            >
                              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                                <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />
                              </span>
                              <div className="flex min-w-0 flex-1 flex-col">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-semibold leading-tight text-ink-900">{l.name}</p>
                                  <button type="button" onClick={() => cart.remove(l.id)} className="-mt-1 -mr-1 rounded-full p-1.5 text-ink-500 hover:bg-maroon-50 hover:text-maroon-700" aria-label={`Remove ${l.name}`}>
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-xs text-ink-500">
                                  {formatPrice(l.price)}
                                  {l.unit && ` / ${l.unit}`}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-2">
                                  <QtyStepper size="sm" qty={l.qty} label={l.name} onChange={(n) => cart.setQty(l.id, n)} />
                                  <span className="font-bold text-maroon-700">{formatPrice(l.price * l.qty)}</span>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                        <li>
                          <button type="button" onClick={cart.clear} className="w-full py-2 text-center text-xs font-semibold text-ink-500 hover:text-maroon-700">
                            Clear cart
                          </button>
                        </li>
                      </ul>
                      <footer className="border-t border-cream-300 bg-cream-50 px-5 py-5">
                        <div className="flex items-center justify-between">
                          <span className="text-ink-500">Total</span>
                          <span className="text-2xl font-extrabold text-ink-900">{formatPrice(total)}</span>
                        </div>
                        <p className="mt-1 text-xs text-ink-500">Final bill confirmed by the shop on WhatsApp.</p>
                        <Button className="mt-4 w-full" size="lg" shine onClick={() => setStep("details")}>
                          Continue · {formatPrice(total)}
                        </Button>
                      </footer>
                    </>
                  )}
                </motion.div>
              )}

              {/* STEP 2 — details */}
              {step === "details" && (
                <motion.form
                  key="details"
                  onSubmit={placeOrder}
                  className="flex min-h-0 flex-1 flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-cream-200 p-1.5" role="radiogroup" aria-label="Order type">
                      {([
                        ["pickup", "Pickup", Store],
                        ["delivery", "Delivery", Bike],
                      ] as const).map(([value, label, Icon]) => (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={me.orderType === value}
                          aria-label={label}
                          onClick={() => customer.update({ orderType: value })}
                          className={cn(
                            "relative flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors",
                            me.orderType === value ? "text-cream-50" : "text-ink-700",
                          )}
                        >
                          {me.orderType === value && (
                            <motion.span layoutId="order-type" className="absolute inset-0 rounded-xl bg-maroon-700" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                          )}
                          <Icon className="relative h-4 w-4" />
                          <span className="relative">{label}</span>
                        </button>
                      ))}
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">Your name</span>
                      <input className={inputCls} required autoComplete="name" value={me.name} onChange={(e) => customer.update({ name: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">Phone number</span>
                      <input
                        className={inputCls}
                        required
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        pattern="[0-9+ ]{10,15}"
                        title="Please enter a valid 10-digit phone number"
                        value={me.phone}
                        onChange={(e) => customer.update({ phone: e.target.value })}
                      />
                    </label>
                    <AnimatePresence initial={false}>
                      {me.orderType === "delivery" && (
                        <motion.label className="block overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          <span className="mb-1.5 block text-sm font-semibold text-ink-700">Delivery address</span>
                          <textarea
                            className={cn(inputCls, "h-auto min-h-24 py-3")}
                            required
                            autoComplete="street-address"
                            placeholder="House no, street, area, landmark"
                            value={me.address}
                            onChange={(e) => customer.update({ address: e.target.value })}
                          />
                        </motion.label>
                      )}
                    </AnimatePresence>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">
                        {me.orderType === "pickup" ? "Pickup time" : "Delivery time"}
                      </span>
                      <select className={inputCls} value={time} onChange={(e) => setTime(e.target.value)}>
                        {pickupTimes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">Note for the shop (optional)</span>
                      <textarea
                        className={cn(inputCls, "h-auto min-h-20 py-3")}
                        placeholder="Less sugar, gift packing, extra chutney…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </label>
                    <p className="rounded-2xl bg-saffron-100 p-4 text-xs leading-relaxed text-ink-700">
                      Your details are saved only on this device so you don’t have to type them again. We’ll confirm your order and final bill on WhatsApp.
                    </p>
                  </div>
                  <footer className="border-t border-cream-300 bg-cream-50 px-5 py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-ink-500">{count} items</span>
                      <span className="text-2xl font-extrabold text-ink-900">{formatPrice(total)}</span>
                    </div>
                    <Button type="submit" variant="whatsapp" size="lg" shine className="w-full">
                      <WhatsAppIcon className="h-5 w-5" /> Place order on WhatsApp
                    </Button>
                  </footer>
                </motion.form>
              )}

              {/* STEP 3 — done */}
              {step === "done" && (
                <motion.div key="done" className="flex flex-1 flex-col items-center justify-center px-8 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <motion.span
                    initial={{ scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-leaf-500/10 text-leaf-500"
                  >
                    <CheckCircle2 className="h-12 w-12" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-bold">Just press send!</h3>
                  <p className="mt-2 text-ink-500">
                    WhatsApp is open with your order. Send the message and we’ll confirm it right away.
                  </p>
                  {lastOrder && (
                    <p className="mt-4 rounded-full bg-cream-200 px-4 py-1.5 text-sm font-semibold text-ink-700">Order ref: {lastOrder.id}</p>
                  )}
                  <div className="mt-8 flex w-full flex-col gap-3">
                    <Button href="/my-orders" onClick={cart.close}>
                      <History className="h-4 w-4" /> View my orders
                    </Button>
                    <Button variant="ghost" onClick={cart.close}>
                      Continue browsing
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
