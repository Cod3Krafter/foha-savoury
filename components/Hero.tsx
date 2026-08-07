"use client";

import { useEffect, useRef } from "react";

const CAPS = [
  {
    title: (
      <>
        Liquid gold,
        <br />
        in every <em>drop.</em>
      </>
    ),
    body: "Gently refined for a clean, light taste — the golden standard for every kitchen.",
  },
  {
    title: (
      <>
        Pure, light
        <br />& <em>clean.</em>
      </>
    ),
    body: "Zero cholesterol, no trans fats and rich in vitamin E. Goodness you can taste.",
  },
  {
    title: (
      <>
        From our home
        <br />
        to <em>yours.</em>
      </>
    ),
    body: "From the family table to the busy commercial kitchen — a size for every need.",
  },
];

const clamp = (v: number, a: number, b: number) =>
  Math.max(a, Math.min(b, v));
const smooth = (t: number) => {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
};
// trapezoid window: 0 before a, ramps to 1 by b, holds, ramps to 0 by d
function seg(p: number, a: number, b: number, c: number, d: number) {
  if (p <= a || p >= d) return 0;
  if (p < b) return smooth((p - a) / (b - a));
  if (p > c) return smooth(1 - (p - c) / (d - c));
  return 1;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bottleScroll = useRef<HTMLDivElement>(null);
  const bottleTilt = useRef<HTMLDivElement>(null);
  const bottleGlow = useRef<HTMLDivElement>(null);
  const bigword = useRef<HTMLDivElement>(null);
  const heroWarm = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const trust = useRef<HTMLDivElement>(null);
  const caps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion:reduce)"
    ).matches;
    // on phones the hero stacks vertically inside a 100vh frame, so damp the
    // bottle's upward drift + growth to keep it from clipping off the top
    const smallScreen = window.matchMedia("(max-width:600px)").matches;

    // ---- smoothed scroll values (lerp) ----
    let target = 0,
      cur = 0; // hero scrub progress 0..1
    let mx = 0,
      my = 0,
      smx = 0,
      smy = 0; // pointer for tilt

    function readTargets() {
      const vh = window.innerHeight;
      const total = hero!.offsetHeight - vh;
      const rect = hero!.getBoundingClientRect();
      target = clamp(-rect.top / total, 0, 1);
    }
    window.addEventListener("scroll", readTargets, { passive: true });
    window.addEventListener("resize", readTargets);
    readTargets();

    // pointer tilt
    const fine = window.matchMedia("(pointer:fine)").matches;
    const onMove = (e: MouseEvent) => {
      const r = hero!.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
    };
    if (fine && !reduce) {
      hero.addEventListener("mousemove", onMove);
      hero.addEventListener("mouseleave", onLeave);
    }

    let raf = 0;
    function render() {
      // lerp toward targets — buttery smoothing
      cur += (target - cur) * 0.085;
      smx += (mx - smx) * 0.08;
      smy += (my - smy) * 0.08;
      const p = cur;

      // HERO bottle: rises gently + scales up as you scroll through the pin
      const scale =
        0.92 + smooth(clamp(p / 0.85, 0, 1)) * (smallScreen ? 0.12 : 0.26);
      const rise = -p * (smallScreen ? 24 : 70); // drifts up slowly
      const turn = Math.sin(p * Math.PI) * (reduce ? 0 : 7); // gentle 3D turn
      if (bottleScroll.current) {
        bottleScroll.current.style.transform = `translateY(${rise}px) scale(${scale})`;
        bottleScroll.current.style.transformOrigin = "50% 60%";
      }

      // pointer tilt + scroll turn combined on inner layer
      if (bottleTilt.current) {
        bottleTilt.current.style.transform = `rotateY(${
          smx * 14 + turn
        }deg) rotateX(${-smy * 10}deg) translateZ(${reduce ? 0 : 18}px)`;
      }

      // glow swells with scroll
      if (bottleGlow.current) {
        bottleGlow.current.style.opacity = String(0.7 + smooth(p) * 0.6);
        bottleGlow.current.style.transform = `translate(-50%,-50%) scale(${
          1 + smooth(p) * 0.4
        })`;
      }

      // backdrop word: drifts up + fades as scene warms
      if (bigword.current) {
        bigword.current.style.transform = `translate(-50%,-50%) translateY(${
          -p * 130
        }px) scale(${1 + p * 0.18})`;
        bigword.current.style.opacity = String(
          1 - smooth(clamp((p - 0.45) / 0.5, 0, 1)) * 0.85
        );
      }

      // light warms up through the journey, then settles back to dark
      const warmUp = smooth(clamp((p - 0.1) / 0.45, 0, 1));
      const warmDown = smooth(clamp((p - 0.72) / 0.28, 0, 1));
      if (heroWarm.current) {
        heroWarm.current.style.opacity = String(warmUp * (1 - warmDown) * 0.9);
      }

      // captions crossfade with drift + blur
      const wins: [number, number, number, number][] = [
        [-0.1, 0, 0.2, 0.34],
        [0.26, 0.4, 0.56, 0.7],
        [0.62, 0.78, 1.1, 1.3],
      ];
      caps.current.forEach((el, i) => {
        if (!el) return;
        const o = seg(p, ...wins[i]);
        el.style.opacity = String(o);
        const center = (wins[i][1] + wins[i][2]) / 2;
        el.style.transform = `translateY(${(p - center) * -46}px)`;
        el.style.filter = `blur(${(1 - o) * 7}px)`;
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      });

      // trust + cue fade as you dive in
      const fade = 1 - smooth(clamp(p / 0.18, 0, 1));
      if (trust.current) trust.current.style.opacity = String(0.35 + fade * 0.65);
      if (cue.current) cue.current.style.opacity = String(fade);

      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readTargets);
      window.removeEventListener("resize", readTargets);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="hero-sticky">
        <div className="hero-bg" />
        <div className="hero-warm" ref={heroWarm} />
        <div className="hero-grain" />
        <div className="bigword" ref={bigword}>
          Savoury
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Pure Vegetable Oil</span>
            <div className="caps">
              {CAPS.map((cap, i) => (
                <div
                  className="cap"
                  key={i}
                  data-i={i}
                  ref={(el) => {
                    caps.current[i] = el;
                  }}
                >
                  <h1>{cap.title}</h1>
                  <p>{cap.body}</p>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#connect">
                Shop now <span className="arrow">→</span>
              </a>
              <a className="btn btn-ghost" href="#benefits">
                Why Foha
              </a>
            </div>
            <div className="trust" ref={trust}>
              <div className="t">
                <b>0%</b>
                <span>Cholesterol</span>
              </div>
              <div className="t">
                <b>100%</b>
                <span>Pure &amp; light</span>
              </div>
              <div className="t">
                <b>1L–5L</b>
                <span>Family &amp; trade</span>
              </div>
            </div>
          </div>
          <div className="bottle-stage">
            <div className="bottle-scroll" ref={bottleScroll}>
              <div className="bottle-tilt" ref={bottleTilt}>
                <div className="bottle-glow" ref={bottleGlow} />
                <div className="bottle-float">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/bottle.png"
                    alt="Foha Savoury vegetable oil bottle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue" ref={cue}>
          <span>Scroll</span>
          <span className="line" />
        </div>
      </div>
    </header>
  );
}
