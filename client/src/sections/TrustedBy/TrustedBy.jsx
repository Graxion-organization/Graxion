import { Building2, Command, Hexagon, Component, Blocks, Combine } from "lucide-react";
import "./TrustedBy.css";

const logos = [
  { name: "NexusCorp", icon: Building2 },
  { name: "OmniSystems", icon: Command },
  { name: "Apex Dynamics", icon: Hexagon },
  { name: "Quantum Data", icon: Component },
  { name: "Stellar Cloud", icon: Blocks },
  { name: "Vertex Tech", icon: Combine },
];

export default function TrustedBy() {
  // Duplicate for infinite scroll
  const scrollGroup = [...logos, ...logos, ...logos];

  return (
    <section className="trusted" id="trusted">
      <div className="container-fluid">
        <h3 className="trusted-title">Trusted By Innovators Worldwide</h3>
        
        <div className="trusted-marquee">
          <div className="trusted-logo-group">
            {scrollGroup.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div key={`${logo.name}-${index}`} className="trusted-logo">
                  <Icon size={24} />
                  <span>{logo.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
