import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Contact from "../sections/Contact/Contact";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us — Graxion</title>
        <meta
          name="description"
          content="Get in touch with Graxion. Whether you're a business, developer, or partner — we'd love to hear from you."
        />
      </Helmet>

      <motion.section
        className="contact-page-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="contact-page-hero-content">
            <motion.h1
              className="contact-page-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="contact-page-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Have a question, a partnership idea, or want to join our journey?
              We're always open to meaningful conversations.
            </motion.p>
          </div>
        </div>
      </motion.section>

      <Contact />
    </div>
  );
}
