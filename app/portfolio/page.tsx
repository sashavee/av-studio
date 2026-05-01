"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const LANDINGS = [
  { title: "AV Studio — продакшн-агентство", url: "https://www.avstudio.agency/" },
];

const BOTS = [
  { title: "Чат-бот для приёма заявок — без ИИ", href: "/portfolio/case-no-ai" },
];

function Grain() {
  return (
    <svg className="pf-grain" aria-hidden="true">
      <filter id="pf-n">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.28 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#pf-n)"/>
    </svg>
  );
}

function DotCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    const onOver = (e: MouseEvent) => {
      setHov(!!(e.target as Element).closest("a,button"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); };
  }, []);
  return <div ref={dot} className={`pf-cursor${hov ? " hov" : ""}`}/>;
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: {
  children: React.ReactNode; delay?: number; as?: keyof React.JSX.IntrinsicElements; className?: string;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <Tag className={`pf-reveal${shown ? " in" : ""} ${className}`}>{children}</Tag>
  );
}

function Accordion({ title, children, index }: { title: string; children: React.ReactNode; index: number }) {
  const [open, setOpen] = useState(false);
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number | "auto">(0);

  useEffect(() => {
    if (!inner.current) return;
    if (open) {
      const target = inner.current.scrollHeight;
      setH(target);
      const t = setTimeout(() => setH("auto"), 460);
      return () => clearTimeout(t);
    } else {
      if (inner.current) {
        setH(inner.current.scrollHeight);
        requestAnimationFrame(() => requestAnimationFrame(() => setH(0)));
      }
    }
  }, [open]);

  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center",
          gap: "22px", width: "100%", padding: "clamp(20px,3.2vh,30px) 0",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
          textTransform: "uppercase", letterSpacing: "0.02em",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-3)", letterSpacing: "0.06em", paddingTop: "4px" }}>
          {String(index).padStart(2, "0")}
        </span>
        <AccTitle>{title}</AccTitle>
        <span style={{ position: "relative", width: "14px", height: "14px", display: "inline-block" }}>
          <span style={{ position: "absolute", background: "var(--fg)", top: "50%", left: 0, right: 0, height: "1px", transform: "translateY(-50%)" }}/>
          <span style={{
            position: "absolute", background: "var(--fg)", left: "50%", top: 0, bottom: 0, width: "1px",
            transform: open ? "translateX(-50%) scaleY(0)" : "translateX(-50%)",
            opacity: open ? 0 : 1,
            transition: "transform 380ms cubic-bezier(.2,.7,.2,1), opacity 380ms ease",
          }}/>
        </span>
      </button>
      <div style={{ overflow: "hidden", height: typeof h === "number" ? h + "px" : h, transition: "height 460ms cubic-bezier(.2,.7,.2,1)" }}>
        <div ref={inner} style={{ padding: "4px 0 clamp(24px,4vh,36px) 0" }}>
          {children}
        </div>
      </div>
    </section>
  );
}

function AccTitle({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(16px,1.5vw,19px)", fontWeight: 600, letterSpacing: "0.005em", position: "relative", display: "inline-block", width: "max-content" }}
    >
      {children}
      <span style={{
        position: "absolute", left: 0, right: 0, bottom: "-3px", height: "1px",
        background: "var(--accent)", transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left center", transition: "transform 480ms cubic-bezier(.2,.7,.2,1)",
      }}/>
    </span>
  );
}

function LinkItem({ title, href, external }: { title: string; href: string; external?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "24px",
          paddingLeft: hov ? "50px" : "38px", paddingTop: "14px", paddingBottom: "14px",
          textTransform: "uppercase", letterSpacing: "0.01em",
          fontSize: "clamp(13px,1.1vw,14px)", fontWeight: 500,
          color: hov ? "var(--accent)" : "var(--fg-2)",
          position: "relative", transition: "color 320ms ease, padding-left 380ms cubic-bezier(.2,.7,.2,1)",
          textDecoration: "none",
        }}
      >
        <span style={{ position: "absolute", left: 0, top: "50%", width: "22px", height: "1px", background: hov ? "var(--accent)" : "var(--fg-3)", transform: hov ? "translateY(-50%) scaleX(1)" : "translateY(-50%) scaleX(0.6)", transformOrigin: "left center", transition: "transform 380ms cubic-bezier(.2,.7,.2,1), background 320ms ease" }}/>
        <span style={{ position: "relative", display: "inline-block" }}>
          {title}
          <span style={{ position: "absolute", left: 0, right: 0, bottom: "-2px", height: "1px", background: "var(--accent)", transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left center", transition: "transform 480ms cubic-bezier(.2,.7,.2,1)" }}/>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: hov ? "var(--accent)" : "var(--fg-3)", transform: hov ? "translate(2px,-2px)" : "none", transition: "transform 380ms cubic-bezier(.2,.7,.2,1), color 320ms ease" }}>→</span>
      </a>
    </li>
  );
}

export default function Portfolio() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", fontFamily: "var(--font-sans)", minHeight: "100vh", WebkitFontSmoothing: "antialiased", position: "relative" }}>
      <Grain/>
      <DotCursor/>
      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", padding: "clamp(48px,10vh,112px) clamp(28px,8vw,96px)", display: "flex" }}>
        <div style={{ width: "100%", maxWidth: "760px" }}>

          <Reveal as="p" delay={120} className="">
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,7.2vw,88px)", lineHeight: 0.94, letterSpacing: "-0.025em", fontWeight: 600, textTransform: "uppercase", display: "block", textWrap: "balance" } as React.CSSProperties}>
              Делаю быстро и круто.
            </span>
          </Reveal>

          <Reveal as="p" delay={260}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.4, letterSpacing: "0.02em", fontWeight: 500, textTransform: "uppercase", marginTop: "clamp(28px,4vh,40px)", color: "var(--fg-2)", display: "block" }}>
              Вот мои работы:
            </span>
          </Reveal>

          <Reveal delay={520}>
            <div style={{ marginTop: "clamp(36px,5vh,56px)", borderTop: "1px solid var(--line)" }}>
              <Accordion title="Лендинги" index={1}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {LANDINGS.map((l, i) => <LinkItem key={i} title={l.title} href={l.url} external/>)}
                </ul>
              </Accordion>
              <Accordion title="Чат-боты" index={2}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {BOTS.map((b, i) => <LinkItem key={i} title={b.title} href={b.href}/>)}
                </ul>
              </Accordion>
            </div>
          </Reveal>

        </div>
      </div>
    </main>
  );
}
