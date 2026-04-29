"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--border)",
    background: "#f7f5f1",
    color: "var(--fg)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  const labelStyle = {
    display: "block",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
    marginBottom: "0.35rem",
  };

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "var(--gold)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1400px", width: "100%", margin: "0 auto", padding: "0 clamp(1.5rem, 3vw, 3rem)" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          background: "var(--bg)",
          borderRadius: "1.5rem",
          padding: "clamp(3rem, 6vw, 5rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(2rem, 4vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Left: heading + description */}
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Start a project
          </p>
          <h2 style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: "1.25rem",
          }}>
            Tell us about your brand. We&apos;ll take it from there.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Share a bit about what you need — we respond within one business day with a clear next step. No lengthy calls, no decks, no commitments.
          </p>
        </div>

        {/* Right: form */}
        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 0" }}>
            <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "2rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.5rem" }}>We&apos;ve got it.</p>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Expect a reply within one business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input name="name" type="text" placeholder="Your name" required style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--fg)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--border)"; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input name="company" type="text" placeholder="Brand name" style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--fg)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--border)"; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input name="email" type="email" placeholder="you@brand.com" required style={inputStyle}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--fg)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--border)"; }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>What do you need?</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Product type, formats you're thinking about, timeline..."
                required
                style={{ ...inputStyle, resize: "none" }}
                onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--fg)"; }}
                onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--border)"; }}
              />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  padding: "0.85rem 2.5rem",
                  borderRadius: "9999px",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.25s, color 0.25s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--fg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)"; }}
              >
                Send brief
              </button>
            </div>
          </form>
        )}
      </motion.div>
      </div>
    </section>
  );
}
