import { motion } from "framer-motion";
import { Microscope, Dna, Cpu, Atom, Sparkles, ArrowRight } from "lucide-react";
import Button from "../../components/Button/Button";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Research.css";

export default function Research() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="research section" id="research">
      <div className="container">
        <div className="research-content" ref={ref}>
          {/* Visual */}
          <motion.div
            className="research-visual"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="research-hex-grid">
              <div className="research-hex"><Microscope size={24} /></div>
              <div className="research-hex"><Dna size={24} /></div>
              <div className="research-hex"><Cpu size={24} /></div>
              <div className="research-hex"><Atom size={24} /></div>
              <div className="research-hex"><Sparkles size={24} /></div>
              <div className="research-hex"></div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="research-text"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              overline="Graxion Labs"
              title="Inventing the Future"
              subtitle=""
            />
            <p className="research-desc" style={{ marginTop: "-2rem" }}>
              Our dedicated research division doesn't just look at next year; we look decades ahead. From Artificial General Intelligence to Quantum Machine Learning, Graxion Labs is committed to open science and responsible innovation.
            </p>

            <div className="research-stats">
              <div>
                <div className="research-stat-value">12+</div>
                <div className="research-stat-label">Published Papers</div>
              </div>
              <div>
                <div className="research-stat-value">3</div>
                <div className="research-stat-label">Open Source Models</div>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Button variant="ghost" size="md" icon={<ArrowRight size={16} />}>
                Explore Research
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
