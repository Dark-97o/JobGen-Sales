import React, { useState, useMemo } from 'react';
import { X, ArrowRight, Calculator, Sparkles, TrendingDown, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WaitingCostModal({ isOpen, onClose, onOpenDemo, onOpenBooking }) {
  // 7 Slider Inputs from the reference image
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

  // Helper for slider fill styling
  const getFillPercent = (val, min, max) => ((val - min) / (max - min)) * 100;

  return (
    <div className="cost-modal-backdrop" onClick={onClose}>
      <div 
        className="cost-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          type="button" 
          onClick={onClose} 
          className="cost-modal-close-btn"
          aria-label="Close calculator"
        >
          <X size={18} />
        </button>

        <div className="cost-modal-layout">
          {/* LEFT SIDE: Narrative & Live Breakdown */}
          <div className="cost-left-col">
            <div className="cost-kicker">04 · WHAT WAITING COSTS</div>
            
            <h2 className="cost-main-title">
              What is <br />
              waiting <br />
              <span className="cost-title-highlight">costing you?</span>
            </h2>

            <p className="cost-desc">
              Every month without help, some calls go unanswered, some enquiries go cold and your team loses hours to admin. Put in your own numbers to see what that adds up to.
            </p>

            <div className="cost-legend-list">
              <div className="cost-legend-item">
                <span className="cost-legend-dot dot-coral" />
                <span className="cost-legend-text">Missed calls and cold enquiries</span>
              </div>
              <div className="cost-legend-item">
                <span className="cost-legend-dot dot-amber" />
                <span className="cost-legend-text">Staff time on repetitive admin</span>
              </div>
            </div>

            {/* Live Impact Card */}
            <div className="cost-impact-summary-clay">
              <div className="cost-impact-header">
                <TrendingDown size={17} className="text-coral" />
                <span className="cost-impact-label">ESTIMATED COST OF INACTION</span>
              </div>

              <div className="cost-impact-big-value">
                A${stats.monthlyTotalCost.toLocaleString()}
                <span className="cost-impact-per">/month</span>
              </div>

              <div className="cost-impact-annual-pill">
                <span>≈ A${stats.annualTotalCost.toLocaleString()} per year</span>
              </div>

              <div className="cost-impact-breakdown-grid">
                <div className="cost-breakdown-subitem">
                  <span className="cost-subitem-label">
                    <span className="cost-legend-dot dot-coral inline-dot" /> Lost Revenue:
                  </span>
                  <span className="cost-subitem-val">A${stats.monthlyLostRevenue.toLocaleString()}/mo</span>
                </div>
                <div className="cost-breakdown-subitem">
                  <span className="cost-subitem-label">
                    <span className="cost-legend-dot dot-amber inline-dot" /> Admin Payroll:
                  </span>
                  <span className="cost-subitem-val">A${stats.monthlyAdminCost.toLocaleString()}/mo</span>
                </div>
              </div>

              {hasCalculated && (
                <div className="cost-recovered-cta-box">
                  <div className="cost-recovered-text">
                    <Sparkles size={15} className="text-amber" />
                    <span>JobGen autonomous agents recover <strong>95%+</strong> of these missed calls and automate 100% of admin follow-ups.</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleBookSolution}
                    className="cost-recover-btn"
                  >
                    <span>Recover A${stats.monthlyTotalCost.toLocaleString()}/mo with AI</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Sliders Card */}
          <div className="cost-right-card">
            <div className="cost-sliders-stack">
              {/* Slider 1: Calls you get a day */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">Calls you get a day</span>
                  <span className="cost-slider-val">{callsPerDay}</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(callsPerDay, 5, 150)}%` }}
                  />
                </div>
              </div>

              {/* Slider 2: Share you can't answer */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">Share you can't answer</span>
                  <span className="cost-slider-val">{unansweredRate}%</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="1"
                    value={unansweredRate}
                    onChange={(e) => setUnansweredRate(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(unansweredRate, 5, 80)}%` }}
                  />
                </div>
              </div>

              {/* Slider 3: Enquiries a month nobody follows up */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">Enquiries a month nobody follows up (forms, emails, messages)</span>
                  <span className="cost-slider-val">{coldEnquiries}</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={coldEnquiries}
                    onChange={(e) => setColdEnquiries(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(coldEnquiries, 0, 100)}%` }}
                  />
                </div>
              </div>

              {/* Slider 4: Share who'd become customers */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">Share who'd become customers</span>
                  <span className="cost-slider-val">{conversionRate}%</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(conversionRate, 5, 60)}%` }}
                  />
                </div>
              </div>

              {/* Slider 5: New customer value (AUD) */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">New customer value (AUD)</span>
                  <span className="cost-slider-val">A${customerValue}</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="30"
                    max="1000"
                    step="10"
                    value={customerValue}
                    onChange={(e) => setCustomerValue(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(customerValue, 30, 1000)}%` }}
                  />
                </div>
              </div>

              {/* Slider 6: Hours a week your team spends on bookings... */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">Hours a week your team spends on bookings, reception, data entry and follow-ups</span>
                  <span className="cost-slider-val">{adminHoursWeek}h</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={adminHoursWeek}
                    onChange={(e) => setAdminHoursWeek(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(adminHoursWeek, 1, 40)}%` }}
                  />
                </div>
              </div>

              {/* Slider 7: What an hour of that time costs you (AUD) */}
              <div className="cost-slider-group">
                <div className="cost-slider-header">
                  <span className="cost-slider-label">What an hour of that time costs you (AUD)</span>
                  <span className="cost-slider-val">A${hourlyCost}</span>
                </div>
                <div className="cost-slider-track-wrap">
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="1"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                    className="cost-range-input"
                    style={{ '--fill': `${getFillPercent(hourlyCost, 15, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Gradient Button matching image */}
            <div className="cost-calculate-btn-row">
              <button 
                type="button" 
                onClick={handleCalculate}
                className="cost-sunset-calc-btn"
              >
                <span>Calculate what waiting costs</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
