import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Legal.css";

export default function Security() {
  return (
    <motion.div
      className="legal-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Security Practices — Graxion Ecosystem</title>
        <meta
          name="description"
          content="Graxion Security Practices — Review our zero-trust infrastructure, data encryption layers, compliance audits, and bug bounty policy."
        />
        <meta name="keywords" content="Graxion security, vulnerability disclosure, report bug bounty, SOC2 compliance, data encryption standards" />
      </Helmet>

      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Security Practices</h1>
          <p className="legal-updated">Last updated: July 2026</p>
        </div>

        <div className="legal-content">
          <h2>Our Core Security Philosophy</h2>
          <p>
            At Graxion, trust is impossible without security. We built our entire global technology 
            ecosystem with a default-secure engineering methodology. Every compute node, key database, 
            and student credential block is protected with robust cryptographic standards.
          </p>

          <h2>Data Protection & Encryption</h2>
          <p>
            We implement industry-standard encryption practices to secure customer data across our platforms:
          </p>
          <ul>
            <li>
              <strong>Data in Transit:</strong> All web requests, client connections, and API calls 
              are enforced using TLS 1.3 with strong cipher suites.
            </li>
            <li>
              <strong>Data at Rest:</strong> Server databases, key files, and object containers 
              are encrypted using AES-GCM-256 at the physical storage controller level.
            </li>
            <li>
              <strong>Zero-Trust Authorization:</strong> Internal APIs verify tokens cryptographically 
              on every single request path. There are no trusted internal networks.
            </li>
          </ul>

          <h2>Compliance & Third-Party Audits</h2>
          <p>
            Our infrastructure systems are subjected to regular external threat penetration scans. 
            We maintain active SOC2 Type II compliance reviews and build features following GDPR and HIPAA principles.
          </p>

          <h2>Coordinated Vulnerability Disclosure (Bug Bounty)</h2>
          <p>
            If you identify a security vulnerability in any Graxion service, please coordinate a private report 
            with our security response squad:
          </p>
          <ul>
            <li>
              Send detailed reproduction steps, curl targets, and proof-of-concept scripts to{" "}
              <a href="mailto:security@graxion.in">security@graxion.in</a>.
            </li>
            <li>
              Do not disclose the issue publicly until our team patches the threat and gives green validation.
            </li>
            <li>
              We offer cash rewards (bug bounty) for verified, non-public vulnerability reports depending on threat level.
            </li>
          </ul>

          <h2>Contact Security</h2>
          <p>
            For urgent security inquiries, PGP keys requests, or compliance audit reports, 
            contact our Security Response Team at <a href="mailto:security@graxion.in">security@graxion.in</a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
