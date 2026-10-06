import { useState } from "react"
import { inr } from "../data/menu"
import { IconClose } from "./Icons"

const emptyForm = {
  name: "",
  phone: "",
  method: "upi",
  upi: "",
  card: "",
  expiry: "",
  cvv: "",
}

export default function CartDrawer({ open, items, onClose, onRemove, onQty, onPaid }) {
  const [step, setStep] = useState("cart")
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const gst = Math.round(subtotal * 0.05)
  const total = subtotal + gst

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: "" }))
  }

  const close = () => {
    onClose()
    window.setTimeout(() => {
      setStep("cart")
      setErrors({})
      if (step === "done") {
        setOrder(null)
        setForm(emptyForm)
      }
    }, 350)
  }

  const pay = (event) => {
    event.preventDefault()
    if (items.length === 0) return

    const next = {}
    if (form.name.trim().length < 2) next.name = "Add the name for this order."
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) next.phone = "Enter a 10-digit mobile number."

    if (form.method === "upi") {
      if (!/^[\w.-]{2,}@[\w.-]{2,}$/.test(form.upi.trim())) next.upi = "Use a UPI ID like name@okbank."
    }

    if (form.method === "card") {
      const digits = form.card.replace(/\s/g, "")
      if (!/^\d{16}$/.test(digits)) next.card = "Enter the 16-digit card number."
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) next.expiry = "Use a valid expiry, MM/YY."
      else {
        const [month, year] = form.expiry.split("/").map(Number)
        const expiry = new Date(2000 + year, month, 1)
        if (expiry <= new Date()) next.expiry = "This card is expired."
      }
      if (!/^\d{3}$/.test(form.cvv)) next.cvv = "Enter the 3-digit CVV."
    }

    setErrors(next)
    if (Object.keys(next).length > 0) return

    const receipt = {
      id: `JM${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      method: form.method,
      items: items.map((item) => ({ ...item })),
      total,
    }
    setOrder(receipt)
    setStep("done")
    onPaid()
  }

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-card text-ink shadow-2xl transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-2xl">{step === "done" ? "Payment received" : step === "pay" ? "Pay for your order" : "Your counter"}</h2>
            <p className="text-xs text-muted">
              {step === "done" && order
                ? `Order ${order.id}`
                : items.length > 0
                  ? `${items.reduce((sum, item) => sum + item.qty, 0)} glasses`
                  : "Cart"}
            </p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-line">
            <IconClose />
          </button>
        </div>

        {step === "cart" && (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.length === 0 && <p className="text-muted">Nothing poured yet. Add a juice from the menu, then pay here.</p>}
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-2xl border border-line p-3">
                  <img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">{item.name}</p>
                      <p className="font-semibold">{inr(item.price * item.qty)}</p>
                    </div>
                    <p className="text-sm text-muted">{inr(item.price)} each</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => onQty(item.id, item.qty - 1)} className="h-8 w-8 text-lg">
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                        <button type="button" aria-label={`Increase ${item.name}`} onClick={() => onQty(item.id, item.qty + 1)} className="h-8 w-8 text-lg">
                          +
                        </button>
                      </div>
                      <button type="button" onClick={() => onRemove(item.id)} className="text-sm text-citrus">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Bill subtotal={subtotal} gst={gst} total={total}>
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => setStep("pay")}
                className="w-full rounded-full bg-citrus py-3.5 text-sm font-semibold text-white disabled:opacity-40"
              >
                Continue to payment
              </button>
            </Bill>
          </>
        )}

        {step === "pay" && (
          <form onSubmit={pay} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              <Field label="Name on the order" name="name" value={form.name} onChange={update} error={errors.name} />
              <Field label="Mobile number" name="phone" value={form.phone} onChange={update} error={errors.phone} inputMode="numeric" maxLength={10} />

              <fieldset>
                <legend className="text-sm font-medium">Pay with</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    ["upi", "UPI"],
                    ["card", "Card"],
                    ["counter", "At counter"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className={`cursor-pointer rounded-2xl border px-2 py-3 text-center text-sm font-semibold ${
                        form.method === value ? "border-citrus bg-citrus/10 text-citrus" : "border-line"
                      }`}
                    >
                      <input type="radio" name="method" value={value} checked={form.method === value} onChange={update} className="sr-only" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.method === "upi" && (
                <Field label="UPI ID" name="upi" value={form.upi} onChange={update} error={errors.upi} placeholder="name@okbank" />
              )}

              {form.method === "card" && (
                <>
                  <Field
                    label="Card number"
                    name="card"
                    value={form.card}
                    error={errors.card}
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    onChange={(event) => {
                      const digits = event.target.value.replace(/\D/g, "").slice(0, 16)
                      const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ")
                      setForm((current) => ({ ...current, card: grouped }))
                      setErrors((current) => ({ ...current, card: "" }))
                    }}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" name="expiry" value={form.expiry} error={errors.expiry} placeholder="MM/YY" maxLength={5} onChange={(event) => {
                      let value = event.target.value.replace(/[^\d]/g, "").slice(0, 4)
                      if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`
                      setForm((current) => ({ ...current, expiry: value }))
                      setErrors((current) => ({ ...current, expiry: "" }))
                    }} />
                    <Field label="CVV" name="cvv" value={form.cvv} error={errors.cvv} inputMode="numeric" maxLength={3} onChange={update} />
                  </div>
                  <p className="text-xs text-muted">Card details stay in this browser and are not sent to a bank. This checkout confirms the counter order.</p>
                </>
              )}

              {form.method === "counter" && (
                <p className="rounded-2xl bg-bg px-4 py-3 text-sm text-muted">Pay when you collect the drinks. We’ll hold the order under your name.</p>
              )}

              {Object.values(errors).some(Boolean) && (
                <p className="rounded-2xl bg-citrus/10 px-4 py-3 text-sm text-citrus" role="alert">
                  Payment could not be completed. Check the highlighted fields and try again.
                </p>
              )}
            </div>
            <Bill subtotal={subtotal} gst={gst} total={total}>
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <button type="button" onClick={() => setStep("cart")} className="rounded-full border border-line px-4 py-3.5 text-sm font-semibold">
                  Back
                </button>
                <button type="submit" className="rounded-full bg-citrus py-3.5 text-sm font-semibold text-white">
                  Pay {inr(total)}
                </button>
              </div>
            </Bill>
          </form>
        )}

        {step === "done" && order && (
          <div className="flex flex-1 flex-col px-5 py-6">
            <div className="rounded-[1.6rem] bg-foam p-6 text-[#f7f1e8]">
              <p className="text-sm tracking-[0.16em] text-mango uppercase">Order {order.id}</p>
              <p className="mt-2 font-display text-4xl">{inr(order.total)}</p>
              <p className="mt-2 text-sm text-white/75">
                {order.method === "counter" ? "Pay at the counter when you pick up." : "Payment confirmed."} Held for {order.name}.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>
                    {item.qty} × {item.name}
                  </span>
                  <span>{inr(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={close} className="mt-auto rounded-full bg-citrus py-3.5 text-sm font-semibold text-white">
              Done
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

function Bill({ subtotal, gst, total, children }) {
  return (
    <div className="border-t border-line px-5 py-5">
      <div className="mb-1 flex justify-between text-sm text-muted">
        <span>Subtotal</span>
        <span>{inr(subtotal)}</span>
      </div>
      <div className="mb-3 flex justify-between text-sm text-muted">
        <span>GST 5%</span>
        <span>{inr(gst)}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted">To pay</span>
        <span className="font-display text-3xl">{inr(total)}</span>
      </div>
      {children}
    </div>
  )
}

function Field({ label, error, ...props }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        {...props}
        className={`mt-1.5 w-full rounded-2xl border bg-bg px-4 py-3 outline-none ${error ? "border-citrus" : "border-line focus:border-citrus"}`}
      />
      {error && <span className="mt-1 block text-xs font-normal text-citrus">{error}</span>}
    </label>
  )
}
