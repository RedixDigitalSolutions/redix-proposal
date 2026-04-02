import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import confetti from "canvas-confetti";
import IntroSection from "./sections/IntroSection";
import WhoSection from "./sections/WhoSection";
import SkillsSection from "./sections/SkillsSection";
import PacksSection from "./sections/PacksSection";
import ContactSection from "./sections/ContactSection";
import CongratsModal from "./components/CongratsModal";
import CustomCursor from "./components/CustomCursor";
import useIsMobile from "./hooks/useIsMobile";

const PAGES = [
  { id: "intro", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "packages", label: "Packages" },
  { id: "contact", label: "Contact" },
];

const SECTION_COMPONENTS = [
  IntroSection,
  WhoSection,
  SkillsSection,
  PacksSection,
  ContactSection,
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.9 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 1.06 }),
};

export default function App() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [chosenPack, setChosenPack] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [flashColor, setFlashColor] = useState(null);
  const isAnimating = useRef(false);
  const shakeControls = useAnimationControls();
  const isMobile = useIsMobile();

  const goTo = useCallback(
    (next) => {
      if (
        isAnimating.current ||
        next === page ||
        next < 0 ||
        next >= PAGES.length
      )
        return;
      setDirection(next > page ? 1 : -1);
      setPage(next);
      isAnimating.current = true;
    },
    [page],
  );

  // Wheel → next / prev slide
  useEffect(() => {
    let last = 0;
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 900) return;
      last = now;
      goTo(page + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [page, goTo]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) goTo(page + (dy > 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [page, goTo]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goTo(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, goTo]);

  // Pack selection
  useEffect(() => {
    const handler = (e) => {
      setChosenPack(e.detail);
      setShowCongrats(true);
      setFlashColor(e.detail.color);
      setTimeout(() => setFlashColor(null), 700);
      shakeControls.start({
        x: [0, -10, 10, -6, 6, -3, 3, 0],
        transition: { duration: 0.5 },
      });
      const end = Date.now() + 3500;
      const colors = [
        "#c12de0",
        "#d65aec",
        "#7817b6",
        "#fbbf24",
        "#06b6d4",
        "#fff",
      ];
      (function frame() {
        if (Date.now() > end) return;
        confetti({
          spread: 360,
          ticks: 80,
          zIndex: 9999,
          particleCount: 50,
          startVelocity: 30,
          origin: { x: Math.random() * 0.3, y: Math.random() - 0.2 },
          colors,
        });
        confetti({
          spread: 360,
          ticks: 80,
          zIndex: 9999,
          particleCount: 50,
          startVelocity: 30,
          origin: { x: 0.7 + Math.random() * 0.3, y: Math.random() - 0.2 },
          colors,
        });
        requestAnimationFrame(frame);
      })();
    };
    window.addEventListener("redix:choose", handler);
    return () => window.removeEventListener("redix:choose", handler);
  }, [shakeControls]);

  const SectionComponent = SECTION_COMPONENTS[page];

  return (
    <>
      <CustomCursor />

      {/* Screen flash */}
      <AnimatePresence>
        {flashColor && (
          <motion.div
            key="flash"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9990,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at center, ${flashColor}70 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        )}
      </AnimatePresence>

      {/* Full-screen container — no overflow */}
      <motion.div
        animate={shakeControls}
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          background: "var(--dark-bg)",
        }}
      >
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
          onExitComplete={() => {
            isAnimating.current = false;
          }}
        >
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 26,
              mass: 0.85,
            }}
            style={{ position: "absolute", inset: 0 }}
          >
            <SectionComponent goTo={goTo} isMobile={isMobile} />
          </motion.div>
        </AnimatePresence>

        {/* Side dot navigation — right side on desktop, bottom-center on mobile */}
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            ...(isMobile
              ? {
                  bottom: 14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  flexDirection: "row",
                  gap: 10,
                }
              : {
                  right: 28,
                  top: "50%",
                  transform: "translateY(-50%)",
                  flexDirection: "column",
                  gap: 10,
                }),
          }}
        >
          {PAGES.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.9 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              title={p.label}
              style={{
                width: i === page ? (isMobile ? 26 : 10) : 6,
                height: i === page ? (isMobile ? 10 : 26) : 6,
                borderRadius: i === page ? 5 : "50%",
                background:
                  i === page
                    ? "var(--primary-color)"
                    : "rgba(255,255,255,0.22)",
                border: "none",
                padding: 0,
                boxShadow: i === page ? "0 0 14px var(--primary-glow)" : "none",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          ))}
        </div>

        {/* Page counter — bottom left (hidden on mobile) */}
        <motion.div
          key={page + "-label"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: isMobile ? 0 : 0.4, y: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          style={{
            position: "fixed",
            left: 28,
            bottom: 28,
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gray-dark)",
            fontFamily: "var(--font-primary)",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          {String(page + 1).padStart(2, "0")} /{" "}
          {String(PAGES.length).padStart(2, "0")} — {PAGES[page].label}
        </motion.div>

        {/* Down arrow — hidden on mobile (dots nav + swipe suffice) */}
        {page < PAGES.length - 1 && !isMobile && (
          <div
            style={{
              position: "fixed",
              bottom: 22,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <motion.button
              onClick={() => goTo(page + 1)}
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.5, color: "var(--primary-light)" }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(193,45,224,0.5)",
                fontSize: 18,
                zIndex: 1000,
                lineHeight: 1,
                pointerEvents: "all",
              }}
            >
              ↓
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Congrats modal — outside shake container so it's stable */}
      <AnimatePresence>
        {showCongrats && (
          <CongratsModal
            pack={chosenPack}
            onClose={() => setShowCongrats(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
