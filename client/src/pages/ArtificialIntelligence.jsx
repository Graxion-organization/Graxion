import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Brain, Bot, Terminal, Code2, Sparkles, Cpu } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./EcosystemVertical.css";

const features = [
  {
    icon: Sparkles,
    title: "Intelligent Workflows",
    desc: "Seamless automation that handles tedious data sorting, emails, and triggers, allowing your team to focus on strategic execution.",
  },
  {
    icon: Bot,
    title: "Conversational Copilots",
    desc: "Deep context-aware AI assistants that integrate with your codebase, documentation, or CRM to help answer queries instantly.",
  },
  {
    icon: Code2,
    title: "Code Intelligence",
    desc: "Predictive syntax completion, security vulnerability scanning, and refactoring recommendations built straight into your IDE workflow.",
  },
  {
    icon: Brain,
    title: "Cognitive Parsing",
    desc: "Extract structured JSON details from unstructured documents, receipts, PDFs, or audio logs with up to 99.8% precision.",
  },
  {
    icon: Terminal,
    title: "Neural APIs",
    desc: "Add language generation, semantic search vectors, and voice synthesizers to your custom apps with a single line of code.",
  },
  {
    icon: Cpu,
    title: "Autonomous Decision Support",
    desc: "Analyze business metrics in real-time to spot outliers, forecast demand shifts, and recommend critical resource re-allocations.",
  },
];

export default function ArtificialIntelligence() {
  const pageStyle = {
    "--glow-color": "rgba(0, 212, 255, 0.08)",
    "--accent-theme-color": "var(--color-accent-cyan)",
    "--badge-bg-color": "rgba(0, 212, 255, 0.05)",
    "--border-theme-color": "rgba(0, 212, 255, 0.15)",
  };

  return (
    <div className="ecosystem-page" style={pageStyle}>
      <Helmet>
        <title>Artificial Intelligence (AI) — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Accelerate your workflow with Graxion AI. Build smart applications, automate documents, spin up custom neural agents, and unlock the power of cognitive modeling."
        />
        <meta name="keywords" content="Graxion AI, Artificial Intelligence, cognitive modeling, workflow automation, custom neural agents, predictive analytics" />
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
              <Brain size={14} style={{ marginRight: 6 }} />
              Graxion AI Vertical
            </motion.div>
            
            <motion.h1
              className="ecosystem-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Intelligence That Amplifies <br />
              <span className="text-gradient">Human Ingenuity</span>
            </motion.h1>

            <motion.p
              className="ecosystem-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              We design state-of-the-art neural engines, document intelligence modules, 
              and agent systems engineered to automate complexity and unleash creative potential.
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
              <h2 className="ecosystem-overview-title">Cognitive Foundations Built for Scale</h2>
              <p className="ecosystem-overview-desc">
                Graxion AI is built directly on state-of-the-art neural architectures. 
                Whether you need high-velocity text summarization, multi-modal vision parsing, 
                or complex reasoning paths, our platform scales securely to meet the most demanding workloads.
              </p>
              <p className="ecosystem-overview-desc">
                We believe in responsible, transparent AI. Your data is strictly yours — it is 
                never stored, logged, or utilized to retrain base models without explicit team authorization.
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
              <div className="status-badge active">
                <span className="status-summary-icon" style={{ width: 8, height: 8, display: 'inline-block', marginRight: 4 }}></span>
                Active & Deployable
              </div>

              <div className="status-info-row">
                <span className="status-info-label">Active Subdomain</span>
                <span className="status-info-val status-subdomain">ai.graxion.in</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Average API Latency</span>
                <span className="status-info-val">42ms</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Encryption Level</span>
                <span className="status-info-val">AES-GCM 256</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Compliance</span>
                <span className="status-info-val">SOC2 Type II</span>
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
              Discover the robust feature set driving intelligent automation across our vertical suite.
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
            <h2 className="ecosystem-cta-title">Ready to Integrate AI?</h2>
            <p className="ecosystem-cta-desc">
              Get started by exploring our API reference documentation or talking to our engineers 
              about setting up dedicated nodes for enterprise operations.
            </p>
            <div className="ecosystem-cta-actions">
              <Link to="/resources/documentation">
                <Button variant="primary" size="md">Explore API Docs</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md">Request Access</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
