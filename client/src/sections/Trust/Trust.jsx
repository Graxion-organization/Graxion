import { motion } from "framer-motion";
import { ShieldCheck, Eye, RefreshCw } from "lucide-react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Trust.css";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Security by Default",
    description:
      "Privacy and security are not features — they are responsibilities. Every Graxion product protects user data through responsible engineering and transparency.",
  },
  {
    icon: Eye,
    title: "Transparent Engineering",
    description:
      "We believe trust is built through openness. Our engineering practices, data policies, and security measures are designed to be clear and accountable.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    description:
      "Security is never finished. We continuously audit, update, and strengthen our systems to stay ahead of evolving threats and challenges.",
  },
];

const promises = [
  "Reliable",
  "Secure",
  "Simple",
  "Intelligent",
  "Scalable",
  "Accessible",
  "Long-term",
];

export default function Trust() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="trust section" id="trust">
      <div className="container">
        <SectionHeader
          overline="Security"
          title="Trust is Impossible Without Security"
          subtitle="Security is not a feature. It is a responsibility. Every Graxion product should protect user data through responsible engineering."
        />

        <div className="trust-grid" ref={ref}>
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="trust-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="trust-card-icon">
                  <Icon size={26} />
                </div>
                <h3 className="trust-card-title">{pillar.title}</h3>
                <p className="trust-card-desc">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="trust-promise"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="trust-promise-title">Our Promise</h3>
          <div className="trust-promise-tags">
            {promises.map((promise) => (
              <span key={promise} className="trust-promise-tag">
                {promise}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
