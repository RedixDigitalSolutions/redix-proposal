import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Don't render on touch/pointer-coarse devices (phones, tablets)
const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const visibleRef = useRef(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 300, damping: 26, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 300, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      const isClickable = !!e.target.closest(
        'a, button, [role="button"], [data-cursor], label, select, input',
      );
      setHovering(isClickable);
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  if (isTouch) return null;

  return (
    <>
      {/* Exact dot — zero lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          x: mx,
          y: my,
          marginLeft: -4,
          marginTop: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--primary-light)",
          mixBlendMode: "difference",
        }}
        animate={{ scale: hovering ? 2.4 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 28 }}
      />

      {/* Trailing ring — spring physics */}
      <motion.div
        initial={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          opacity: 0,
        }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          marginLeft: hovering ? -26 : -16,
          marginTop: hovering ? -26 : -16,
          opacity: visible ? 0.65 : 0,
          borderColor: hovering
            ? "rgba(193,45,224,0.95)"
            : "rgba(193,45,224,0.55)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: "none",
          x: sx,
          y: sy,
          borderRadius: "50%",
          border: "1.5px solid rgba(193,45,224,0.55)",
        }}
      />
    </>
  );
}
