import { Helmet } from "react-helmet-async";
import Hero from "../sections/Hero/Hero";
import TrustedBy from "../sections/TrustedBy/TrustedBy";
import HomeFeatured from "../sections/HomeFeatured/HomeFeatured";
import Philosophy from "../sections/Philosophy/Philosophy";
import Ecosystem from "../sections/Ecosystem/Ecosystem";
import Connection from "../sections/Connection/Connection";
import Vision from "../sections/Vision/Vision";
import Principles from "../sections/Principles/Principles";
import Trust from "../sections/Trust/Trust";
import Developers from "../sections/Developers/Developers";
import Research from "../sections/Research/Research";
import Roadmap from "../sections/Roadmap/Roadmap";
import News from "../sections/News/News";
import Contact from "../sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Graxion — Building the Future of Technology</title>
        <meta
          name="description"
          content="Graxion is a global technology ecosystem building intelligent products across AI, Cloud, Cyber Security, Business Software, Education, Robotics, and more."
        />
      </Helmet>
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Trusted By */}
      <TrustedBy />
      
      {/* 3. Featured Products */}
      <HomeFeatured />
      
      {/* 4. Why Graxion Exists */}
      <Philosophy />
      
      {/* 5. Technology Ecosystem */}
      <Ecosystem />
      
      {/* 6. How Everything Connects */}
      <Connection />
      
      {/* 7. Vision */}
      <Vision />
      
      {/* 8. Core Principles */}
      <Principles />
      
      {/* 9. Security */}
      <Trust />
      
      {/* 10. Developer Platform */}
      <Developers />
      
      {/* 11. Research */}
      <Research />
      
      {/* 12. Roadmap */}
      <Roadmap />
      
      {/* 13. Latest News */}
      <News />
      
      {/* 14. Contact */}
      <Contact />
    </>
  );
}
