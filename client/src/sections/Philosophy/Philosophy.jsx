import { motion } from "framer-motion";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./Philosophy.css";

const quotes = [
  {
    text: "We don't build products for trends.",
    accent: "We build products for decades.",
  },
  {
    text: "We don't chase competitors.",
    accent: "We chase excellence.",
  },
  {
    text: "We don't measure success by downloads.",
    accent: "We measure success by trust.",
  },
];

export default function Philosophy() {
  return (
    <section className="philosophy section" id="philosophy">
      <div className="container">
        <SectionHeader
          overline="Our Philosophy"
          title="What We Believe"
          subtitle="Technology should never be built simply because it is possible. Technology should be built because it makes life better."
        />

        <div className="philosophy-quotes">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="philosophy-quote"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="philosophy-quote-text">
                <motion.span
                  initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  style={{ display: "inline-block" }}
                >
                  {quote.text}
                </motion.span>
                <br />
                <motion.em
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.2 + 0.4 }}
                  className="text-gradient"
                  style={{ display: "inline-block" }}
                >
                  {quote.accent}
                </motion.em>
              </p>
              {index < quotes.length - 1 && (
                <motion.div
                  className="philosophy-divider"
                  style={{ marginTop: "var(--space-8)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
