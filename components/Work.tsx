"use client";
import { useState, useEffect } from "react";

const categories = [
  {
    title: "Photo",
    formats: [
      { code: "F1", name: "Catalogue Shot", desc: "Product on a clean or neutral background, multiple angles, studio lighting. For websites, marketplaces, and catalogues." },
      { code: "F2", name: "Lifestyle", desc: "Product placed in a living scene — interior, nature, table, street. A person may be present. For social media and brand image." },
      { code: "F3", name: "Hero", desc: "One strong image — full emphasis on aesthetics and mood. For website headers, banners, and campaign covers." },
      { code: "F4", name: "Seasonal / Campaign", desc: "Product in the context of a specific moment — holiday, season, campaign theme. For targeted launches and promotions." },
      { code: "F5", name: "Flat Lay", desc: "Product laid out from above with surroundings — fabric, props, other items. Top-down view. For social and e-commerce." },
      { code: "F6", name: "Detail Shot", desc: "Close-up of a detail, material, or surface. Conveys quality and texture. For premium brands and catalogue supplements." },
    ],
  },
  {
    title: "Video",
    formats: [
      { code: "V1", name: "Product Reveal", desc: "Product appears, rotates, or emerges into light. 5–10 seconds, no text or narration. For websites, presentations, and ad openers." },
      { code: "V2", name: "Lifestyle Video", desc: "Product in motion in a living scene — atmosphere, not a sales pitch. 10–20 seconds. Builds brand feel for organic social." },
      { code: "V3", name: "Hero for Site", desc: "Ambient, imagistic, no CTA. 15–30 seconds. Lives in the site header or product page. Creates trust and first impression." },
      { code: "V4", name: "Social Ad", desc: "Hook → product → benefit → CTA. 15–30 seconds, on-screen text, voiceover optional. Built for Meta, TikTok, and Instagram." },
      { code: "V5", name: "Explainer / Demo", desc: "Shows how the product works or what problem it solves. 30–60 seconds with voiceover and script. For complex or new products." },
      { code: "V6", name: "Launch Video", desc: "Narrative video for a product or collection launch. 45–60 seconds, story and emotion, ends with a date or call to action. Made once." },
    ],
  },
  {
    title: "Audio",
    formats: [
      { code: "A1", name: "Voiceover", desc: "Professional AI narration in the right language and tone. Added to any video format as an option." },
    ],
  },
];

type Format = typeof categories[0]["formats"][0];

function CategoryCard({ cat, isActive, onActivate }: {
  cat: typeof categories[0];
  isActive: boolean;
  onActivate: () => void;
}) {
  const [hoveredFmt, setHoveredFmt] = useState<Format | null>(null);
  const [pillsReady, setPillsReady] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setPillsReady(true), 520);
      return () => clearTimeout(t);
    } else {
      setPillsReady(false);
    }
  }, [isActive]);

  return (
    <div
      onClick={!isActive ? onActivate : undefined}
      style={{
        flex: isActive ? "5" : "0 0 auto",
        width: isActive ? undefined : "clamp(5rem, 7vw, 8rem)",
        transition: "flex 0.55s cubic-bezier(0.77, 0, 0.18, 1), box-shadow 0.3s ease, transform 0.3s ease",
        background: "var(--bg)",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: isActive ? "default" : "pointer",
        display: "flex",
        flexDirection: "column",
        boxShadow: isActive
          ? "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.12)"
          : "0 4px 20px rgba(0,0,0,0.10)",
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Tab label */}
      <div style={{
        padding: "1.75rem 1.5rem 1.25rem",
        flexShrink: 0,
        display: "flex",
        flexDirection: isActive ? "row" : "column",
        alignItems: isActive ? "flex-end" : "flex-start",
        justifyContent: "space-between",
        gap: "0.5rem",
        minHeight: isActive ? undefined : "100%",
      }}>
        <span style={{
          fontSize: isActive ? "clamp(1.2rem, 1.8vw, 1.8rem)" : "clamp(0.9rem, 1.3vw, 1.3rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--fg)",
          transition: "font-size 0.4s ease",
          writingMode: isActive ? "horizontal-tb" : "vertical-rl",
          transform: isActive ? undefined : "rotate(180deg)",
          whiteSpace: "nowrap",
        }}>
          {cat.title}
        </span>
        <span style={{
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--muted)",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.2s ease 0.4s",
          paddingBottom: "0.5rem",
        }}>
          {cat.formats.length} format{cat.formats.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Pills + description area */}
      {isActive && (
        <div style={{
          flex: 1,
          padding: "0 1.5rem 1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          {/* Pills */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            opacity: pillsReady ? 1 : 0,
            transition: pillsReady ? "opacity 0.4s ease" : "none",
          }}>
            {cat.formats.map(fmt => {
              const isHov = hoveredFmt?.code === fmt.code;
              return (
                <div
                  key={fmt.code}
                  onMouseEnter={() => setHoveredFmt(fmt)}
                  onMouseLeave={() => setHoveredFmt(null)}
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--fg)",
                    background: isHov ? "var(--fg)" : "transparent",
                    cursor: "default",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{
                    fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)",
                    fontWeight: 500,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: isHov ? "var(--bg)" : "var(--fg)",
                    transition: "color 0.2s ease",
                  }}>
                    {fmt.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Description — grows to fill space */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 0 0 2rem" }}>
            <div style={{
              opacity: hoveredFmt ? 1 : 0,
              transform: hoveredFmt ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              width: "100%",
            }}>
              <span style={{
                display: "block",
                fontSize: "0.55rem",
                fontFamily: "monospace",
                color: "var(--gold)",
                letterSpacing: "0.15em",
                marginBottom: "0.6rem",
              }}>
                {hoveredFmt?.code ?? "\u00A0"}
              </span>
              <p style={{
                fontSize: "var(--body-size)",
                lineHeight: "var(--body-lh)",
                color: "var(--fg)",
                margin: 0,
                fontWeight: 400,
                maxWidth: "52ch",
              }}>
                {hoveredFmt?.desc ?? ""}
              </p>
            </div>
          </div>

          {/* Hint — pinned to bottom */}
          <p style={{
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            margin: 0,
            flexShrink: 0,
          }}>
            Hover over a format to learn more
          </p>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" style={{ background: "var(--gold)", height: "100vh", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)", paddingLeft: "clamp(1.5rem, 3vw, 3rem)", paddingRight: "clamp(1.5rem, 3vw, 3rem)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0, boxSizing: "border-box" }}>

        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{
            fontSize: "var(--h2-size)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--bg)",
            whiteSpace: "nowrap",
          }}>
            What we make
          </h2>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "stretch", height: "clamp(280px, 52vh, 420px)" }}>
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
