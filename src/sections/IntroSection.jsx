import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RedixLogo({ size = 100 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-label="Redix Logo"
    >
      <defs>
        <linearGradient
          id="lg1"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7817b6" />
          <stop offset="0.5" stopColor="#c12de0" />
          <stop offset="1" stopColor="#d65aec" />
        </linearGradient>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        stroke="url(#lg1)"
        strokeWidth="1.5"
        strokeDasharray="8 4"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="rgba(193,45,224,0.08)"
        stroke="url(#lg1)"
        strokeWidth="0.8"
      />
      <g filter="url(#glow1)">
        <path
          d="M30 32h24c5.5 0 10 4.5 10 10s-4.5 10-10 10H36l16 16"
          stroke="url(#lg1)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="50" r="3" fill="url(#lg1)" />
      </g>
    </svg>
  );
}

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  dur: Math.random() * 4 + 2,
  delay: Math.random() * 5,
}));

export default function IntroSection({ goTo, isMobile }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2700),
      setTimeout(() => setPhase(5), 4200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--dark-bg)",
      }}
    >
      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            animate={{ opacity: [0.05, 0.9, 0.05] }}
            transition={{
              duration: s.dur,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background: "white",
              width: s.size,
              height: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
          />
        ))}
      </div>

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          top: "20%",
          left: "10%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(193,45,224,0.15) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          top: "60%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            key="logo"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 200,
              mass: 0.8,
            }}
            style={{ marginBottom: "var(--space-6)", zIndex: 2 }}
          >
            <RedixLogo size={isMobile ? 72 : 100} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.p
            key="greet"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--primary-light)",
              marginBottom: "var(--space-3)",
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Hello, Partner 👋
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* REDIX title */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 220,
              mass: 0.9,
            }}
            style={{
              textAlign: "center",
              zIndex: 2,
              marginBottom: "var(--space-3)",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(4rem, 12vw, 9rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, #7817b6 0%, #c12de0 45%, #d65aec 70%, #06b6d4 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientShift 4s linear infinite",
                filter: "drop-shadow(0 0 30px rgba(193,45,224,0.4))",
              }}
            >
              REDIX
            </h1>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-base)",
                color: "var(--gray-text)",
                letterSpacing: "0.15em",
                marginTop: "var(--space-1)",
              }}
            >
              Digital Solutions
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading bar */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 2, width: 220, marginTop: "var(--space-8)" }}
          >
            <div
              style={{
                height: 2,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "linear" }}
                style={{
                  height: "100%",
                  background: "var(--primary-gradient)",
                  borderRadius: 99,
                }}
              />
            </div>
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "var(--text-xs)",
                marginTop: "var(--space-2)",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-primary)",
              }}
            >
              Preparing your experience…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-4)",
              marginTop: isMobile ? "var(--space-6)" : "var(--space-10)",
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0 12px 40px rgba(193,45,224,0.45)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goTo && goTo(1)}
              style={{
                padding: "0.9rem 2.4rem",
                borderRadius: "var(--radius-pill)",
                border: "none",
                background: "var(--primary-gradient)",
                color: "#fff",
                fontFamily: "var(--font-primary)",
                fontWeight: 700,
                fontSize: "var(--text-base)",
                letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow: "0 6px 28px rgba(193,45,224,0.35)",
              }}
            >
              Explore Our Services →
            </motion.button>

            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--gray-dark)",
                letterSpacing: "0.12em",
                fontFamily: "var(--font-primary)",
                display: isMobile ? "none" : "block",
              }}
            >
              scroll or use arrow keys
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
