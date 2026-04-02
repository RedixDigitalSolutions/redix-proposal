import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const readyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const readyItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

export default function ReadySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "var(--section-pad) var(--space-6)",
        background:
          "linear-gradient(180deg, var(--dark-tertiary) 0%, var(--dark-elevated) 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1,
          height: 80,
          background:
            "linear-gradient(to bottom, var(--primary-color), transparent)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse, rgba(193,45,224,0.15) 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-8)",
          }}
        >
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
              style={{
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: `14px solid ${i === 1 ? "var(--primary-color)" : "rgba(193,45,224,0.4)"}`,
              }}
            />
          ))}
        </div>

        <motion.div
          variants={readyVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2
            variants={readyItem}
            style={{
              fontFamily: "var(--font-arabic)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "var(--light-text)",
              lineHeight: 1.2,
              marginBottom: "var(--space-5)",
            }}
          >
            مستعد باش تكبّر{" "}
            <span
              style={{
                background: "var(--primary-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              business
            </span>{" "}
            تاعك؟ 🚀
          </motion.h2>

          <motion.p
            variants={readyItem}
            style={{
              fontFamily: "var(--font-arabic)",
              fontSize: "var(--text-lg)",
              color: "var(--gray-text)",
              lineHeight: 1.625,
              maxWidth: 600,
              margin: "0 auto var(--space-10)",
            }}
          >
            وصّلنا كلاي للـ next level بـ stratégie واضحة، محتوى prémium، و
            résultats حقيقية.{" "}
            <span style={{ color: "var(--secondary-color)", fontWeight: 600 }}>
              الدور تاعك جاء ✨
            </span>
          </motion.p>

          <motion.div variants={readyItem}>
            <motion.a
              href="#packs"
              whileHover={{
                scale: 1.07,
                y: -4,
                boxShadow: "var(--shadow-primary-lg)",
              }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "1rem 2.5rem",
                borderRadius: "var(--radius-pill)",
                background: "var(--primary-gradient)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "var(--text-base)",
                fontFamily: "var(--font-arabic)",
                boxShadow: "var(--shadow-primary)",
                textDecoration: "none",
              }}
            >
              اكتشف الباكات الحصرية 👇
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
