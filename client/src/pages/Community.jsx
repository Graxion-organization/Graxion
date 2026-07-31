import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Users, MessagesSquare, GitBranch, MessageCircle, Calendar } from "lucide-react";
import Button from "../components/Button/Button";
import "./ResourcesPages.css";

const channels = [
  {
    icon: MessageCircle,
    title: "Discord Chat Server",
    desc: "Join our active Discord channel to collaborate with thousands of builders, ask syntax queries, and share mock creations.",
    action: "Join Discord Server",
    link: "https://discord.gg/graxion",
  },
  {
    icon: GitBranch,
    title: "GitHub Repositories",
    desc: "Contribute to our open-source templates, CLI tools, documentation pages, or view issues boards directly on GitHub.",
    action: "Explore on GitHub",
    link: "https://github.com/graxion",
  },
  {
    icon: MessagesSquare,
    title: "Slack Workspaces",
    desc: "For enterprise customers. Connect with Graxion solutions architects and engineers in dedicated shared workspaces.",
    action: "Request Shared Channel",
    link: "/contact",
  },
  {
    icon: Calendar,
    title: "Developer Meetups",
    desc: "Register for upcoming developer webinars, virtual hackathons, Q&A panels, and localized community meetups.",
    action: "Browse Events Calendar",
    link: "#events",
  },
];

export default function Community() {
  return (
    <div className="resources-page" style={{ paddingBottom: '5rem' }}>
      <Helmet>
        <title>Developer Community — Graxion | Forums & Chat Channels</title>
        <meta
          name="description"
          content="Connect with other developers on the Graxion ecosystem. Access Discord chat channels, Slack workspaces, GitHub repository issues, and community events."
        />
        <meta name="keywords" content="Graxion developer community, join Discord developer server, GitHub open source, technical webinars, dev events" />
      </Helmet>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            className="ecosystem-hero-badge"
            style={{ color: 'var(--color-accent-cyan)', background: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.15)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Users size={14} style={{ marginRight: 6 }} />
            Developer Hub
          </motion.div>

          <motion.h1
            className="docs-title"
            style={{ fontSize: 'var(--text-h1)', marginTop: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Connect With the <br />
            <span className="text-gradient">Graxion Developer Community</span>
          </motion.h1>

          <motion.p
            className="docs-text"
            style={{ maxWidth: '600px', margin: '0.75rem auto 0' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Whether you are asking configuration questions, reporting bugs, or building open-source plugins, 
            our channels are open to help you succeed.
          </motion.p>
        </div>

        {/* Community Grid */}
        <div className="community-grid">
          {channels.map((chan, idx) => {
            const Icon = chan.icon;
            return (
              <motion.div
                key={chan.title}
                className="community-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="community-card-icon">
                  <Icon size={22} />
                </div>
                <h3 className="community-card-title">{chan.title}</h3>
                <p className="community-card-desc">{chan.desc}</p>
                <a href={chan.link} target={chan.link.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" style={{ textDecoration: 'none', marginTop: 'auto', paddingTop: '1rem' }}>
                  <Button variant="outline" size="sm">
                    {chan.action}
                  </Button>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Contribution Guide Banner */}
        <motion.div
          className="ecosystem-cta-card"
          style={{ marginTop: '5rem' }}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="ecosystem-cta-title">Become a Graxion Contributor</h2>
          <p className="ecosystem-cta-desc">
            We welcome open-source contributions to our documentation, sample repositories, and SDK structures. 
            Read our contributing guidelines on GitHub to send a pull request.
          </p>
          <a href="https://github.com/graxion" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="md">
              <GitBranch size={16} style={{ marginRight: 8, display: 'inline', verticalAlign: 'middle' }} />
              Browse Repositories
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
