"use client";

import { useEffect, useRef } from "react";

const BENEFITS = [
  {
    icon: <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />,
    title: "Heart-friendly",
    body: "Zero cholesterol and free from trans fats — light on the body, rich on the plate.",
    delay: "d1",
  },
  {
    icon: (
      <path d="M12 2v6m0 0 3.5-3.5M12 8 8.5 4.5M5 13c0 4 3 7 7 7s7-3 7-7c0-3-2-5-4-6" />
    ),
    title: (
      <>
        Vitamin&nbsp;E rich
      </>
    ),
    body: "A natural source of vitamin E and antioxidants that your everyday cooking deserves.",
    delay: "d2",
  },
  {
    icon: (
      <path d="M8 3c0 3-3 4-3 8a7 7 0 0 0 14 0c0-5-4-6-4-11-2 2-3 3-3 6 0 0-1-1-1-3" />
    ),
    title: "High smoke point",
    body: "Holds its own at frying heat without burning — perfect for crisp, golden results.",
    delay: "d3",
  },
  {
    icon: <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />,
    title: (
      <>
        Clean &amp; neutral
      </>
    ),
    body: "Gently refined for a pure, neutral flavour that lets your own dishes shine.",
    delay: "d4",
  },
];

export default function Benefits() {
  const benBottle = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const render = () => {
      const el = benBottle.current;
      if (el) {
        const vh = window.innerHeight;
        const r = el.getBoundingClientRect();
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${c * -42}px)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="benefits" id="benefits">
      <div className="wrap">
        <div className="ben-grid">
          <div>
            <div className="section-head reveal">
              <span className="eyebrow">Why Foha Savoury</span>
              <h2>
                Goodness you can <em>taste</em>
              </h2>
            </div>
            <div className="ben-cards">
              {BENEFITS.map((b, i) => (
                <div className={`ben-card reveal ${b.delay}`} key={i}>
                  <div className="ben-ico">
                    <svg viewBox="0 0 24 24">{b.icon}</svg>
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ben-visual reveal">
            <div className="halo" />
            <div className="halo h2" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/bottle.png" alt="Foha Savoury bottle" ref={benBottle} />
          </div>
        </div>
      </div>
    </section>
  );
}
