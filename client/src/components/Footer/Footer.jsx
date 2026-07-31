import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Globe, Users, Mail } from "lucide-react";
import { footerLinks } from "../../data/ecosystem";
import "./Footer.css";

export default function Footer() {
  const logoRef = useRef(null);

  useEffect(() => {
    const element = logoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        const event = new CustomEvent("footer-logo-visibility", {
          detail: { isVisible }
        });
        window.dispatchEvent(event);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo" ref={logoRef}>
              <div style={{ backgroundColor: 'white', padding: '4px', borderRadius: '6px', display: 'flex' }}>
                <img src="/logo.png" alt="Graxion Icon" style={{ height: '24px' }} />
              </div>
              <div className="footer-logo-text">
                GRA<span className="footer-text-orange">X</span>ION
              </div>
            </div>
            <p className="footer-brand-text">
              A global technology ecosystem dedicated to building intelligent
              products that empower individuals, businesses, and future
              generations.
            </p>
            <div className="footer-social-links">
              <a
                href="#"
                className="footer-social-link"
                aria-label="Social"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="Community"
              >
                <Users size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="Website"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="footer-column-title">Ecosystem</h3>
            <div className="footer-column-links">
              {footerLinks.ecosystem.map((link) => (
                <Link key={link.label} to={link.href} className="footer-column-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="footer-column-title">Company</h3>
            <div className="footer-column-links">
              {footerLinks.company.map((link) => (
                <Link key={link.label} to={link.href} className="footer-column-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="footer-column-title">Resources</h3>
            <div className="footer-column-links">
              {footerLinks.resources.map((link) => (
                <Link key={link.label} to={link.href} className="footer-column-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="footer-column-title">Legal</h3>
            <div className="footer-column-links">
              {footerLinks.legal.map((link) => (
                <Link key={link.label} to={link.href} className="footer-column-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Graxion. Building the Future of
            Technology.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">
              Privacy
            </Link>
            <Link to="/terms" className="footer-bottom-link">
              Terms
            </Link>
            <a href="#" className="footer-bottom-link">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
