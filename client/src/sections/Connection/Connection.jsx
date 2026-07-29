import { motion } from "framer-motion";
import { KeyRound, Shield, RefreshCw, LayoutDashboard, Brain, Cloud, Briefcase, Bot, Code2, Globe } from "lucide-react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Connection.css";

export default function Connection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="connection section" id="connection">
      <div className="container">
        <div className="connection-grid" ref={ref}>
          {/* Text Content */}
          <motion.div
            className="connection-content"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              overline="Unified Architecture"
              title={
                <span style={{ display: "block", lineHeight: "1.2" }}>
                  <motion.span initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }}>One Account.</motion.span><br/>
                  <motion.span initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} viewport={{ once: true }}>One Identity.</motion.span><br/>
                  <motion.span initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} viewport={{ once: true }} className="text-gradient">One Connected Experience.</motion.span>
                </span>
              }
              subtitle=""
            />
            <p className="connection-desc" style={{ marginTop: "-2rem" }}>
              Forget siloed applications and fragmented data. The Graxion ecosystem is built on a unified core architecture. You log in once, and instantly have seamless access to AI, Cloud, Business, and Developer tools.
            </p>

            <div className="connection-features">
              <div className="connection-feature">
                <div className="connection-feature-icon">
                  <KeyRound size={20} />
                </div>
                <div className="connection-feature-text">
                  <h4>Single Sign-On (SSO) Core</h4>
                  <p>One unified Graxion ID grants access across all subdomains and platforms seamlessly.</p>
                </div>
              </div>
              <div className="connection-feature">
                <div className="connection-feature-icon">
                  <RefreshCw size={20} />
                </div>
                <div className="connection-feature-text">
                  <h4>Data Interoperability</h4>
                  <p>Your business data flows intelligently between CRM, AI, and Cloud storage without manual syncs.</p>
                </div>
              </div>
              <div className="connection-feature">
                <div className="connection-feature-icon">
                  <Shield size={20} />
                </div>
                <div className="connection-feature-text">
                  <h4>Centralized Security</h4>
                  <p>Manage permissions, audit logs, and compliance across your entire organization from one dashboard.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Abstract Orbit Diagram */}
          <motion.div
            className="connection-diagram"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Center Core */}
            <div className="connection-center">
              <span className="connection-center-text">Graxion ID</span>
            </div>

            {/* Inner Orbit */}
            <div className="connection-orbit inner">
              <div className="connection-node"><Brain size={20} /></div>
              <div className="connection-node"><Cloud size={20} /></div>
              <div className="connection-node"><Briefcase size={20} /></div>
              <div className="connection-node"><LayoutDashboard size={20} /></div>
            </div>

            {/* Outer Orbit */}
            <div className="connection-orbit outer">
              <div className="connection-node"><Bot size={20} /></div>
              <div className="connection-node"><Code2 size={20} /></div>
              <div className="connection-node"><Shield size={20} /></div>
              <div className="connection-node"><Globe size={20} /></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
