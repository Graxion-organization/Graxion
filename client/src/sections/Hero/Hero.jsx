import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Hexagon, Box, Triangle, Circle, Code2 } from "lucide-react";
import Button from "../../components/Button/Button";
import "./Hero.css";

export default function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Powerful 3D Dive-in Scroll Animations
  const bgRotateX = useTransform(scrollYProgress, [0, 1], ["0deg", "60deg"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Text splitting effect
  const titleLeftX = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);
  const titleRightX = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(15px)"]);

  // Icons flying towards camera (scale up heavily)
  const iconScale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const iconOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="hero" id="hero" ref={containerRef} style={{ perspective: "1000px" }}>
      {/* Background layers */}
      <div className="hero-bg-gradient" />
      <motion.div 
        className="hero-grid-bg" 
        style={{ 
          scale: bgScale, 
          rotateX: bgRotateX, 
          y: bgY,
          transformOrigin: "bottom center" 
        }} 
      />
      <div className="hero-radial-glow" />

      {/* Floating Animated Language Elements */}
      <motion.div className="hero-animated-bg-elements" style={{ scale: iconScale, opacity: iconOpacity }}>
        <motion.div 
          className="lang-badge-icon hero-bg-icon-1"
          animate={{ y: [0, -30, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          React
        </motion.div>
        
        <motion.div 
          className="lang-badge-icon hero-bg-icon-2"
          animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          Python
        </motion.div>
        
        <motion.div 
          className="lang-badge-icon hero-bg-icon-3"
          animate={{ y: [0, -50, 0], x: [0, 30, 0], rotate: [-10, 0, -10] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          Go
        </motion.div>
        
        <motion.div 
          className="lang-badge-icon hero-bg-icon-4"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Rust
        </motion.div>

        <motion.div 
          className="lang-badge-icon hero-bg-icon-5"
          animate={{ y: [0, 20, 0], x: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          Node.js
        </motion.div>
      </motion.div>

      {/* Floating orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      {/* Content */}
      <motion.div 
        className="hero-content" 
        style={{ opacity: textOpacity, filter: contentBlur }}
      >
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sparkles size={14} className="hero-badge-icon" />
          <span>Introducing Graxion Flow</span>
        </motion.div>

        <h1 className="hero-title" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.span style={{ display: "block", overflow: "hidden", paddingBottom: "10px", x: titleLeftX }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Build the Future.
            </motion.span>
          </motion.span>
          <motion.span style={{ display: "block", overflow: "hidden", paddingBottom: "10px", x: titleRightX }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              This is <span className="hero-title-accent">Graxion Flow.</span>
            </motion.span>
          </motion.span>
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Automate your YouTube channel, manage social media comments, schedule Shorts, and scale your workflows seamlessly with AI.
        </motion.p>

        <div className="hero-cta-group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              href="#ecosystem"
            >
              Explore Our Ecosystem
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button variant="ghost" size="lg" href="/about">
              Read the Vision
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator instead of mockup */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: textOpacity }}
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>

      {/* Overlay to fade bottom */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
