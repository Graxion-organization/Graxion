import { motion } from "framer-motion";
import "./Vision.css";

export default function Vision() {
  return (
    <section className="vision section" id="vision">
      <div className="container">
        <motion.div
          className="vision-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="vision-overline">
            <span>The Vision</span>
          </div>

          <p className="vision-text">
            Our ambition is to build technology that people <em>rely on</em>,
            businesses <em>grow with</em>, students <em>learn from</em>,
            developers <em>create on</em>, and future generations are{" "}
            <em>proud to inherit</em>.
          </p>

          <div className="vision-divider" />

          <p className="vision-dream">
            We dream of a world where technology empowers rather than excludes,
            where innovation is accessible rather than limited, and where trust
            is earned through consistent action. Graxion exists to contribute to
            that future — one product, one idea, and one meaningful solution at
            a time.
          </p>

          <p className="vision-signature">— The Graxion Book</p>
        </motion.div>
      </div>
    </section>
  );
}
