import React, { useState, useEffect, useRef } from 'react';
import { LogIn, Menu, X, ChevronDown, Wrench, Briefcase, HeartHandshake, ArrowUpRight } from 'lucide-react';

const INDUSTRY_GROUPS = [
  {
    title: 'Trades & home services',
    icon: Wrench,
    items: [
      { name: 'Plumbing', url: 'https://receptionist.jobgen.ai/industries/plumbing' },
      { name: 'Electricians', url: 'https://receptionist.jobgen.ai/industries/electricians' },
      { name: 'Home services', url: 'https://receptionist.jobgen.ai/industries/home-services' },
      { name: 'Construction', url: 'https://receptionist.jobgen.ai/industries/construction' },
    ],
  },
  {
    title: 'Professional services',
    icon: Briefcase,
    items: [
      { name: 'Accounting', url: 'https://receptionist.jobgen.ai/industries/accounting' },
      { name: 'Legal', url: 'https://receptionist.jobgen.ai/industries/legal' },
      { name: 'Real estate', url: 'https://receptionist.jobgen.ai/industries/real-estate' },
      { name: 'Mortgage brokers', url: 'https://receptionist.jobgen.ai/industries/mortgage-brokers' },
    ],
  },
  {
    title: 'Care & local business',
    icon: HeartHandshake,
    items: [
      { name: 'Medical', url: 'https://receptionist.jobgen.ai/industries/medical' },
      { name: 'Dental', url: 'https://receptionist.jobgen.ai/industries/dental' },
      { name: 'NDIS providers', url: 'https://receptionist.jobgen.ai/industries/ndis' },
      { name: 'Automotive', url: 'https://receptionist.jobgen.ai/industries/automotive' },
    ],
  },
];

export default function Navbar({
  onOpenDemo,
  onOpenBooking,
  currentPage = 'home',
  onNavigate,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleIndustriesEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsIndustriesOpen(false);
    }, 250); // 250ms grace period so moving down onto the dropdown never loses focus
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleResize = () => {
      if (window.innerWidth > 920) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsIndustriesOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
    if (onNavigate) {
      onNavigate('about');
    }
  };

  const handlePricingClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
    if (onNavigate) {
      onNavigate('pricing');
    }
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
    if (onNavigate) {
      onNavigate('features');
    } else {
      const el = document.getElementById('platform') || document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine if header should have hero transparent mode (only on home and when not scrolled)
  const isHeroMode = currentPage === 'home' && !isScrolled;

  return (
    <header
      className={`navbar-header-full ${
        isHeroMode ? 'is-hero-mode' : 'is-scrolled'
      } ${isMobileMenuOpen ? 'is-menu-open' : ''}`}
    >
      <nav className="navbar-clay-pill-bar" aria-label="Main Navigation">
        {/* Left: JobGen Logo + Brand */}
        <a href="/" onClick={handleHomeClick} className="navbar-brand-full">
          <img
            src={isHeroMode ? '/assets/jobgen-white.webp' : '/assets/jobgen-logo.webp'}
            alt="JobGen Logo"
            className={isHeroMode ? 'brand-logo-img-white' : 'brand-logo-img-blue'}
          />
          <span className="brand-title-full">
            JOBGEN<span className="brand-title-accent">.AI</span>
          </span>
        </a>

        {/* Center: Desktop Navigation Options */}
        <div className="navbar-links-center">
          {/* 1. Home */}
          <a
            href="/"
            onClick={handleHomeClick}
            className={`nav-clay-link ${currentPage === 'home' ? 'is-active' : ''}`}
          >
            Home
          </a>

          {/* 2. About us */}
          <a
            href="/about"
            onClick={handleAboutClick}
            className={`nav-clay-link ${currentPage === 'about' ? 'is-active' : ''}`}
          >
            About us
          </a>

          {/* 3. Industries with Mega Dropdown */}
          <div
            ref={dropdownRef}
            className={`nav-dropdown-wrapper ${isIndustriesOpen ? 'is-open' : ''}`}
            onMouseEnter={handleIndustriesEnter}
            onMouseLeave={handleIndustriesLeave}
          >
            <button
              type="button"
              onClick={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                setIsIndustriesOpen((prev) => !prev);
              }}
              className={`nav-clay-link nav-dropdown-trigger ${isIndustriesOpen ? 'is-active' : ''}`}
              aria-expanded={isIndustriesOpen}
              aria-haspopup="true"
            >
              <span>Industries</span>
              <ChevronDown
                size={14}
                className={`nav-chevron-icon ${isIndustriesOpen ? 'is-rotated' : ''}`}
              />
            </button>

            {/* Mega Dropdown Panel */}
            <div
              className="nav-mega-dropdown"
              role="menu"
              onMouseEnter={handleIndustriesEnter}
              onMouseLeave={handleIndustriesLeave}
            >
              <div className="nav-mega-grid">
                {INDUSTRY_GROUPS.map((group, gIdx) => {
                  const IconComponent = group.icon;
                  return (
                    <div key={gIdx} className="nav-mega-column">
                      <div className="nav-mega-group-header">
                        <div className="nav-group-icon-wrap">
                          <IconComponent size={14} />
                        </div>
                        <span className="nav-mega-group-title">{group.title}</span>
                      </div>
                      <div className="nav-mega-items-list">
                        {group.items.map((item, iIdx) => (
                          <a
                            key={iIdx}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-mega-item-link"
                            onClick={() => setIsIndustriesOpen(false)}
                          >
                            <span className="nav-mega-item-name">{item.name}</span>
                            <ArrowUpRight size={13} className="nav-mega-item-arrow" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Feature */}
          <a
            href="#platform"
            onClick={handleFeaturesClick}
            className="nav-clay-link"
          >
            Feature
          </a>

          {/* 5. Pricing */}
          <a
            href="/pricing"
            onClick={handlePricingClick}
            className={`nav-clay-link ${currentPage === 'pricing' ? 'is-active' : ''}`}
          >
            Pricing
          </a>

          {/* 6. Partners */}
          <a
            href="https://sales.jobgen.ai/partners"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-clay-link nav-partners-link"
          >
            <span>Partners</span>
            <ArrowUpRight size={13} className="nav-external-arrow" />
          </a>
        </div>

        {/* Right: Free Demo + Sign In Buttons + Mobile Hamburger */}
        <div className="navbar-right-cluster">
          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-nav-signin"
            title="Sign Up or Log In"
          >
            <LogIn size={15} className="nav-signin-icon" />
            <span className="nav-signin-text">Sign In</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking || onOpenDemo}
            className="btn-animated-demo"
            title="Request a Free Demo"
          >
            <span>Free Demo</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`nav-hamburger-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Claymorphic Mobile Drawer Menu */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="mobile-nav-clay-sheet">
          <div className="mobile-nav-sheet-header">
            <div className="mobile-nav-brand">
              <img src="/assets/jobgen-logo.webp" alt="JobGen" className="mobile-sheet-logo" />
              <span>Menu</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-close-btn"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mobile-nav-links-list">
            {/* 1. Home */}
            <button
              type="button"
              onClick={handleHomeClick}
              className={`mobile-nav-item ${currentPage === 'home' ? 'is-active' : ''}`}
            >
              <span>Home</span>
              <span className="mobile-nav-item-indicator" />
            </button>

            {/* 2. About us */}
            <button
              type="button"
              onClick={handleAboutClick}
              className={`mobile-nav-item ${currentPage === 'about' ? 'is-active' : ''}`}
            >
              <span>About us</span>
              <span className="mobile-nav-item-indicator" />
            </button>

            {/* 3. Industries Accordion */}
            <div className="mobile-accordion-section">
              <button
                type="button"
                onClick={() => setIsMobileIndustriesOpen(!isMobileIndustriesOpen)}
                className={`mobile-nav-item mobile-accordion-toggle ${
                  isMobileIndustriesOpen ? 'is-expanded' : ''
                }`}
              >
                <span>Industries</span>
                <ChevronDown
                  size={16}
                  className={`mobile-chevron ${isMobileIndustriesOpen ? 'is-rotated' : ''}`}
                />
              </button>

              {isMobileIndustriesOpen && (
                <div className="mobile-accordion-content">
                  {INDUSTRY_GROUPS.map((group, gIdx) => (
                    <div key={gIdx} className="mobile-group-block">
                      <span className="mobile-group-header-label">{group.title}</span>
                      <div className="mobile-group-links">
                        {group.items.map((item, iIdx) => (
                          <a
                            key={iIdx}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-sublink"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span>{item.name}</span>
                            <ArrowUpRight size={13} />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Feature */}
            <button
              type="button"
              onClick={handleFeaturesClick}
              className="mobile-nav-item"
            >
              <span>Feature</span>
              <span className="mobile-nav-item-indicator" />
            </button>

            {/* 5. Pricing */}
            <button
              type="button"
              onClick={handlePricingClick}
              className={`mobile-nav-item ${currentPage === 'pricing' ? 'is-active' : ''}`}
            >
              <span>Pricing</span>
              <span className="mobile-nav-item-indicator" />
            </button>

            {/* 6. Partners */}
            <a
              href="https://sales.jobgen.ai/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-item mobile-external-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Partners</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mobile-nav-footer-actions">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="mobile-drawer-btn-signin"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                (onOpenBooking || onOpenDemo)();
              }}
              className="mobile-drawer-btn-demo"
            >
              <span>Book Free Demo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
