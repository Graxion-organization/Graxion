import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Book, ChevronRight, Terminal } from "lucide-react";
import "./ResourcesPages.css";

const docSections = [
  {
    title: "Getting Started",
    links: ["Overview", "Installation", "Quickstart Guide"],
  },
  {
    title: "CLI Tooling",
    links: ["CLI Introduction", "Common Commands", "Configuring Environments"],
  },
  {
    title: "Deployments",
    links: ["Deploying to Cloud", "CI/CD Pipelines", "SSL & Domains"],
  },
  {
    title: "Security",
    links: ["API Keys", "Vault Encryption", "Access Policy"],
  },
];

export default function Documentation() {
  const [activeLink, setActiveLink] = useState("Overview");

  return (
    <div className="resources-page">
      <Helmet>
        <title>Documentation — Graxion Technical Guides & Setup</title>
        <meta
          name="description"
          content="Learn how to install, configure, and scale applications on the Graxion ecosystem. CLI references, vault encryption guides, and cloud deploy steps."
        />
        <meta name="keywords" content="Graxion docs, developer CLI commands, install SDK, API authentication, cloud deployments" />
      </Helmet>

      <div className="container">
        <div className="docs-layout">
          {/* Left Sidebar */}
          <aside className="docs-sidebar">
            {docSections.map((section) => (
              <div key={section.title} className="docs-sidebar-section">
                <h3 className="docs-sidebar-title">{section.title}</h3>
                <div className="docs-sidebar-links">
                  {section.links.map((link) => (
                    <button
                      key={link}
                      onClick={() => setActiveLink(link)}
                      className={`docs-sidebar-link ${activeLink === link ? "active" : ""}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Right Content */}
          <main className="docs-main">
            <motion.div
              key={activeLink}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="docs-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-accent-cyan)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: 'var(--text-caption)', fontWeight: 'bold' }}>
                  <Book size={14} /> Documentation <ChevronRight size={12} /> {activeLink}
                </div>
                <h1 className="docs-title">{activeLink}</h1>

                {activeLink === "Overview" && (
                  <>
                    <p className="docs-text">
                      Welcome to the Graxion Documentation Center. Graxion is a global technology ecosystem 
                      engineered to support intelligent application hosting, zero-trust token storage, 
                      developer tooling, and automated workflows.
                    </p>
                    <p className="docs-text">
                      This documentation provides comprehensive details for our command-line tools, core APIs, 
                      hosting setups, and system credentials security. Select a guide on the left sidebar to start.
                    </p>
                  </>
                )}

                {activeLink === "Installation" && (
                  <>
                    <p className="docs-text">
                      Our command-line tool matches with modern package utilities. You can scaffold applications, 
                      verify environments, and deploy cloud instances with simple terminal commands.
                    </p>
                    <p className="docs-text">
                      Install the core Graxion CLI globally using your favorite package manager:
                    </p>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">bash</span>
                      $ npm install -g @graxion/cli
                    </div>
                    <p className="docs-text">
                      Or, if you use Yarn packages:
                    </p>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">bash</span>
                      $ yarn global add @graxion/cli
                    </div>
                  </>
                )}

                {activeLink === "Quickstart Guide" && (
                  <>
                    <p className="docs-text">
                      Ready to build your first template? Execute the CLI init wizard to establish a modern project:
                    </p>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">bash</span>
                      $ graxion init my-awesome-app
                    </div>
                    <p className="docs-text">
                      This scans, downloads base React/Node boilerplate templates, configures variables, 
                      and sets up workspace keys. Once complete, navigate into your directory and launch development servers:
                    </p>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">bash</span>
                      $ cd my-awesome-app<br />
                      $ graxion dev
                    </div>
                  </>
                )}

                {/* Additional tabs return elegant mock content to keep pages look complete and rich */}
                {!["Overview", "Installation", "Quickstart Guide"].includes(activeLink) && (
                  <>
                    <p className="docs-text">
                      This section details configurations, parameters, and guidelines associated with <strong>{activeLink}</strong>.
                    </p>
                    <p className="docs-text">
                      To integrate these features, modify the `graxion.config.json` schema inside your workspace:
                    </p>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">json</span>
                      {`{\n  "version": "1.0.0",\n  "service": "${activeLink.toLowerCase().replace(/\s+/g, '-')}",\n  "settings": {\n    "environment": "production",\n    "enableSecurityOverrides": false\n  }\n}`}
                    </div>
                    <p className="docs-text">
                      Refer to the developer community boards if you run into environment configuration errors.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
