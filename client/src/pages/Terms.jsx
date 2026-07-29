import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Legal.css";

export default function Terms() {
  return (
    <motion.div
      className="legal-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Terms of Service — Graxion</title>
        <meta
          name="description"
          content="Graxion Terms of Service — Read the terms and conditions governing your use of Graxion's products and services."
        />
      </Helmet>

      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-updated">Last updated: July 2026</p>
        </div>

        <div className="legal-content">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using Graxion's website and services, you agree to
            be bound by these Terms of Service. If you do not agree with any
            part of these terms, you may not access our services.
          </p>

          <h2>Description of Services</h2>
          <p>
            Graxion provides a global technology ecosystem including but not
            limited to artificial intelligence products, business software,
            cloud computing services, developer platforms, and educational
            technology. We reserve the right to modify, suspend, or discontinue
            any part of our services at any time.
          </p>

          <h2>User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate and
            complete information. You are responsible for safeguarding your
            account credentials and for any activity that occurs under your
            account.
          </p>

          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for any unlawful purpose</li>
            <li>
              Attempt to gain unauthorized access to our systems or networks
            </li>
            <li>Interfere with or disrupt the integrity of our services</li>
            <li>
              Transmit any material that is harmful, offensive, or violates
              third-party rights
            </li>
            <li>
              Use automated systems to access our services without permission
            </li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property on Graxion's
            website and services are owned by or licensed to Graxion. You may
            not reproduce, distribute, or create derivative works without our
            express written consent.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Graxion shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of our services.
          </p>

          <h2>Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our
            services at our sole discretion, without prior notice, for conduct
            that we believe violates these Terms or is harmful to other users
            or Graxion.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current
            version will always be available on this page. By continuing to use
            our services after revisions become effective, you agree to be bound
            by the revised terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to conflict of law provisions.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@graxion.in">legal@graxion.in</a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
