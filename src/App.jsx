import React, { useState, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UnmatchedProductivity from './components/UnmatchedProductivity';
import LeadHandoverSection from './components/LeadHandoverSection';
import OrganicContourBackground from './components/OrganicContourBackground';
import RealCallLibrary from './components/RealCallLibrary';
import CrmCampaignPipeline from './components/CrmCampaignPipeline';
import PlatformJourney from './components/PlatformJourney';
import ComparisonSection from './components/ComparisonSection';
import SetupGuardrails from './components/SetupGuardrails';
import TestimonialSection from './components/TestimonialSection';
import IndustryShowcase from './components/IndustryShowcase';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import VoiceDemoModal from './components/VoiceDemoModal';
import DemoBookingModal from './components/DemoBookingModal';
import WaitingCostModal from './components/WaitingCostModal';
import IntroAnimation from './components/IntroAnimation';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const getInitialPage = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/pricing')) return 'pricing';
  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialize Lenis Frictionless Inertial Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy exponential frictionless glide
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      infinite: false,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Frictionless in-page anchor navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Freeze/unfreeze Lenis scrolling when modal dialogues are open
  useEffect(() => {
    if (isDemoModalOpen || isBookingModalOpen || isCostModalOpen) {
      window.lenis?.stop();
    } else {
      window.lenis?.start();
    }
  }, [isDemoModalOpen, isBookingModalOpen, isCostModalOpen]);

  // Handle route change & recalculate scroll heights
  useEffect(() => {
    window.lenis?.resize();
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/about')) {
        setCurrentPage('about');
      } else if (path.startsWith('/pricing')) {
        setCurrentPage('pricing');
      } else {
        setCurrentPage('home');
      }
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false, duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page) => {
    if (page === 'home') {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false, duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (page === 'about') {
      setCurrentPage('about');
      window.history.pushState({}, '', '/about');
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false, duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (page === 'pricing') {
      setCurrentPage('pricing');
      window.history.pushState({}, '', '/pricing');
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false, duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (page === 'features') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        window.history.pushState({}, '', '/#platform');
        setTimeout(() => {
          const el = document.getElementById('platform') || document.getElementById('features');
          if (el) {
            if (window.lenis) {
              window.lenis.scrollTo(el, { offset: -70, duration: 0.85 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 120);
      } else {
        const el = document.getElementById('platform') || document.getElementById('features');
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -70, duration: 0.85 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleOpenCost = () => {
    setIsCostModalOpen(true);
  };

  const handleCloseCost = () => {
    setIsCostModalOpen(false);
  };

  return (
    <div className="jobgen-app-root">
      {/* Intro Animation (shown on home page or initial load) */}
      <IntroAnimation />

      {/* Global Fixed Living Organic Contour Lines Background */}
      <div className="global-fixed-contour-bg" aria-hidden="true">
        <OrganicContourBackground strokeColor="rgba(37, 39, 30, 0.20)" />
        <div className="hero-contour-grain" />
      </div>

      {/* Floating Glass Navigation */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenBooking={handleOpenBooking}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'about' && (
        <main className="subpage-main">
          <AboutPage
            onOpenDemo={handleOpenDemo}
            onOpenBooking={handleOpenBooking}
          />
        </main>
      )}

      {currentPage === 'pricing' && (
        <main className="subpage-main">
          <PricingPage
            onOpenDemo={handleOpenDemo}
            onOpenBooking={handleOpenBooking}
            onOpenCalculator={handleOpenCost}
          />
        </main>
      )}

      {currentPage === 'home' && (
        <main>
          {/* Dual-Agent Hero Stage */}
          <Hero onOpenDemo={handleOpenDemo} onOpenCalculator={handleOpenCost} />

          {/* Black Curved Shell Coming Over Hero Section */}
          <div className="curved-black-shell">
            {/* Unmatched Productivity: Horizontal Cards Moving Left to Right on Scroll */}
            <UnmatchedProductivity onOpenDemo={handleOpenDemo} />

            {/* Lead Handover: Full-Bleed Image of Man with Top-Left Headline & 4 Points */}
            <LeadHandoverSection />
          </div>

          {/* White Contour Lines Stage */}
          <div className="white-contour-stage">
            {/* Ambient Misty Blue Glows */}
            <div className="white-contour-canvas-bg" aria-hidden="true">
              <div className="hero-contour-grain" />
              <div className="misty-blue-glow misty-glow-1" style={{ top: '8%', left: '-10%' }} />
              <div className="misty-blue-glow misty-glow-2" style={{ top: '38%', right: '-8%' }} />
              <div className="misty-blue-glow misty-glow-3" style={{ bottom: '12%', left: '4%' }} />
            </div>

            <div className="white-contour-inner">
              {/* Verbatim Real Calls & Live Transcript Synchronizer */}
              <RealCallLibrary />

              {/* Lead Collection, CRM Synchronization & Campaign Outreach */}
              <CrmCampaignPipeline />

              {/* The 6 Platform Capabilities */}
              <PlatformJourney />

              {/* Before vs After Transformation Matrix */}
              <ComparisonSection />

              {/* 3-Step Setup & Safety Boundaries */}
              <SetupGuardrails />

              {/* 5-Star Accounting Firm Video Case Study */}
              <TestimonialSection />

              {/* Calibrated for every Industry (3D Rotating Building & Claymorphed Chat Card) */}
              <IndustryShowcase onOpenDemo={handleOpenDemo} />


              {/* Accordion FAQ */}
              <FaqSection />

              {/* High-Conversion Final Call to Action */}
              <FinalCta onOpenDemo={handleOpenDemo} onOpenBooking={handleOpenBooking} />
            </div>
          </div>
        </main>
      )}

      {/* Global Corporate Footer */}
      <Footer
        onOpenDemo={handleOpenDemo}
        onOpenCalculator={handleOpenCost}
        onNavigate={handleNavigate}
      />

      {/* Interactive Voice Test Sandbox Modal */}
      <VoiceDemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
      />

      {/* Interactive Claymorphic Demo Request & Time Slot Booking Modal */}
      <DemoBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />

      {/* Interactive What Waiting Costs Calculator Modal */}
      <WaitingCostModal
        isOpen={isCostModalOpen}
        onClose={handleCloseCost}
        onOpenDemo={handleOpenDemo}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
