import { Helmet } from "react-helmet-async";
import Hero from "../sections/Hero/Hero";
import MetricsBar from "../sections/MetricsBar/MetricsBar";
import HomeFeatured from "../sections/HomeFeatured/HomeFeatured";
import Ecosystem from "../sections/Ecosystem/Ecosystem";
import WhyGraxion from "../sections/WhyGraxion/WhyGraxion";
import Developers from "../sections/Developers/Developers";
import Roadmap from "../sections/Roadmap/Roadmap";
import Contact from "../sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Graxion Flow — AI Automation & Social Media Ecosystem</title>
        <meta
          name="description"
          content="Graxion Flow is a powerful automation platform that helps you manage your YouTube comments, schedule Shorts, and automate workflows seamlessly with AI."
        />
      </Helmet>
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Metrics Bar */}
      <MetricsBar />
      
      {/* 3. Featured Products */}
      <HomeFeatured />
      
      {/* 4. Technology Ecosystem */}
      <Ecosystem />
      
      {/* 5. Why Graxion */}
      <WhyGraxion />
      
      {/* 6. Developer Platform */}
      <Developers />
      
      {/* 7. Roadmap */}
      <Roadmap />
      
      {/* 8. Contact */}
      <Contact />
    </>
  );
}
