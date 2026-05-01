import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфолио — AV Studio",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&f[]=jetbrains-mono@400,500&display=swap');

        :root {
          --bg:      #faf6ee;
          --bg-2:    #f0ebe0;
          --fg:      #1c1a17;
          --fg-2:    #5b554c;
          --fg-3:    #8a8378;
          --accent:  #c8291e;
          --line:    rgba(28,26,23,0.16);
          --line-soft: rgba(28,26,23,0.08);
          --font-display: "Clash Display","Inter Tight","Helvetica Neue",sans-serif;
          --font-sans:    "Satoshi","Inter Tight","Helvetica Neue",sans-serif;
          --font-mono:    "JetBrains Mono",ui-monospace,monospace;
        }

        .pf-grain {
          position: fixed; inset: 0; width: 100%; height: 100%;
          pointer-events: none; opacity: 0.22; mix-blend-mode: multiply; z-index: 1;
        }
        .pf-cursor {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px; margin: -4px 0 0 -4px;
          border-radius: 50%; background: var(--accent);
          pointer-events: none; z-index: 9999; opacity: 0.55;
          transition: width .2s ease, height .2s ease, margin .2s ease, opacity .2s ease;
          will-change: transform;
        }
        .pf-cursor.hov { width: 14px; height: 14px; margin: -7px 0 0 -7px; opacity: 0.85; }

        .pf-reveal {
          opacity: 0; transform: translateY(14px);
          transition: opacity 900ms cubic-bezier(.2,.7,.2,1), transform 900ms cubic-bezier(.2,.7,.2,1);
        }
        .pf-reveal.in { opacity: 1; transform: translateY(0); }

        ::selection { background: var(--accent); color: var(--bg); }
      `}</style>
      {children}
    </>
  );
}
