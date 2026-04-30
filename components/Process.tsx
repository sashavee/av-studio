"use client";
import { useRef, useState, useEffect } from "react";

const steps = [
  { num: "01", title: "Brief", desc: "You share the brand, the product, and the goal. We ask the right questions — not 40 of them." },
  { num: "02", title: "Script & Direction", desc: "We write the creative direction: shot list, angles, mood, copy. You approve before anything is made." },
  { num: "03", title: "Production", desc: "We generate, refine, and quality-check every asset. Brand rules enforced — not just prompts." },
  { num: "04", title: "Final File", desc: "Ready-to-use files, in every format you need. No back-and-forth. No revision loops." },
];

// Card 0 starts at 0.08 so user has time to see it animate in
const CARD_STARTS = [0.01, 0.25, 0.50, 0.75];
const FINISH = 0.75; // bar fills to 100% and flag appears at the same time as card 4

function Flag({ visible, mounted }: { visible: boolean; mounted: boolean }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.6)",
      transformOrigin: "bottom right",
      transition: mounted ? "opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
    }}>
      {/* Pole starts at bar level (bottom), flag triangle above */}
      <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
        <line x1="4" y1="0" x2="4" y2="68" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
        <path d="M4 3 L51 20 L4 42 Z" fill="var(--gold)" />
      </svg>
    </div>
  );
}

function StepCard({ step, visible, isLast }: { step: typeof steps[0]; visible: boolean; isLast: boolean }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(44px)",
      transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    }}>
      <p style={{
        fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)",
        fontWeight: 700,
        letterSpacing: "-0.04em",
        color: isLast ? "var(--gold)" : "var(--fg)",
        lineHeight: 1,
        marginBottom: "0.5rem",
      }}>
        ({step.num})
      </p>
      <h3 style={{
        fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        color: "var(--fg)",
        margin: "0 0 0.6rem",
      }}>
        {step.title}
      </h3>
      <p style={{
        fontSize: "var(--body-size)",
        lineHeight: "var(--body-lh)",
        color: "var(--muted)",
        margin: 0,
      }}>
        {step.desc}
      </p>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [flagVisible, setFlagVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrollRange = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / scrollRange));

      setBarWidth(Math.min(p / FINISH, 1) * 100);
      setVisibleCount(CARD_STARTS.filter(s => p >= s).length);
      setFlagVisible(p >= FINISH);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} style={{ height: "280vh", background: "var(--bg)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          paddingTop: "clamp(2rem, 4vw, 4rem)",
          paddingBottom: "clamp(2rem, 4vw, 4rem)",
          paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
          paddingRight: "clamp(1.5rem, 3vw, 3rem)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(3rem, 5vw, 5rem)",
        }}>

          <div>
            <p style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "var(--label-gap)",
            }}>
              Four steps. One brief.
            </p>
            <h2 style={{
              fontSize: "var(--h2-size)",
              fontWeight: "var(--h2-weight)",
              letterSpacing: "var(--h2-ls)",
              lineHeight: "var(--h2-lh)",
              color: "var(--fg)",
            }}>
              How it works
            </h2>
          </div>

          {/* Progress bar + flag */}
          <div style={{ position: "relative" }}>
            <div style={{
              height: "clamp(0.8rem, 1.2vw, 1.2rem)",
              background: "var(--fg)",
              borderRadius: "3px",
              transformOrigin: "left center",
              transform: `scaleX(${barWidth / 100})`,
              transition: "transform 0.12s linear",
            }} />
            {/* Flag pole touches bar top edge, no gap */}
            <div style={{ position: "absolute", right: 0, bottom: "100%" }}>
              <Flag visible={flagVisible} mounted={mounted} />
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", gap: "clamp(1.5rem, 3vw, 3rem)" }}>
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} visible={i < visibleCount} isLast={i === steps.length - 1} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
