import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import ConstellationBg from "../../components/ConstellationBg/ConstellationBg";
import Button from "../../components/Button/Button";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background layers */}
      <div className="hero-bg-gradient" />
      <div className="hero-radial-glow" />
      <ConstellationBg particleCount={70} speed={0.25} />

      {/* Floating orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Content */}
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-badge-dot" />
          Global Technology Ecosystem
        </motion.div>

        <h1 className="hero-title">
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Building the Future
            </motion.span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              of <span className="hero-title-accent">Technology</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          A global technology ecosystem empowering every person, every business,
          every institution through intelligent, secure, and accessible
          innovation.
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
            <Button variant="secondary" size="lg" href="/about">
              Our Vision
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
