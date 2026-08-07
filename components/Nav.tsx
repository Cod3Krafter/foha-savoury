"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#benefits", label: "Benefits" },
  { href: "#range", label: "Our Range" },
  { href: "#band", label: "The Brand" },
  { href: "#connect", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.99);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : undefined}>
      <a className="brand" href="#top">
        <span className="mark">
          <i>F</i>
        </span>
        <b>Foha</b><span>Savoury</span>
      </a>
      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="nav-cta">
        <a className="btn btn-gold" href="#connect">
          Shop now <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
