"use client";

import { useEffect, useRef } from "react";

export default function Band() {
  const bandBg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const render = () => {
      const el = bandBg.current;
      if (el?.parentElement) {
        const vh = window.innerHeight;
        const r = el.parentElement.getBoundingClientRect();
        const c = (r.top - vh / 2) / vh;
        el.style.transform = `translateY(${c * 55}px) scale(1.08)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="band" id="band">
      <div className="band-bg" ref={bandBg} />
      <div className="wrap">
        <blockquote className="reveal">
          <p>
            “A little Foha turns the ordinary into something worth gathering
            around.”
          </p>
          <cite>— Crafted for the way you cook</cite>
        </blockquote>
      </div>
    </section>
  );
}
