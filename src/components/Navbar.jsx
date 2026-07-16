import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      gsap.to('#mainNav', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      });
    });
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="glass-nav" id="mainNav" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
      <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img src="/images/logo.webp" alt="RBSMUN Logo" />
          </a>
          <div className={`nav-links${isMenuOpen ? ' active' : ''}`} id="navLinks">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/committees">Committees</a>
              <a href="/conference">Conference Details</a>
              <a href="/team">Our Team</a>
              {/* Register CTA included in mobile menu */}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScHRl-Q3-XBSMNHwiufUyGBYGU-MBBVO2-GGSOJL0atyxPcKg/viewform"
                 target="_blank" className="nav-cta" style={{ display: 'none' }}>Register →</a>
          </div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScHRl-Q3-XBSMNHwiufUyGBYGU-MBBVO2-GGSOJL0atyxPcKg/viewform"
              target="_blank" className="nav-cta">Register →</a>
          <button className={`nav-toggle${isMenuOpen ? ' active' : ''}`} id="navToggle" aria-label="Toggle menu" onClick={toggleMenu}>
              <span></span><span></span><span></span>
          </button>
      </div>
    </nav>
  );
}
