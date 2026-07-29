import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import { coreValues } from "../data/ecosystem";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./About.css";

const mvpCards = [
  {
    label: "Our Purpose",
    title: "Solve Meaningful Problems Through Technology",
    desc: "Every product we build must make work easier, learning better, businesses stronger, communication faster, security smarter, and innovation more accessible. Technology should remove complexity, not create it.",
  },
  {
    label: "Our Vision",
    title: "The World's Most Trusted Technology Ecosystem",
    desc: "To build one of the world's most trusted technology ecosystems that empowers every person, every business, every institution, and every community through intelligent, secure, and accessible innovation.",
  },
  {
    label: "Our Mission",
    title: "Design, Build, and Continuously Improve",
    desc: "Our mission is to design, build, and continuously improve technology that helps people create, communicate, learn, automate, protect, and grow — from AI assistants to cloud infrastructure.",
  },
];

export default function About() {
  const [mvpRef, mvpVisible] = useScrollAnimation({ threshold: 0.05 });
  const [valuesRef, valuesVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="about-page">
      <Helmet>
        <title>About Us — Graxion | Global Technology Ecosystem</title>
        <meta
          name="description"
          content="Learn about Graxion's mission, vision, and values. We are building a global technology ecosystem dedicated to empowering every person and business through intelligent innovation."
        />
      </Helmet>

      {/* Hero */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="about-hero-content">
            <motion.div
              className="about-hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              About Graxion
            </motion.div>
            <motion.h1
              className="about-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Who We Are
            </motion.h1>
            <motion.p
              className="about-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              Graxion is a global technology ecosystem dedicated to building
              intelligent products, platforms, services, and research that
              empower individuals, businesses, educational institutions,
              governments, and future generations.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Letter from Founder */}
      <section className="about-letter section">
        <div className="container">
          <motion.div
            className="about-letter-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="about-letter-title">A Letter from the Founder</h2>
            <span className="about-letter-tag">The Graxion Book v1.0</span>

            <div className="about-letter-body">
              <p>
                Graxion was not created to build another software company. It
                was born from a simple belief: technology should make life
                easier, create opportunities, solve real problems, and empower
                people to achieve more.
              </p>
              <p>
                Around the world, billions of people and businesses depend on
                technology created outside their own countries. While these
                products have transformed lives, we believe every nation should
                also contribute to building world-class technology for the
                future.
              </p>
              <p>
                Graxion exists to become one of those contributors — not by
                copying others, but by creating meaningful, reliable, and
                intelligent technology that earns trust through quality and
                innovation.
              </p>
              <p>
                We believe technology should unite people, support businesses,
                improve education, accelerate innovation, and solve real-world
                challenges.
              </p>
              <p>
                Our journey is not measured by becoming bigger than another
                company. It is measured by how many lives become better because
                Graxion exists.
              </p>
            </div>

            <p className="about-letter-signature">— Founder, Graxion</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Purpose */}
      <section className="about-mvp section">
        <div className="container">
          <SectionHeader
            overline="What Drives Us"
            title="Purpose, Vision, Mission"
            subtitle="Three pillars that define every decision we make and every product we build."
          />

          <div className="about-mvp-grid" ref={mvpRef}>
            {mvpCards.map((card, index) => (
              <motion.div
                key={card.label}
                className="about-mvp-card"
                initial={{ opacity: 0, y: 30 }}
                animate={mvpVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="about-mvp-label">{card.label}</span>
                <h3 className="about-mvp-title">{card.title}</h3>
                <p className="about-mvp-desc">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Belief */}
      <section className="about-belief section">
        <div className="container">
          <motion.div
            className="about-belief-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="about-belief-quote">
              Technology should never be built simply because it is possible.
              <br />
              <em>Technology should be built because it makes life better.</em>
            </p>
            <p className="about-belief-sub">
              Our greatest competition is the quality of our own work.
              Competition inspires progress, but it does not define our
              direction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section">
        <div className="container">
          <SectionHeader
            overline="Our Values"
            title="What We Stand For"
            subtitle="Ten core values that shape our culture, guide our work, and define who we are."
          />

          <div className="about-values-grid" ref={valuesRef}>
            {coreValues.map((value, index) => (
              <motion.span
                key={value}
                className="about-value-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={valuesVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {value}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
