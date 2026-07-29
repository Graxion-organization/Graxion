import { motion } from "framer-motion";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Roadmap.css";

const roadmapItems = [
  {
    phase: "Q3 2026",
    title: "Graxion Foundation & Identity",
    description: "Launch of the unified Graxion ID system, providing seamless SSO across the entire upcoming ecosystem.",
    status: "active",
  },
  {
    phase: "Q4 2026",
    title: "Graxion AI Public Beta",
    description: "Opening our flagship AI platform to early access users, featuring advanced NLP and workflow automation.",
    status: "future",
  },
  {
    phase: "Q1 2027",
    title: "Enterprise Cloud Solutions",
    description: "Rollout of managed compute and storage solutions tailored for scalable business operations.",
    status: "future",
  },
  {
    phase: "2027 & Beyond",
    title: "Education & Robotics Integrations",
    description: "Expanding the ecosystem into physical automation and accessible digital learning platforms.",
    status: "future",
  },
];

export default function Roadmap() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="roadmap section" id="roadmap">
      <div className="container">
        <SectionHeader
          overline="The Roadmap"
          title="Where We Are Going"
          subtitle="Our master plan to build the world's most trusted technology ecosystem, step by step."
        />

        <div className="roadmap-timeline" ref={ref}>
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={`roadmap-item ${item.status}`}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="roadmap-marker" />
              <div className="roadmap-date">{item.phase}</div>
              <div className="roadmap-content">
                <h4 className="roadmap-title">{item.title}</h4>
                <p className="roadmap-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
