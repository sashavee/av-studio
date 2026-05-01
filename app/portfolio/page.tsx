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

  // tall ellipse: 40% wide, 33% tall (= 1/3 screen height)
  const bg = `radial-gradient(ellipse 40% 33% at ${mouse.x}% ${mouse.y}%, rgba(180,40,20,0.14) 0%, transparent 100%), #f2ede4`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #f2ede4; }
        a { text-decoration: none; }
      `}</style>
      <main
        ref={ref}
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          padding: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        {/* Two columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 6vw, 8rem)",
          alignItems: "start",
        }}>

          {/* Лендинги */}
          <div>
            <h2 style={sectionHeading}>Лендинги</h2>
            <div>
              {landings.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={itemStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,23,20,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1a1714"; }}
                >
                  {l.title}
                </a>
              ))}
              <div style={{ borderTop: "1px solid rgba(26,23,20,0.15)" }} />
            </div>
          </div>

          {/* Чат-боты */}
          <div>
            <h2 style={sectionHeading}>Чат-боты</h2>
            <div>
              {bots.map((b, i) => (
                <a
                  key={i}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={itemStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,23,20,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1a1714"; }}
                >
                  {b.title}
                </a>
              ))}
              <div style={{ borderTop: "1px solid rgba(26,23,20,0.15)" }} />
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

const sectionHeading: React.CSSProperties = {
  fontFamily: "'Russo One', sans-serif",
  fontSize: "clamp(3rem, 8vw, 9rem)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  color: "#1a1714",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const itemStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "system-ui, sans-serif",
  fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
  fontWeight: 400,
  color: "#1a1714",
  padding: "0.75rem 0",
  borderTop: "1px solid rgba(26,23,20,0.15)",
  transition: "color 0.15s",
};
