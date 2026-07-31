import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Newspaper, FileDown, Mail, ArrowUpRight } from "lucide-react";
import Button from "../components/Button/Button";
import "./CompanyPages.css";

const pressReleases = [
  {
    date: "July 2026",
    title: "Graxion Unveils High-Speed AI Cognitive Engines",
    excerpt: "We are thrilled to officially launch the beta of Graxion AI, exposing multi-modal document extraction and sub-50ms API endpoints to modern developer squads.",
  },
  {
    date: "May 2026",
    title: "Graxion Secures Regulatory Compliance & SOC2 Verifications",
    excerpt: "Strengthening our principles of default security, Graxion systems have completed detailed external cyber security audits, securing SOC2 Type II certifications.",
  },
  {
    date: "February 2026",
    title: "Announcing the Launch of the Verified Student Certificate Ledger",
    excerpt: "Graxion introduces its public certificate index, allowing colleges and recruiters to verify graduate internship credentials instantly on-chain.",
  },
];

export default function Press() {
  return (
    <div className="company-page">
      <Helmet>
        <title>Press & Media — Graxion | Official Brand Releases</title>
        <meta
          name="description"
          content="Find official Graxion press releases, company news, and downloadable media kits. Get in touch with our public relations team for media inquiries."
        />
        <meta name="keywords" content="Graxion news, press releases, corporate announcements, download media kits, PR contact" />
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
              <Newspaper size={14} style={{ marginRight: 6 }} />
              Press & Media Room
            </motion.div>
            
            <motion.h1
              className="company-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Official Updates From <br />
              <span className="text-gradient">The Graxion Newsroom</span>
            </motion.h1>

            <motion.p
              className="company-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Follow major milestones, ecosystem announcements, regulatory releases, 
              and download certified brand kits.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="press-timeline-section section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="company-hero-title" style={{ fontSize: 'var(--text-h2)' }}>Press Releases</h2>
            <p className="company-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Chronological feed of official company developments.
            </p>
          </div>

          <div className="press-timeline">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                className="press-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="press-date">{release.date}</div>
                <h3 className="press-title">{release.title}</h3>
                <p className="press-excerpt">{release.excerpt}</p>
                <a href="#read" className="blog-read-more" style={{ color: 'var(--color-accent-purple)', textDecoration: 'none' }}>
                  Read Press Release <ArrowUpRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets Section */}
      <section className="press-kits section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="company-hero-title" style={{ fontSize: 'var(--text-h2)' }}>Resources & Contacts</h2>
            <p className="company-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Media resources and communication paths.
            </p>
          </div>

          <div className="press-kit-grid">
            <motion.div
              className="press-kit-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="feature-icon-wrapper" style={{ color: 'var(--color-accent-purple)', background: 'rgba(124, 58, 237, 0.05)' }}>
                <FileDown size={22} />
              </div>
              <h3 className="culture-card-title">Brand Identity Assets</h3>
              <p className="culture-card-desc" style={{ marginBottom: '1rem' }}>
                Download certified logo badges, vector symbols, color variables, 
                and official executive photos for articles.
              </p>
              <Button variant="outline" size="sm" style={{ alignSelf: 'flex-start' }}>
                Download Media Kit (.ZIP)
              </Button>
            </motion.div>

            <motion.div
              className="press-kit-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="feature-icon-wrapper" style={{ color: 'var(--color-accent-purple)', background: 'rgba(124, 58, 237, 0.05)' }}>
                <Mail size={22} />
              </div>
              <h3 className="culture-card-title">Media Relations Contact</h3>
              <p className="culture-card-desc" style={{ marginBottom: '1rem' }}>
                For interview scheduling, panel quote requests, or detailed product reviews, 
                get in touch with our PR office directly.
              </p>
              <a href="mailto:press@graxion.in" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">
                  Contact PR Team
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
