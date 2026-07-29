import { motion } from "framer-motion";
import {
  Lightbulb,
  Layers,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Lock,
  Globe,
} from "lucide-react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { corePrinciples } from "../../data/ecosystem";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Principles.css";

const iconMap = {
  Lightbulb,
  Layers,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Lock,
  Globe,
};

export default function Principles() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="principles section" id="principles">
      <div className="container">
        <SectionHeader
          overline="Core Principles"
          title="What Guides Us"
          subtitle="Eight principles that define how we think, build, and serve. Every decision at Graxion is measured against these standards."
        />

        <div className="principles-grid" ref={ref}>
          {corePrinciples.map((principle, index) => {
            const Icon = iconMap[principle.icon];
            return (
              <motion.div
                key={principle.title}
                className="principles-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="principles-card-icon">
                  <Icon size={22} />
                </div>
                <h3 className="principles-card-title">{principle.title}</h3>
                <p className="principles-card-desc">{principle.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
