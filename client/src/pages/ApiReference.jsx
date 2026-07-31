import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Code2, ChevronRight } from "lucide-react";
import "./ResourcesPages.css";

const apiSections = [
  {
    title: "Authentication",
    endpoints: ["POST /v1/auth/token", "GET /v1/auth/session"],
  },
  {
    title: "AI & Cognitive Models",
    endpoints: ["POST /v1/ai/completions", "POST /v1/ai/embeddings", "POST /v1/ai/document/parse"],
  },
  {
    title: "Compute Nodes",
    endpoints: ["GET /v1/compute/nodes", "POST /v1/compute/nodes/create", "POST /v1/compute/nodes/reboot"],
  },
];

export default function ApiReference() {
  const [activeEndpoint, setActiveEndpoint] = useState("POST /v1/auth/token");

  return (
    <div className="resources-page">
      <Helmet>
        <title>API Reference — Graxion Developer Interface</title>
        <meta
          name="description"
          content="Interact with the Graxion developer interface. Explore HTTP endpoints, header authentications, request JSON body structures, and response samples."
        />
        <meta name="keywords" content="Graxion API endpoints, token authentication HTTP, AI completions request, compute nodes controller" />
      </Helmet>

      <div className="container">
        <div className="docs-layout">
          {/* Left Sidebar */}
          <aside className="docs-sidebar">
            {apiSections.map((section) => (
              <div key={section.title} className="docs-sidebar-section">
                <h3 className="docs-sidebar-title">{section.title}</h3>
                <div className="docs-sidebar-links">
                  {section.endpoints.map((ep) => (
                    <button
                      key={ep}
                      onClick={() => setActiveEndpoint(ep)}
                      className={`docs-sidebar-link ${activeEndpoint === ep ? "active" : ""}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {ep}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Right Content */}
          <main className="docs-main">
            <motion.div
              key={activeEndpoint}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="docs-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-accent-cyan)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: 'var(--text-caption)', fontWeight: 'bold' }}>
                  <Code2 size={14} /> API Endpoint Reference <ChevronRight size={12} /> {activeEndpoint}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                  <span className={`api-endpoint-badge ${activeEndpoint.startsWith("GET") ? "get" : "post"}`}>
                    {activeEndpoint.split(" ")[0]}
                  </span>
                  <h1 className="docs-title" style={{ margin: 0, fontSize: '1.75rem' }}>
                    {activeEndpoint.split(" ")[1]}
                  </h1>
                </div>

                {activeEndpoint === "POST /v1/auth/token" && (
                  <>
                    <p className="docs-text">
                      Exchange your developer workspace client credentials for a temporary, secure 
                      access token. This token remains valid for 3600 seconds (1 hour).
                    </p>

                    <h3 className="docs-subtitle">Request Body Parameters</h3>
                    <table className="api-table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Requirement</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>client_id</td>
                          <td>string</td>
                          <td style={{ color: 'var(--color-accent-rose)' }}>Required</td>
                          <td>Your workspace client ID identifier.</td>
                        </tr>
                        <tr>
                          <td style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>client_secret</td>
                          <td>string</td>
                          <td style={{ color: 'var(--color-accent-rose)' }}>Required</td>
                          <td>Your workspace secret keys. Protect this token.</td>
                        </tr>
                      </tbody>
                    </table>

                    <h3 className="docs-subtitle">Sample curl Request</h3>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">bash</span>
                      curl -X POST https://api.graxion.in/v1/auth/token \<br />
                      &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                      &nbsp;&nbsp;{`-d '{"client_id": "gx_123", "client_secret": "sk_abc456"}'`}
                    </div>

                    <h3 className="docs-subtitle">JSON Response Sample</h3>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">json</span>
                      {`{\n  "access_token": "gx_tok_xyz789...",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}`}
                    </div>
                  </>
                )}

                {activeEndpoint !== "POST /v1/auth/token" && (
                  <>
                    <p className="docs-text">
                      Executes standard instructions associated with endpoint: <code>{activeEndpoint.split(" ")[1]}</code>. 
                      Requires Bearer token authorization in the request headers.
                    </p>
                    
                    <h3 className="docs-subtitle">Headers Required</h3>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">headers</span>
                      Authorization: Bearer gx_tok_xyz789...<br />
                      Content-Type: application/json
                    </div>

                    <h3 className="docs-subtitle">Sample curl Request</h3>
                    <div className="codeblock-sim">
                      <span className="codeblock-lang">bash</span>
                      curl -X {activeEndpoint.split(" ")[0]} https://api.graxion.in{activeEndpoint.split(" ")[1]} \<br />
                      &nbsp;&nbsp;-H "Authorization: Bearer $GRAXION_API_KEY"
                    </div>

                    <h3 className="docs-subtitle">Response Schema Description</h3>
                    <p className="docs-text">
                      Returns a JSON object detailing operation state, timestamp, and query metadata payloads.
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
