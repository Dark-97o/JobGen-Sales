import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Phone, Building2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '02:45 PM',
  '04:00 PM',
  '05:15 PM'
];

export default function DemoBookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  });

  // Dynamic next 5 days
  const upcomingDays = React.useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateText = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days.push({
        id: d.toISOString().split('T')[0],
        label,
        date: dateText
      });
    }
    return days;
  }, []);

  const [selectedDay, setSelectedDay] = useState(upcomingDays[0]?.id || '');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.55 }
        });
      } catch (err) {
        // fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  const selectedDayObj = upcomingDays.find(d => d.id === selectedDay) || upcomingDays[0];

  return (
    <div className="demo-modal-backdrop" onClick={onClose}>
      <div 
        className="demo-modal-clay-card" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Clay Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="demo-modal-close-clay-btn"
          aria-label="Close demo booking modal"
        >
          <X size={18} />
        </button>

        {isConfirmed ? (
          /* Confirmation State */
          <div className="demo-confirmed-view">
            <div className="demo-confirmed-icon-clay">
              <CheckCircle2 size={44} className="demo-check-svg" />
            </div>

            <h3 className="demo-confirmed-title">Demo Walkthrough Confirmed!</h3>
            <p className="demo-confirmed-sub">
              We've reserved your slot for <strong>{selectedDayObj?.label} ({selectedDayObj?.date}) at {selectedTime}</strong>.
            </p>

            <div className="demo-confirmed-details-clay">
              <div className="demo-detail-row">
                <span className="demo-detail-label">Attendee:</span>
                <span className="demo-detail-val">{formData.fullName || 'Valued Partner'}</span>
              </div>
              <div className="demo-detail-row">
                <span className="demo-detail-label">Work Email:</span>
                <span className="demo-detail-val">{formData.email || 'Email provided'}</span>
              </div>
              <div className="demo-detail-row">
                <span className="demo-detail-label">Phone / Mobile:</span>
                <span className="demo-detail-val">{formData.phone || 'Phone provided'}</span>
              </div>
              <div className="demo-detail-row">
                <span className="demo-detail-label">Practice/Company:</span>
                <span className="demo-detail-val">{formData.company || 'Not specified'}</span>
              </div>
            </div>

            <div className="demo-confirmed-notice">
              <Sparkles size={16} className="text-full-blue" />
              <span>Calendar invite & live screen share link sent to your email.</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="demo-clay-submit-btn"
            >
              <span>Done</span>
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="demo-modal-form">
            {/* Header */}
            <div className="demo-modal-header">
              <h2 className="demo-modal-title">Experience JobGen Live</h2>
              <p className="demo-modal-desc">
                Select your preferred date & time. Our solutions engineers will tailor the live call flow to your business.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="demo-form-grid">
              {/* Full Name */}
              <div className="demo-field-group">
                <label className="demo-field-label" htmlFor="fullName">Full Name *</label>
                <div className="demo-input-clay-wrap">
                  <User size={16} className="demo-input-icon" />
                  <input
                    id="fullName"
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="demo-input-clay"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div className="demo-field-group">
                <label className="demo-field-label" htmlFor="email">Work Email *</label>
                <div className="demo-input-clay-wrap">
                  <Mail size={16} className="demo-input-icon" />
                  <input
                    id="email"
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@yourpractice.com"
                    className="demo-input-clay"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="demo-field-group">
                <label className="demo-field-label" htmlFor="phone">Phone / Mobile *</label>
                <div className="demo-input-clay-wrap">
                  <Phone size={16} className="demo-input-icon" />
                  <input
                    id="phone"
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 234-5678"
                    className="demo-input-clay"
                  />
                </div>
              </div>

              {/* Company / Practice */}
              <div className="demo-field-group">
                <label className="demo-field-label" htmlFor="company">Company / Practice</label>
                <div className="demo-input-clay-wrap">
                  <Building2 size={16} className="demo-input-icon" />
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Apex Accounting & Legal"
                    className="demo-input-clay"
                  />
                </div>
              </div>
            </div>

            {/* Date Slot Booking */}
            <div className="demo-field-section">
              <div className="demo-section-label-row">
                <div className="demo-label-icon-wrap">
                  <Calendar size={15} className="text-full-blue" />
                  <span className="demo-field-label" style={{ margin: 0 }}>Select Date</span>
                </div>
                <span className="demo-sub-note">Next available business days</span>
              </div>
              <div className="demo-days-clay-grid">
                {upcomingDays.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDay(d.id)}
                    className={`demo-day-clay-btn ${selectedDay === d.id ? 'is-selected' : ''}`}
                  >
                    <span className="demo-day-label">{d.label}</span>
                    <span className="demo-day-date">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Booking */}
            <div className="demo-field-section">
              <div className="demo-section-label-row">
                <div className="demo-label-icon-wrap">
                  <Clock size={15} className="text-full-blue" />
                  <span className="demo-field-label" style={{ margin: 0 }}>Select Time Slot</span>
                </div>
                <span className="demo-sub-note">30 min live interactive demo</span>
              </div>
              <div className="demo-times-clay-grid">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`demo-time-clay-btn ${selectedTime === slot ? 'is-selected' : ''}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="demo-submit-wrapper">
              <button
                type="submit"
                disabled={isSubmitting}
                className="demo-clay-submit-btn"
              >
                <span>{isSubmitting ? 'Confirming Reservation...' : 'Confirm Demo Booking'}</span>
                <ArrowRight size={16} />
              </button>

              <div className="demo-trust-badge">
                <ShieldCheck size={14} className="text-full-blue" />
                <span>Zero obligation · Instant calendar invite · SOC-2 compliant</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
