import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./News.css";

const newsItems = [
  {
    tag: "Announcement",
    date: "July 24, 2026",
    title: "Introducing the Graxion Technology Ecosystem",
    description: "Our vision for a unified, secure, and intelligent platform that connects AI, Cloud, and Business tools.",
  },
  {
    tag: "Research",
    date: "July 15, 2026",
    title: "Breakthrough in Efficient NLP Processing",
    description: "Graxion Labs publishes new findings on reducing latency in large language models by 40% without accuracy loss.",
  },
  {
    tag: "Product",
    date: "July 02, 2026",
    title: "Graxion Security Protocol Standardized",
    description: "Our core encryption framework is now fully audited and available as an open-source standard.",
  },
];

export default function News() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="news section" id="news">
      <div className="container">
        <SectionHeader
          overline="Latest News"
          title="Updates & Announcements"
          subtitle="Stay informed about the latest product releases, research papers, and company news."
        />

        <div className="news-grid" ref={ref}>
          {newsItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="news-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="news-card-image">
                <Newspaper size={32} color="var(--color-border)" opacity={0.5} />
              </div>
              <div className="news-card-content">
                <div className="news-meta">
                  <span className="news-tag">{item.tag}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h4 className="news-title">{item.title}</h4>
                <p className="news-desc">{item.description}</p>
                <div className="news-link">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
