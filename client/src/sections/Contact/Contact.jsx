import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Send } from "lucide-react";
import Button from "../../components/Button/Button";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Contact.css";

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: connect to backend
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <section className="contact section" id="contact">
      <div className="container" ref={ref}>
        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div
                className="section-header-overline"
                style={{ justifyContent: "flex-start", marginBottom: "1.5rem" }}
              >
                <span>Contact Us</span>
              </div>
              <h2 className="contact-headline">
                Let's Build the Future{" "}
                <span className="text-gradient">Together</span>
              </h2>
            </div>
            <p className="contact-desc">
              Whether you're a business looking for technology solutions, a
              developer interested in our platforms, or someone who shares our
              vision — we'd love to hear from you.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Mail size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Email</span>
                  <span className="contact-detail-value">
                    hello@graxion.in
                  </span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Globe size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Website</span>
                  <span className="contact-detail-value">graxion.in</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <MapPin size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">India · Global</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact-form-wrapper"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <motion.div className="contact-form-group" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <label className="contact-form-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="contact-form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div className="contact-form-group" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <label className="contact-form-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="contact-form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
              </div>

              <motion.div className="contact-form-group" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="contact-form-label" htmlFor="contact-subject">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="contact-form-select"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="business">Business Partnership</option>
                  <option value="careers">Careers</option>
                  <option value="press">Press & Media</option>
                  <option value="support">Support</option>
                </select>
              </motion.div>

              <motion.div className="contact-form-group" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="contact-form-label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact-form-textarea"
                  placeholder="Tell us about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div className="contact-form-submit" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<Send size={16} />}
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
