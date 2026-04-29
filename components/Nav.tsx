"use client";
import Logo from "./Logo";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ pointerEvents: "none" }}>
      <div style={{
        maxWidth: "100%",
        padding: "1.4rem clamp(1.5rem, 3vw, 3rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a
          href="#"
          style={{
            display: "flex", alignItems: "center", gap: "0.65rem",
            textDecoration: "none", pointerEvents: "all",
          }}
        >
          <Logo size={24} />
          <span style={{
            fontFamily: "var(--font-fraunces), sans-serif",
            fontSize: "1.1rem", fontWeight: 700,
            color: "var(--fg)", letterSpacing: "0.05em",
          }}>
            AV STUDIO
          </span>
        </a>

        <a
          href="#contact"
          style={{
            fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase" as const,
            padding: "0.4rem 1.1rem",
            borderRadius: "9999px", border: "1px solid var(--fg)",
            color: "var(--fg)", textDecoration: "none",
            transition: "all 0.2s", background: "transparent",
            pointerEvents: "all",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--fg)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
          }}
        >
          Let's talk
        </a>
      </div>
    </nav>
  );
}
