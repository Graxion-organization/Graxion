import { motion } from "framer-motion";
import { Terminal, Database, Webhook, ArrowRight } from "lucide-react";
import Button from "../../components/Button/Button";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Developers.css";

export default function Developers() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="developers section" id="developers">
      <div className="container">
        <div className="developers-grid" ref={ref}>
          {/* Text Content */}
          <motion.div
            className="developers-content"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              overline="Developer Platform"
              title={
                <span style={{ display: "block", lineHeight: "1.2" }}>
                  <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }}>Built by Developers.</motion.span><br/>
                  <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }} viewport={{ once: true }} className="text-gradient">For Developers.</motion.span>
                </span>
              }
              subtitle=""
            />
            <p className="developers-desc" style={{ marginTop: "-2rem" }}>
              Graxion isn't a closed box. We expose powerful, well-documented REST & GraphQL APIs, complete with official SDKs for major languages. Build custom integrations, automate your infrastructure, and extend our ecosystem.
            </p>

            <div className="developers-list">
              <div className="developers-item">
                <Terminal size={18} className="developers-item-icon" style={{color: "var(--color-accent-amber)"}} />
                Comprehensive REST & GraphQL APIs
              </div>
              <div className="developers-item">
                <Database size={18} className="developers-item-icon" style={{color: "var(--color-accent-cyan)"}} />
                Managed Database Solutions (Postgres, Redis)
              </div>
              <div className="developers-item">
                <Webhook size={18} className="developers-item-icon" style={{color: "var(--color-accent-purple)"}} />
                Real-time Webhooks & Event Streaming
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Button variant="secondary" size="md" icon={<ArrowRight size={16} />}>
                Read the Docs
              </Button>
            </div>
          </motion.div>

          {/* Terminal Mockup */}
          <motion.div
            className="developers-terminal"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <div className="terminal-title">train_model.js</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-line-num">1</span>
                <span><span className="token-keyword">import</span> {'{'} GraxionAI {'}'} <span className="token-keyword">from</span> <span className="token-string">'@graxion/sdk'</span>;</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">2</span>
                <span></span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">3</span>
                <span><span className="token-comment">// Initialize the unified client</span></span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">4</span>
                <span><span className="token-keyword">const</span> ai = <span className="token-keyword">new</span> <span className="token-function">GraxionAI</span>(process.env.GRAXION_KEY);</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">5</span>
                <span></span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">6</span>
                <span><span className="token-keyword">async function</span> <span className="token-function">deployModel</span>() {'{'}</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">7</span>
                <span>&nbsp;&nbsp;<span className="token-keyword">const</span> model = <span className="token-keyword">await</span> ai.models.<span className="token-function">fineTune</span>({'{'}</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">8</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="token-property">datasetId</span>: <span className="token-string">'ds_789xyz'</span>,</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">9</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="token-property">baseModel</span>: <span className="token-string">'graxion-omni-v2'</span>,</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">10</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="token-property">epochs</span>: <span className="token-string">10</span></span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">11</span>
                <span>&nbsp;&nbsp;{'}'});</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">12</span>
                <span></span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">13</span>
                <span>&nbsp;&nbsp;<span className="token-keyword">await</span> model.<span className="token-function">deploy</span>();</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">14</span>
                <span>&nbsp;&nbsp;console.<span className="token-function">log</span>(<span className="token-string">`Model live at: ${'{'}model.endpoint{'}'}`</span>);</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-line-num">15</span>
                <span>{'}'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
