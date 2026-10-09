import React, { useState, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UnmatchedProductivity from './components/UnmatchedProductivity';
import IntegrationMarquee from './components/IntegrationMarquee';
import RealCallLibrary from './components/RealCallLibrary';
import PlatformJourney from './components/PlatformJourney';
import OperationsConsole from './components/OperationsConsole';
import ComparisonSection from './components/ComparisonSection';
import SetupGuardrails from './components/SetupGuardrails';
import TestimonialSection from './components/TestimonialSection';
import PricingCalculator from './components/PricingCalculator';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import VoiceDemoModal from './components/VoiceDemoModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <div className="jobgen-app-root">
      {/* Floating Glass Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} />

      <main>
        {/* Dual-Agent Hero Stage */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* Black Curved Shell Coming Over Hero Section */}
        <div className="curved-black-shell">
          {/* Unmatched Productivity: Horizontal Cards Moving Left to Right on Scroll */}
          <UnmatchedProductivity onOpenDemo={handleOpenDemo} />

          {/* 16-Partner Infinite Marquee */}
          <IntegrationMarquee />

          {/* Verbatim Real Calls & Live Transcript Synchronizer */}
          <RealCallLibrary />

          {/* The 6 Platform Capabilities & 4-Step Customer Journey */}
          <PlatformJourney />

          {/* Live Operations Console Preview & SVG Analytics Chart */}
          <OperationsConsole />

          {/* Before vs After Transformation Matrix */}
          <ComparisonSection />

          {/* 3-Step Setup & Safety Boundaries */}
          <SetupGuardrails />

          {/* 5-Star Accounting Firm Video Case Study */}
          <TestimonialSection />

          {/* Dynamic Investment & Call Cost Estimator */}
          <PricingCalculator onOpenDemo={handleOpenDemo} />

          {/* Accordion FAQ */}
          <FaqSection />

          {/* High-Conversion Final Call to Action */}
          <FinalCta onOpenDemo={handleOpenDemo} />
        </div>
      </main>

      {/* Global Corporate Footer */}
      <Footer />

      {/* Interactive Voice Test Sandbox Modal */}
      <VoiceDemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
      />
    </div>
  );
}
