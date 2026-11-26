"use client";

import { AnimatePresence, motion } from "motion/react";
import { Bike, Heart, History, RotateCcw, ShieldCheck, Store, Trash2, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DishCard } from "@/components/menu/DishCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { menuItems } from "@/data/menu";
import { useHydrated } from "@/lib/local-store";
import { cn, formatPrice } from "@/lib/utils";
import { cart } from "@/store/cart";
import { customer, useCustomer } from "@/store/customer";
import { favourites, useFavourites } from "@/store/favourites";
import { orders, useOrders, type PastOrder } from "@/store/orders";

type Tab = "orders" | "favourites" | "details";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

function EmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md py-16 text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-saffron-100 text-saffron-600">{icon}</span>
      <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">{title}</h3>
      <p className="mt-2 text-ink-500">{text}</p>
      <Button href="/menu" className="mt-6" shine>
        Browse the menu
      </Button>
    </motion.div>
  );
}

function OrderCard({ order }: { order: PastOrder }) {
  const count = order.lines.reduce((n, l) => n + l.qty, 0);
  const reorder = () => {
    cart.replace(order.lines);
    cart.open();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="rounded-[1.75rem] bg-cream-50 p-5 ring-1 ring-cream-300 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-wider text-saffron-600 uppercase">#{order.id}</p>
          <p className="mt-1 font-semibold text-ink-900">{dateFmt.format(order.createdAt)}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-ink-700">
          {order.orderType === "pickup" ? <Store className="h-3.5 w-3.5" /> : <Bike className="h-3.5 w-3.5" />}
          {order.orderType === "pickup" ? "Pickup" : "Delivery"}
          {order.pickupTime && ` · ${order.pickupTime}`}
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {order.lines.map((l) => (
          <li key={l.id} className="flex items-center gap-3">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <Image src={l.image} alt={l.name} fill sizes="48px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-ink-900">{l.name}</span>
              <span className="text-xs text-ink-500">
                {l.qty} × {formatPrice(l.price)}
                {l.unit && ` (${l.unit})`}
              </span>
            </span>
            <span className="font-semibold text-ink-700">{formatPrice(l.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      {order.note && <p className="mt-4 rounded-xl bg-cream-200/70 px-3 py-2 text-sm text-ink-500">Note: {order.note}</p>}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-cream-300 pt-4">
        <p>
          <span className="text-sm text-ink-500">{count} items · </span>
          <span className="text-xl font-extrabold text-maroon-700">{formatPrice(order.total)}</span>
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => orders.remove(order.id)} aria-label={`Remove order ${order.id} from history`}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button size="sm" shine onClick={reorder}>
            <RotateCcw className="h-4 w-4" /> Order again
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

const inputCls =
  "h-12 w-full rounded-2xl bg-cream-50 px-4 text-[15px] text-ink-900 ring-1 ring-cream-300 outline-none transition focus:ring-2 focus:ring-saffron-500";

/** Everything the visitor has done on this device — stored in localStorage only. */
export function MyAccount() {
  const hydrated = useHydrated();
  const [tab, setTab] = useState<Tab>("orders");
  const orderList = useOrders();
  const favIds = useFavourites();
  const me = useCustomer();

  const favItems = favIds.map((id) => menuItems.find((m) => m.id === id)).filter((m) => m !== undefined);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "orders", label: "My orders", icon: <History className="h-4 w-4" />, count: orderList.length },
    { id: "favourites", label: "Favourites", icon: <Heart className="h-4 w-4" />, count: favIds.length },
    { id: "details", label: "My details", icon: <UserRound className="h-4 w-4" /> },
  ];

  function forgetEverything() {
    if (!window.confirm("Remove your saved details, favourites, cart and order history from this device?")) return;
    customer.forget();
    favourites.clear();
    orders.clear();
    cart.clear();
  }

  return (
    <Container className="pb-20 sm:pb-28">
      <div className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-cream-50 p-1.5 shadow-sm ring-1 ring-cream-300 [scrollbar-width:none]" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              tab === t.id ? "text-cream-50" : "text-ink-700 hover:text-maroon-700",
            )}
          >
            {tab === t.id && <motion.span layoutId="account-tab" className="absolute inset-0 rounded-full bg-maroon-700" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{t.icon}</span>
            <span className="relative">{t.label}</span>
            {hydrated && t.count !== undefined && t.count > 0 && (
              <span className={cn("relative rounded-full px-1.5 text-[11px]", tab === t.id ? "bg-cream-50/20" : "bg-cream-200")}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {!hydrated ? (
          <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-[2rem] bg-cream-200/70" />
        ) : (
          <AnimatePresence mode="wait">
            {tab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto max-w-3xl">
                {orderList.length === 0 ? (
                  <EmptyState icon={<History className="h-9 w-9" />} title="No orders yet" text="When you place an order through the cart, it’ll appear here so you can re-order in one tap." />
                ) : (
                  <>
                    <div className="space-y-5">
                      <AnimatePresence initial={false}>
                        {orderList.map((o) => (
                          <OrderCard key={o.id} order={o} />
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={() => window.confirm("Clear your whole order history on this device?") && orders.clear()}
                        className="text-sm font-semibold text-ink-500 hover:text-maroon-700"
                      >
                        Clear order history
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {tab === "favourites" && (
              <motion.div key="favourites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {favItems.length === 0 ? (
                  <EmptyState icon={<Heart className="h-9 w-9" />} title="No favourites yet" text="Tap the ♥ on any dish to save it here for quick ordering next time." />
                ) : (
                  <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                      {favItems.map((item) => (
                        <DishCard key={item.id} item={item} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            )}

            {tab === "details" && (
              <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto max-w-2xl">
                <div className="rounded-[2rem] bg-cream-50 p-6 ring-1 ring-cream-300 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-ink-900">Saved details</h2>
                  <p className="mt-1 text-sm text-ink-500">Used to fill in your orders and enquiry forms automatically. Changes save as you type.</p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">Name</span>
                      <input className={inputCls} autoComplete="name" value={me.name} onChange={(e) => customer.update({ name: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">Phone</span>
                      <input className={inputCls} type="tel" autoComplete="tel" value={me.phone} onChange={(e) => customer.update({ phone: e.target.value })} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-1.5 block text-sm font-semibold text-ink-700">Delivery address</span>
                      <textarea
                        className={cn(inputCls, "h-auto min-h-24 py-3")}
                        autoComplete="street-address"
                        value={me.address}
                        onChange={(e) => customer.update({ address: e.target.value })}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 rounded-[2rem] bg-saffron-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-3 text-sm text-ink-700">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                    Everything here is stored only in this browser. We never see it unless you send us a message.
                  </p>
                  <Button variant="outline" size="sm" onClick={forgetEverything} className="shrink-0">
                    <Trash2 className="h-4 w-4" /> Forget me
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </Container>
  );
}
