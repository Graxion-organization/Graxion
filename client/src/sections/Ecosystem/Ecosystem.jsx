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

  const handleMouseMove = (e) => {
    for (const card of document.getElementsByClassName("ecosystem-card")) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section className="ecosystem section" id="ecosystem">
      <div className="container">
        <SectionHeader
          overline="The Ecosystem"
          title="One Ecosystem. Infinite Possibilities."
          subtitle="From Artificial Intelligence to Robotics — we're building technology that empowers every person and every business."
        />

        <div className="ecosystem-bento" ref={ref} onMouseMove={handleMouseMove}>
          {ecosystemVerticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <motion.div
                key={vertical.id}
                className={`ecosystem-card size-${vertical.size}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                style={{ "--card-accent-color": vertical.color, perspective: 1000 }}
              >
                <div className="ecosystem-card-inner">
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
