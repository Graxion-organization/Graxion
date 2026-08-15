import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./MetricsBar.css";

const metrics = [
  { label: "Products", value: 7, suffix: "+" },
  { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
  { label: "Grade", value: "Enterprise", isString: true },
  { label: "Origin", value: "Built in India 🇮🇳", isString: true },
];

function CountUp({ to, decimals = 0, isVisible }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setValue(value);
        }
      });
      return () => controls.stop();
    }
  }, [to, isVisible]);

  return <span>{value.toFixed(decimals)}</span>;
}

export default function MetricsBar() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="metrics-bar" id="metrics">
      <div className="container-fluid">
        <motion.div
          className="metrics-grid"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <div className="metric-value">
                {metric.isString ? (
                  metric.value
                ) : (
                  <>
                    <CountUp to={metric.value} decimals={metric.decimals} isVisible={isVisible} />
                    {metric.suffix}
                  </>
                )}
              </div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
