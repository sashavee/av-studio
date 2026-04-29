"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    id: "photo",
    label: "Photo",
    formats: [
      { code: "F1", name: "Catalogue Shot", desc: "Clean, on-white or on-brand backgrounds. Optimised for e-commerce and listings." },
      { code: "F2", name: "Lifestyle", desc: "Product in context. Real environments, real moments, brand-consistent mood." },
      { code: "F3", name: "Hero", desc: "The big one. Campaign-grade imagery for homepage, OOH, or editorial use." },
      { code: "F4", name: "Seasonal", desc: "Campaign-ready shots tied to a moment: launch, season, occasion." },
      { code: "F5", name: "Flat Lay", desc: "Overhead compositions for social, editorial, and product storytelling." },
      { code: "F6", name: "Detail Shot", desc: "Close-up texture, material, and craftsmanship. Built for premium positioning." },
    ],
  },
  {
    id: "video",
    label: "Video",
    formats: [
      { code: "V1", name: "Product Reveal", desc: "The reveal moment. Designed to stop scrolls and open eyes." },
      { code: "V2", name: "Lifestyle Video", desc: "Product in motion, in life. Warm, editorial, ownable." },
      { code: "V3", name: "Hero for Site", desc: "Full-width, ambient, beautiful. Sets the tone above the fold." },
      { code: "V4", name: "Social Ad", desc: "Short-form, punchy, format-native. Built to perform on feed." },
      { code: "V6", name: "Explainer", desc: "How it works, why it matters. Clear, visual, conversion-focused." },
      { code: "V7", name: "Launch Video", desc: "The moment your product enters the world. Cinematic, memorable." },
    ],
  },
  {
    id: "audio",
    label: "Audio",
    formats: [
      { code: "A1", name: "Voiceover", desc: "Professional narration, on-brand tone, available as an add-on to any video format." },
    ],
  },
];

export default function Formats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("photo");

  const current = categories.find((c) => c.id === active)!;

  return (
    <section ref={ref} id="formats" className="px-8 md:px-16 py-32 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            What we make
          </p>
          <h2 className="text-3xl md:text-4xl font-light" style={{ color: "var(--fg)" }}>
            Every format your brand needs.
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex gap-1 mb-10 p-1 rounded-full w-fit" style={{ background: "var(--border)" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: active === cat.id ? "var(--fg)" : "transparent",
                color: active === cat.id ? "var(--bg)" : "var(--muted)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Format grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-px"
          style={{ background: "var(--border)" }}
        >
          {current.formats.map((fmt) => (
            <div
              key={fmt.code}
              className="p-8 flex flex-col gap-3 group transition-all duration-300"
              style={{ background: "var(--card)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#241f1a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--card)"; }}
            >
              <span className="text-xs font-mono" style={{ color: "var(--gold)" }}>{fmt.code}</span>
              <h3 className="text-base font-medium" style={{ color: "var(--fg)" }}>{fmt.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{fmt.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
