import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Calculator, 
  Building2, 
  UtensilsCrossed, 
  Stethoscope,
  Bot,
  User,
  PhoneCall,
  Calendar,
  CheckCircle2
} from 'lucide-react';

const WORKFLOW_PIPELINE = [
  {
    step: "01",
    icon: PhoneCall,
    title: "Answers every client call day or night",
    pills: [
      "24/7 call answering in a natural, on-brand voice",
      "Takes and confirms messages accurately",
      "Offers a live transfer or callback handoff"
    ]
  },
  {
    step: "02",
    icon: Calendar,
    title: "Books, changes, and routes the next step",
    pills: [
      "Real-time availability and appointment booking",
      "Rescheduling, cancellation, and confirmations",
      "Messages, checklists, and staff handoffs"
    ]
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Follows up and keeps every detail organised",
    pills: [
      "Call summaries and searchable transcripts",
      "Email scanning and document intake",
      "Follow-up tasks and workflow monitoring"
    ]
  }
];

const INDUSTRIES_DATA = [
  {
    id: 'education',
    name: 'Education',
    tagline: 'Higher Education & K-12 Admissions',
    icon: GraduationCap,
    accentColor: '#3B82F6',
    image: '/assets/industries/education.jpg',
    agentName: 'AI Admissions Specialist',
    dialogue: [
      {
        sender: 'user',
        name: 'Prospective Student',
        time: '10:14 AM',
        text: 'Hi! I’m looking to book an in-person campus tour for the Computer Science faculty and check the Fall 2026 application cutoff.'
      },
      {
        sender: 'ai',
        name: 'AI Admissions',
        time: '10:14 AM',
        text: 'Hello! Fall 2026 CS applications close December 1st. Are you applying for our undergraduate BS program or the postgraduate Master’s?'
      },
      {
        sender: 'user',
        name: 'Prospective Student',
        time: '10:14 AM',
        text: 'Postgraduate Master’s in Data Science & Machine Learning.'
      },
      {
        sender: 'ai',
        name: 'AI Admissions',
        time: '10:15 AM',
        text: 'Great! The faculty dean is hosting tour and lab walkthrough sessions this Thursday at 2:00 PM and Saturday at 11:00 AM. Which day works better for your schedule?'
      },
      {
        sender: 'user',
        name: 'Prospective Student',
        time: '10:15 AM',
        text: 'Thursday at 2:00 PM works best for me.'
      },
      {
        sender: 'ai',
        name: 'AI Admissions',
        time: '10:15 AM',
        text: 'Perfect. Do you require visitor parking on campus or will you be using public transit?'
      },
      {
        sender: 'user',
        name: 'Prospective Student',
        time: '10:16 AM',
        text: 'I will be driving, a parking permit would be great.'
      },
      {
        sender: 'ai',
        name: 'AI Admissions',
        time: '10:16 AM',
        text: 'Confirmed! You are registered for Thursday at 2:00 PM. I’ve just dispatched your digital parking permit, lab pass, and department itinerary to your phone.'
      }
    ],
    outcome: 'Campus Tour Booked · Slate CRM Synced · Visitor Pass Texted via SMS'
  },
  {
    id: 'accounting',
    name: 'Accounting',
    tagline: 'CPA & Advisory Practices',
    icon: Calculator,
    accentColor: '#0052FF',
    image: '/assets/industries/accounting.jpg',
    agentName: 'AI Practice Concierge',
    dialogue: [
      {
        sender: 'user',
        name: 'Corporate Client',
        time: '02:30 PM',
        text: 'Hi, I need to lodge our quarterly BAS return and have questions regarding our capital equipment depreciation deductions before Friday.'
      },
      {
        sender: 'ai',
        name: 'AI Receptionist',
        time: '02:30 PM',
        text: 'Good afternoon! I can help prepare your quarterly lodgment package right now. Are you filing under your standard corporate entity or an investment trust?'
      },
      {
        sender: 'user',
        name: 'Corporate Client',
        time: '02:31 PM',
        text: 'Under our corporate entity ABN, 54 123 456.'
      },
      {
        sender: 'ai',
        name: 'AI Receptionist',
        time: '02:31 PM',
        text: 'Verified in Xero! I see your entity is active. Would you prefer a 20-minute tax strategy call with Senior Partner Mark or our head tax CPA Sarah?'
      },
      {
        sender: 'user',
        name: 'Corporate Client',
        time: '02:31 PM',
        text: 'Senior Partner Mark if he has availability.'
      },
      {
        sender: 'ai',
        name: 'AI Receptionist',
        time: '02:32 PM',
        text: 'Mark has openings tomorrow at 10:30 AM or Thursday at 2:15 PM over Zoom or in-office. Which suits you?'
      },
      {
        sender: 'user',
        name: 'Corporate Client',
        time: '02:32 PM',
        text: 'Tomorrow at 10:30 AM on Zoom, please.'
      },
      {
        sender: 'ai',
        name: 'AI Receptionist',
        time: '02:32 PM',
        text: 'Booked and synced to Mark’s calendar! I’ve sent your calendar invite with the encrypted portal link to upload your equipment receipts via SMS.'
      }
    ],
    outcome: 'ABN Entity Verified in Xero · 20-Min Partner Slot Booked · Encrypted Upload SMS Sent'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    tagline: 'Residential & Commercial Brokerages',
    icon: Building2,
    accentColor: '#10B981',
    image: '/assets/industries/real-estate.jpg',
    agentName: 'AI Property Specialist',
    dialogue: [
      {
        sender: 'user',
        name: 'Verified Buyer',
        time: '11:42 AM',
        text: 'Hi, I’m calling regarding the 4-bedroom residence on Ocean Drive. Is it still available for a private walkthrough this weekend?'
      },
      {
        sender: 'ai',
        name: 'AI Specialist',
        time: '11:42 AM',
        text: 'Hello! Yes, 42 Ocean Drive is open for private viewings. May I confirm if you are looking for an owner-occupier home and your purchase timeline?'
      },
      {
        sender: 'user',
        name: 'Verified Buyer',
        time: '11:42 AM',
        text: 'Owner-occupier, pre-approved finance up to $2.2M, ready to make an offer within 30 days.'
      },
      {
        sender: 'ai',
        name: 'AI Specialist',
        time: '11:43 AM',
        text: 'Fantastic, that matches our vendor’s criteria. Our lead partner Sarah has private 30-minute inspection windows this Saturday at 11:30 AM and 3:00 PM. Which works best?'
      },
      {
        sender: 'user',
        name: 'Verified Buyer',
        time: '11:43 AM',
        text: '11:30 AM on Saturday works great.'
      },
      {
        sender: 'ai',
        name: 'AI Specialist',
        time: '11:43 AM',
        text: 'Would you also like me to send the preliminary contract of sale and pest inspection report to your email beforehand?'
      },
      {
        sender: 'user',
        name: 'Verified Buyer',
        time: '11:44 AM',
        text: 'Yes please, that would be very helpful.'
      },
      {
        sender: 'ai',
        name: 'AI Specialist',
        time: '11:44 AM',
        text: 'Confirmed! Your private VIP inspection is locked in for Saturday at 11:30 AM. Contract, vendor disclosure, and gate access pin have been sent to your mobile.'
      }
    ],
    outcome: 'Buyer Pre-Qualified ($1.8M+) · Private Inspection Confirmed · Contract Sent via SMS'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    tagline: 'Fine Dining & Hospitality Groups',
    icon: UtensilsCrossed,
    accentColor: '#F59E0B',
    image: '/assets/industries/restaurants.jpg',
    agentName: 'AI Dining Concierge',
    dialogue: [
      {
        sender: 'user',
        name: 'Dinner Guest',
        time: '04:18 PM',
        text: 'Hey there! Do you have an indoor table for 6 available tonight around 7:30 PM? Two of our guests have strict celiac gluten allergies.'
      },
      {
        sender: 'ai',
        name: 'AI Concierge',
        time: '04:18 PM',
        text: 'Good evening! We have an indoor banquette table open at 7:30 PM. Our head chef maintains a dedicated certified gluten-free prep kitchen.'
      },
      {
        sender: 'user',
        name: 'Dinner Guest',
        time: '04:18 PM',
        text: 'That’s wonderful! Are children welcome at that seating, or is it adult-only dining?'
      },
      {
        sender: 'ai',
        name: 'AI Concierge',
        time: '04:19 PM',
        text: 'Children are very welcome! We offer handcrafted mocktails and a dedicated junior tasting menu. Would you prefer our main dining room or the garden-view atrium?'
      },
      {
        sender: 'user',
        name: 'Dinner Guest',
        time: '04:19 PM',
        text: 'The garden-view atrium sounds lovely.'
      },
      {
        sender: 'ai',
        name: 'AI Concierge',
        time: '04:19 PM',
        text: 'Would you like me to hold the table for 7:30 PM with valet parking included?'
      },
      {
        sender: 'user',
        name: 'Dinner Guest',
        time: '04:20 PM',
        text: 'Yes please, let’s reserve that table.'
      },
      {
        sender: 'ai',
        name: 'AI Concierge',
        time: '04:20 PM',
        text: 'Your reservation for 6 at 7:30 PM is confirmed! I’ve flagged the celiac allergy in Resy for your server and texted your digital reservation pass and valet directions.'
      }
    ],
    outcome: 'Table for 6 Booked · Dietary Notes Flagged in Resy · SMS Confirmation Dispatched'
  },
  {
    id: 'medical',
    name: 'Medical',
    tagline: 'Clinics, Specialists & Hospitals',
    icon: Stethoscope,
    accentColor: '#06B6D4',
    image: '/assets/industries/medical.jpg',
    agentName: 'AI Clinical Coordinator',
    dialogue: [
      {
        sender: 'user',
        name: 'Patient',
        time: '09:05 AM',
        text: 'Hi, I need an urgent consultation with Dr. Chen for recurring migraines, and I need to check if my private health insurance is accepted.'
      },
      {
        sender: 'ai',
        name: 'AI Medical Desk',
        time: '09:05 AM',
        text: 'Good morning. Dr. Chen has a priority telehealth slot today at 4:15 PM and an in-clinic opening tomorrow at 9:00 AM. We directly bill major private health funds with zero gap.'
      },
      {
        sender: 'user',
        name: 'Patient',
        time: '09:05 AM',
        text: 'Are you able to check if Bupa covers the full consultation fee?'
      },
      {
        sender: 'ai',
        name: 'AI Medical Desk',
        time: '09:06 AM',
        text: 'Yes! Bupa Premier and Corporate covers 100% of Dr. Chen’s specialist consultation. Would you prefer the telehealth session today or in-clinic tomorrow?'
      },
      {
        sender: 'user',
        name: 'Patient',
        time: '09:06 AM',
        text: 'I’ll take the in-clinic consultation tomorrow at 9:00 AM, please.'
      },
      {
        sender: 'ai',
        name: 'AI Medical Desk',
        time: '09:06 AM',
        text: 'Have you visited our clinic in the last 12 months, or will this be a new patient registration?'
      },
      {
        sender: 'user',
        name: 'Patient',
        time: '09:07 AM',
        text: 'This will be my first visit.'
      },
      {
        sender: 'ai',
        name: 'AI Medical Desk',
        time: '09:07 AM',
        text: 'Understood. You are booked with Dr. Chen for tomorrow at 9:00 AM. I’ve sent your secure pre-consultation medical questionnaire and priority parking barcode to your phone.'
      }
    ],
    outcome: 'Appointment Scheduled in Best Practice · Insurance Pre-Verified · Pre-Intake SMS Sent'
  }
];

export default function IndustryShowcase({ onOpenDemo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const pipelineRef = useRef(null);
  const activeIndustry = INDUSTRIES_DATA[currentIndex];

  // Scroll-driven activation for the 3 circles and connecting lines
  useEffect(() => {
    const handleScroll = () => {
      const el = pipelineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.35;
      const totalRange = startTrigger - endTrigger;

      const currentDistance = startTrigger - rect.top;
      const progress = Math.min(1, Math.max(0, currentDistance / totalRange));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const messagesStreamRef = useRef(null);

  useEffect(() => {
    if (messagesStreamRef.current) {
      messagesStreamRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INDUSTRIES_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INDUSTRIES_DATA.length) % INDUSTRIES_DATA.length);
  };

  const IconComp = activeIndustry.icon;

  return (
    <section id="industries" ref={containerRef} className="industry-showcase-section">
      <div className="container industry-showcase-container">
        {/* Section Header */}
        <div className="industry-header-center">
          <h2 className="section-title industry-main-headline">
            <span className="industry-headline-lead">Calibrated for</span>{' '}
            <span className="text-full-blue industry-headline-accent">every Industry</span>
          </h2>
        </div>

        {/* Dual Stage: Left Image Only (fading behind chat box), Right Industry Name + Arrows + Chat Card */}
        <div className="industry-dual-stage">
          {/* Left Side: Image ONLY that fades towards/behind the chat box */}
          <div className="industry-image-only-column">
            <div className="industry-image-only-wrap" aria-hidden="true">
              {INDUSTRIES_DATA.map((ind, i) => (
                <img
                  key={ind.id}
                  src={ind.image}
                  alt={ind.name}
                  className={`industry-only-img ${i === currentIndex ? 'is-active' : ''}`}
                />
              ))}
              <div className="industry-only-fade-overlay" />
            </div>
          </div>

          {/* Right Side: Chat Card containing Industry Title, Arrows & Dialogue */}
          <div className="industry-info-column">
            {/* Standalone Claymorphed Chat Card */}
            <div className="industry-clay-chat-card">
              {/* Card Top: Industry Title & Left/Right Navigation Controls inside container */}
              <div className="clay-chat-industry-header">
                <div className="industry-title-left">
                  <div 
                    className="industry-title-icon-badge" 
                    style={{ 
                      backgroundColor: `${activeIndustry.accentColor}18`, 
                      color: activeIndustry.accentColor,
                      borderColor: `${activeIndustry.accentColor}35`
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h3 className="industry-title-text">{activeIndustry.name}</h3>
                </div>

                <div className="industry-arrows-cluster">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="industry-arrow-btn"
                    title="Previous Industry"
                    aria-label="Previous Industry"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="industry-arrow-btn"
                    title="Next Industry"
                    aria-label="Next Industry"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Card Header */}
              <div className="clay-chat-header">
                <div className="clay-chat-header-agent">
                  <div className="clay-agent-avatar">
                    <img 
                      src="/assets/Jenny.png" 
                      alt={activeIndustry.agentName} 
                      className="clay-agent-avatar-img" 
                    />
                  </div>
                  <div className="clay-agent-meta">
                    <strong className="clay-agent-title">{activeIndustry.agentName}</strong>
                    <span className="clay-agent-subtitle">Voice Agent Live</span>
                  </div>
                </div>
                <div className="clay-status-indicator">
                  <span className="status-live-dot" />
                  <span>Active Session</span>
                </div>
              </div>

              {/* Chat Message Bubbles (Scrollable) */}
              <div 
                ref={messagesStreamRef} 
                className="clay-messages-stream" 
                role="log" 
                aria-label="Sample conversation"
              >
                {activeIndustry.dialogue.map((msg, mIdx) => {
                  const isAI = msg.sender === 'ai';
                  return (
                    <div
                      key={mIdx}
                      className={`clay-bubble-row ${isAI ? 'is-ai' : 'is-user'}`}
                    >
                      <div className="clay-bubble-bubble">
                        <div className="clay-bubble-top">
                          <span className="clay-bubble-sender">
                            {isAI ? (
                              <Bot size={12} className="bubble-role-icon" />
                            ) : (
                              <User size={12} className="bubble-role-icon" />
                            )}
                            {msg.name}
                          </span>
                          <span className="clay-bubble-time">{msg.time}</span>
                        </div>
                        <p className="clay-bubble-text">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Execution Pipeline with Claymorphic Circles and Animated Connecting Flow */}
        <div 
          ref={pipelineRef} 
          className="industry-pipeline-wrapper"
        >
          <div className="industry-pipeline-grid">
            {WORKFLOW_PIPELINE.map((item, idx) => {
              const StepIcon = item.icon;
              const isActive = idx === 0 
                ? scrollProgress >= 0.05 
                : idx === 1 
                ? scrollProgress >= 0.50 
                : scrollProgress >= 0.94;

              const hasConnectingLine = idx < WORKFLOW_PIPELINE.length - 1;
              const lineFillPercent = idx === 0
                ? Math.min(100, Math.max(0, ((scrollProgress - 0.08) / 0.42) * 100))
                : idx === 1
                ? Math.min(100, Math.max(0, ((scrollProgress - 0.52) / 0.42) * 100))
                : 0;

              return (
                <div 
                  key={item.step} 
                  className={`industry-pipeline-col ${isActive ? 'is-active' : ''}`}
                >
                  {/* Top Circle Area with Horizontal Connecting Line */}
                  <div className="pipeline-circle-wrapper">
                    {hasConnectingLine && (
                      <div className="pipeline-line-track" aria-hidden="true">
                        <div 
                          className="pipeline-line-fill" 
                          style={{ width: `${lineFillPercent}%` }}
                        />
                      </div>
                    )}
                    <div className={`pipeline-clay-circle ${isActive ? 'is-active' : ''}`}>
                      <StepIcon size={38} className="pipeline-circle-icon" />
                    </div>
                  </div>

                  {/* Column Title */}
                  <h4 className="pipeline-col-title">{item.title}</h4>

                  {/* Bullet Points in Claymorphism Pills */}
                  <div className="pipeline-pills-list">
                    {item.pills.map((pillText, pIdx) => (
                      <div key={pIdx} className={`pipeline-clay-pill ${isActive ? 'is-active' : ''}`}>
                        <span className="pipeline-pill-dot" />
                        <span className="pipeline-pill-text">{pillText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
