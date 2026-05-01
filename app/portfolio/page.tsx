"use client";
import { useState, useEffect, useRef } from "react";

const landings = [
  { title: "AV Studio", url: "https://avstudio.agency" },
  { title: "Проект 2", url: "#" },
  { title: "Проект 3", url: "#" },
];

const bots = [
  { title: "Бот для записи клиентов", url: "#" },
  { title: "Бот поддержки e-com", url: "#" },
];

export default function Portfolio() {
  const [open, setOpen] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  const toggle = (key: string) => setOpen(p => p === key ? null : key);

  const bg = `radial-gradient(ellipse 60% 55% at ${mouse.x}% ${mouse.y}%, #f2ede4 0%, transparent 75%), #8B1A0E`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
      `}</style>
      <main
        ref={ref}
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 3vw, 3rem)",
          transition: "background 0.05s linear",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={labelStyle}>AV STUDIO</span>
          <span style={labelStyle}>ПОРТФОЛИО</span>
        </div>

        {/* Main accordion */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>

          {/* Лендинги */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            <button
              onClick={() => toggle("landings")}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                padding: "0.25rem 0",
                gap: "1rem",
              }}
            >
              <span style={headingStyle}>ЛЕНДИНГИ</span>
              <span style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1,
                transform: open === "landings" ? "rotate(45deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
                display: "inline-block",
                flexShrink: 0,
              }}>+</span>
            </button>

            <div style={{
              overflow: "hidden",
              maxHeight: open === "landings" ? "400px" : "0",
              transition: "max-height 0.45s cubic-bezier(0.77,0,0.18,1)",
            }}>
              <div style={{ paddingBottom: "1.5rem", paddingTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {landings.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(1.5rem, 3vw, 3rem)",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      lineHeight: 1.15,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {l.title} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Чат-боты */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            <button
              onClick={() => toggle("bots")}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                padding: "0.25rem 0",
                gap: "1rem",
              }}
            >
              <span style={headingStyle}>ЧАТ-БОТЫ</span>
              <span style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1,
                transform: open === "bots" ? "rotate(45deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
                display: "inline-block",
                flexShrink: 0,
              }}>+</span>
            </button>

            <div style={{
              overflow: "hidden",
              maxHeight: open === "bots" ? "400px" : "0",
              transition: "max-height 0.45s cubic-bezier(0.77,0,0.18,1)",
            }}>
              <div style={{ paddingBottom: "1.5rem", paddingTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {bots.map((b, i) => (
                  <a
                    key={i}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(1.5rem, 3vw, 3rem)",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      lineHeight: 1.15,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {b.title} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }} />
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={labelStyle}>АЛМАТЫ, КЗ</span>
          <span style={labelStyle}>@SASHAVEE</span>
        </div>
      </main>
    </>
  );
}

const headingStyle: React.CSSProperties = {
  fontFamily: "'Anton', sans-serif",
  fontSize: "clamp(4rem, 13vw, 14rem)",
  fontWeight: 400,
  letterSpacing: "-0.01em",
  lineHeight: 0.95,
  color: "#fff",
  textAlign: "left",
  userSelect: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
};
