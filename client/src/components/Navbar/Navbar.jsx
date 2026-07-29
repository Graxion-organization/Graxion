import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
  { label: "Verify", path: "/internship/verify" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Hide navbar while scrolling down past 150px
      if (currentScrollY > 150) {
        setIsHidden(true);
        
        // Show navbar 250ms after user stops scrolling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsHidden(false);
        }, 250);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isHidden ? "hidden" : ""}`} id="main-nav">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="Graxion Home">
            <div style={{ backgroundColor: 'white', padding: '4px', borderRadius: '6px', display: 'flex' }}>
              <img src="/logo.png" alt="Graxion Icon" style={{ height: '24px' }} />
            </div>
            <div className="navbar-logo-text">
              GRA<span className="navbar-text-orange">X</span>ION
            </div>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${
                  location.pathname === link.path ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-cta navbar-cta-desktop">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          <button
            className={`navbar-mobile-toggle ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`navbar-mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="navbar-mobile-link"
            onClick={(e) => e.stopPropagation()}
          >
            {link.label}
          </Link>
        ))}
        <Button variant="primary" size="md" style={{ marginTop: "1rem" }}>
          Get Started
        </Button>
      </div>
    </>
  );
}
