import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Briefcase, BarChart3, Users, Zap, LayoutDashboard, Database, CheckSquare } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./EcosystemVertical.css";

const features = [
  {
    icon: LayoutDashboard,
    title: "Unified Team Command",
    desc: "A sleek workspace workspace linking calendars, chat, active tasks, and team milestones in one glassmorphic hub.",
  },
  {
    icon: Users,
    title: "Next-Gen CRM",
    desc: "Build richer client profiles, track email engagement metrics automatically, and coordinate your sales pipelines efficiently.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "Unlock real-time data visualizers and forecast metrics (revenue, churn, resource levels) with predictive AI modeling.",
  },
  {
    icon: Database,
    title: "Dynamic Asset Vault",
    desc: "Store and categorize files, records, custom templates, and contracts under state-of-the-art secure encryptions.",
  },
  {
    icon: Zap,
    title: "Flow Automation",
    desc: "Create simple rules (e.g. IF sale complete, THEN auto-generate invoice and notify Slack) in a few intuitive clicks.",
  },
  {
    icon: CheckSquare,
    title: "Smart Task Boards",
    desc: "Go beyond Kanban boards with contextual subtasks, automatic priority scheduling, and direct repository links.",
  },
];

export default function BusinessSoftware() {
  const pageStyle = {
    "--glow-color": "rgba(124, 58, 237, 0.08)",
    "--accent-theme-color": "var(--color-accent-purple)",
    "--badge-bg-color": "rgba(124, 58, 237, 0.05)",
    "--border-theme-color": "rgba(124, 58, 237, 0.15)",
  };

  return (
    <div className="ecosystem-page" style={pageStyle}>
      <Helmet>
        <title>Business Software — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Empower your business operations with Graxion's SaaS software. Manage pipelines, client relationships, task flows, and financial dashboards with predictive intelligence."
        />
        <meta name="keywords" content="Graxion CRM, Business Software, project management SaaS, predictive customer analytics, business workflows" />
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
              <Briefcase size={14} style={{ marginRight: 6 }} />
              Graxion Business Suite
            </motion.div>
            
            <motion.h1
              className="ecosystem-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Streamline Operations, <br />
              <span className="text-gradient">Accelerate Business Growth</span>
            </motion.h1>

            <motion.p
              className="ecosystem-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Empower your enterprise with CRM, task management tools, automated contracts, 
              and robust collaboration dashboards engineered to maximize team efficiency.
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
              <h2 className="ecosystem-overview-title">Say Goodbye to Fragmented Tools</h2>
              <p className="ecosystem-overview-desc">
                Most companies waste thousands of hours managing siloed tools that don't speak to each other. 
                Graxion Business Software brings everything under one unified roof. 
                Your task management feeds into your pipeline, which directly informs your invoicing, which connects 
                directly to your customer CRM histories.
              </p>
              <p className="ecosystem-overview-desc">
                Everything is backed by predictive AI integrations to help notify managers of potential bottlenecks 
                before they affect clients, ensuring top-tier service delivery continuously.
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
              <div className="status-badge coming-soon">
                Beta Version Coming Soon
              </div>

              <div className="status-info-row">
                <span className="status-info-label">Active Subdomain</span>
                <span className="status-info-val status-subdomain">business.graxion.in</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Expected Release</span>
                <span className="status-info-val">Q4 2026</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Beta Access</span>
                <span className="status-info-val">Limited Slots Available</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Integrations</span>
                <span className="status-info-val">Slack, Gmail, GitHub</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ecosystem-features section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="ecosystem-overview-title">Business Suite Capabilities</h2>
            <p className="ecosystem-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Designed to optimize operations and support your team as you scale up.
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
            <h2 className="ecosystem-cta-title">Join the Closed Beta</h2>
            <p className="ecosystem-cta-desc">
              Want early access to our collaborative CRM and enterprise automation systems? 
              Apply to join our exclusive beta group.
            </p>
            <div className="ecosystem-cta-actions">
              <Link to="/contact">
                <Button variant="primary" size="md">Apply for Beta Access</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="md">Learn More About Us</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
