import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { GraduationCap, BookOpen, Award, CheckCircle, Video, Compass, Users } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./EcosystemVertical.css";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Coursework",
    desc: "Hands-on projects, sandbox coding environments, and contextual coding checks built directly into study models.",
  },
  {
    icon: Award,
    title: "Verified Credentials",
    desc: "Earn blockchain-verifiable digital certificates on completion to easily demonstrate expertise to recruiters.",
  },
  {
    icon: Compass,
    title: "Curated Learning Paths",
    desc: "Follow targeted tracks for Full-Stack Engineering, Cloud Administration, or Neural Network Architecture.",
  },
  {
    icon: Video,
    title: "High-Fidelity Virtual Lectures",
    desc: "Stream crisp, live video sessions and interactive webinars with instructors, sharing code boards in real time.",
  },
  {
    icon: Users,
    title: "Mentorship Networks",
    desc: "Ask questions and pair program with experienced mentors in dedicated channel study networks.",
  },
  {
    icon: CheckCircle,
    title: "Progress Trackers",
    desc: "Monitor course milestones, daily code streaks, and mock interview performance ratings with intuitive charts.",
  },
];

export default function Education() {
  const pageStyle = {
    "--glow-color": "rgba(236, 72, 153, 0.08)",
    "--accent-theme-color": "var(--color-accent-rose)",
    "--badge-bg-color": "rgba(236, 72, 153, 0.05)",
    "--border-theme-color": "rgba(236, 72, 153, 0.15)",
  };

  return (
    <div className="ecosystem-page" style={pageStyle}>
      <Helmet>
        <title>Education & Learning Platforms — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Transform your career with Graxion Education. Access interactive software tracks, earn verified certificates, connect with mentors, and track learning analytics."
        />
        <meta name="keywords" content="Graxion Learn, educational software, digital certificates, mentor matching, student dashboard, computer science courses" />
      </Helmet>

      {/* Hero Section */}
      <section className="ecosystem-hero">
        <div className="container">
          <div className="ecosystem-hero-content">
            <motion.div
              className="ecosystem-hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap size={14} style={{ marginRight: 6 }} />
              Graxion Academy
            </motion.div>
            
            <motion.h1
              className="ecosystem-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Unlock Practical Skills <br />
              <span className="text-gradient">For the Digital Frontier</span>
            </motion.h1>

            <motion.p
              className="ecosystem-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Accelerate your engineering journey. Access practical, interactive coursework, 
              earn verifiable credentials, and connect with technical mentors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="ecosystem-overview section">
        <div className="container">
          <div className="ecosystem-overview-grid">
            <motion.div
              className="ecosystem-overview-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="ecosystem-overview-title">Knowledge Changes Lives</h2>
              <p className="ecosystem-overview-desc">
                Traditional education focuses heavily on theory, leaving graduates unprepared for the 
                rapid pace of modern technology roles. Graxion Academy bridges this gap by prioritizing 
                practical, project-based engineering tracks.
              </p>
              <p className="ecosystem-overview-desc">
                From day one, you write real code in sandboxed IDEs, spin up micro-databases, and debug 
                APIs. You don't just study software architecture — you build it.
              </p>
            </motion.div>

            <motion.div
              className="ecosystem-status-panel"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="status-label">Product Status</span>
              <div className="status-badge coming-soon" style={{ color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.03)', borderColor: 'var(--color-border)' }}>
                Initial Planning & Scope
              </div>

              <div className="status-info-row">
                <span className="status-info-label">Active Subdomain</span>
                <span className="status-info-val status-subdomain">learn.graxion.in</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Curriculum Trackers</span>
                <span className="status-info-val">3 Major Paths Planned</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Credential Verification</span>
                <span className="status-info-val">Active / Verify Portal Live</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Target Beta Release</span>
                <span className="status-info-val">Q1 2027</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ecosystem-features section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="ecosystem-overview-title">Academy Features</h2>
            <p className="ecosystem-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Engineered to take your technical skills to professional levels.
            </p>
          </div>

          <div className="features-grid">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="feature-icon-wrapper">
                    <Icon size={22} />
                  </div>
                  <h3 className="feature-card-title">{item.title}</h3>
                  <p className="feature-card-desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="ecosystem-cta section">
        <div className="container">
          <motion.div
            className="ecosystem-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="ecosystem-cta-title">Verify Existing Credentials</h2>
            <p className="ecosystem-cta-desc">
              Already completed a Graxion course, certificate path, or internship contract? 
              You can instantly verify certificate validity on our public ledger.
            </p>
            <div className="ecosystem-cta-actions">
              <Link to="/internship/verify">
                <Button variant="primary" size="md">Verify Certificate</Button>
              </Link>
              <Link to="/student/login">
                <Button variant="outline" size="md">Student Portal Login</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
