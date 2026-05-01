"use client";
import { useState, useEffect, useRef } from "react";

const CASE = {
  kicker: "КЕЙС 01 / ЧАТ-БОТ",
  title: "ЧАТ-БОТ ДЛЯ ПРИЁМА ЗАЯВОК — БЕЗ ИИ",
  lead: "Сценарный бот в Telegram: проводит клиента по 5 шагам, собирает данные и отдаёт менеджеру в CRM. Без нейросетей — только чёткая логика и быстрая реакция.",
  stack: ["telegram bot api", "node.js", "google sheets", "amocrm webhook"],
  blocks: [
    { label: "ЗАДАЧА", body: "Заменить форму на сайте, которую заполняли вяло. Нужен инструмент, который ведёт клиента за руку и не теряет ни одной заявки." },
    { label: "РЕШЕНИЕ", body: "Чёткий сценарий из 5 шагов с кнопками вместо ввода. Валидация телефона. Автоответ менеджера в течение 30 секунд через webhook в amoCRM." },
    { label: "РЕЗУЛЬТАТ", body: "Конверсия в заявку выросла в 3 раза. Среднее время отклика менеджера — 28 секунд. Менеджер видит лид сразу в CRM, без копипасты." },
  ],
  metrics: [
    { n: "×3", l: "конверсия в заявку" },
    { n: "28с", l: "среднее время отклика" },
    { n: "0", l: "потерянных лидов за месяц" },
    { n: "5", l: "шагов сценария" },
  ],
  dialog: [
    { from: "bot", text: "Здравствуйте! Помогу оставить заявку. Что вас интересует?" },
    { from: "bot", chips: ["Сайт", "Лендинг", "Чат-бот", "Другое"] },
    { from: "user", text: "Лендинг" },
    { from: "bot", text: "Отлично. На какую дату нужно сдать?" },
    { from: "bot", chips: ["1–2 недели", "Месяц", "Не горит"] },
    { from: "user", text: "1–2 недели" },
    { from: "bot", text: "Оставьте телефон — менеджер перезвонит в течение получаса." },
    { from: "user", text: "+7 999 123 45 67" },
    { from: "bot", text: "Принял. Заявка ушла менеджеру. Спасибо ✓" },
  ],
};

function Grain() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.18, mixBlendMode: "multiply", zIndex: 1 }} aria-hidden="true">
      <filter id="cn">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#cn)"/>
    </svg>
  );
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: {
  children: React.ReactNode; delay?: number; className?: string; as?: keyof React.JSX.IntrinsicElements;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <Tag className={className} style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(14px)", transition: "opacity 800ms cubic-bezier(.2,.7,.2,1), transform 800ms cubic-bezier(.2,.7,.2,1)" } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

function Bubble({ msg, delay }: { msg: typeof CASE.dialog[0]; delay: number }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), delay); return () => clearTimeout(t); }, [delay]);
  const s: React.CSSProperties = { opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(10px)", transition: "opacity 600ms ease, transform 600ms ease" };

  if ("chips" in msg && msg.chips) {
    return (
      <div style={{ ...s, display: "flex", flexWrap: "wrap", gap: "6px", alignSelf: "flex-start", maxWidth: "78%" }}>
        {msg.chips.map((c: string, i: number) => (
          <span key={i} style={{ fontSize: "13px", padding: "8px 12px", borderRadius: "999px", border: "1px solid var(--line)", background: "rgba(255,255,255,0.6)", color: "var(--fg-2)" }}>{c}</span>
        ))}
      </div>
    );
  }
  return (
    <div style={{
      ...s, fontSize: "15px", lineHeight: 1.4, padding: "12px 16px", borderRadius: "16px",
      maxWidth: "78%", wordWrap: "break-word",
      ...(msg.from === "bot"
        ? { background: "var(--bg-2)", color: "var(--fg)", borderBottomLeftRadius: "6px", alignSelf: "flex-start" }
        : { background: "var(--accent)", color: "var(--bg)", borderBottomRightRadius: "6px", alignSelf: "flex-end" }
      ),
    }}>
      {msg.text}
    </div>
  );
}

export default function CaseNoAI() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", fontFamily: "var(--font-sans)", minHeight: "100vh", WebkitFontSmoothing: "antialiased", position: "relative" }}>
      <Grain/>
      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", padding: "clamp(28px,6vh,56px) clamp(28px,8vw,96px) clamp(60px,10vh,120px)", maxWidth: "880px" }}>

        {/* Top */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(48px,10vh,110px)" }}>
          <BackLink/>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--fg-3)", textTransform: "uppercase" }}>{CASE.kicker}</span>
        </div>

        <Reveal as="h1" delay={120}>
          <span style={{ display: "block", fontSize: "clamp(34px,5.4vw,60px)", lineHeight: 1.02, letterSpacing: "-0.012em", fontWeight: 500, textTransform: "uppercase", textWrap: "balance" } as React.CSSProperties}>
            {CASE.title}
          </span>
        </Reveal>

        <Reveal delay={260}>
          <p style={{ marginTop: "clamp(28px,4vh,40px)", fontSize: "clamp(17px,1.6vw,20px)", lineHeight: 1.45, color: "var(--fg-2)", maxWidth: "640px" }}>
            {CASE.lead}
          </p>
        </Reveal>

        <Reveal delay={380}>
          <div style={{ marginTop: "clamp(28px,4vh,40px)", display: "flex", flexWrap: "wrap", gap: "8px 10px" }}>
            {CASE.stack.map((s, i) => (
              <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.04em", textTransform: "uppercase", padding: "6px 10px", border: "1px solid var(--line)", color: "var(--fg-2)", borderRadius: "999px" }}>{s}</span>
            ))}
          </div>
        </Reveal>

        {CASE.blocks.map((b, i) => (
          <Reveal key={i} delay={520 + i * 120}>
            <div style={{ marginTop: "clamp(64px,10vh,110px)", borderTop: "1px solid var(--line)", paddingTop: "clamp(24px,4vh,36px)", display: "grid", gridTemplateColumns: "140px 1fr", gap: "32px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--fg-3)", textTransform: "uppercase", paddingTop: "6px" }}>{b.label}</div>
              <div style={{ fontSize: "clamp(17px,1.5vw,19px)", lineHeight: 1.55, color: "var(--fg)", maxWidth: "600px" }}>{b.body}</div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={900}>
          <div style={{ marginTop: "clamp(48px,8vh,80px)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            {CASE.metrics.map((m, i) => (
              <div key={i} style={{ padding: "32px 24px 28px 0", borderRight: i < 3 ? "1px solid var(--line-soft)" : "none" }}>
                <div style={{ fontSize: "clamp(36px,4.6vw,56px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>{m.n}</div>
                <div style={{ marginTop: "14px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", color: "var(--fg-3)", textTransform: "uppercase" }}>{m.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ marginTop: "clamp(48px,8vh,80px)" }}>
          <Reveal delay={1050}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--fg-3)", textTransform: "uppercase", marginBottom: "24px" }}>Сценарий диалога</p>
          </Reveal>
          <Reveal delay={1150}>
            <div style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "28px clamp(20px,3vw,36px)", background: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "560px" }}>
              {CASE.dialog.map((m, i) => <Bubble key={i} msg={m as typeof CASE.dialog[0]} delay={1250 + i * 140}/>)}
            </div>
          </Reveal>
        </div>

      </div>
    </main>
  );
}

function BackLink() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="/portfolio"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: "10px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.08em", color: hov ? "var(--accent)" : "var(--fg-2)", fontFamily: "var(--font-mono)", textDecoration: "none", transition: "color 200ms ease" }}
    >
      <span style={{ display: "inline-block", transform: hov ? "translateX(-4px)" : "none", transition: "transform 380ms cubic-bezier(.2,.7,.2,1)" }}>←</span>
      <span>НАЗАД</span>
    </a>
  );
}
