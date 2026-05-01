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

  const bg = `radial-gradient(ellipse 35% 40% at ${mouse.x}% ${mouse.y}%, rgba(180,40,20,0.13) 0%, transparent 100%), #f2ede4`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
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
        {/* Big heading */}
        <h1 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(3.5rem, 9vw, 10rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 0.95,
          color: "#1a1714",
          textTransform: "uppercase",
          marginBottom: "clamp(3rem, 7vw, 7rem)",
        }}>
          МОИ<br />РАБОТЫ
        </h1>

        {/* Two columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 6vw, 8rem)",
          alignItems: "start",
        }}>

          {/* Лендинги */}
          <div>
            <p style={categoryLabel}>Лендинги</p>
            <div>
              {landings.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={itemStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,23,20,0.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1a1714"; }}
                >
                  {l.title}
                </a>
              ))}
            </div>
          </div>

          {/* Чат-боты */}
          <div>
            <p style={categoryLabel}>Чат-боты</p>
            <div>
              {bots.map((b, i) => (
                <a
                  key={i}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={itemStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,23,20,0.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1a1714"; }}
                >
                  {b.title}
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

const categoryLabel: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(26,23,20,0.4)",
  marginBottom: "1rem",
};

const itemStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Anton', sans-serif",
  fontSize: "clamp(1.5rem, 3.5vw, 4rem)",
  fontWeight: 400,
  letterSpacing: "-0.01em",
  lineHeight: 1,
  color: "#1a1714",
  textTransform: "uppercase",
  padding: "0.6rem 0",
  borderTop: "1px solid rgba(26,23,20,0.15)",
  transition: "color 0.15s",
};
