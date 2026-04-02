import { motion } from "framer-motion";

const CONTACTS = [
  {
    icon: "📸",
    platform: "Instagram",
    handle: "@redixdigital",
    cta: "Message us on IG",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    link: "https://instagram.com/redixdigital",
  },
  {
    icon: "💬",
    platform: "WhatsApp",
    handle: "+216 XX XXX XXX",
    cta: "Chat on WhatsApp",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    link: "https://wa.me/216",
  },
  {
    icon: "📞",
    platform: "Direct Call",
    handle: "Call us anytime",
    cta: "Call us directly",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
    link: "tel:+216",
  },
];

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fade = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};
const cardVar = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

export default function ContactSection({ isMobile }) {
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
          "linear-gradient(180deg, var(--dark-secondary) 0%, var(--dark-bg) 100%)",
        padding: "var(--space-6)",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(193,45,224,0.1) 0%, transparent 65%)",
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
            marginBottom: "var(--space-5)",
            fontFamily: "var(--font-primary)",
          }}
        >
          ★ Get In Touch
        </motion.span>

        <motion.h2
          variants={fade}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            letterSpacing: "-0.02em",
            color: "var(--light-text)",
            marginBottom: "var(--space-4)",
            lineHeight: 1.15,
          }}
        >
          Ready to{" "}
          <span
            style={{
              background: "var(--primary-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Start?
          </span>
        </motion.h2>

        <motion.p
          variants={fade}
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--gray-text)",
            lineHeight: 1.625,
            maxWidth: 560,
            margin: isMobile
              ? "0 auto var(--space-6)"
              : "0 auto var(--space-10)",
            fontFamily: "var(--font-primary)",
          }}
        >
          Reach out today — our team is ready to help your brand grow. 🚀
        </motion.p>

        <motion.div
          variants={wrap}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "var(--space-4)" : "var(--space-5)",
          }}
        >
          {CONTACTS.map((c, i) => (
            <motion.a
              key={i}
              variants={cardVar}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-3)",
                width: isMobile ? "calc(50% - 0.5rem)" : 230,
                minWidth: isMobile ? 140 : undefined,
                padding: isMobile
                  ? "var(--space-5) var(--space-3)"
                  : "var(--space-7) var(--space-5)",
                background: "var(--glass-bg)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: `1.5px solid ${c.color}44`,
                borderRadius: "var(--radius-xl)",
                boxShadow: `0 8px 32px ${c.glow}`,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>{c.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-lg)",
                    color: "var(--light-text)",
                    marginBottom: 4,
                  }}
                >
                  {c.platform}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-sm)",
                    color: "var(--gray-text)",
                  }}
                >
                  {c.handle}
                </div>
              </div>
              <div
                style={{
                  padding: "0.5rem 1.2rem",
                  borderRadius: "var(--radius-pill)",
                  background: `${c.color}22`,
                  border: `1px solid ${c.color}66`,
                  color: c.color,
                  fontFamily: "var(--font-primary)",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
                }}
              >
                {c.cta}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
