import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Globe2, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import "./WhatIsGraxion.css";

const features = [
  {
    icon: <Sparkles size={24} />,
    title: "AI & Automation",
    description: "Intelligent platforms like Graxion Flow that automate workflows and streamline omnichannel communication."
  },
  {
    icon: <Globe2 size={24} />,
    title: "Cloud Infrastructure",
    description: "Robust, highly available cloud systems designed to power enterprise-grade applications globally."
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Cyber Security",
    description: "End-to-end encryption and advanced security protocols to keep your business data unconditionally safe."
  },
  {
    icon: <Cpu size={24} />,
    title: "Business Software",
    description: "Custom ERPs, CRM systems, and management tools built to scale with your growing operations."
  }
];

export default function WhatIsGraxion() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="what-is-graxion" id="what-is-graxion" ref={ref}>
      <div className="container">
        <motion.div
          className="what-is-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="what-is-badge">
            <Sparkles size={14} className="badge-icon" />
            <span>The Ecosystem</span>
          </div>
          <h2 className="what-is-title">What is <span className="accent">Graxion?</span></h2>
          <p className="what-is-subtitle">
            Graxion is a global technology ecosystem building intelligent products across AI, Cloud, Cyber Security, Business Software, and more. We deliver the infrastructure of tomorrow, today.
          </p>
        </motion.div>

        <div className="what-is-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="what-is-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-desc">{feature.description}</p>
              <div className="card-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
