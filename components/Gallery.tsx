"use client";
import { useState, useEffect } from "react";

const images = [
  "/portfolio/1.jpg",
  "/portfolio/2.jpg",
  "/portfolio/3.jpg",
  "/portfolio/4.jpg",
  "/portfolio/5.jpg",
  "/portfolio/6.jpg",
  "/portfolio/7.jpg",
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 650);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      height: "100vh",
      background: "var(--gold)",
      padding: "clamp(1.25rem, 5.5vw, 5.5rem)",
    }}>
      <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
        {images.map((src, i) => (
          <div
            key={src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.18s ease",
              zIndex: i === current ? 1 : 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#2a2622",
            }}
          />
        ))}
      </div>
    </section>
  );
}
