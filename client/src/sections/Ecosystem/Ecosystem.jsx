import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { ecosystemVerticals } from "../../data/ecosystem";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Ecosystem.css";

const statusLabels = {
  active: "Active",
  "coming-soon": "Coming Soon",
  future: "Future",
};

export default function Ecosystem() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="ecosystem section" id="ecosystem">
      <div className="container">
        <SectionHeader
          overline="The Ecosystem"
          title="One Ecosystem. Infinite Possibilities."
          subtitle="From Artificial Intelligence to Robotics — we're building technology that empowers every person and every business."
        />

        <div className="ecosystem-bento" ref={ref}>
          {ecosystemVerticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <motion.div
                key={vertical.id}
                className={`ecosystem-card size-${vertical.size}`}
                style={{ "--card-accent-color": vertical.color }}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="ecosystem-card-icon">
                  <Icon size={vertical.size === "large" ? 28 : 24} />
                </div>
                <div className="ecosystem-card-content">
                  <h3 className="ecosystem-card-name">{vertical.name}</h3>
                  <p className="ecosystem-card-description">
                    {vertical.description}
                  </p>
                </div>
                <div className="ecosystem-card-footer">
                  <span
                    className={`ecosystem-card-status status-${vertical.status}`}
                  >
                    {statusLabels[vertical.status]}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="ecosystem-card-arrow"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* One Account */}
        <motion.div
          className="ecosystem-unified"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="ecosystem-unified-text">
            One account. One identity. One connected experience.
          </p>
          <p className="ecosystem-unified-sub">
            Access every Graxion product with a single, secure account.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
