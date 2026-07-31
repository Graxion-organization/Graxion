import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Shield, Lock, Eye, Key, FileCheck, ShieldCheck, Activity } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./EcosystemVertical.css";

const features = [
  {
    icon: Lock,
    title: "Zero-Trust Identity Vault",
    desc: "Coordinate authentication flows safely using hardware keys, multi-factor tokens, and biometric logs.",
  },
  {
    icon: ShieldCheck,
    title: "Edge WAF Inspection",
    desc: "Inspect network traffic at the edge to instantly block SQL injections, cross-site scripting, and malware payloads.",
  },
  {
    icon: Key,
    title: "Key Custody Service",
    desc: "Securely generate, roll, and manage encryption keys within dedicated hardware security modules (HSM).",
  },
  {
    icon: Eye,
    title: "Vulnerability Scanning",
    desc: "Auto-scan server environments and dependencies to identify configuration weaknesses or stale packages.",
  },
  {
    icon: Activity,
    title: "Real-Time Threat Grids",
    desc: "Observe real-time traffic anomalies and trace security alerts on an interactive threat telemetry console.",
  },
  {
    icon: FileCheck,
    title: "Automated Auditing",
    desc: "Compile detailed audit trails and access sheets to simplify SOC2, HIPAA, or GDPR compliance reporting.",
  },
];

export default function CyberSecurity() {
  const pageStyle = {
    "--glow-color": "rgba(16, 185, 129, 0.08)",
    "--accent-theme-color": "var(--color-accent-emerald)",
    "--badge-bg-color": "rgba(16, 185, 129, 0.05)",
    "--border-theme-color": "rgba(16, 185, 129, 0.15)",
  };

  return (
    <div className="ecosystem-page" style={pageStyle}>
      <Helmet>
        <title>Cyber Security Solutions — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Establish absolute trust with Graxion Cyber Security. Zero-trust token vaults, edge web application firewalls, auto-rotated HSM keys, and threat diagnostics."
        />
        <meta name="keywords" content="Graxion Security, Zero-Trust, Web Application Firewall, API protection, security auditing, encryption keys" />
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
              <Shield size={14} style={{ marginRight: 6 }} />
              Graxion Security Vertical
            </motion.div>
            
            <motion.h1
              className="ecosystem-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Trust Built Into <br />
              <span className="text-gradient">Every Execution Layer</span>
            </motion.h1>

            <motion.p
              className="ecosystem-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Protect your APIs, customer data, and server nodes with our advanced cyber security catalog. 
              Because long-term trust is more valuable than short-term gains.
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
              <h2 className="ecosystem-overview-title">Security is Never an Afterthought</h2>
              <p className="ecosystem-overview-desc">
                Many modern organizations only think about security after a breach occurs. 
                We believe protection must be designed from the start. That is why all Graxion products 
                have key encryption, network isolation, and zero-trust policies enabled by default.
              </p>
              <p className="ecosystem-overview-desc">
                Our cyber security vertical exposes these same enterprise tools to your developers. 
                Spin up isolated vault storage, configure edge firewalls, or verify security logs 
                using our developer-friendly APIs.
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
                Beta Integrations Open
              </div>

              <div className="status-info-row">
                <span className="status-info-label">Active Subdomain</span>
                <span className="status-info-val status-subdomain">security.graxion.in</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Encryption Standard</span>
                <span className="status-info-val">AES-256-GCM / ChaCha20</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Key Vault Hardware</span>
                <span className="status-info-val">FIPS 140-2 Level 3 HSM</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Firewall Rule Propagation</span>
                <span className="status-info-val">&lt; 1 Second Globally</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ecosystem-features section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="ecosystem-overview-title">Security Capabilities</h2>
            <p className="ecosystem-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Hardened, verified, and continuously audited utility engines.
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
            <h2 className="ecosystem-cta-title">Audit Your Current Stack</h2>
            <p className="ecosystem-cta-desc">
              Get in touch with our security experts to set up a network vulnerabilities scan 
              or explore migrating to our zero-trust keys management system.
            </p>
            <div className="ecosystem-cta-actions">
              <Link to="/contact">
                <Button variant="primary" size="md">Consult Security Team</Button>
              </Link>
              <Link to="/security">
                <Button variant="outline" size="md">Read Security Policy</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
