import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Legal.css";

export default function Privacy() {
  return (
    <motion.div
      className="legal-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Privacy Policy — Graxion</title>
        <meta
          name="description"
          content="Graxion Privacy Policy — Learn how we collect, use, and protect your personal information."
        />
      </Helmet>

      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: July 2026</p>
        </div>

        <div className="legal-content">
          <h2>Introduction</h2>
          <p>
            At Graxion, we believe that trust is impossible without security,
            and security begins with privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you
            visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect information about you in a variety of ways:</p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Name, email address, and other
              contact information you voluntarily provide when contacting us or
              signing up for our services.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website, including pages visited, time spent, and
              navigation paths.
            </li>
            <li>
              <strong>Device Data:</strong> Browser type, operating system, IP
              address, and device identifiers for analytics and security
              purposes.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our services</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about updates and announcements</li>
            <li>Detect, prevent, and address security threats</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information. However, no method of transmission over the
            Internet is 100% secure. We strive to use commercially acceptable
            means to protect your data, but cannot guarantee absolute security.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services that collect, monitor, and analyze
            information to improve our service. These third parties have their
            own privacy policies addressing how they use such information.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information at any time. You may also opt out of marketing
            communications by contacting us at{" "}
            <a href="mailto:privacy@graxion.in">privacy@graxion.in</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at <a href="mailto:privacy@graxion.in">privacy@graxion.in</a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
