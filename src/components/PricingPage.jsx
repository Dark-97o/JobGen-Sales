import React, { useState, useMemo } from 'react';
import {
  PhoneIncoming,
  PhoneOutgoing,
  Building,
  GraduationCap,
  Calculator,
  Sparkles,
  Volume2,
  Mic2,
  Radio,
  AudioLines,
  FileText,
  Activity,
  ListOrdered,
  Smartphone,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Cpu,
  Coins,
  Globe,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';

// Product domain presets matching sales.jobgen.ai/pricing
const PRODUCT_AREAS = [
  {
    id: 'property',
    label: 'Property',
    detail: 'Real-estate receptionist and outreach',
    icon: Building,
    badge: 'Real Estate & Strata',
    inbound: {
      detail: 'Inbound receptionist',
      conversationBase: 0.104,
      conversationGrowth: 0.027,
      requestsPerMinute: 3.9,
      ttsPerMinute: 0.026,
      sttPerMinute: 0.0087
    },
    outbound: {
      detail: 'Outbound outreach',
      conversationBase: 0.066,
      conversationGrowth: 0.024,
      requestsPerMinute: 3.9,
      ttsPerMinute: 0.026,
      sttPerMinute: 0.0087
    }
  },
  {
    id: 'education',
    label: 'Education',
    detail: 'Student services and outreach',
    icon: GraduationCap,
    badge: 'Universities & RTOs',
    inbound: {
      detail: 'Inbound student services',
      conversationBase: 0.111,
      conversationGrowth: 0.022,
      requestsPerMinute: 4.6,
      ttsPerMinute: 0.026,
      sttPerMinute: 0.0087
    },
    outbound: {
      detail: 'Outbound student outreach',
      conversationBase: 0.052,
      conversationGrowth: 0.019,
      requestsPerMinute: 5.3,
      ttsPerMinute: 0.026,
      sttPerMinute: 0.0087
    }
  },
  {
    id: 'accounting',
    label: 'Accounting',
    detail: 'Receptionist and tax workflows',
    icon: Calculator,
    badge: 'Practices & Law',
    inbound: {
      detail: 'Inbound receptionist / tax',
      conversationBase: 0.194,
      conversationGrowth: 0.037,
      requestsPerMinute: 3.4,
      ttsPerMinute: 0.026,
      sttPerMinute: 0.0087
    },
    outbound: {
      detail: 'Outbound service follow-up',
      conversationBase: 0.194,
      conversationGrowth: 0.037,
      requestsPerMinute: 3.4,
      ttsPerMinute: 0.026,
      sttPerMinute: 0.0087
    }
  }
];

const CALL_DIRECTIONS = [
  {
    id: 'inbound',
    label: 'Inbound',
    detail: 'Customer calls your number',
    icon: PhoneIncoming
  },
  {
    id: 'outbound',
    label: 'Outbound',
    detail: 'Your campaign calls the customer',
    icon: PhoneOutgoing
  }
];

const AI_MODELS = [
  { id: 'gpt-5.5', label: 'GPT-5.5', detail: 'Flagship', multiplier: 1.55, icon: Sparkles, tag: 'Most Capable' },
  { id: 'gpt-5.4-mini', label: 'GPT-5.4 mini', detail: 'Balanced', multiplier: 0.5, icon: Cpu, tag: 'Fast & Smart' },
  { id: 'gpt-4.1', label: 'GPT-4.1', detail: 'Reliable', multiplier: 1.15, icon: ShieldCheck, tag: 'Enterprise' },
  { id: 'gpt-4.1-mini', label: 'GPT-4.1 mini', detail: 'Efficient', multiplier: 0.55, icon: Sliders, tag: 'Low Latency' },
  { id: 'gpt-4o', label: 'GPT-4o', detail: 'Recommended', multiplier: 1.0, icon: Sparkles, tag: 'Recommended' },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', detail: 'Lowest price', multiplier: 0.3, icon: Coins, tag: 'Lowest Cost' }
];

const VOICES = [
  { id: 'eleven-flash', label: 'ElevenLabs Flash / Turbo', detail: 'Natural conversational voice', multiplier: 1.0, icon: Volume2 },
  { id: 'eleven-v3-conversational', label: 'ElevenLabs v3 Conversational', detail: 'Natural conversational voice', multiplier: 1.0, icon: Mic2 },
  { id: 'eleven-v3', label: 'ElevenLabs v3', detail: 'Expressive voice generation', multiplier: 2.0, icon: Radio }
];

const TRANSCRIPTION_MODELS = [
  { id: 'scribe-realtime', label: 'ElevenLabs Scribe v2 Realtime', detail: 'Realtime transcription', multiplier: 1.0, icon: AudioLines },
  { id: 'scribe', label: 'ElevenLabs Scribe v2', detail: 'Accurate transcription', multiplier: 0.56, icon: FileText },
  { id: 'gpt-live-transcribe', label: 'GPT live transcribe', detail: 'Realtime transcription', multiplier: 0.044, icon: Activity },
  { id: 'gpt-4o-mini-transcribe', label: 'GPT-4o mini transcribe', detail: 'Accurate transcription', multiplier: 0.008, icon: ListOrdered }
];

const TELEPHONY_RATES = {
  local: { label: 'AU local / landline', monthly: 4.05, inbound: 0.0135, outbound: 0.034, icon: PhoneCall },
  mobile: { label: 'AU mobile', monthly: 11.14, inbound: 0.0675, outbound: 0.1013, icon: Smartphone }
};

const AUDIO_STREAM_RATE = 0.0059;

function formatCurrency(amount, digits = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatMinutes(mins) {
  const num = Number(mins);
  return `${num.toFixed(num % 1 ? 2 : 0)} min`;
}

export default function PricingPage({ onOpenDemo, onOpenBooking, onOpenCalculator }) {
  // Calculator state
  const [callDirection, setCallDirection] = useState('outbound');
  const [productArea, setProductArea] = useState('property');
  const [monthlyCalls, setMonthlyCalls] = useState(100);
  const [callLength, setCallLength] = useState(1.34);
  const [aiModel, setAiModel] = useState('gpt-4o');
  const [voice, setVoice] = useState('eleven-flash');
  const [transcription, setTranscription] = useState('scribe-realtime');
  const [telephoneProvider, setTelephoneProvider] = useState('managed'); // 'existing' | 'managed'
  const [phoneType, setPhoneType] = useState('mobile'); // 'local' | 'mobile'
  const [numbersNeeded, setNumbersNeeded] = useState(1);
  const [audioStreaming, setAudioStreaming] = useState(true);

  // Active configs
  const activeDomain = useMemo(
    () => PRODUCT_AREAS.find((item) => item.id === productArea) || PRODUCT_AREAS[0],
    [productArea]
  );
  const activeDirection = useMemo(
    () => activeDomain[callDirection] || activeDomain.outbound,
    [activeDomain, callDirection]
  );

  const selectedModel = useMemo(
    () => AI_MODELS.find((m) => m.id === aiModel) || AI_MODELS[4],
    [aiModel]
  );
  const selectedVoice = useMemo(
    () => VOICES.find((v) => v.id === voice) || VOICES[0],
    [voice]
  );
  const selectedTranscription = useMemo(
    () => TRANSCRIPTION_MODELS.find((t) => t.id === transcription) || TRANSCRIPTION_MODELS[0],
    [transcription]
  );

  // Core Math Calculation
  const calculation = useMemo(() => {
    const telRates = TELEPHONY_RATES[phoneType];

    const calcForDuration = (durationMins) => {
      const mins = Math.max(0.25, Number(durationMins) || 0.25);
      // LLM conversation cost
      const llm = mins * (activeDirection.conversationBase + (activeDirection.conversationGrowth * mins) / 2) * selectedModel.multiplier;
      // TTS cost
      const tts = mins * activeDirection.ttsPerMinute * selectedVoice.multiplier;
      // STT cost
      const stt = mins * activeDirection.sttPerMinute * selectedTranscription.multiplier;
      // Telecom per min cost
      const telephony = telephoneProvider === 'managed'
        ? mins * (callDirection === 'inbound' ? telRates.inbound : telRates.outbound)
        : 0;
      // Audio streaming
      const stream = telephoneProvider === 'managed' && audioStreaming ? mins * AUDIO_STREAM_RATE : 0;

      return llm + tts + stt + telephony + stream;
    };

    const currentMins = Math.max(0.25, Number(callLength) || 0.25);
    const perCallCost = calcForDuration(currentMins);
    const rentalCost = telephoneProvider === 'managed' ? telRates.monthly * Math.max(0, Number(numbersNeeded) || 0) : 0;
    const monthlyTotal = perCallCost * Number(monthlyCalls) + rentalCost;

    return {
      perCall: perCallCost,
      monthlyTotal,
      numberRental: rentalCost,
      atDuration: calcForDuration,
      model: selectedModel,
      voice: selectedVoice,
      transcription: selectedTranscription,
      telephonyRate: telRates
    };
  }, [
    activeDirection,
    selectedModel,
    selectedVoice,
    selectedTranscription,
    phoneType,
    telephoneProvider,
    callDirection,
    audioStreaming,
    callLength,
    numbersNeeded,
    monthlyCalls
  ]);

  return (
    <div className="pricing-page-root jobgen-pricing-v2">
      <div className="container pricing-container">
        {/* Hero Section */}
        <section className="pricing-hero-section">
          <h1 className="pricing-hero-title">
            Price every conversation with confidence.
          </h1>
        </section>

        {/* Interactive Calculator Cockpit */}
        <section className="pricing-interactive-calc-section">
          {/* 2-Column Responsive Cockpit: Choosing Options on Left, Floating Summary Card on Right */}
          <div className="pricing-cockpit-grid">
            {/* Left Column: Compact Controls */}
            <div className="pricing-controls-col">
              {/* 1. Call Direction */}
              <div className="pricing-compact-block">
                <div className="compact-block-label">
                  <PhoneCall size={16} className="block-label-icon" />
                  <div>
                    <strong>Call direction</strong>
                    <small>Choose how conversations begin</small>
                  </div>
                </div>
                <div className="compact-pills-row">
                  {CALL_DIRECTIONS.map((dir) => {
                    const DirIcon = dir.icon;
                    const isActive = callDirection === dir.id;
                    return (
                      <button
                        key={dir.id}
                        type="button"
                        onClick={() => setCallDirection(dir.id)}
                        className={`compact-clay-pill ${isActive ? 'is-active' : ''}`}
                      >
                        <DirIcon size={14} className="pill-favicon" />
                        <span className="pill-title">{dir.label}</span>
                        <span className="pill-sub">{dir.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Product Area */}
              <div className="pricing-compact-block">
                <div className="compact-block-label">
                  <Building size={16} className="block-label-icon" />
                  <div>
                    <strong>Product area</strong>
                    <small>{activeDirection.detail}</small>
                  </div>
                </div>
                <div className="compact-pills-row">
                  {PRODUCT_AREAS.map((area) => {
                    const AreaIcon = area.icon;
                    const isActive = productArea === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setProductArea(area.id)}
                        className={`compact-clay-pill ${isActive ? 'is-active' : ''}`}
                      >
                        <AreaIcon size={14} className="pill-favicon" />
                        <span className="pill-title">{area.label}</span>
                        <span className="pill-sub">{area.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Monthly Calls Slider */}
              <div className="pricing-compact-block">
                <div className="slider-header-row">
                  <div className="slider-label-group">
                    <span className="slider-icon-badge">
                      <Clock size={15} />
                    </span>
                    <div>
                      <strong>Monthly calls</strong>
                      <small>Number of conversations</small>
                    </div>
                  </div>
                  <b className="slider-live-value">{Number(monthlyCalls).toLocaleString()}</b>
                </div>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  step="1"
                  value={monthlyCalls}
                  onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                  className="compact-clay-range"
                />
                <div className="slider-limits-row">
                  <span>1 call</span>
                  <span>1,000 calls</span>
                </div>
              </div>

              {/* 4. Average Call Length Slider */}
              <div className="pricing-compact-block">
                <div className="slider-header-row">
                  <div className="slider-label-group">
                    <span className="slider-icon-badge">
                      <Clock size={15} />
                    </span>
                    <div>
                      <strong>Average call length</strong>
                      <small>Connected time per conversation</small>
                    </div>
                  </div>
                  <b className="slider-live-value">{formatMinutes(callLength)}</b>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.05"
                  value={callLength}
                  onChange={(e) => setCallLength(Number(e.target.value))}
                  className="compact-clay-range"
                />
                <div className="slider-limits-row">
                  <span>30 sec</span>
                  <span>10 min</span>
                </div>
              </div>

              {/* 5. AI Model */}
              <div className="pricing-compact-block">
                <div className="compact-block-label">
                  <Sparkles size={16} className="block-label-icon" />
                  <div>
                    <strong>AI model</strong>
                    <small>Choose the conversation intelligence</small>
                  </div>
                </div>
                <div className="compact-chips-grid">
                  {AI_MODELS.map((model) => {
                    const ModelIcon = model.icon;
                    const isActive = aiModel === model.id;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => setAiModel(model.id)}
                        className={`compact-clay-chip ${isActive ? 'is-active' : ''}`}
                      >
                        <div className="chip-head">
                          <ModelIcon size={13} className="chip-favicon" />
                          <span className="chip-name">{model.label}</span>
                        </div>
                        <span className="chip-tag">{model.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Voice */}
              <div className="pricing-compact-block">
                <div className="compact-block-label">
                  <Volume2 size={16} className="block-label-icon" />
                  <div>
                    <strong>Voice generation</strong>
                    <small>Choose how your assistant sounds</small>
                  </div>
                </div>
                <div className="compact-pills-row">
                  {VOICES.map((v) => {
                    const VoiceIcon = v.icon;
                    const isActive = voice === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVoice(v.id)}
                        className={`compact-clay-pill ${isActive ? 'is-active' : ''}`}
                      >
                        <VoiceIcon size={14} className="pill-favicon" />
                        <span className="pill-title">{v.label}</span>
                        <span className="pill-sub">{v.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Transcription */}
              <div className="pricing-compact-block">
                <div className="compact-block-label">
                  <AudioLines size={16} className="block-label-icon" />
                  <div>
                    <strong>Transcription</strong>
                    <small>Choose how callers are understood in real-time</small>
                  </div>
                </div>
                <div className="compact-chips-grid">
                  {TRANSCRIPTION_MODELS.map((stt) => {
                    const SttIcon = stt.icon;
                    const isActive = transcription === stt.id;
                    return (
                      <button
                        key={stt.id}
                        type="button"
                        onClick={() => setTranscription(stt.id)}
                        className={`compact-clay-chip ${isActive ? 'is-active' : ''}`}
                      >
                        <div className="chip-head">
                          <SttIcon size={13} className="chip-favicon" />
                          <span className="chip-name">{stt.label}</span>
                        </div>
                        <span className="chip-tag">{stt.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 8. Telephone Setup */}
              <div className="pricing-compact-block">
                <div className="compact-block-label">
                  <Globe size={16} className="block-label-icon" />
                  <div>
                    <strong>Telephone infrastructure</strong>
                    <small>Choose whose telecom network you use</small>
                  </div>
                </div>

                <div className="segmented-clay-switch">
                  <button
                    type="button"
                    onClick={() => setTelephoneProvider('existing')}
                    className={`segmented-switch-btn ${telephoneProvider === 'existing' ? 'is-active' : ''}`}
                  >
                    Customer Telephone
                  </button>
                  <button
                    type="button"
                    onClick={() => setTelephoneProvider('managed')}
                    className={`segmented-switch-btn ${telephoneProvider === 'managed' ? 'is-active' : ''}`}
                  >
                    JobGen Telephone
                  </button>
                </div>

                {telephoneProvider === 'managed' ? (
                  <div className="managed-telecom-settings">
                    <div className="segmented-clay-switch sub-switch">
                      <button
                        type="button"
                        onClick={() => setPhoneType('local')}
                        className={`segmented-switch-btn ${phoneType === 'local' ? 'is-active' : ''}`}
                      >
                        <PhoneCall size={13} /> Landline
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhoneType('mobile')}
                        className={`segmented-switch-btn ${phoneType === 'mobile' ? 'is-active' : ''}`}
                      >
                        <Smartphone size={13} /> Mobile
                      </button>
                    </div>

                    <label className="compact-inline-input">
                      <span>
                        Numbers needed
                        <small>JobGen provisions and manages the numbers</small>
                      </span>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={numbersNeeded}
                        onChange={(e) => setNumbersNeeded(Math.max(0, parseInt(e.target.value) || 0))}
                        className="clay-num-input"
                      />
                    </label>

                    <label className="compact-check-row">
                      <input
                        type="checkbox"
                        checked={audioStreaming}
                        onChange={(e) => setAudioStreaming(e.target.checked)}
                        className="clay-checkbox"
                      />
                      <span>
                        Include audio streaming
                        <small>Direct low-latency WebSocket connection to AI engine</small>
                      </span>
                    </label>
                  </div>
                ) : (
                  <p className="customer-choice-note">
                    Use your own telephone provider and number. The estimate covers the AI conversation experience only.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Floating Sticky Live Summary Claymorphic Card */}
            <div className="pricing-summary-col">
              <aside className="sticky-clay-summary-card">
                <div className="summary-card-header">
                  <span className="summary-eyebrow">Estimated price / conversation</span>
                  <small>Based on your selected setup</small>
                  <strong className="summary-big-per-call">
                    {formatCurrency(calculation.perCall, 3)}
                  </strong>
                </div>

                <div className="summary-monthly-highlight">
                  <div className="highlight-label">
                    For {Number(monthlyCalls).toLocaleString()} conversations
                  </div>
                  <div className="highlight-big-total">
                    {formatCurrency(calculation.monthlyTotal)}
                  </div>
                  <span className="highlight-sub">Estimated monthly price</span>
                </div>

                <div className="summary-inclusions-list">
                  <div className="inclusion-item">
                    <CheckCircle2 size={16} className="inclusion-check" />
                    <span>AI conversation ({calculation.model.label})</span>
                  </div>
                  <div className="inclusion-item">
                    <CheckCircle2 size={16} className="inclusion-check" />
                    <span>Voice ({calculation.voice.label})</span>
                  </div>
                  <div className="inclusion-item">
                    <CheckCircle2 size={16} className="inclusion-check" />
                    <span>
                      {telephoneProvider === 'managed' ? 'JobGen Telephone selected' : 'Customer Telephone selected'}
                    </span>
                  </div>
                </div>

                <div className="summary-action-stack">
                  <button
                    type="button"
                    onClick={onOpenDemo || onOpenBooking}
                    className="summary-primary-cta"
                  >
                    <span>Start with AI Property</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="summary-secondary-cta"
                  >
                    <span>Check Waiting Lost Revenue</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Section 04: Pricing Notes */}
        <section className="pricing-notes-section">
          <div className="notes-header-block">
            <span className="pricing-eyebrow">Pricing notes</span>
            <h2 className="notes-title">Designed to stay simple.</h2>
            <p className="notes-desc">
              Prices are estimates in USD and update as you change your call pattern, product area and setup. Start with a plan that matches your expected usage.
            </p>
          </div>

          <div className="notes-items-grid">
            <div className="note-item-pill">
              <CheckCircle2 size={16} />
              <span>No hidden setup in the estimate</span>
            </div>
            <div className="note-item-pill">
              <CheckCircle2 size={16} />
              <span>Change your calling provider anytime</span>
            </div>
            <div className="note-item-pill">
              <CheckCircle2 size={16} />
              <span>Adjust your plan as usage grows</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pricing-final-cta-section">
          <div className="final-cta-clay-card">
            <span className="final-cta-tag">Ready when you are</span>
            <h2 className="final-cta-title">Make every call count.</h2>
            <p className="final-cta-sub">
              Start with AI Property and shape the experience around your business.
            </p>
            <div className="final-cta-btn-group">
              <button
                type="button"
                onClick={onOpenDemo || onOpenBooking}
                className="final-cta-btn-primary"
              >
                <span>Start Free Pilot</span>
                <ArrowRight size={16} />
              </button>
              <a href="/" className="final-cta-btn-secondary">
                Back to home
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
