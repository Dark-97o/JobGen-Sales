import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { CALL_RECORDINGS } from '../data/landingData';

// Enhanced call data with descriptive subtitles and call types matching the reference design
const ENHANCED_CALLS = CALL_RECORDINGS.map((call) => {
  let callType = 'Inbound call';
  let description = 'A client books an appointment and verifies service requirements.';

  if (call.id === 'sales-property-report') {
    callType = 'Outbound call';
    description = 'A homeowner accepts a property report and books an appraisal call.';
  } else if (call.id === 'inbound-appointment') {
    callType = 'Inbound call';
    description = 'A client books an in-person tax consultation and confirms financial accounts.';
  } else if (call.id === 'education-support') {
    callType = 'Inbound call';
    description = 'A student verifies class schedule, room location, and tuition totals.';
  } else if (call.id === 'stale-listing') {
    callType = 'Outbound call';
    description = 'An agent assistant checks in on a 97-day property listing and arranges an appraisal call.';
  } else if (call.id === 'restaurant-booking') {
    callType = 'Inbound call';
    description = 'A guest requests a birthday celebration dinner booking and dietary options.';
  }

  const categoryClean = call.category.split(' ')[0] || 'Enterprise';

  return {
    ...call,
    categoryClean,
    callType,
    description,
    speakerClean: 'AI Voice Agent'
  };
});

// Normalized waveform heights representing realistic speech frequencies (42 bars)
const WAVE_BARS = [
  24, 38, 48, 36, 42, 54, 32, 46, 58, 36, 28, 44, 62, 50, 34,
  56, 74, 42, 60, 48, 30, 44, 68, 52, 38, 58, 80, 54, 40, 64,
  88, 62, 46, 70, 94, 68, 42, 60, 78, 52, 34, 26
];

export default function RealCallLibrary() {
  // Default to 'sales-property-report' to match the reference image
  const [activeCallId, setActiveCallId] = useState('sales-property-report');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(true);

  const audioRef = useRef(null);
  const sectionRef = useRef(null);
  const activeLineRef = useRef(null);

  const activeCall = ENHANCED_CALLS.find((c) => c.id === activeCallId) || ENHANCED_CALLS[0];

  // Auto-scroll transcript container smoothly so it moves with the live recording
  useEffect(() => {
    if (activeLineRef.current && isPlaying && isTranscriptOpen) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentTime, isPlaying, isTranscriptOpen]);

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

  const handleAudioScrub = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickFraction = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = clickFraction * (duration || 96);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleJumpToTime = (secs) => {
    if (audioRef.current) {
      audioRef.current.currentTime = secs;
      setCurrentTime(secs);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

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
        <div className="calls-section-header text-center mx-auto">
          <h2 className="section-title text-center">
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
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />

        {/* Main Split Stage: Left Floating Rounded Rectangles, Right Reference Card */}
        <div className="real-calls-split-stage">
          {/* Left Side: Floating Rounded Rectangles with Different Options */}
          <div className="calls-floating-options-column" role="tablist" aria-label="Available call options">
            <div className="floating-options-intro">
              <span className="floating-options-label">SELECT SCENARIO</span>
              <span className="floating-options-count">{ENHANCED_CALLS.length} Recorded Calls</span>
            </div>

            <div className="floating-rectangles-stack">
              {ENHANCED_CALLS.map((call, idx) => {
                const isSelected = call.id === activeCallId;

                return (
                  <button
                    key={call.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCall(call.id)}
                    className={`floating-call-rectangle ${isSelected ? 'is-selected' : ''}`}
                    style={{ '--float-delay': `${idx * 0.12}s` }}
                  >
                    <div className="floating-rect-top">
                      <span className="floating-rect-type-pill">
                        {call.categoryClean} · {call.callType}
                      </span>
                      <span className="floating-rect-duration">
                        <Clock size={11} className="duration-icon" />
                        {call.duration}
                      </span>
                    </div>

                    <h4 className="floating-rect-title">{call.title}</h4>

                    <div className="floating-rect-bottom">
                      <div className="floating-rect-speaker">
                        <span className="speaker-avatar-circle tone-agent">
                          <Bot size={11} />
                        </span>
                        <span className="speaker-name-text">AI Voice Agent</span>
                      </div>
                      {isSelected && (
                        <div className="floating-rect-now-playing">
                          <span className="now-playing-pulse" />
                          <span>Active</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Exact Reference Card Implementation */}
          <div className="calls-reference-card-column">
            <div className="ref-audio-showcase-card">
              {/* Top Meta Line: "Property · Outbound call" and [REAL RECORDING] Pill */}
              <div className="ref-card-header-row">
                <span className="ref-card-category-text">
                  {activeCall.categoryClean} · {activeCall.callType}
                </span>
                <span className="ref-real-recording-pill">REAL RECORDING</span>
              </div>

              {/* Main Headline: "Property value follow-up" */}
              <h3 className="ref-card-title">{activeCall.title}</h3>

              {/* Subtitle / Description */}
              <p className="ref-card-description">{activeCall.description}</p>

              {/* Audio Waveform Player Row */}
              <div className="ref-player-container">
                {/* Big Circular Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="ref-big-play-btn"
                  title={isPlaying ? 'Pause call audio' : 'Play call audio'}
                  aria-label={isPlaying ? 'Pause call audio' : 'Play call audio'}
                >
                  {isPlaying ? (
                    <Pause size={22} fill="#FFFFFF" color="#FFFFFF" />
                  ) : (
                    <Play size={22} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
                  )}
                </button>

                {/* Waveform Visualization Bars */}
                <div
                  className="ref-waveform-track"
                  onClick={handleAudioScrub}
                  title="Click anywhere to scrub audio"
                  role="slider"
                  aria-label="Audio scrubber"
                  aria-valuenow={currentTime}
                  aria-valuemin={0}
                  aria-valuemax={duration || 96}
                >
                  <div className="ref-bars-wrapper">
                    {WAVE_BARS.map((barHeight, idx) => {
                      const barFraction = idx / WAVE_BARS.length;
                      const isPlayed = barFraction <= (duration ? currentTime / duration : 0);
                      // In the reference image: alternate amber (agent) and warm gray (caller) bars
                      const isAgentBar = (idx >= 0 && idx <= 14) || (idx >= 22 && idx <= 32);

                      return (
                        <div
                          key={idx}
                          className={`ref-wave-bar ${isAgentBar ? 'is-agent' : 'is-caller'} ${
                            isPlayed ? 'is-played' : ''
                          }`}
                          style={{
                            height: `${barHeight}%`
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Speaker Legend on Left & Time Display on Right */}
              <div className="ref-player-subrow">
                <div className="ref-speaker-legend">
                  <div className="ref-legend-item">
                    <span className="ref-legend-dot ref-legend-dot-amber" />
                    <span className="ref-legend-name">Agent</span>
                  </div>
                  <div className="ref-legend-item">
                    <span className="ref-legend-dot ref-legend-dot-caller" />
                    <span className="ref-legend-name">Caller</span>
                  </div>
                </div>

                <div className="ref-time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span className="ref-time-sep">/</span>
                  <span>{activeCall.duration}</span>
                </div>
              </div>

              {/* Outcome Captured Section */}
              <div className="ref-outcome-row">
                <span className="ref-outcome-label">OUTCOME CAPTURED</span>
                <span className="ref-outcome-value">{activeCall.outcome}</span>
              </div>

              {/* Bottom Expander: "▶ Read the transcript · 1:36 · personal details omitted" */}
              <div className="ref-transcript-toggle-wrap">
                <button
                  type="button"
                  onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                  className="ref-transcript-toggle-btn"
                  aria-expanded={isTranscriptOpen}
                >
                  <span className="ref-transcript-toggle-icon">
                    {isTranscriptOpen ? '▼' : '▶'}
                  </span>
                  <span className="ref-transcript-toggle-text">
                    {isTranscriptOpen ? 'Hide the transcript' : 'Read the transcript'} · {activeCall.duration} · personal details omitted
                  </span>
                </button>

                {/* Collapsible Verbatim Transcript Stream that moves with the live recording */}
                {isTranscriptOpen && (
                  <div className="ref-expanded-transcript-stream" role="log" aria-label="Verbatim call transcript">
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

                      const lineTimeStr = `${Math.floor(line.time / 60)}:${String(
                        Math.floor(line.time % 60)
                      ).padStart(2, '0')}`;

                      const sanitizedSpeechText = line.text.replace(/\b(Olivia|Jenny)\b/gi, 'JobGen');

                      return (
                        <div
                          key={idx}
                          ref={isCurrent ? activeLineRef : null}
                          onClick={() => handleJumpToTime(line.time)}
                          className={`ref-transcript-line-card ${isAI ? 'is-ai' : 'is-user'} ${
                            isCurrent && isPlaying ? 'is-active-speaking' : ''
                          }`}
                          title="Click to jump audio to this line"
                        >
                          <div className="ref-line-top">
                            <div className="ref-line-speaker-wrap">
                              <span className="ref-line-speaker-name">
                                {isAI ? 'JobGen AI' : 'Caller'}
                              </span>
                              {isCurrent && isPlaying && (
                                <span className="ref-speaking-live-badge">
                                  <span className="ref-speaking-pulse-dot" /> Speaking
                                </span>
                              )}
                            </div>
                            <span className="ref-line-time">{lineTimeStr}</span>
                          </div>
                          <p className="ref-line-speech-text">{sanitizedSpeechText}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
