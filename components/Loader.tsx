"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "var(--bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Logo size={32} />
            <span style={{
              fontFamily: "var(--font-fraunces), sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--fg)",
              letterSpacing: "0.05em",
            }}>
              AV STUDIO
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
