import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Briefcase, MapPin, Clock, ArrowRight, Lightbulb, Users, ShieldCheck } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./CompanyPages.css";

const culturePoints = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We encourage smart risk-taking, continuous engineering trials, and exploring solutions that challenge standard conventions.",
  },
  {
    icon: Users,
    title: "Unified Teamwork",
    desc: "We build flat organizational structures where every engineer, designer, or marketer directly owns their scope.",
  },
  {
    icon: ShieldCheck,
    title: "Absolute Integrity",
    desc: "Long-term client trust guides our planning. We prioritize security, compliance, and transparent practices.",
  },
];

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    dept: "Product Engineering",
    loc: "Bengaluru, India / Hybrid",
    type: "Full-Time",
  },
  {
    title: "Cloud Infrastructure Architect",
    dept: "Graxion Cloud Operations",
    loc: "Remote (Global)",
    type: "Full-Time",
  },
  {
    title: "Cyber Security Threat Analyst",
    dept: "Ecosystem Security",
    loc: "Bengaluru, India",
    type: "Full-Time",
  },
  {
    title: "Senior Product Designer",
    dept: "UI / UX Design Systems",
    loc: "Remote (Asia)",
    type: "Full-Time",
  },
];

export default function Careers() {
  return (
    <div className="company-page">
      <Helmet>
        <title>Careers at Graxion — Join the Future of Tech</title>
        <meta
          name="description"
          content="Explore job openings at Graxion. Join our team building a trusted global technology ecosystem. Open roles in software engineering, security, and UI/UX design."
        />
        <meta name="keywords" content="Graxion careers, software engineer jobs, cloud architect hiring, hybrid developer roles, UX design jobs" />
      </Helmet>

      {/* Hero Section */}
      <section className="company-hero">
        <div className="container">
          <div className="company-hero-content">
            <motion.div
              className="company-hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Careers at Graxion
            </motion.div>
            
            <motion.h1
              className="company-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Build the Technology <br />
              <span className="text-gradient">That Shapes Tomorrow</span>
            </motion.h1>

            <motion.p
              className="company-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              We're a team of engineers, researchers, and creators passionate about making technology 
              reliable, accessible, and secure for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="careers-culture section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="company-hero-title" style={{ fontSize: 'var(--text-h2)' }}>Our Culture & Values</h2>
            <p className="company-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              We foster a collaborative sandbox designed to support engineering excellence.
            </p>
          </div>

          <div className="careers-culture-grid">
            {culturePoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="culture-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="feature-icon-wrapper" style={{ color: 'var(--color-accent-purple)', background: 'rgba(124, 58, 237, 0.05)' }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="culture-card-title">{item.title}</h3>
                  <p className="culture-card-desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="careers-jobs section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="company-hero-title" style={{ fontSize: 'var(--text-h2)' }}>Open Positions</h2>
            <p className="company-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Explore available opportunities to join our team.
            </p>
          </div>

          <div className="jobs-list">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                className="job-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="job-info-main">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span>{job.dept}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} /> {job.loc}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>
                </div>

                <a href="mailto:careers@graxion.in?subject=Application for Senior Full-Stack Engineer" style={{ display: 'flex', textDecoration: 'none' }}>
                  <Button variant="outline" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Apply Now <ArrowRight size={14} />
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="blog-newsletter section">
        <div className="container">
          <motion.div
            className="newsletter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="company-hero-title" style={{ fontSize: 'var(--text-h2)', marginBottom: '1rem' }}>Don't See the Perfect Match?</h2>
            <p className="company-hero-subtitle" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
              We're always looking for talented developers, designers, and innovators. 
              Drop your resume in our talent database, and we'll reach out when a role opens up.
            </p>
            <a href="mailto:careers@graxion.in?subject=General Talent Pool Application" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md">Submit General Application</Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
