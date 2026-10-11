import React, { useState, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UnmatchedProductivity from './components/UnmatchedProductivity';
import LeadHandoverSection from './components/LeadHandoverSection';
import OrganicContourBackground from './components/OrganicContourBackground';
import RealCallLibrary from './components/RealCallLibrary';
import PlatformJourney from './components/PlatformJourney';
import ComparisonSection from './components/ComparisonSection';
import SetupGuardrails from './components/SetupGuardrails';
import TestimonialSection from './components/TestimonialSection';
import IndustryShowcase from './components/IndustryShowcase';
import PricingCalculator from './components/PricingCalculator';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import VoiceDemoModal from './components/VoiceDemoModal';
import DemoBookingModal from './components/DemoBookingModal';
import WaitingCostModal from './components/WaitingCostModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);

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
      {/* Global Fixed Living Organic Contour Lines Background (Stays In Back As Content Scrolls) */}
      <div className="global-fixed-contour-bg" aria-hidden="true">
        <OrganicContourBackground strokeColor="rgba(37, 39, 30, 0.20)" />
        <div className="hero-contour-grain" />
      </div>

      {/* Floating Glass Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} onOpenBooking={handleOpenBooking} />

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

        {/* White Contour Lines Stage: Returns after black shell scrolls up with rounded bottom */}
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

            {/* Dynamic Investment & Call Cost Estimator */}
            <PricingCalculator onOpenDemo={handleOpenDemo} />

            {/* Accordion FAQ */}
            <FaqSection />

            {/* High-Conversion Final Call to Action */}
            <FinalCta onOpenDemo={handleOpenDemo} onOpenBooking={handleOpenBooking} />
          </div>
        </div>
      </main>

      {/* Global Corporate Footer */}
      <Footer />

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
