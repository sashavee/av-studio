"use client";

const items = [
  "Catalogue Shot","Product Reveal","Lifestyle Video","Hero Image",
  "Social Ad","Flat Lay","Detail Shot","Explainer","Launch Video",
  "Seasonal Campaign","Voiceover","Brand Content","Hero Video","Lifestyle Photo",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="py-4 overflow-hidden border-y" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
      <div className="relative">
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6rem", background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "6rem", background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div className="marquee-track flex gap-0 w-max">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-[11px] tracking-[0.16em] uppercase whitespace-nowrap" style={{ color: "var(--muted)" }}>
              {item}
              <span style={{ color: "var(--border)", fontSize: "6px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
