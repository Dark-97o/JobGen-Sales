import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    setActiveTab('Home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id, tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header-full ${isScrolled ? 'is-scrolled' : 'is-hero-mode'}`}>
      {/* While in hero section: transparent on hero itself. When scrolled: blur transparent white claymorphed bar */}
      <nav className="navbar-clay-pill-bar" aria-label="Main Navigation">
        {/* Left: JobGen Blue Logo + Brand */}
        <a href="#home" onClick={handleHomeClick} className="navbar-brand-full">
          <img
            src="/assets/jobgen-logo.webp"
            alt="JobGen Logo"
            className="brand-logo-img-blue"
          />
          <span className="brand-title-full">
            JOBGEN<span className="brand-title-accent">.AI</span>
          </span>
        </a>

        {/* Center: Actual Navigation Options */}
        <div className="navbar-links-center">
          <a
            href="#home"
            onClick={handleHomeClick}
            className={`nav-clay-link ${activeTab === 'Home' ? 'is-active' : ''}`}
          >
            Home
          </a>
          <a
            href="#calls"
            onClick={(e) => { e.preventDefault(); handleNavClick('calls', 'Industries'); }}
            className={`nav-clay-link ${activeTab === 'Industries' ? 'is-active' : ''}`}
          >
            Industries
          </a>
          <a
            href="#handover"
            onClick={(e) => { e.preventDefault(); handleNavClick('handover', 'About us'); }}
            className={`nav-clay-link ${activeTab === 'About us' ? 'is-active' : ''}`}
          >
            About us
          </a>
          <a
            href="#platform"
            onClick={(e) => { e.preventDefault(); handleNavClick('platform', 'Features'); }}
            className={`nav-clay-link ${activeTab === 'Features' ? 'is-active' : ''}`}
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); handleNavClick('pricing', 'Pricing'); }}
            className={`nav-clay-link ${activeTab === 'Pricing' ? 'is-active' : ''}`}
          >
            Pricing
          </a>
        </div>

        {/* Right: Free Demo + Sign In Buttons (Only shown in clay bar when scrolled, hidden on hero itself) */}
        <div className={`navbar-right-cluster ${isScrolled ? 'is-visible' : 'is-hidden'}`}>
          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-nav-signin"
            title="Sign Up or Log In"
          >
            <LogIn size={15} style={{ color: '#071A52' }} />
            <span>Sign Up / In</span>
          </button>

          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-animated-demo"
            title="Launch Live Demo"
          >
            <span>Free Demo</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
