import {
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
} from "lucide-react";

export const ecosystemVerticals = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    shortName: "AI",
    description:
      "Intelligent systems that amplify human potential — not replace it.",
    icon: Brain,
    color: "#00d4ff",
    status: "active",
    subdomain: "ai.graxion.in",
    size: "large",
  },
  {
    id: "business",
    name: "Business Software",
    shortName: "Business",
    description:
      "Tools that make businesses stronger, communication faster, and work easier.",
    icon: Briefcase,
    color: "#7c3aed",
    status: "coming-soon",
    subdomain: "business.graxion.in",
    size: "medium",
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    shortName: "Cloud",
    description:
      "Scalable, secure, and intelligent cloud infrastructure for everyone.",
    icon: Cloud,
    color: "#3b82f6",
    status: "coming-soon",
    subdomain: "cloud.graxion.in",
    size: "medium",
  },
  {
    id: "security",
    name: "Cyber Security",
    shortName: "Security",
    description:
      "Trust is impossible without security. Protection built into every layer.",
    icon: Shield,
    color: "#10b981",
    status: "coming-soon",
    subdomain: "security.graxion.in",
    size: "medium",
  },
  {
    id: "developer",
    name: "Developer Platforms",
    shortName: "DevTools",
    description:
      "Powerful platforms and tools for developers to create, ship, and scale.",
    icon: Code2,
    color: "#f59e0b",
    status: "coming-soon",
    subdomain: "dev.graxion.in",
    size: "medium",
  },
  {
    id: "education",
    name: "Education",
    shortName: "Education",
    description:
      "Knowledge changes lives. Practical, accessible, and continuously evolving.",
    icon: GraduationCap,
    color: "#ec4899",
    status: "future",
    subdomain: "learn.graxion.in",
    size: "small",
  },
  {
    id: "research",
    name: "Research",
    shortName: "Research",
    description:
      "Pushing the boundaries of what technology can achieve for humanity.",
    icon: Microscope,
    color: "#8b5cf6",
    status: "future",
    subdomain: "research.graxion.in",
    size: "small",
  },
  {
    id: "consumer",
    name: "Consumer Applications",
    shortName: "Apps",
    description:
      "Everyday applications designed with simplicity, intelligence, and care.",
    icon: Smartphone,
    color: "#06b6d4",
    status: "future",
    subdomain: "apps.graxion.in",
    size: "small",
  },
  {
    id: "robotics",
    name: "Robotics",
    shortName: "Robotics",
    description:
      "Bridging the digital and physical worlds through intelligent robotics.",
    icon: Bot,
    color: "#f43f5e",
    status: "future",
    subdomain: "robotics.graxion.in",
    size: "small",
  },
  {
    id: "future",
    name: "Future Technologies",
    shortName: "Labs",
    description:
      "Exploring tomorrow's possibilities. Innovation that looks decades ahead.",
    icon: Rocket,
    color: "#a855f7",
    status: "future",
    subdomain: "labs.graxion.in",
    size: "small",
  },
];

export const coreValues = [
  "Integrity",
  "Innovation",
  "Responsibility",
  "Transparency",
  "Curiosity",
  "Respect",
  "Reliability",
  "Accessibility",
  "Security",
  "Continuous Improvement",
];

export const corePrinciples = [
  {
    title: "Innovation with Purpose",
    description: "Every innovation should solve a real problem.",
    icon: "Lightbulb",
  },
  {
    title: "Simplicity by Design",
    description: "Powerful technology should feel simple.",
    icon: "Layers",
  },
  {
    title: "Trust Before Growth",
    description: "Long-term trust is more valuable than short-term success.",
    icon: "ShieldCheck",
  },
  {
    title: "Quality Without Compromise",
    description: "If a product is not ready, it is not ready.",
    icon: "Award",
  },
  {
    title: "Continuous Learning",
    description: "We remain students of technology.",
    icon: "BookOpen",
  },
  {
    title: "Customer Success",
    description: "Our success follows the success of our users.",
    icon: "Users",
  },
  {
    title: "Security by Default",
    description: "Privacy and security are built into every product.",
    icon: "Lock",
  },
  {
    title: "Global Standards",
    description:
      "Every Graxion product should compete on quality anywhere in the world.",
    icon: "Globe",
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Technology Verticals" },
  { value: 1, suffix: "", label: "Unified Ecosystem" },
  { value: 100, suffix: "%", label: "Security Focused" },
  { value: 24, suffix: "/7", label: "Innovation" },
];

export const footerLinks = {
  ecosystem: [
    { label: "Artificial Intelligence", href: "/ecosystem/ai" },
    { label: "Business Software", href: "/ecosystem/business" },
    { label: "Cloud Computing", href: "/ecosystem/cloud" },
    { label: "Cyber Security", href: "/ecosystem/security" },
    { label: "Developer Platforms", href: "/ecosystem/developer" },
    { label: "Education", href: "/ecosystem/education" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/resources/documentation" },
    { label: "API Reference", href: "/resources/api-reference" },
    { label: "Status", href: "/resources/status" },
    { label: "Community", href: "/resources/community" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Security", href: "/security" },
  ],
};
