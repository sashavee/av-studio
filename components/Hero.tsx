"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"];
function Redacted() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => setRevealed(false), 8000);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <span
      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
      onMouseEnter={() => setRevealed(true)}
    >
      {/* Text — fades in after bar disappears */}
      <span style={{
        fontWeight: 700,
        color: "var(--gold)",
        opacity: revealed ? 1 : 0,
        transition: "opacity 0.4s 0.3s",
      }}>
        You didn&apos;t.
      </span>

      {/* Redaction bar */}
      <AnimatePresence>
        {!revealed && (
          <motion.span
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
            style={{
              position: "absolute",
              inset: "0.05em 0",
              background: "var(--fg)",
              borderRadius: "3px",
              pointerEvents: "none",
              transformOrigin: "right center",
              overflow: "hidden",
            }}
          >
            {/* Shimmer running across the bar */}
            <motion.span
              style={{
                position: "absolute", top: 0, bottom: 0, width: "35%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
                pointerEvents: "none",
              }}
              animate={{ left: ["-35%", "130%"] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "linear", repeatDelay: 0.3 }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden flex flex-col justify-end items-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Crossfading background images */}
      {slides.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ zIndex: 0, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      ))}

      {/* Gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(to top, rgba(242,240,236,0.72) 0%, rgba(242,240,236,0.1) 55%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative"
        style={{ zIndex: 2, width: "100%", textAlign: "center" }}
      >
        {/* Line + label — sits right above heading */}
        <div style={{ marginBottom: "0" }}>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--muted)",
            marginBottom: "0.6rem", textAlign: "center",
          }}>
            AI Content for Brands
          </p>
          <div style={{ height: "1px", background: "var(--border)", width: "100%" }} />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(2.4rem, 6.5vw, 8rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--fg)",
            marginBottom: "0",
            padding: "0.4rem clamp(2rem, 5vw, 5rem) clamp(5rem, 10vw, 8rem)",
          }}
        >
          We make content<br />
          that looks like you<br />
          spent a month on it. <Redacted />
        </motion.h1>

      </div>
    </section>
  );
}
