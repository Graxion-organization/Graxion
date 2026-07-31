import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Code2, Terminal, Cpu, GitBranch, LineChart, Play, Layers } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./EcosystemVertical.css";

const features = [
  {
    icon: Terminal,
    title: "Unified CLI Terminal",
    desc: "A singular command-line utility to scaffold applications, manage active environments, and deploy projects instantly.",
  },
  {
    icon: Play,
    title: "Git-Triggered CI/CD",
    desc: "Push code directly to GitHub, GitLab, or Bitbucket to trigger test suites and auto-deploy changes globally.",
  },
  {
    icon: Layers,
    title: "Flexible API Gateway",
    desc: "Coordinate routing, apply request rate limits, and cache endpoints globally with simple JSON parameters.",
  },
  {
    icon: LineChart,
    title: "Advanced Telemetry",
    desc: "Track trace metrics, CPU limits, API error rates, and user loads using beautiful visual dashboards.",
  },
  {
    icon: GitBranch,
    title: "Isolated Preview Environments",
    desc: "Auto-spin up unique, sandboxed staging environments for every git branch to test integrations safely.",
  },
  {
    icon: Cpu,
    title: "Edge Database Sync",
    desc: "Synchronize local project databases with cloud development models seamlessly, reducing configuration mismatches.",
  },
];

export default function DeveloperPlatforms() {
  const pageStyle = {
    "--glow-color": "rgba(245, 158, 11, 0.08)",
    "--accent-theme-color": "var(--color-accent-amber)",
    "--badge-bg-color": "rgba(245, 158, 11, 0.05)",
    "--border-theme-color": "rgba(245, 158, 11, 0.15)",
  };

  return (
    <div className="ecosystem-page" style={pageStyle}>
      <Helmet>
        <title>Developer Platforms & Tooling — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Accelerate your release cycles with Graxion Developer Platforms. Enjoy Git-triggered CI/CD pipelines, customizable API routing, CLI commands, and trace telemetry."
        />
        <meta name="keywords" content="Graxion DevTools, developer platforms, Git deployments, serverless API gateway, tracing telemetry, CLI scaffold" />
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
              <Code2 size={14} style={{ marginRight: 6 }} />
              Graxion Developer Suite
            </motion.div>
            
            <motion.h1
              className="ecosystem-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Build Faster, Scale Smarter, <br />
              <span className="text-gradient">Ship Without Friction</span>
            </motion.h1>

            <motion.p
              className="ecosystem-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Powerful tools, API orchestration layers, and trace telemetry systems 
              engineered by developers, specifically for developers.
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
              <h2 className="ecosystem-overview-title">Designed for Code, Optimized for Flow</h2>
              <p className="ecosystem-overview-desc">
                We believe developers spend too much time managing configuration scripts instead of writing software. 
                Graxion Developer Tooling streamlines the lifecycle from initial setup to production monitoring.
              </p>
              <p className="ecosystem-overview-desc">
                With our custom CLI, you can initialize template projects, run local environments, 
                test APIs, and push builds with simple, memorable commands. No YAML file tuning needed.
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
                Beta Releases Coming Soon
              </div>

              <div className="status-info-row">
                <span className="status-info-label">Active Subdomain</span>
                <span className="status-info-val status-subdomain">dev.graxion.in</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Package Manager</span>
                <span className="status-info-val">npm / yarn / cargo / pip</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Telemetry Standard</span>
                <span className="status-info-val">OpenTelemetry / Prometheus</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">CLI Commands</span>
                <span className="status-info-val">graxion --help</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ecosystem-features section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="ecosystem-overview-title">Platform Capabilities</h2>
            <p className="ecosystem-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Everything developers need to launch secure, auto-scaling apps.
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
            <h2 className="ecosystem-cta-title">Start Scaffolding Today</h2>
            <p className="ecosystem-cta-desc">
              Ready to accelerate your workflow? Explore our CLI guides or join 
              the developer community on Discord to discuss integrations.
            </p>
            <div className="ecosystem-cta-actions">
              <Link to="/resources/documentation">
                <Button variant="primary" size="md">Read the Documentation</Button>
              </Link>
              <Link to="/resources/community">
                <Button variant="outline" size="md">Join Developer Chat</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
