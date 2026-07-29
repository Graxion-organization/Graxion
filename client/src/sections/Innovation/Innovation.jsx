import { motion } from "framer-motion";
import AnimatedCounter from "../../components/AnimatedCounter/AnimatedCounter";
import { stats } from "../../data/ecosystem";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Innovation.css";

export default function Innovation() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="innovation section" id="innovation">
      <div className="container">
        <div className="innovation-content" ref={ref}>
          {/* Left: Text */}
          <motion.div
            className="innovation-text"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-header-overline" style={{ justifyContent: "flex-start" }}>
              <span>Innovation</span>
            </div>
            <h2 className="innovation-headline">
              Innovation is Not About Being First.
              <br />
              It's About Creating{" "}
              <span className="text-gradient">Lasting Value.</span>
            </h2>
            <p className="innovation-desc">
              We believe meaningful innovation comes from understanding problems
              deeply, listening to users, and improving consistently. Every
              product we build must make work easier, learning better, businesses
              stronger, communication faster, and innovation more accessible.
            </p>

            <div className="innovation-quote-block">
              <p className="innovation-quote-text">
                "Artificial Intelligence is not a replacement for human
                creativity. It is a tool that amplifies human potential."
              </p>
              <p className="innovation-quote-attr">— The Graxion Book</p>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            className="innovation-stats"
            ref={statsRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="innovation-stat"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={statsVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="innovation-stat-value">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isVisible={statsVisible}
                  />
                </div>
                <div className="innovation-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
