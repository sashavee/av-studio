"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const TEXT = "AV STUDIO";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const letterVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const measureRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(100);
  const [starHover, setStarHover] = useState(false);

  useEffect(() => {
    const fit = () => {
      if (!measureRef.current || !wrapRef.current) return;
      measureRef.current.style.fontSize = "100px";
      const cs = getComputedStyle(wrapRef.current);
      const available = wrapRef.current.offsetWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const natural = measureRef.current.offsetWidth;
      setFontSize(100 * available / natural);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <footer ref={ref} style={{ background: "var(--bg)", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

      {/* Top half: contacts & info */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 3rem) clamp(2rem, 4vw, 3rem)",
        gap: "clamp(2rem, 4vw, 6rem)",
        alignContent: "center",
      }}>

        {/* Left: tagline + back to top + copyright */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: "clamp(1.3rem, 2.4vw, 2.2rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--fg)",
            textTransform: "uppercase",
            maxWidth: "18ch",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
          }}>
            AI content for brands that move fast and look good doing it.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                padding: "0.75rem 1.75rem",
                borderRadius: "9999px",
                background: "transparent",
                border: "1px solid var(--fg)",
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--fg)"; el.style.color = "var(--bg)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "var(--fg)"; }}
            >
              Back to top
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                {new Date().getFullYear()} © AV Studio
              </p>
              <div style={{ position: "relative", display: "inline-block" }}>
                <span
                  onMouseEnter={() => setStarHover(true)}
                  onMouseLeave={() => setStarHover(false)}
                  style={{ fontSize: "1.2rem", color: "var(--gold)", cursor: "default", userSelect: "none", lineHeight: 1, display: "inline-block" }}
                >
                  ✳
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={starHover ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                    padding: "0.6rem 1rem",
                    borderRadius: "0.5rem",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  This site was built entirely with AI, too
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: contacts + socials */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
            {[
              { label: "Email Address", value: "hello@avstudio.co" },
              { label: "Phone", value: "+61 489 201 528" },
              { label: "Location", value: "Europe & Australia" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "1.1rem", letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--fg)" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "2.5rem" }}>
            {["Instagram", "LinkedIn"].map(link => (
              <a
                key={link}
                href="#"
                style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Middle divider */}
      <div style={{ maxWidth: "1400px", width: "100%", margin: "0 auto", padding: "0 clamp(1.5rem, 3vw, 3rem)" }}>
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Bottom half: large ghosted name */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div ref={wrapRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(1.5rem, 3vw, 3rem)" }}>

          {/* Hidden span for measurement */}
          <span ref={measureRef} aria-hidden style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}>
            {TEXT}
          </span>

          {/* Animated letters */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              display: "flex",
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.85,
              fontSize: fontSize,
              color: "rgba(200, 41, 30, 0.18)",
              userSelect: "none",
              overflow: "hidden",
              transform: "translateY(22%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
              maskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
            }}
          >
            {TEXT.split("").map((char, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: 0.9 }}>
                <motion.span variants={letterVariants} style={{ display: "inline-block" }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

    </footer>
  );
}
