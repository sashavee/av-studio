"use client";
import { useState, useEffect } from "react";

const works = [
  { id: "01", brand: "Act+Acre", category: "Hair Care", format: "Catalogue Shot", code: "F1", image: "/portfolio/1.jpg" },
  { id: "02", brand: "Oshun", category: "Wellness", format: "Lifestyle", code: "F2", image: "/portfolio/2.jpg" },
  { id: "03", brand: "Oshun", category: "Wellness", format: "Hero", code: "F3", image: "/portfolio/3.jpg" },
  { id: "04", brand: "Canndid", category: "CBD", format: "Lifestyle", code: "F2", image: "/portfolio/4.jpg" },
  { id: "05", brand: "Nike", category: "Footwear", format: "Hero", code: "F3", image: "/portfolio/5.jpg" },
  { id: "06", brand: "Purina", category: "Pet Food", format: "Flat Lay", code: "F5", image: "/portfolio/6.jpg" },
  { id: "07", brand: "Butcher's", category: "Pet Food", format: "Catalogue Shot", code: "F1", image: "/portfolio/7.jpg" },
];

export default function Portfolio() {
  const [current, setCurrent] = useState(0);
  const work = works[current];

  const prev = () => setCurrent(c => (c - 1 + works.length) % works.length);
  const next = () => setCurrent(c => (c + 1) % works.length);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % works.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "var(--bg)", height: "100vh", overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        paddingTop: "clamp(2rem, 4vw, 4rem)",
        paddingBottom: "clamp(2rem, 4vw, 4rem)",
        paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
        paddingRight: "clamp(1.5rem, 3vw, 3rem)",
      }}>

        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "2.5rem",
          paddingBottom: "1.5rem",
        }}>
          <h2 style={{
            fontSize: "clamp(2.8rem, 5vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--fg)",
            margin: 0,
          }}>
            Selected Work
          </h2>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "1.5rem", paddingBottom: "0.4rem", alignItems: "center" }}>
            {[{ onClick: prev, d: "M20 12H4M11 5l-7 7 7 7" }, { onClick: next, d: "M4 12h16M13 5l7 7-7 7" }].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.6"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
              >
                <svg width="64" height="32" viewBox="0 0 36 20" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={btn.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "clamp(2rem, 4vw, 5rem)",
          alignItems: "center",
        }}>

          {/* Left: meta */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <span style={{
              fontSize: "clamp(4rem, 8vw, 8rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "var(--border)",
              display: "block",
              marginBottom: "1.5rem",
            }}>
              ({work.id})
            </span>

            <span style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "0.6rem",
            }}>
              {work.category}
            </span>

            <h3 style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--fg)",
              margin: "0 0 2rem 0",
            }}>
              {work.brand}
            </h3>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              background: "var(--bg2)",
              width: "fit-content",
            }}>
              <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "var(--gold)", letterSpacing: "0.1em" }}>{work.code}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{work.format}</span>
            </div>
          </div>

          {/* Right: image or video */}
          <div style={{
            aspectRatio: "16/10",
            overflow: "hidden",
            borderRadius: "0.75rem",
            background: "var(--bg2)",
            position: "relative",
          }}>
            {work.image.endsWith(".mp4") ? (
              <video
                key={work.image}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src={work.image} type="video/mp4" />
              </video>
            ) : (
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${work.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }} />
            )}
          </div>
        </div>

        {/* Counter */}
        <div style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          {works.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "2rem" : "0.4rem",
                height: "0.4rem",
                borderRadius: "9999px",
                background: i === current ? "var(--fg)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
