"use client";

const PRODUCTS = [
  { product: "500 ml — The Everyday", size: "500 ml", name: "The Everyday", width: 120, delay: "d1" },
  { product: "1 Litre — The Family", size: "1 Litre", name: "The Family", width: 150, delay: "d2" },
  { product: "3 Litre — The Household", size: "3 Litre", name: "The Household", width: 190, delay: "d3" },
  { product: "5 Litre — The Trade", size: "5 Litre", name: "The Trade", width: 235, delay: "d4" },
];

export default function Range({
  onSelect,
}: {
  onSelect: (product: string) => void;
}) {
  return (
    <section className="range" id="range">
      <div className="wrap">
        <div className="section-head reveal" style={{ marginBottom: 30 }}>
          <span className="eyebrow">Our Range</span>
          <h2>
            A size for every <em>kitchen</em>
          </h2>
        </div>
        <p
          className="lead reveal d1"
          style={{ maxWidth: 540, marginBottom: 10 }}
        >
          From the family table to the busy commercial kitchen.
        </p>
        <div className="range-row">
          {PRODUCTS.map((p) => (
            <a
              className={`prod reveal ${p.delay}`}
              href="#connect"
              key={p.product}
              data-product={p.product}
              onClick={() => onSelect(p.product)}
            >
              <div className="pwrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/bottle.png"
                  style={{ width: p.width }}
                  alt={p.size}
                />
              </div>
              <div className="size">{p.size}</div>
              <div className="name">{p.name}</div>
              <div className="order-tag">Order this size →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
