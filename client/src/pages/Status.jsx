import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Server, AlertTriangle } from "lucide-react";
import "./ResourcesPages.css";

const systems = [
  { name: "Graxion AI (API & Reasoning Nodes)", status: "Operational", uptime: "99.98%" },
  { name: "Graxion Cloud (Instances & VPC Virtualization)", status: "Operational", uptime: "99.95%" },
  { name: "Graxion Developer Tools (Scaffold & Registry)", status: "Operational", uptime: "100.00%" },
  { name: "Verify Credentials Portal (Student Public Ledger)", status: "Operational", uptime: "100.00%" },
  { name: "API Gateway Routers", status: "Operational", uptime: "99.99%" },
];

export default function Status() {
  return (
    <div className="resources-page" style={{ paddingBottom: '4rem' }}>
      <Helmet>
        <title>System Status — Graxion | Real-Time Uptime Metrics</title>
        <meta
          name="description"
          content="Check real-time system status for Graxion's APIs, compute nodes, AI services, and credentials verification portal. View historical uptime metrics."
        />
        <meta name="keywords" content="Graxion status, server uptime, API health check, active nodes status, system outage logs" />
      </Helmet>

      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="docs-title" style={{ fontSize: 'var(--text-h1)' }}>System Status</h1>
          <p className="docs-text" style={{ maxWidth: '550px', margin: '0.5rem auto' }}>
            Check the real-time operational status and historical uptime charts of Graxion's services.
          </p>
        </div>

        {/* Global Operational Header */}
        <motion.div
          className="status-summary-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="status-summary-icon"></div>
          <div className="status-summary-text">All Systems Operational</div>
        </motion.div>

        {/* System Uptime Rows */}
        <div className="status-systems" style={{ marginTop: '2rem' }}>
          {systems.map((sys, idx) => (
            <motion.div
              key={sys.name}
              className="system-row"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="system-info">
                <span className="system-name">{sys.name}</span>
                <span className="system-status-val">{sys.status} ({sys.uptime})</span>
              </div>
              
              {/* Uptime node bar representation for past 30 days */}
              <div className="system-uptime-bar">
                {Array.from({ length: 30 }).map((_, nodeIdx) => {
                  // Simulate 2 random micro-outages in history for UI realism
                  const isOutage = (idx === 1 && nodeIdx === 12) || (idx === 4 && nodeIdx === 5);
                  return (
                    <div
                      key={nodeIdx}
                      className={`uptime-node ${isOutage ? "outage" : ""}`}
                      title={isOutage ? "Minor Service Degradation (5 mins)" : "Operational (100% Uptime)"}
                    ></div>
                  );
                })}
              </div>
              
              <div className="system-uptime-labels">
                <span>30 days ago</span>
                <span>Today</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Historic Incidents */}
        <div style={{ marginTop: '3.5rem' }}>
          <h2 className="docs-subtitle" style={{ fontSize: '1.25rem' }}>Historical Incidents</h2>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-accent-emerald)', marginTop: 2 }} />
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 'bold', fontSize: '0.95rem' }}>July 2026 — No Incidents Reported</h4>
                <p className="docs-text" style={{ fontSize: '0.85rem', marginTop: 4 }}>
                  All systems operated with complete uptime and maximum API capacity.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: '1.5rem' }}>
              <AlertTriangle size={18} style={{ color: 'var(--color-accent-rose)', marginTop: 2 }} />
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', fontWeight: 'bold', fontSize: '0.95rem' }}>June 18, 2026 — API Gateway Congestion</h4>
                <p className="docs-text" style={{ fontSize: '0.85rem', marginTop: 4 }}>
                  <strong>Resolved:</strong> Volumetric query surges caused 5 minutes of minor connection latency on 
                  edge nodes. Routing layers adjusted automatically to balance traffic loads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
