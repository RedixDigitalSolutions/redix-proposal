import { useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { icon: "🎬", label: "Video Shooting", color: "#c12de0" },
  { icon: "✂️", label: "Video Editing", color: "#d65aec" },
  { icon: "📱", label: "Social Media", color: "#06b6d4" },
  { icon: "🎨", label: "Graphic Design", color: "#ec4899" },
  { icon: "📣", label: "Meta Ads", color: "#3b82f6" },
  { icon: "🌐", label: "Web Dev", color: "#10b981" },
  { icon: "📲", label: "Mobile App", color: "#f59e0b" },
  { icon: "📸", label: "Photography", color: "#c12de0" },
  { icon: "✍️", label: "Content Creation", color: "#06b6d4" },
  { icon: "🔍", label: "SEO", color: "#ec4899" },
  { icon: "🤖", label: "AI Automation", color: "#7817b6" },
  { icon: "📊", label: "Strategy", color: "#d65aec" },
];

/* unique float params per index */
const F = SKILLS.map((_, i) => ({
  y: [0, -(6 + (i % 5) * 2.4), 3 + (i % 3) * 1.2, 0],
  rot: [0, i % 2 === 0 ? 2.5 : -2.5, 0],
  dur: 3.0 + (i % 7) * 0.32,
  del: i * 0.21,
}));

function SkillCard({ skill, index, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const f = F[index];
  const circleSize = isMobile ? 82 : 106;

  return (
    /* ── entrance wrapper ── */
    <motion.div
      initial={{ opacity: 0, scale: 0.45, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.055,
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      style={{ position: "relative" }}
    >
      {/* ── autonomous float wrapper ── */}
      <motion.div
        animate={{ y: f.y, rotate: f.rot }}
        transition={{
          repeat: Infinity,
          duration: f.dur,
          delay: f.del,
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 1],
        }}
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── outer pulse ring ── */}
        <motion.div
          animate={{ scale: [1, 1.55, 1], opacity: [0.28, 0, 0.28] }}
          transition={{
            repeat: Infinity,
            duration: f.dur * 1.5,
            delay: f.del + 1.1,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            inset: -9,
            borderRadius: "50%",
            border: `1.5px solid ${skill.color}`,
            pointerEvents: "none",
          }}
        />

        {/* ── mid accent ring (offset timing) ── */}
        <motion.div
          animate={{ scale: [1, 1.28, 1], opacity: [0.15, 0, 0.15] }}
          transition={{
            repeat: Infinity,
            duration: f.dur * 0.9,
            delay: f.del + 0.4,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `1px solid ${skill.color}70`,
            pointerEvents: "none",
          }}
        />

        {/* ── card body ── */}
        <motion.div
          animate={{
            boxShadow: hovered
              ? `0 0 36px ${skill.color}70, 0 8px 28px rgba(0,0,0,0.45), inset 0 0 24px ${skill.color}10`
              : `0 4px 22px rgba(0,0,0,0.3), 0 0 10px ${skill.color}22`,
            background: hovered ? `${skill.color}1a` : "rgba(10,10,20,0.72)",
            borderColor: hovered ? skill.color : `${skill.color}48`,
          }}
          transition={{ duration: 0.22 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            width: circleSize,
            height: circleSize,
            borderRadius: "50%",
            border: `1.5px solid ${skill.color}48`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            cursor: "default",
            userSelect: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* top shine */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "18%",
              right: "18%",
              height: "38%",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
              borderRadius: "0 0 50% 50%",
              pointerEvents: "none",
            }}
          />

          <motion.span
            animate={{ scale: hovered ? 1.25 : 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 14 }}
            style={{ fontSize: isMobile ? "1.35rem" : "1.75rem" }}
          >
            {skill.icon}
          </motion.span>

          <span
            style={{
              fontSize: isMobile ? "0.5rem" : "0.56rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: hovered ? skill.color : "rgba(255,255,255,0.62)",
              fontFamily: "var(--font-primary)",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: isMobile ? 58 : 74,
              transition: "color 0.22s",
            }}
          >
            {skill.label}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ── */
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fade = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function SkillsSection({ isMobile }) {
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
          "linear-gradient(160deg,#08080f 0%,#0c0d1a 55%,#060810 100%)",
        padding: "var(--space-4) var(--space-6)",
      }}
    >
      {/* depth layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 100% 55% at 80% 15%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.07, 0.16, 0.07] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(193,45,224,0.09) 0%, transparent 62%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 10% 90%, rgba(120,23,182,0.07) 0%, transparent 55%)",
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
        }}
      >
        <motion.span
          variants={fade}
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
            marginBottom: "var(--space-4)",
            fontFamily: "var(--font-primary)",
          }}
        >
          ★ What We Do
        </motion.span>

        <motion.h2
          variants={fade}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2rem,4.5vw,3.5rem)",
            letterSpacing: "-0.02em",
            color: "var(--light-text)",
            marginBottom: "var(--space-2)",
            lineHeight: 1.15,
          }}
        >
          Our{" "}
          <span
            style={{
              background: "var(--primary-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Core Services
          </span>
        </motion.h2>

        <motion.p
          variants={fade}
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--gray-dark)",
            maxWidth: 520,
            margin: "0 auto var(--space-7)",
            fontFamily: "var(--font-primary)",
            letterSpacing: "0.04em",
          }}
        >
          Every bubble is a service we master — hover to feel the energy.
        </motion.p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "1rem" : "1.8rem",
            maxWidth: isMobile ? "100%" : 820,
            margin: "0 auto",
          }}
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} isMobile={isMobile} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
