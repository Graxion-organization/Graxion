import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Button from "../../components/Button/Button";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./HomeFeatured.css";

export default function HomeFeatured() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="home-featured section" id="featured">
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
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Content */}
          <div className="home-featured-content">
            <span className="home-featured-label">Featured: Graxion AI</span>
            <h3 className="home-featured-title">
              Intelligence that <span className="text-gradient">Amplifies</span>
            </h3>
            <p className="home-featured-desc">
              Our advanced AI platform isn't just about automation. It's about empowering your team to think faster, create better, and solve complex problems with unprecedented ease.
            </p>

            <div className="home-featured-list">
              {[
                "Natural Language Processing & Generation",
                "Automated Workflow Integration",
                "Secure Enterprise Data Handling",
                "Custom Model Fine-tuning",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="home-featured-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <CheckCircle2 size={18} className="home-featured-icon" />
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="home-featured-cta">
              <Button variant="primary" size="md" icon={<ArrowRight size={16} />}>
                Try Graxion AI
              </Button>
              <Button variant="ghost" size="md" href="/products">
                View All Products
              </Button>
            </div>
          </div>

          {/* Abstract Visual Mockup */}
          <div className="home-featured-visual">
            <motion.div
              className="home-featured-app-mockup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mockup-header">
                <div className="mockup-dot" />
                <div className="mockup-dot" />
                <div className="mockup-dot" />
              </div>
              <div className="mockup-body">
                <div className="mockup-line long" />
                <div className="mockup-line short" />
                <div className="mockup-box">
                  <Sparkles size={32} color="var(--color-accent-cyan)" opacity={0.5} />
                </div>
                <div className="mockup-line medium" />
                <div className="mockup-line long" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
