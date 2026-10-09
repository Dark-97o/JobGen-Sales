import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Search,
  MoreVertical,
  Phone,
  Video,
  MessageSquare,
  Settings,
  Users,
  CheckCheck,
  Paperclip,
  Smile,
  Mic,
  Plus,
  Sparkles,
  CheckCircle2,
  Lock,
  Volume2
} from 'lucide-react';
import { CALL_RECORDINGS } from '../data/landingData';

// Custom avatars with recognizable colors & initial badges matching enterprise roles
const CALL_AVATARS = {
  'inbound-appointment': {
    initials: 'MS',
    color: '#00A884',
    bg: '#005c4b',
    name: 'M&S Solutions · Tax Client',
    isGroup: false,
  },
  'sales-property-report': {
    initials: 'HP',
    color: '#3B82F6',
    bg: '#1e3a8a',
    name: 'Hart Property · Homeowner',
    isGroup: false,
  },
  'education-support': {
    initials: 'MI',
    color: '#EC4899',
    bg: '#831843',
    name: 'McGill Institute · IT Student',
    isGroup: false,
  },
  'stale-listing': {
    initials: 'BD',
    color: '#F59E0B',
    bg: '#78350f',
    name: 'Buta Deogun · Vendor Outreach',
    isGroup: false,
  },
  'restaurant-booking': {
    initials: 'GT',
    color: '#10B981',
    bg: '#064e3b',
    name: 'Golden Time · Table Reservation',
    isGroup: false,
  },
  'daycare-tour': {
    initials: 'CC',
    color: '#8B5CF6',
    bg: '#5b21b6',
    name: 'Child Care · Parent Tour',
    isGroup: false,
  },
};

export default function RealCallLibrary() {
  const [activeCallId, setActiveCallId] = useState(CALL_RECORDINGS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const audioRef = useRef(null);
  const chatScrollRef = useRef(null);

  const activeCall = CALL_RECORDINGS.find((c) => c.id === activeCallId) || CALL_RECORDINGS[0];
  const activeAvatar = CALL_AVATARS[activeCall.id] || {
    initials: 'JG',
    color: '#00A884',
    bg: '#005c4b',
    name: activeCall.title,
  };

  const filteredCalls = CALL_RECORDINGS.filter((call) => {
    const matchesSearch =
      call.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return true;
    if (activeFilter === 'Groups') return true;
    return true;
  });

  const handleSelectCall = (id) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveCallId(id);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.log('Audio playback prevented:', e));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleJumpToTime = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    if (audioRef.current && duration) {
      const newTime = newProgress * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [activeCallId]);

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="calls" ref={sectionRef} className="section-spacing real-calls-section">
      <div className="container">
        {/* Section Headline */}
        <div className="calls-section-header">
          <h2 className="section-title">
            <span className="calls-headline-main">Listen to our AI workforce</span> <br />
            <span className="text-full-blue calls-headline-sub">handling real enterprise calls.</span>
          </h2>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={activeCall.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="metadata"
        />

        {/* Mac Window Frame with WhatsApp Interface (Fade In On Scroll) */}
        <div className={`mac-window-container ${isVisible ? 'is-visible' : ''}`}>
          {/* macOS Titlebar with Traffic Lights */}
          <div className="mac-titlebar">
            <div className="mac-traffic-lights">
              <span className="mac-dot mac-dot-close" />
              <span className="mac-dot mac-dot-minimize" />
              <span className="mac-dot mac-dot-maximize" />
            </div>
            <div className="mac-window-title">
              <span className="mac-window-title-app">JobGen AI Voice Studio</span>
            </div>
            <div className="mac-titlebar-right" />
          </div>

          {/* WhatsApp Main Interface Body */}
          <div className="whatsapp-app-body">
            {/* 1. Far Left Narrow Icon Rail (WhatsApp Desktop) */}
            <aside className="wa-icon-rail" aria-label="WhatsApp Navigation">
              <div className="wa-rail-top">
                <button
                  type="button"
                  className="wa-rail-btn is-active"
                  title="Chats"
                  aria-label="Chats"
                >
                  <div className="wa-rail-badge-wrap">
                    <MessageSquare size={20} strokeWidth={2.2} />
                    <span className="wa-unread-pill">99+</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="wa-rail-btn"
                  title="Calls"
                  aria-label="Calls"
                >
                  <Phone size={19} />
                </button>

                <button
                  type="button"
                  className="wa-rail-btn"
                  title="Status"
                  aria-label="Status"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="wa-rail-btn"
                  title="Communities"
                  aria-label="Communities"
                >
                  <Users size={19} />
                </button>

                <button
                  type="button"
                  className="wa-rail-btn wa-meta-ai-btn"
                  title="Meta AI"
                  aria-label="Meta AI"
                >
                  <div className="wa-meta-ai-icon">
                    <Sparkles size={16} />
                  </div>
                </button>
              </div>

              <div className="wa-rail-bottom">
                <button
                  type="button"
                  className="wa-rail-btn"
                  title="Settings"
                  aria-label="Settings"
                >
                  <Settings size={19} />
                </button>

                <div className="wa-rail-profile" title="JobGen Enterprise">
                  <div className="wa-profile-avatar">JG</div>
                </div>
              </div>
            </aside>

            {/* 2. Left Chat List Panel (People Options with Name as Topic, Last Message as Category) */}
            <div className="wa-chatlist-panel">
              {/* WhatsApp Top Header */}
              <div className="wa-chatlist-header">
                <h3 className="wa-header-brand">JobGen Voice Studio</h3>
                <div className="wa-header-actions">
                  <button type="button" className="wa-icon-action" aria-label="More options">
                    <MoreVertical size={18} />
                  </button>
                  <button type="button" className="wa-new-chat-btn" aria-label="New chat">
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="wa-search-container">
                <div className="wa-search-input-wrap">
                  <Search size={15} className="wa-search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search or start a new chat"
                    className="wa-search-input"
                  />
                </div>
              </div>

              {/* Filter Pills Bar */}
              <div className="wa-filter-chips-row">
                {['All', 'Unread', 'Favorites', 'Groups'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`wa-filter-chip ${activeFilter === filter ? 'is-active' : ''}`}
                  >
                    {filter === 'Unread' ? 'Unread 164' : filter === 'Groups' ? 'Groups 134' : filter}
                  </button>
                ))}
                <button type="button" className="wa-filter-chip wa-filter-add" aria-label="Add filter">
                  <Plus size={13} />
                </button>
              </div>

              {/* Chat Items List: "the people options will be shown as the name for topic , and last mesage as category" */}
              <div className="wa-chats-scroll-list" role="list">
                {filteredCalls.map((call) => {
                  const isActive = call.id === activeCallId;
                  const avatar = CALL_AVATARS[call.id] || {
                    initials: call.category.slice(0, 2).toUpperCase(),
                    color: '#00A884',
                    bg: '#005c4b',
                  };

                  return (
                    <div
                      key={call.id}
                      role="listitem"
                      onClick={() => handleSelectCall(call.id)}
                      className={`wa-chat-item ${isActive ? 'is-active' : ''}`}
                    >
                      {/* Avatar */}
                      <div
                        className="wa-chat-avatar"
                        style={{ backgroundColor: avatar.bg, color: '#fff' }}
                      >
                        <span className="wa-avatar-text">{avatar.initials}</span>
                        {isActive && isPlaying && (
                          <span className="wa-avatar-audio-pulse" />
                        )}
                      </div>

                      {/* Chat Details */}
                      <div className="wa-chat-details">
                        {/* Name as Topic (call.title) + Duration / Time */}
                        <div className="wa-chat-top-row">
                          <strong className="wa-chat-topic-name" title={call.title}>
                            {call.title}
                          </strong>
                          <span className="wa-chat-timestamp">{call.duration}</span>
                        </div>

                        {/* Last message as Category (call.category) */}
                        <div className="wa-chat-bottom-row">
                          <div className="wa-chat-category-preview">
                            <CheckCheck size={16} className="wa-read-receipt-blue" />
                            <span className="wa-category-text">{call.category}</span>
                          </div>
                          {isActive && (
                            <span className="wa-playing-indicator">
                              {isPlaying ? (
                                <span className="wa-sound-bars">
                                  <span />
                                  <span />
                                  <span />
                                </span>
                              ) : (
                                <span className="wa-ready-dot" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp Windows Footer Banner from screenshot */}
              <div className="wa-sidebar-bottom-app">
                <div className="wa-windows-badge">
                  <div className="wa-green-icon-wrap">
                    <MessageSquare size={16} fill="currentColor" />
                  </div>
                  <span>JobGen Telemetry Active</span>
                </div>
              </div>
            </div>

            {/* 3. Right Main Chat Pane (Transcribe as Chats) */}
            <div className="wa-conversation-pane">
              {/* Conversation Top Header */}
              <div className="wa-convo-header">
                <div className="wa-convo-header-left">
                  <div
                    className="wa-convo-avatar"
                    style={{ backgroundColor: activeAvatar.bg, color: '#fff' }}
                  >
                    <span>{activeAvatar.initials}</span>
                  </div>
                  <div className="wa-convo-info">
                    <h4 className="wa-convo-title">{activeCall.title}</h4>
                    <span className="wa-convo-subtitle">
                      {activeCall.speaker} · <span className="wa-convo-status-text">Production Call Telemetry</span>
                    </span>
                  </div>
                </div>

                {/* Header Actions: Embedded Audio Player + Standard WhatsApp Icons */}
                <div className="wa-convo-header-right">
                  {/* Integrated Call Audio Player */}
                  <div className="wa-embedded-audio-player">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="wa-audio-play-btn"
                      aria-label={isPlaying ? 'Pause call audio' : 'Play call audio'}
                      title={isPlaying ? 'Pause' : 'Play call audio'}
                    >
                      {isPlaying ? (
                        <Pause size={15} fill="#fff" />
                      ) : (
                        <Play size={15} fill="#fff" style={{ marginLeft: '2px' }} />
                      )}
                    </button>

                    <div className="wa-audio-scrubber-wrap" onClick={handleAudioScrub}>
                      <div className="wa-audio-track">
                        <div
                          className="wa-audio-fill"
                          style={{
                            width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                          }}
                        />
                      </div>
                      <div className="wa-audio-time-label">
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{activeCall.duration}</span>
                      </div>
                    </div>

                    {/* Equalizer Waveform while playing */}
                    <div className={`wa-sound-equalizer ${isPlaying ? 'is-playing' : ''}`}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  {/* Standard WhatsApp Header Icons */}
                  <div className="wa-header-icon-group">
                    <button type="button" className="wa-icon-tool" title="Video call" aria-label="Video call">
                      <Video size={18} />
                    </button>
                    <button type="button" className="wa-icon-tool" title="Voice call" aria-label="Voice call">
                      <Phone size={17} />
                    </button>
                    <button type="button" className="wa-icon-tool" title="Search messages" aria-label="Search">
                      <Search size={18} />
                    </button>
                    <button type="button" className="wa-icon-tool" title="Menu" aria-label="Menu">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area (Transcribe as Chats with WhatsApp Doodle Background) */}
              <div ref={chatScrollRef} className="wa-chat-messages-area">
                <div className="wa-doodle-backdrop" aria-hidden="true" />

                <div className="wa-messages-content-wrap">
                  {/* Date Divider Pill */}
                  <div className="wa-date-divider-wrap">
                    <span className="wa-date-divider-pill">TODAY</span>
                  </div>

                  {/* Encryption / Telemetry Notice */}
                  <div className="wa-encryption-badge">
                    <Lock size={12} />
                    <span>
                      Verbatim call telemetry is synchronized line-by-line. Click any speech bubble to seek audio.
                    </span>
                  </div>

                  {/* Transcribe rendered as real WhatsApp Chat bubbles */}
                  <div className="wa-bubbles-stream">
                    {activeCall.transcript.map((line, idx) => {
                      const isAI =
                        line.speaker.includes('Jenny') ||
                        line.speaker.includes('Olivia') ||
                        line.speaker.includes('AI') ||
                        line.speaker.includes('Leo') ||
                        line.speaker.includes('Mark');
                      const isCurrent =
                        currentTime >= line.time &&
                        (idx === activeCall.transcript.length - 1 ||
                          currentTime < activeCall.transcript[idx + 1].time);

                      const bubbleTimeStr = `${Math.floor(line.time / 60)}:${String(
                        Math.floor(line.time % 60)
                      ).padStart(2, '0')}`;

                      return (
                        <div
                          key={idx}
                          onClick={() => handleJumpToTime(line.time)}
                          className={`wa-bubble-row ${isAI ? 'is-outgoing' : 'is-incoming'} ${
                            isCurrent && isPlaying ? 'is-live-speaking' : ''
                          }`}
                          title="Click to jump audio to this message"
                        >
                          <div className={`wa-bubble ${isAI ? 'wa-bubble-green' : 'wa-bubble-dark'}`}>
                            {/* Sender Name in group colors for incoming callers */}
                            {!isAI && (
                              <div className="wa-bubble-sender-name">
                                {line.speaker}
                              </div>
                            )}

                            {/* Message Text */}
                            <p className="wa-bubble-text">{line.text}</p>

                            {/* Bubble Meta: Timestamp + WhatsApp Double Checkmark */}
                            <div className="wa-bubble-meta">
                              <span className="wa-bubble-time">{bubbleTimeStr}</span>
                              {isAI && (
                                <CheckCheck size={15} className="wa-bubble-checks wa-read-receipt-blue" />
                              )}
                            </div>

                            {/* Active Audio Wave indicator inside bubble */}
                            {isCurrent && isPlaying && (
                              <span className="wa-bubble-live-glow" aria-hidden="true" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Call Outcome Verified System Card */}
                  <div className="wa-outcome-card">
                    <div className="wa-outcome-badge">
                      <CheckCircle2 size={15} className="wa-outcome-icon" />
                      <strong className="wa-outcome-label">Deterministic CRM Outcome:</strong>
                    </div>
                    <span className="wa-outcome-text">{activeCall.outcome}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Message Input Bar */}
              <div className="wa-input-dock">
                <button type="button" className="wa-input-icon-btn" title="Add attachment" aria-label="Attachment">
                  <Plus size={20} />
                </button>
                <button type="button" className="wa-input-icon-btn" title="Emojis" aria-label="Emojis">
                  <Smile size={20} />
                </button>
                <div className="wa-input-field-wrap">
                  <input
                    type="text"
                    readOnly
                    placeholder="Click any message bubble above to scrub and hear audio..."
                    className="wa-message-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="wa-input-mic-btn"
                  title={isPlaying ? 'Pause audio' : 'Play audio'}
                  aria-label="Microphone"
                >
                  {isPlaying ? <Volume2 size={20} /> : <Mic size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
