import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Brain,
  Briefcase,
  Cloud,
  Shield,
  Code2,
  GraduationCap,
  Microscope,
  Smartphone,
  Bot,
  Rocket,
  Mail,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Button from "../components/Button/Button";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./Products.css";

const featuredProduct = {
  name: "Graxion AI",
  tagline: "Artificial Intelligence that Amplifies Human Potential",
  description:
    "Our AI platform helps people think faster, work smarter, automate repetitive tasks, and create more value. Built with the belief that AI is not a replacement for human creativity — it is a tool that amplifies it.",
  features: [
    "Intelligent workflow automation",
    "Natural language processing",
    "Smart document analysis",
    "AI-powered decision support",
    "Custom model training",
  ],
  status: "Active",
  icon: Brain,
  color: "#00d4ff",
  subdomain: "ai.graxion.in",
};

const products = [
  {
    id: "business",
    name: "Business Software",
    description:
      "Comprehensive suite of tools designed to make businesses stronger, communication faster, and operations seamless. From CRM to project management.",
    icon: Briefcase,
    color: "#7c3aed",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    subdomain: "business.graxion.in",
    features: ["CRM & Sales Pipeline", "Project Management", "Team Collaboration"],
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    description:
      "Scalable, secure, and intelligent cloud infrastructure designed for businesses of all sizes. Deploy, scale, and manage with confidence.",
    icon: Cloud,
    color: "#3b82f6",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    subdomain: "cloud.graxion.in",
    features: ["Compute & Storage", "Managed Databases", "Auto-Scaling"],
  },
  {
    id: "security",
    name: "Cyber Security",
    description:
      "Enterprise-grade security solutions built on the principle that trust is impossible without security. Protection at every layer.",
    icon: Shield,
    color: "#10b981",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    subdomain: "security.graxion.in",
    features: ["Threat Detection", "Data Encryption", "Compliance Tools"],
  },
  {
    id: "developer",
    name: "Developer Platforms",
    description:
      "Powerful tools and platforms for developers to create, ship, and scale applications faster. Built by developers, for developers.",
    icon: Code2,
    color: "#f59e0b",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    subdomain: "dev.graxion.in",
    features: ["API Gateway", "CI/CD Pipelines", "Dev Environments"],
  },
  {
    id: "education",
    name: "Education",
    description:
      "Knowledge changes lives. Our education platform makes learning practical, accessible, and continuously evolving for students worldwide.",
    icon: GraduationCap,
    color: "#ec4899",
    status: "future",
    statusLabel: "Future",
    subdomain: "learn.graxion.in",
    features: ["Interactive Courses", "Skill Assessments", "Certifications"],
  },
  {
    id: "research",
    name: "Research",
    description:
      "Pushing the boundaries of what technology can achieve. Our research division explores AI, quantum computing, and future innovations.",
    icon: Microscope,
    color: "#8b5cf6",
    status: "future",
    statusLabel: "Future",
    subdomain: "research.graxion.in",
    features: ["AI Research Papers", "Open Datasets", "Collaboration Tools"],
  },
  {
    id: "consumer",
    name: "Consumer Applications",
    description:
      "Everyday applications designed with simplicity, intelligence, and care. Built for people who want technology that just works.",
    icon: Smartphone,
    color: "#06b6d4",
    status: "future",
    statusLabel: "Future",
    subdomain: "apps.graxion.in",
    features: ["Productivity Suite", "Communication", "Personal AI"],
  },
  {
    id: "robotics",
    name: "Robotics",
    description:
      "Bridging the digital and physical worlds through intelligent robotics. From automation to autonomous systems.",
    icon: Bot,
    color: "#f43f5e",
    status: "future",
    statusLabel: "Future",
    subdomain: "robotics.graxion.in",
    features: ["Industrial Automation", "Autonomous Systems", "IoT Integration"],
  },
  {
    id: "future",
    name: "Future Technologies",
    description:
      "Our labs division explores tomorrow's possibilities today. Innovation that looks decades ahead, not months.",
    icon: Rocket,
    color: "#a855f7",
    status: "future",
    statusLabel: "Future",
    subdomain: "labs.graxion.in",
    features: ["Quantum Computing", "AR/VR Platforms", "Biotech Interfaces"],
  },
];

export default function Products() {
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.03 });
  const [featuredRef, featuredVisible] = useScrollAnimation({ threshold: 0.1 });

  const FeaturedIcon = featuredProduct.icon;

  return (
    <div className="products-page">
      <Helmet>
        <title>Products — Graxion | Global Technology Ecosystem</title>
        <meta
          name="description"
          content="Explore Graxion's product ecosystem — AI, Cloud Computing, Cyber Security, Business Software, Developer Platforms, Education, Robotics, and more."
        />
      </Helmet>

      {/* Hero */}
      <motion.section
        className="products-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="products-hero-content">
            <motion.div
              className="products-hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Products
            </motion.div>
            <motion.h1
              className="products-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Technology That{" "}
              <span className="text-gradient">Solves Real Problems</span>
            </motion.h1>
            <motion.p
              className="products-hero-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Every Graxion product exists to make work easier, learning better,
              businesses stronger, and innovation more accessible. Explore our
              growing ecosystem.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Featured Product — AI */}
      <section className="products-featured section" ref={featuredRef}>
        <div className="container">
          <motion.div
            className="products-featured-card"
            initial={{ opacity: 0, y: 30 }}
            animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="products-featured-inner">
              <div className="products-featured-content">
                <div className="products-featured-label">
                  <span className="products-featured-label-badge">
                    ● Featured Product
                  </span>
                </div>
                <h2 className="products-featured-name">
                  {featuredProduct.name}
                </h2>
                <p className="products-featured-desc">
                  {featuredProduct.description}
                </p>
                <div className="products-featured-features">
                  {featuredProduct.features.map((feature) => (
                    <div key={feature} className="products-featured-feature">
                      <div className="products-featured-feature-icon">
                        <Check size={12} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="products-featured-cta">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<ArrowRight size={16} />}
                  >
                    Explore AI Platform
                  </Button>
                  <Button variant="secondary" size="md">
                    Documentation
                  </Button>
                </div>
              </div>
              <div className="products-featured-visual">
                <div className="products-featured-visual-icon">
                  <FeaturedIcon size={56} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="products-grid-section section">
        <div className="container">
          <SectionHeader
            overline="All Products"
            title="Building Across Every Frontier"
            subtitle="From business software to robotics — every product shares one common purpose: helping humanity move forward through technology."
          />

          <div className="products-grid" ref={gridRef}>
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  className="product-card"
                  style={{ "--card-color": product.color }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={gridVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="product-card-header">
                    <div
                      className="product-card-icon"
                      style={{
                        background: `${product.color}12`,
                        color: product.color,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span className={`product-card-status ${product.status}`}>
                      {product.statusLabel}
                    </span>
                  </div>

                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>

                  <div className="product-card-features">
                    {product.features.map((feature) => (
                      <div key={feature} className="product-card-feature">
                        <span
                          className="product-card-feature-dot"
                          style={{ background: product.color }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="product-card-footer">
                    <span className="product-card-subdomain">
                      {product.subdomain}
                    </span>
                    <ArrowUpRight size={16} className="product-card-arrow" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="products-cta section">
        <div className="container">
          <motion.div
            className="products-cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="products-cta-title">
              Have a Product Idea?
            </h2>
            <p className="products-cta-desc">
              We're always looking for meaningful problems to solve. If you have
              an idea or want to partner with us, let's talk.
            </p>
            <div className="products-cta-buttons">
              <Button
                variant="primary"
                size="lg"
                icon={<Mail size={16} />}
                href="/contact"
              >
                Contact Us
              </Button>
              <Button variant="secondary" size="lg" href="/about">
                Learn About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
