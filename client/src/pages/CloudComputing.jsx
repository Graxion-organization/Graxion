import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Cloud, Server, Database, Globe, Network, Terminal, ShieldAlert } from "lucide-react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./EcosystemVertical.css";

const features = [
  {
    icon: Server,
    title: "Virtual Compute Nodes",
    desc: "Spin up secure virtual servers in seconds with dedicated CPU, high-velocity NVMe SSDs, and customizable RAM allocations.",
  },
  {
    icon: Database,
    title: "Managed SQL Databases",
    desc: "Deploy highly scalable Postgres, MySQL, or Redis database nodes with automatic daily backups, clustering, and auto-failovers.",
  },
  {
    icon: Globe,
    title: "Global CDN Edge",
    desc: "Serve static assets and heavy files directly from our global edge network, decreasing loading speeds for global users.",
  },
  {
    icon: Network,
    title: "Secure VPC Networks",
    desc: "Keep private databases completely isolated behind virtual networks, secure software firewalls, and custom subnets.",
  },
  {
    icon: Terminal,
    title: "Edge Workers",
    desc: "Deploy serverless JS code directly on edge nodes globally, executing computations close to users with minimal latency.",
  },
  {
    icon: ShieldAlert,
    title: "Advanced DDoS Shields",
    desc: "Built-in traffic monitors inspect requests to absorb volumetric server attacks automatically before they hit your nodes.",
  },
];

export default function CloudComputing() {
  const pageStyle = {
    "--glow-color": "rgba(59, 130, 246, 0.08)",
    "--accent-theme-color": "var(--color-accent-blue)",
    "--badge-bg-color": "rgba(59, 130, 246, 0.05)",
    "--border-theme-color": "rgba(59, 130, 246, 0.15)",
  };

  return (
    <div className="ecosystem-page" style={pageStyle}>
      <Helmet>
        <title>Cloud Computing Infrastructure — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Deploy applications globally on Graxion Cloud. Experience high-performance compute nodes, auto-scaling clusters, managed DBs, and secure VPC networks."
        />
        <meta name="keywords" content="Graxion Cloud, Cloud Computing, serverless edge, Postgres hosting, managed SQL nodes, secure VPC" />
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
              <Cloud size={14} style={{ marginRight: 6 }} />
              Graxion Cloud Vertical
            </motion.div>
            
            <motion.h1
              className="ecosystem-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              High-Performance Infrastructure <br />
              <span className="text-gradient">For Modern Developers</span>
            </motion.h1>

            <motion.p
              className="ecosystem-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Build, run, and scale applications on Graxion's global cloud network. 
              Designed for speed, built for security, and priced for growth.
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
              <h2 className="ecosystem-overview-title">Scale Without Configuration Complexities</h2>
              <p className="ecosystem-overview-desc">
                Deploying servers shouldn't require a PhD in DevOps. Graxion Cloud simplifies 
                server creation, network mapping, and storage configuration so you can deploy application builds in a couple of clicks.
              </p>
              <p className="ecosystem-overview-desc">
                Our infrastructure is built on raw bare-metal speeds. By eliminating hypervisor bloat and 
                focusing on hardware execution layers, your APIs run up to 40% faster than traditional shared cloud setups.
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
                Alpha Trials Open
              </div>

              <div className="status-info-row">
                <span className="status-info-label">Active Subdomain</span>
                <span className="status-info-val status-subdomain">cloud.graxion.in</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Virtualization Model</span>
                <span className="status-info-val">Graxion MicroVM</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Storage Standard</span>
                <span className="status-info-val">NVMe Gen 4 RAID-10</span>
              </div>
              <div className="status-info-row">
                <span className="status-info-label">Global Regions</span>
                <span className="status-info-val">6 Locations Scheduled</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ecosystem-features section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="ecosystem-overview-title">Infrastructure Features</h2>
            <p className="ecosystem-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Engineered from the ground up for massive scaling capabilities.
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
            <h2 className="ecosystem-cta-title">Apply for Infrastructure Credits</h2>
            <p className="ecosystem-cta-desc">
              We offer startup packages and free development credits for testing new products. 
              Register your workspace today to verify eligibility.
            </p>
            <div className="ecosystem-cta-actions">
              <Link to="/contact">
                <Button variant="primary" size="md">Apply for Credits</Button>
              </Link>
              <Link to="/resources/documentation">
                <Button variant="outline" size="md">View Deploy Guides</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
