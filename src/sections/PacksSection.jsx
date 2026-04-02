import { useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

const PACKS = [
  {
    id: "launch",
    name: "Launch Pack",
    tagline: "Start with style 🚀",
    emoji: "🚀",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    features: [
      "Full brand identity",
      "Professional website",
      "8 posts / month",
      "Social media management",
      "Monthly report",
      "Tech support 5/7",
    ],
    cta: "Get Started 🚀",
  },
  {
    id: "growth",
    name: "Growth Pack",
    tagline: "Scale and evolve 📈",
    emoji: "📈",
    color: "#c12de0",
    glow: "rgba(193,45,224,0.35)",
    popular: true,
    features: [
      "Everything in Launch +",
      "Meta + Google Ads",
      "16 posts / month",
      "Promo video / month",
      "Full content strategy",
      "Weekly reports",
      "7/7 support",
    ],
    cta: "Start Growing 📈",
  },
  {
    id: "elite",
    name: "Elite Pack",
    tagline: "Dominate the market 👑",
    emoji: "👑",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    features: [
      "Everything in Growth +",
      "Custom mobile app",
      "Unlimited ad budget",
      "Full production crew",
      "AI Automation + CRM",
      "Dedicated account manager",
      "24/7 live support",
      "60-day results guarantee",
    ],
    cta: "I'm Ready to Dominate 👑",
  },
];

/* ── single card ── */
function PackCard({ pack, isSelected, isOther, onPick, isMobile }) {
  const ctaControls = useAnimationControls();

  const handleCTA = async (e) => {
    e.stopPropagation();
    await ctaControls.start({
      scale: [1, 0.86, 1.14, 1],
      transition: { duration: 0.42, times: [0, 0.28, 0.72, 1] },
    });
    window.dispatchEvent(new CustomEvent("redix:choose", { detail: pack }));
  };

  // On mobile: all cards are always fully visible (no blur/collapse)
  const effectiveIsOther = isMobile ? false : isOther;
  const effectiveIsSelected = isMobile ? true : isSelected;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 0 : 55, scale: isMobile ? 1 : 0.82 }}
      animate={{
        opacity: effectiveIsOther ? 0.22 : 1,
        scale: effectiveIsOther ? 0.85 : effectiveIsSelected ? 1.02 : 0.97,
        filter: effectiveIsOther ? "blur(7px)" : "blur(0px)",
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        opacity: { duration: 0.35 },
        filter: { duration: 0.35 },
      }}
      onClick={() =>
        !isMobile &&
        onPick(pack.id === (isSelected ? pack.id : null) ? null : pack.id)
      }
      style={{
        width: isMobile ? "82vw" : isSelected ? 420 : isOther ? 148 : 248,
        minWidth: isMobile ? "82vw" : undefined,
        scrollSnapAlign: isMobile ? "center" : undefined,
        flexShrink: 0,
        cursor: isMobile
          ? "default"
          : isOther
            ? "pointer"
            : isSelected
              ? "default"
              : "pointer",
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        background: effectiveIsSelected
          ? `linear-gradient(148deg, rgba(10,10,22,0.97) 0%, ${pack.color}14 100%)`
          : "rgba(11,10,20,0.78)",
        border: `1.5px solid ${effectiveIsSelected ? pack.color + "80" : pack.color + "32"}`,
        boxShadow: effectiveIsSelected
          ? `0 10px 55px ${pack.glow}, 0 0 0 1px ${pack.color}18, inset 0 1px 0 rgba(255,255,255,0.07)`
          : `0 4px 24px rgba(0,0,0,0.38)`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        transition:
          "width 0.52s cubic-bezier(0.34,1.4,0.64,1), border-color 0.4s, box-shadow 0.4s, background 0.4s",
        userSelect: "none",
      }}
    >
      {/* shimmer top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${pack.color}, transparent)`,
          opacity: effectiveIsSelected ? 1 : 0.35,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* popular badge */}
      {pack.popular && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: effectiveIsSelected ? 50 : 8,
            background: `linear-gradient(135deg, ${pack.color}, #ec4899)`,
            color: "#fff",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.2rem 0.65rem",
            borderRadius: 99,
            fontFamily: "var(--font-primary)",
            whiteSpace: "nowrap",
            boxShadow: `0 3px 14px ${pack.glow}`,
            transition: "right 0.4s",
            zIndex: 5,
          }}
        >
          ★ Popular
        </div>
      )}

      {/* close button — desktop only */}
      <AnimatePresence>
        {isSelected && !isMobile && (
          <motion.button
            key="close"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              onPick(null);
            }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.65)",
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── header (always visible) ── */}
      <div
        style={{
          padding: effectiveIsSelected
            ? "1.8rem 1.8rem 0.8rem"
            : effectiveIsOther
              ? "1.1rem 1rem"
              : "1.3rem 1.5rem",
        }}
      >
        <div
          style={{
            fontSize: effectiveIsSelected
              ? "2.6rem"
              : effectiveIsOther
                ? "1.6rem"
                : "2rem",
            marginBottom: 7,
            lineHeight: 1,
            transition: "font-size 0.35s",
          }}
        >
          {pack.emoji}
        </div>

        {/* name */}
        {!effectiveIsOther && (
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: effectiveIsSelected ? "1.55rem" : "1.1rem",
              color: "var(--light-text)",
              marginBottom: 5,
              transition: "font-size 0.35s",
            }}
          >
            {pack.name}
          </div>
        )}

        {/* tagline — only when not other */}
        {!effectiveIsOther && !effectiveIsSelected && (
          <div
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.76rem",
              color: pack.color,
              fontWeight: 600,
            }}
          >
            {pack.tagline}
          </div>
        )}

        {/* dimmed state — just abbreviated name */}
        {effectiveIsOther && (
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.38)",
              textAlign: "center",
              marginTop: 2,
            }}
          >
            {pack.name.split(" ")[0]}
          </div>
        )}
      </div>

      {/* ── expanded body ── */}
      <AnimatePresence>
        {effectiveIsSelected && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{ overflow: "hidden", padding: "0 1.8rem 1.8rem" }}
          >
            {/* divider */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(90deg, transparent, ${pack.color}55, transparent)`,
                marginBottom: "1rem",
              }}
            />

            {/* features */}
            <div style={{ marginBottom: "1.2rem" }}>
              {pack.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    type: "spring",
                    stiffness: 320,
                    damping: 20,
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.42rem 0",
                    borderBottom:
                      i < pack.features.length - 1
                        ? "1px solid rgba(255,255,255,0.055)"
                        : "none",
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  <span
                    style={{
                      color: pack.color,
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {f}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              animate={ctaControls}
              whileHover={{
                scale: 1.04,
                boxShadow: `0 10px 36px ${pack.glow}`,
              }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCTA}
              style={{
                width: "100%",
                padding: "0.88rem 1rem",
                borderRadius: 99,
                border: "none",
                background: `linear-gradient(135deg, ${pack.color}, #7817b6)`,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-primary)",
                cursor: "pointer",
                boxShadow: `0 6px 28px ${pack.glow}`,
              }}
            >
              {pack.cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* tap hint — resting state only (desktop) */}
      {!effectiveIsSelected && !effectiveIsOther && (
        <div
          style={{
            padding: "0 1.5rem 1rem",
            fontSize: "0.58rem",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-primary)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Tap to open
        </div>
      )}
    </motion.div>
  );
}

/* ── Section ── */
const titleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const titleLine = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function PacksSection({ isMobile }) {
  const [selected, setSelected] = useState(null);

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
        background:
          "linear-gradient(160deg,#06080e 0%,#0d0a1a 50%,#050710 100%)",
        padding: "var(--space-6) var(--space-4)",
      }}
    >
      {/* depth layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 110% 50% at 85% 20%, rgba(193,45,224,0.09) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 45% at 15% 80%, rgba(120,23,182,0.07) 0%, transparent 58%)",
        }}
      />

      {/* Selection backdrop — desktop only */}
      <AnimatePresence>
        {selected && !isMobile && (
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(3,3,10,0.5)",
              backdropFilter: "blur(3px)",
              zIndex: 1,
              cursor: "pointer",
            }}
          />
        )}
      </AnimatePresence>

      {/* header */}
      <motion.div
        variants={titleWrap}
        initial="hidden"
        animate="show"
        style={{
          textAlign: "center",
          marginBottom: isMobile ? "var(--space-5)" : "var(--space-8)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.span
          variants={titleLine}
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
          ★ Our Packages
        </motion.span>

        <motion.h2
          variants={titleLine}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem,4vw,3rem)",
            letterSpacing: "-0.02em",
            color: "var(--light-text)",
            lineHeight: 1.15,
          }}
        >
          Choose Your{" "}
          <span
            style={{
              background: "var(--primary-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Growth Plan
          </span>
        </motion.h2>

        <motion.p
          variants={titleLine}
          style={{
            marginTop: "0.7rem",
            fontSize: "var(--text-sm)",
            color: "var(--gray-dark)",
            fontFamily: "var(--font-primary)",
            letterSpacing: "0.04em",
          }}
        >
          {isMobile
            ? "Swipe to browse plans"
            : "Tap a plan to reveal its details — tap outside to close"}
        </motion.p>
      </motion.div>

      {/* cards row / snap-scroll on mobile */}
      <div
        className={isMobile ? "snap-scroll-x" : undefined}
        style={
          isMobile
            ? {
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                gap: "1rem",
                padding: "0.75rem 8vw",
                width: "100%",
                position: "relative",
                zIndex: 2,
                WebkitOverflowScrolling: "touch",
              }
            : {
                display: "flex",
                gap: selected ? "1rem" : "1.6rem",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 2,
                transition: "gap 0.45s cubic-bezier(0.34,1.4,0.64,1)",
              }
        }
      >
        {PACKS.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            isSelected={selected === pack.id}
            isOther={!!selected && selected !== pack.id}
            onPick={setSelected}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}
