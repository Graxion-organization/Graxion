import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Activity } from "lucide-react";
import Button from "../../components/Button/Button";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./HomeFeatured.css";

export default function HomeFeatured() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Simulated live latency
  const [latency, setLatency] = useState(24);
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => (prev === 24 ? 22 : prev === 22 ? 27 : 24));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-featured section" id="featured" ref={sectionRef}>
      <div className="container">
        <SectionHeader
          overline="Available Today"
          title="Start Building the Future"
          subtitle="Experience the power of the Graxion ecosystem with our flagship products, designed for immediate impact."
        />

        <motion.div
          className="home-featured-grid"
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Content */}
          <div className="home-featured-content">
            <span className="home-featured-label">Featured: Graxion Flow</span>
            <h3 className="home-featured-title">
              Omnichannel Automation that <span className="text-gradient">Scales</span>
            </h3>
            <p className="home-featured-desc">
              Deploy advanced AI agents across YouTube, WhatsApp, Instagram, and Telegram. Automate customer support, schedule YouTube Shorts, moderate comments, and close deals effortlessly.
            </p>

            <div className="home-featured-list">
              {[
                "YouTube Comment Automation & Moderation",
                "WhatsApp & Instagram DM Copilots",
                "Drag-and-Drop Visual Flow Builder",
                "Secure Enterprise API Integrations",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="home-featured-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <CheckCircle2 size={18} className="home-featured-icon" />
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="home-featured-cta">
              <Button variant="primary" size="md" icon={<ArrowRight size={16} />} href="https://flow.graxion.in">
                Try Graxion Flow
              </Button>
              <Button variant="ghost" size="md" href="/products">
                View All Products
              </Button>
            </div>
          </div>

          {/* Abstract Visual Mockup with Parallax */}
          <motion.div className="home-featured-visual relative" style={{ y: parallaxY }}>
            <div className="gradient-overlay" style={{ background: "radial-gradient(circle at center, rgba(0,212,255,0.15) 0%, transparent 60%)" }} />
            
            <motion.div
              className="home-featured-app-mockup glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mockup-header" style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem", marginBottom: "1rem" }}>
                <div className="flex gap-2">
                  <div className="mockup-dot" style={{ background: "#ff5f56" }} />
                  <div className="mockup-dot" style={{ background: "#ffbd2e" }} />
                  <div className="mockup-dot" style={{ background: "#27c93f" }} />
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>graxion-ai-console</div>
              </div>
              <div className="mockup-body" style={{ display: "grid", gap: "1rem" }}>
                <div className="flex justify-between items-center">
                  <div style={{ fontSize: "0.875rem", fontWeight: "var(--fw-medium)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Activity size={16} color="var(--color-accent-cyan)" /> System Status
                  </div>
                  <motion.div 
                    className="badge" 
                    animate={{ opacity: [1, 0.4, 1] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--color-accent-emerald)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    ● Live
                  </motion.div>
                </div>
                
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>Language Engine</div>
                    <div className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                        <Sparkles size={14} color="var(--color-accent-cyan)" />
                      </motion.div>
                      <span style={{ fontSize: "0.875rem", fontWeight: "bold" }}>Omni v2</span>
                    </div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>Global Latency</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--color-accent-emerald)", fontWeight: "bold", fontFamily: "monospace" }}>
                      {latency}ms
                    </div>
                  </div>
                </div>

                {/* Animated Traffic Equalizer */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "40px", marginTop: "0.5rem" }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((bar) => {
                    // Pre-calculate somewhat random heights for the animation arrays to avoid hydration mismatches, but framer motion handles this fine
                    return (
                      <motion.div
                        key={bar}
                        style={{ flex: 1, background: "var(--color-gradient-primary)", borderRadius: "2px" }}
                        animate={{ height: ["20%", `${Math.random() * 60 + 40}%`, "20%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: bar * 0.1, ease: "easeInOut" }}
                      />
                    );
                  })}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  <span>Live Traffic Stream</span>
                  <span style={{ fontFamily: "monospace" }}>Processing 2M+ req/min</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
