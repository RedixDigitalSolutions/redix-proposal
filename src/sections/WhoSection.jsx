import { motion } from "framer-motion";

const STATS = [
  {
    num: "100+",
    label: "Projects Delivered",
    sub: "Real results, every time",
    color: "#c12de0",
  },
  {
    num: "50+",
    label: "Happy Clients",
    sub: "Brands that trust us",
    color: "#06b6d4",
  },
  {
    num: "3+",
    label: "Years of Experience",
    sub: "In the digital field",
    color: "#ec4899",
  },
  {
    num: "∞",
    label: "Unlimited Creativity",
    sub: "No cap on innovation",
    color: "#f59e0b",
  },
];

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const line = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};
const cardVar = {
  hidden: { opacity: 0, y: 45, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 18 },
  },
};
const gridVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function WhoSection({ goTo, isMobile }) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "linear-gradient(160deg,#08080f 0%,#0d0a18 55%,#060a12 100%)",
        padding: "var(--space-6)",
      }}
    >
      {/* ── depth layer 1: far-back corner wash ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 130% 60% at 15% 85%, rgba(120,23,182,0.16) 0%, transparent 58%)",
        }}
      />

      {/* ── depth layer 2: central breathing orb ── */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.14, 0.28, 0.14] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 750,
          height: 750,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(193,45,224,0.11) 0%, transparent 62%)",
          pointerEvents: "none",
        }}
      />

      {/* ── depth layer 3: cyan accent bottom-right ── */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.13, 0.06] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          bottom: "2%",
          right: "4%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── thin vertical top line ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1,
          height: 90,
          background:
            "linear-gradient(to bottom, transparent, rgba(193,45,224,0.55))",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={wrap}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: "var(--container-max)",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "0" : undefined,
        }}
      >
        {/* badge */}
        <motion.span
          variants={line}
          style={{
            display: "inline-block",
            fontSize: "var(--text-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--primary-light)",
            background: "rgba(193,45,224,0.1)",
            border: "1px solid rgba(193,45,224,0.25)",
            borderRadius: "var(--radius-pill)",
            padding: "0.3rem 1rem",
            marginBottom: "var(--space-5)",
            fontFamily: "var(--font-primary)",
          }}
        >
          ★ Our Identity
        </motion.span>

        {/* heading */}
        <motion.h2
          variants={line}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem,5vw,4rem)",
            letterSpacing: "-0.02em",
            color: "var(--light-text)",
            marginBottom: "var(--space-5)",
            lineHeight: 1.15,
          }}
        >
          REDIX —{" "}
          <span
            style={{
              background: "var(--primary-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Who We Are
          </span>
        </motion.h2>

        {/* body */}
        <motion.p
          variants={line}
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--gray-text)",
            lineHeight: 1.625,
            maxWidth: isMobile ? "100%" : 680,
            margin: isMobile ? "0 0 var(--space-5)" : "0 auto var(--space-8)",
            fontFamily: "var(--font-primary)",
          }}
        >
          We are{" "}
          <strong style={{ color: "var(--primary-light)" }}>
            Redix Digital Solutions
          </strong>{" "}
          — a team of experts in digital marketing, web design &amp; video
          production. Our mission: help every business grow and reach the next
          level. 🚀
        </motion.p>

        {/* stats grid */}
        <motion.div
          variants={gridVar}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(auto-fit,minmax(180px,1fr))",
            gap: isMobile ? "var(--space-3)" : "var(--space-5)",
            maxWidth: isMobile ? "100%" : 860,
            margin: isMobile ? "0 0 var(--space-5)" : "0 auto var(--space-9)",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              variants={cardVar}
              whileHover={{
                y: -10,
                scale: 1.06,
                boxShadow: `0 20px 50px ${s.color}30`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: "1px solid var(--glass-border)",
                borderTop: `2.5px solid ${s.color}`,
                borderRadius: "var(--radius-lg)",
                padding: isMobile
                  ? "var(--space-4) var(--space-3)"
                  : "var(--space-6) var(--space-4)",
                boxShadow: `0 4px 28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* inner top glow wash */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 56,
                  background: `linear-gradient(to bottom, ${s.color}14, transparent)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem,4vw,3rem)",
                  background: `linear-gradient(135deg,${s.color},rgba(255,255,255,0.85))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "var(--space-1)",
                  position: "relative",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-primary)",
                  fontWeight: 600,
                  fontSize: "var(--text-base)",
                  color: "var(--light-text)",
                  position: "relative",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--gray-dark)",
                  marginTop: 2,
                  position: "relative",
                }}
              >
                {s.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={line}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.65rem",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 14px 44px rgba(193,45,224,0.42)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goTo && goTo(2)}
            style={{
              padding: "0.9rem 2.5rem",
              borderRadius: "var(--radius-pill)",
              border: "1px solid rgba(193,45,224,0.38)",
              background:
                "linear-gradient(135deg,rgba(193,45,224,0.14),rgba(120,23,182,0.18))",
              color: "var(--light-text)",
              fontFamily: "var(--font-primary)",
              fontWeight: 700,
              fontSize: "var(--text-base)",
              letterSpacing: "0.04em",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              boxShadow:
                "0 4px 22px rgba(193,45,224,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            Explore Our Services →
          </motion.button>
          <motion.span
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--gray-dark)",
              fontFamily: "var(--font-primary)",
              letterSpacing: "0.1em",
            }}
          >
            scroll or press ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
