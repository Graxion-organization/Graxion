import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./WhyGraxion.css";

export default function WhyGraxion() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="whygraxion section" id="why-graxion" style={{ position: "relative", overflow: "hidden" }}>
      
      {/* Drifting Background Orb */}
      <motion.div 
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        animate={{
          x: ["-50%", "-30%", "-70%", "-50%"],
          y: ["0%", "10%", "-10%", "0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="whygraxion-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="whygraxion-overline" variants={lineVariants}>
            <span>Why Graxion</span>
          </motion.div>

          <h2 className="whygraxion-title">
            <motion.div variants={lineVariants} style={{ display: "inline-block" }}>
              Technology should never be built simply because it is possible.
            </motion.div>
            <br/>
            <motion.div variants={lineVariants} style={{ display: "inline-block" }}>
              <span className="text-gradient">It should be built because it makes life better.</span>
            </motion.div>
          </h2>

          <div className="whygraxion-body">
            <motion.p className="whygraxion-text" variants={lineVariants}>
              We don't build products for trends. We build products for decades.
              Our ambition is to build technology that people <em>rely on</em>,
              businesses <em>grow with</em>, students <em>learn from</em>,
              developers <em>create on</em>, and future generations are{" "}
              <em>proud to inherit</em>.
            </motion.p>
            
            <motion.p className="whygraxion-text" variants={lineVariants}>
              We dream of a world where technology empowers rather than excludes,
              where innovation is accessible rather than limited, and where trust
              is earned through consistent action.
            </motion.p>

            <motion.p className="whygraxion-signature" variants={lineVariants}>— The Graxion Book</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
