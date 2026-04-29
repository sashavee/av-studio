"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tiers = [
  {
    name: "Pilot",
    tagline: "Try before you commit.",
    price: "From €1,500",
    period: "one-time",
    desc: "One format, one product, full quality. Designed to show you exactly what working with us looks like — before any long-term conversation.",
    includes: [
      "1 content format (Photo or Video)",
      "Up to 5 final deliverables",
      "Creative direction included",
      "2 revision rounds",
      "7-day turnaround",
    ],
    cta: "Start a pilot",
    highlight: false,
  },
  {
    name: "Growth",
    tagline: "Your content engine, running.",
    price: "From €4,500",
    period: "/ month",
    desc: "Multi-format, consistent volume, on-brand every time. Built for brands that need content as a steady output, not a one-off project.",
    includes: [
      "Up to 3 content formats",
      "20–40 deliverables per month",
      "Ongoing creative direction",
      "Brand guidelines integration",
      "Priority turnaround",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Partner",
    tagline: "Embedded. Aligned. Accountable.",
    price: "Custom",
    period: "",
    desc: "We work as an extension of your team — inside your brand strategy, sharing your campaign calendar, accountable for outcomes.",
    includes: [
      "All formats, unlimited volume",
      "Embedded creative direction",
      "Performance-linked pricing",
      "Dedicated account lead",
      "Monthly roadmap sessions",
    ],
    cta: "Let's talk",
    highlight: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="pricing" className="section-wrap" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-light" style={{ color: "var(--fg)" }}>
            Start small. Scale when it&apos;s obvious.
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: "var(--muted)" }}>
            No lock-ins, no surprises. The pilot exists because we know that seeing is believing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="relative p-8 rounded-2xl border flex flex-col gap-8"
              style={{
                borderColor: tier.highlight ? "var(--gold)" : "var(--border)",
                background: tier.highlight ? "var(--card)" : "transparent",
              }}
            >
              {tier.highlight && (
                <span
                  className="absolute -top-3 left-8 text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--gold)", color: "var(--bg)" }}
                >
                  Most popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-medium mb-1" style={{ color: "var(--fg)" }}>{tier.name}</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{tier.tagline}</p>
              </div>

              <div>
                <p className="text-3xl font-light" style={{ color: "var(--fg)" }}>
                  {tier.price}
                  {tier.period && (
                    <span className="text-base ml-1" style={{ color: "var(--muted)" }}>{tier.period}</span>
                  )}
                </p>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{tier.desc}</p>

              <ul className="space-y-3 flex-1">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--fg)" }}>
                    <span style={{ color: "var(--gold)" }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center py-3 rounded-full text-sm font-medium transition-all duration-300 border"
                style={
                  tier.highlight
                    ? { background: "var(--fg)", color: "var(--bg)", borderColor: "transparent" }
                    : { background: "transparent", color: "var(--fg)", borderColor: "var(--border)" }
                }
                onMouseEnter={e => {
                  if (tier.highlight) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
                  } else {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--fg)";
                  }
                }}
                onMouseLeave={e => {
                  if (tier.highlight) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--fg)";
                  } else {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  }
                }}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
