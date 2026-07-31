import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Legal.css";

export default function CookiePolicy() {
  return (
    <motion.div
      className="legal-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Cookie Policy — Graxion</title>
        <meta
          name="description"
          content="Graxion Cookie Policy — Learn about how we use cookies, tracking variables, and operational cache to optimize our web apps."
        />
        <meta name="keywords" content="Graxion cookie policy, tracking cookies, functional storage variables, analytics tools consent" />
      </Helmet>

      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-updated">Last updated: July 2026</p>
        </div>

        <div className="legal-content">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your computer or device when you load websites. 
            They are widely used to make web apps run, remember your session authentication, 
            and feed analytics data to page administrators.
          </p>

          <h2>How Graxion Uses Cookies</h2>
          <p>
            We use cookies to improve your navigation experience, save account settings, 
            and inspect website loading speeds. We divide our cookies into the following classifications:
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Necessary to run our secure student portal, 
              API routing, and save basic privacy settings. These cannot be disabled.
            </li>
            <li>
              <strong>Functional Storage:</strong> Remembers your layout configurations, e.g. active 
              dark mode settings or side navigation choices in documentation pages.
            </li>
            <li>
              <strong>Performance & Analytics:</strong> Feeds anonymous telemetry metrics (loading speeds, 
              clicked links) to help us optimize server capacity and documentation clarity.
            </li>
          </ul>

          <h2>Managing Your Cookie Preferences</h2>
          <p>
            Most modern web browsers allow you to block or clear cookies via browser preferences. 
            Note that disabling essential cookies will prevent logging into your dashboards or running 
            API trials safely.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may adjust this Cookie Policy from time to time. When we make updates, we will revise the 
            "Last updated" timestamp at the top of this page.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about our cookie configurations or data practices, contact us at{" "}
            <a href="mailto:privacy@graxion.in">privacy@graxion.in</a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
