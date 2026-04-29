@AGENTS.md

# AV Studio — Rules for Claude

## Visual Review (NON-NEGOTIABLE)

After editing ANY file in `components/` or `app/`, you MUST:
1. Read check-hero.png
2. Read check-problem.png
3. Read check-process.png
4. Read check-work.png
5. Read check-pricing.png
6. Read check-contact.png

**Never say "looks good", "done", or "ready" without reading these files.**
The hook runs screenshot.mjs automatically after each edit — the files will be fresh.

---

## Design Quality Bar

Target aesthetic: Linear.app, Vercel.com — dark, minimal, premium.

Before declaring any section done, check all of these visually:

- [ ] Content is **centered horizontally** — not pushed to the left edge
- [ ] All sections have a `max-w-6xl mx-auto` container wrapper
- [ ] Minimum section padding: `py-24`
- [ ] Buttons are clearly visible — minimum `px-6 py-3.5`, rounded-full
- [ ] Text is readable — headings large, body not smaller than 14px
- [ ] Nothing looks squished or cramped
- [ ] Layout looks correct at 1440px desktop viewport

---

## Layout Rules

Every section must follow this structure:
```
<section className="px-6 md:px-16 py-24 ...">
  <div className="max-w-6xl mx-auto">
    {/* content */}
  </div>
</section>
```

Never put content directly in `<section>` without the `max-w-6xl mx-auto` wrapper.

---

## Positioning & Copy — McKinsey Framework

**Always read this before writing or editing any copy on the site:**
@knowledge-base/mckinsey-positioning.md

Key rules for copy decisions:
- Lead with **business outcome**, not AI technology
- The 5 strategic claims in that document are the backbone of every section
- Use the McKinsey numbers (40% revenue lift, 5–8x ROI, 57% of growing companies) as social proof
- Positioning: strategic partner, NOT vendor
- Pricing structure (Pilot → Growth → Partner) is already in the code — keep it aligned
- Every CTA and headline should speak to the CMO's anxiety about brand integrity and production speed

---

## Design Language

- Background: `var(--bg)` = `#0c0b09` (near-black)
- Text: `var(--fg)` = `#ede8e0` (warm off-white)
- Muted: `var(--muted)` = `#7a7268`
- Gold accent: `var(--gold)` = `#c4a46e`
- Card bg: `var(--card)` = `#272219`

Headings: large, light font-weight, generous line-height.
Animations: subtle fade+slide with Framer Motion, easeOut, no jarring effects.
