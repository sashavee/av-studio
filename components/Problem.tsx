"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: "easeOut" as const },
  });

  return (
    <section ref={ref} className="section-wrap" style={{ background: "var(--bg)" }}>
      <div style={{
        width: "100%", maxWidth: "1100px", margin: "0 auto",
        padding: "0 clamp(1.5rem, 3vw, 3rem)",
        height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>

        {/* Label */}
        <motion.p {...appear(0)} style={{
          fontSize: "0.65rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--gold)",
        }}>
          The situation
        </motion.p>

        {/* Diagonal: top-left headline */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <motion.h2 {...appear(0.15)} style={{
            fontSize: "clamp(2rem, 3.5vw, 4rem)",
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--fg)",
            maxWidth: "16ch", textAlign: "left",
          }}>
            Your brand needs content{" "}
            <span style={{ color: "var(--gold)" }}>constantly.</span>{" "}
            Production doesn't move that fast.
          </motion.h2>
        </div>

        {/* Diagonal: bottom-right body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "55ch", marginLeft: "auto" }}>
          <motion.p {...appear(0.4)} style={{
            fontSize: "clamp(1rem, 1.4vw, 1.45rem)",
            lineHeight: 1.6, color: "var(--fg)",
          }}>
            A single shoot takes weeks to plan and deliver — by which time the campaign window is already closing. You recycle old assets, stretch deadlines, spend budgets you didn&apos;t plan for.
          </motion.p>
          <motion.p {...appear(0.65)} style={{
            fontSize: "clamp(1rem, 1.4vw, 1.45rem)",
            lineHeight: 1.6, color: "var(--fg)",
          }}>
            57% of the fastest-growing brands have already switched to AI content.{" "}
            <span style={{ color: "var(--gold)" }}>The rest are catching up.</span>
          </motion.p>
        </div>

      </div>
    </section>
  );
}
