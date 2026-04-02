import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function CongratsModal({ pack, onClose }) {
  useEffect(() => {
    if (!pack) return;
    confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 }, colors: ["#c12de0", "#7817b6", "#06b6d4", "#ec4899", "#f59e0b"] });
  }, [pack]);

  return (
    <AnimatePresence>
      {pack && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.7, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
              border: "1.5px solid var(--glass-border)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 24px 80px rgba(193,45,224,0.35)",
              padding: "2.5rem 2rem",
              maxWidth: 480,
              width: "100%",
              textAlign: "center",
            }}
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: "3.5rem", marginBottom: "1rem" }}
            >
              🎉
            </motion.div>

            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "var(--light-text)",
              marginBottom: "0.5rem", letterSpacing: "-0.02em",
            }}>
              Congratulations!
            </h2>

            <p style={{
              fontFamily: "var(--font-primary)", fontSize: "1rem",
              color: "var(--primary-light)", fontWeight: 600, marginBottom: "1rem",
            }}>
              You chose{" "}
              <strong style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {pack.name}
              </strong>
              {" "}— great decision! 💪
            </p>

            <p style={{
              fontFamily: "var(--font-primary)", fontSize: "0.875rem",
              color: "var(--gray-text)", lineHeight: 1.65, marginBottom: "2rem",
            }}>
              You'll get an exclusive service unlike any other agency.
              Our team will reach out shortly. ✨
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <motion.a
                href="https://instagram.com/redixdigital"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "block", padding: "0.85rem 1.5rem",
                  borderRadius: "var(--radius-pill)",
                  background: "linear-gradient(135deg, #ec4899, #c12de0)",
                  color: "#fff", fontWeight: 700, fontSize: "0.875rem",
                  fontFamily: "var(--font-primary)", textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(236,72,153,0.35)",
                  cursor: "pointer",
                }}
              >
                Message us on Instagram
              </motion.a>

              <motion.a
                href="https://wa.me/216"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "block", padding: "0.85rem 1.5rem",
                  borderRadius: "var(--radius-pill)",
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  color: "#fff", fontWeight: 700, fontSize: "0.875rem",
                  fontFamily: "var(--font-primary)", textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(16,185,129,0.35)",
                  cursor: "pointer",
                }}
              >
                Chat on WhatsApp
              </motion.a>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--glass-border)",
                  background: "transparent",
                  color: "var(--gray-text)",
                  fontWeight: 600, fontSize: "0.875rem",
                  fontFamily: "var(--font-primary)",
                  cursor: "pointer",
                }}
              >
                ✕ Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
