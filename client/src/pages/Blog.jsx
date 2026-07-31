import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BookOpen, Search, ArrowRight, Rss } from "lucide-react";
import Button from "../components/Button/Button";
import "./CompanyPages.css";

const categories = ["All", "AI & Intelligence", "Cloud Ops", "Cyber Security", "Engineering Culture"];

const articles = [
  {
    category: "AI & Intelligence",
    date: "July 28, 2026",
    title: "Designing Sub-50ms Multi-Modal Extraction Pipelines",
    summary: "A behind-the-scenes look at how we optimized neural reasoning models and caching architectures to process unstructured PDFs and documents instantly.",
  },
  {
    category: "Cyber Security",
    date: "July 12, 2026",
    title: "Zero-Trust: Why VPNs are Stale for Modern API Guards",
    summary: "Exploring cryptographic token keys, hardware vaults, and edge firewalls to ensure secure service-to-service communication.",
  },
  {
    category: "Cloud Ops",
    date: "June 30, 2026",
    title: "Bare-Metal MicroVM Virtualization for Web Scaling",
    summary: "How eliminating standard hypervisor overhead and prioritizing microVM configurations yields up to 40% faster execution metrics for Node APIs.",
  },
  {
    category: "Engineering Culture",
    date: "June 15, 2026",
    title: "Flat Organizational Models in Fast-Paced Technology Teams",
    summary: "Reflecting on how giving developers direct code-ownership and cutting down management layers enables faster product shipping timelines.",
  },
  {
    category: "AI & Intelligence",
    date: "May 25, 2026",
    title: "Responsible Data Policies for Retraining Large Language Systems",
    summary: "A transparent statement on our data containment boundaries. Why your business queries are never utilized to train shared AI models.",
  },
  {
    category: "Cloud Ops",
    date: "May 08, 2026",
    title: "Optimizing Serverless Cold Starts at the Global Edge Network",
    summary: "Tricks and guidelines to structure bundlers and edge scripts to ensure edge workers trigger and return data with zero latency.",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="company-page">
      <Helmet>
        <title>Graxion Blog — Technical Insights & Engineering Logs</title>
        <meta
          name="description"
          content="Read the latest insights from the Graxion team. In-depth write-ups on Artificial Intelligence, Cloud Infrastructure, Cyber Security, and Engineering culture."
        />
        <meta name="keywords" content="Graxion blog, software engineering tips, AI model optimization, cloud architecture, secure infrastructure, zero-trust" />
      </Helmet>

      {/* Hero Section */}
      <section className="company-hero">
        <div className="container">
          <div className="company-hero-content">
            <motion.div
              className="company-hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Rss size={14} style={{ marginRight: 6 }} />
              Graxion Insights & Logs
            </motion.div>
            
            <motion.h1
              className="company-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Deep Dives Into <br />
              <span className="text-gradient">Modern Tech Architecture</span>
            </motion.h1>

            <motion.p
              className="company-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Engineering guides, security advisories, serverless optimization tricks, 
              and culture logs straight from the Graxion development team.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Chips Section */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="about-values-grid" style={{ marginBottom: '1rem', maxWidth: '900px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="about-value-chip"
              style={{
                borderColor: activeCategory === cat ? 'var(--color-accent-purple)' : 'var(--color-border)',
                color: activeCategory === cat ? 'var(--color-accent-purple)' : 'var(--color-text-primary)',
                background: activeCategory === cat ? 'rgba(124, 58, 237, 0.05)' : 'var(--color-bg-glass)',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid Section */}
      <section className="blog-posts-section">
        <div className="container">
          <div className="blog-grid">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.title}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="blog-thumbnail-sim">
                  <span className="blog-tag">{article.category}</span>
                  <BookOpen size={48} style={{ opacity: 0.08, color: 'var(--color-accent-purple)' }} />
                </div>
                <div className="blog-card-content">
                  <span className="blog-meta-info">{article.date}</span>
                  <h3 className="blog-title-link">{article.title}</h3>
                  <p className="blog-summary">{article.summary}</p>
                  <span className="blog-read-more">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="blog-newsletter section">
        <div className="container">
          <motion.div
            className="newsletter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="company-hero-title" style={{ fontSize: 'var(--text-h2)' }}>Subscribe to Graxion Tech logs</h2>
            <p className="company-hero-subtitle" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              No spam. Just structured engineering briefs, security patches, and release logs 
              delivered directly to your inbox every couple of weeks.
            </p>

            {subscribed ? (
              <div style={{ marginTop: '2rem', color: 'var(--color-accent-emerald)', fontWeight: 'bold' }}>
                ✓ Subscription Successful! Thank you for joining our developer log.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="primary" size="md" type="submit">
                  Subscribe
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
