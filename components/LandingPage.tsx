"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Range from "./Range";
import Band from "./Band";
import Connect from "./Connect";
import Footer from "./Footer";

export default function LandingPage() {
  const [product, setProduct] = useState("");

  // reveal-on-scroll: fade/slide elements in as they enter the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Benefits />
      <Range onSelect={setProduct} />
      <Band />
      <Connect product={product} onProductChange={setProduct} />
      <Footer />
    </>
  );
}
