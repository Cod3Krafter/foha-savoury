"use client";

import { FormEvent, useState } from "react";

const PRODUCT_OPTIONS = [
  "500 ml — The Everyday",
  "1 Litre — The Family",
  "3 Litre — The Household",
  "5 Litre — The Trade",
  "Mixed / not sure yet",
];

export default function Connect({
  product,
  onProductChange,
}: {
  product: string;
  onProductChange: (product: string) => void;
}) {
  const [ok, setOk] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (n: string) =>
      ((f.elements.namedItem(n) as HTMLInputElement | null)?.value || "").trim();

    const subject = `Order enquiry — ${v("product") || "Foha Savoury"}`;
    const body = `Hello Foha Savoury team,

I'd like to place an order / enquiry:

Name: ${v("name")}
Ordering as: ${v("type")}
Email: ${v("email")}
Phone: ${v("phone") || "—"}
Product: ${v("product")}
Quantity: ${v("qty") || "—"}

Message:
${v("message") || "—"}

Thank you.`;

    const mailto = `mailto:orders@fohasavoury.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setOk(true);
  }

  return (
    <section className="connect" id="connect">
      <div className="wrap">
        <div className="connect-top reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Orders &amp; Enquiries
          </span>
          <h2>
            Place your <em>order</em>
          </h2>
          <p>
            Tell us what you need — for your kitchen or your business — and we&apos;ll
            get back to you with pricing and availability.
          </p>
        </div>

        <div className="order-grid">
          <aside className="order-aside reveal d1">
            <div className="oa-block">
              <span className="eyebrow">Talk to us</span>
              <a className="oa-line" href="mailto:orders@fohasavoury.com">
                orders@fohasavoury.com
              </a>
              <a className="oa-line" href="tel:+2348000000000">
                +234 800 000 0000
              </a>
            </div>
            <div className="oa-block">
              <h4>For your kitchen</h4>
              <p>
                Single bottles to a monthly household supply — delivered or
                collected.
              </p>
            </div>
            <div className="oa-block">
              <h4>For your business</h4>
              <p>
                Restaurants, retailers &amp; distributors — bulk pricing and
                standing orders.
              </p>
            </div>
            <div className="oa-note">
              Mon–Sat, 8am–6pm · We reply within one business day.
            </div>
          </aside>

          <form className="order-form reveal d2" onSubmit={handleSubmit}>
            <div className="of-row">
              <label className="field">
                <span>Full name</span>
                <input type="text" name="name" placeholder="Jane Doe" required />
              </label>
              <label className="field">
                <span>I&apos;m ordering as</span>
                <select name="type" required defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  <option>Personal / household</option>
                  <option>Business / wholesale</option>
                </select>
              </label>
            </div>
            <div className="of-row">
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                />
              </label>
              <label className="field">
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="+234 …" />
              </label>
            </div>
            <div className="of-row">
              <label className="field">
                <span>Product</span>
                <select
                  name="product"
                  required
                  value={product}
                  onChange={(e) => onProductChange(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a size…
                  </option>
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Quantity</span>
                <input type="number" name="qty" min={1} placeholder="e.g. 12" />
              </label>
            </div>
            <label className="field">
              <span>
                Message <i>(optional)</i>
              </span>
              <textarea
                name="message"
                rows={3}
                placeholder="Delivery area, timeline, or any questions…"
              />
            </label>
            <button
              className="btn btn-gold"
              type="submit"
              style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
            >
              Send order enquiry <span className="arrow">→</span>
            </button>
            <div className={`of-ok${ok ? " show" : ""}`}>
              Thanks! Your email app is opening with the details — just hit send
              and we&apos;ll be in touch.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
