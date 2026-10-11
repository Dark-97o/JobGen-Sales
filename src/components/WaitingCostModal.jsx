import React, { useState, useMemo, useEffect } from 'react';
import { X, ArrowRight, TrendingDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WaitingCostModal({ isOpen, onClose, onOpenDemo, onOpenBooking }) {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 7 Slider Inputs
  const [callsPerDay, setCallsPerDay] = useState(30);
  const [unansweredRate, setUnansweredRate] = useState(20);
  const [coldEnquiries, setColdEnquiries] = useState(20);
  const [conversionRate, setConversionRate] = useState(20);
  const [customerValue, setCustomerValue] = useState(150);
  const [adminHoursWeek, setAdminHoursWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const [hasCalculated, setHasCalculated] = useState(false);

  // Calculations
  const stats = useMemo(() => {
    const monthlyCalls = callsPerDay * 30;
    const monthlyMissedCalls = Math.round(monthlyCalls * (unansweredRate / 100));
    const totalMissedLeads = monthlyMissedCalls + coldEnquiries;
    const lostCustomers = Math.round(totalMissedLeads * (conversionRate / 100));
    const monthlyLostRevenue = lostCustomers * customerValue;

    const monthlyAdminHours = Math.round(adminHoursWeek * 4.33);
    const monthlyAdminCost = monthlyAdminHours * hourlyCost;

    const monthlyTotalCost = monthlyLostRevenue + monthlyAdminCost;
    const annualTotalCost = monthlyTotalCost * 12;

    return {
      monthlyMissedCalls,
      totalMissedLeads,
      lostCustomers,
      monthlyLostRevenue,
      monthlyAdminHours,
      monthlyAdminCost,
      monthlyTotalCost,
      annualTotalCost
    };
  }, [callsPerDay, unansweredRate, coldEnquiries, conversionRate, customerValue, adminHoursWeek, hourlyCost]);

  if (!isOpen) return null;

  const handleCalculate = () => {
    setHasCalculated(true);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleBookSolution = () => {
    onClose();
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onOpenDemo) {
      onOpenDemo();
    }
  };

  const getFillPercent = (val, min, max) => ((val - min) / (max - min)) * 100;

  return (
    <div className="cost-clay-modal-backdrop" onClick={onClose}>
      <div 
        className="cost-clay-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Clay Close Button */}
        <button 
          type="button" 
          onClick={onClose} 
          className="cost-clay-close-btn"
          aria-label="Close calculator"
        >
          <X size={18} />
        </button>

        <div className="cost-clay-modal-layout">
          {/* LEFT SIDE: Clean Narrative & Tactile Impact Summary */}
          <div className="cost-clay-left-col">
            <h2 className="cost-clay-main-title">
              What is waiting <br />
              <span className="cost-clay-title-highlight">costing you?</span>
            </h2>

            {/* Claymorphic Live Impact Summary */}
            <div className="cost-clay-impact-card">
              <div className="cost-clay-impact-header">
                <TrendingDown size={17} className="text-full-blue" />
                <span className="cost-clay-impact-label">ESTIMATED COST OF INACTION</span>
              </div>

              <div className="cost-clay-impact-big-value">
                A${stats.monthlyTotalCost.toLocaleString()}
                <span className="cost-clay-impact-per">/month</span>
              </div>

              <div className="cost-clay-annual-pill">
                <span>≈ A${stats.annualTotalCost.toLocaleString()} / year</span>
              </div>

              <div className="cost-clay-breakdown-grid">
                <div className="cost-clay-breakdown-item">
                  <span className="cost-clay-sub-label">Missed Revenue</span>
                  <span className="cost-clay-sub-val">A${stats.monthlyLostRevenue.toLocaleString()} / mo</span>
                </div>
                <div className="cost-clay-breakdown-item">
                  <span className="cost-clay-sub-label">Admin Payroll</span>
                  <span className="cost-clay-sub-val">A${stats.monthlyAdminCost.toLocaleString()} / mo</span>
                </div>
              </div>

              {hasCalculated && (
                <div className="cost-clay-recovered-box">
                  <div className="cost-clay-recovered-text">
                    <Sparkles size={15} className="text-full-blue" />
                    <span>JobGen recovers <strong>95%+</strong> of these missed leads 24/7.</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleBookSolution}
                    className="cost-clay-recover-btn"
                  >
                    <span>Recover A${stats.monthlyTotalCost.toLocaleString()}/mo</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Claymorphic Sliders */}
          <div className="cost-clay-right-card">
            <div className="cost-clay-sliders-stack">
              {/* Slider 1: Daily calls */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Daily inbound calls</span>
                  <span className="cost-clay-slider-val">{callsPerDay}</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(callsPerDay, 5, 150)}%` }}
                  />
                </div>
              </div>

              {/* Slider 2: Unanswered rate */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Unanswered call rate</span>
                  <span className="cost-clay-slider-val">{unansweredRate}%</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="1"
                    value={unansweredRate}
                    onChange={(e) => setUnansweredRate(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(unansweredRate, 5, 80)}%` }}
                  />
                </div>
              </div>

              {/* Slider 3: Unfollowed inquiries */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Cold inquiries / month</span>
                  <span className="cost-clay-slider-val">{coldEnquiries}</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={coldEnquiries}
                    onChange={(e) => setColdEnquiries(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(coldEnquiries, 0, 100)}%` }}
                  />
                </div>
              </div>

              {/* Slider 4: Conversion rate */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Lead conversion rate</span>
                  <span className="cost-clay-slider-val">{conversionRate}%</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(conversionRate, 5, 60)}%` }}
                  />
                </div>
              </div>

              {/* Slider 5: Customer value */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Average customer value</span>
                  <span className="cost-clay-slider-val">A${customerValue}</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="30"
                    max="1000"
                    step="10"
                    value={customerValue}
                    onChange={(e) => setCustomerValue(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(customerValue, 30, 1000)}%` }}
                  />
                </div>
              </div>

              {/* Slider 6: Admin hours */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Weekly admin hours</span>
                  <span className="cost-clay-slider-val">{adminHoursWeek}h</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={adminHoursWeek}
                    onChange={(e) => setAdminHoursWeek(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(adminHoursWeek, 1, 40)}%` }}
                  />
                </div>
              </div>

              {/* Slider 7: Hourly cost */}
              <div className="cost-clay-slider-group">
                <div className="cost-clay-slider-header">
                  <span className="cost-clay-slider-label">Hourly staff rate</span>
                  <span className="cost-clay-slider-val">A${hourlyCost}</span>
                </div>
                <div className="cost-clay-slider-track-wrap">
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="1"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                    className="cost-clay-range-input"
                    style={{ '--fill': `${getFillPercent(hourlyCost, 15, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Claymorphic Calculate Button */}
            <div className="cost-clay-btn-row">
              <button 
                type="button" 
                onClick={handleCalculate}
                className="cost-clay-calc-btn"
              >
                <span>Calculate Cost of Waiting</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
