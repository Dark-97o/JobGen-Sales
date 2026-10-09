import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Headphones, Radio, Sparkles, CheckCircle2, Volume2, Search } from 'lucide-react';
import { CALL_RECORDINGS } from '../data/landingData';

export default function RealCallLibrary() {
  const [activeCallId, setActiveCallId] = useState(CALL_RECORDINGS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const audioRef = useRef(null);

  const filteredCalls = selectedFilter === 'all'
    ? CALL_RECORDINGS
    : CALL_RECORDINGS.filter(c => c.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  const activeCall = CALL_RECORDINGS.find(c => c.id === activeCallId) || CALL_RECORDINGS[0];

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
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log('Audio playback prevented:', e));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [activeCallId]);

  return (
    <section id="calls" className="section-spacing">
      <div className="container">
        <div style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <div className="section-badge">
            <Headphones size={14} />
            <span>AUTHENTIC AUDIO RECORDINGS</span>
          </div>
          <h2 className="section-title">
            Listen to our AI workforce <br />
            <span className="gradient-text">handling real enterprise calls.</span>
          </h2>
          <p className="section-lead">
            No synthetic voiceovers or staged actor demos. These are authentic production phone calls from active client deployments, with line-by-line synchronized transcripts and deterministic CRM booking.
          </p>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Real Calls (6)' },
              { id: 'appointment', label: 'Appointment Booking' },
              { id: 'property', label: 'Real Estate' },
              { id: 'education', label: 'Education Advisory' },
              { id: 'restaurant', label: 'Hospitality Intake' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  background: selectedFilter === tab.id ? 'var(--color-blue-600)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid ' + (selectedFilter === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'),
                  color: selectedFilter === tab.id ? '#fff' : 'var(--color-white-70)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={activeCall.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          preload="metadata"
        />

        <div className="call-library-container">
          {/* Left: Call Selector Cards */}
          <div className="call-selector-list">
            {filteredCalls.map((call) => {
              const isActive = call.id === activeCallId;
              return (
                <button
                  key={call.id}
                  type="button"
                  onClick={() => handleSelectCall(call.id)}
                  className={`call-item-btn ${isActive ? 'is-active' : ''}`}
                >
                  <div className="call-item-meta">
                    <span className="call-cat-badge">{call.category}</span>
                    <span className="call-duration">{call.duration}</span>
                  </div>
                  <strong className="call-item-title">{call.title}</strong>
                  <div className="call-item-outcome">
                    <span style={{ color: 'var(--color-blue-400)', fontWeight: 600 }}>Outcome: </span>
                    {call.outcome}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Hardware Bezel Transcript Studio */}
          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner transcript-card">
              {/* Studio Header Bar */}
              <div className="transcript-header">
                <div className="audio-controls-row">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="audio-play-circle"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '3px' }} />}
                  </button>

                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>
                      {activeCall.title}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-blue-400)', fontFamily: 'var(--font-mono)' }}>
                      Assigned Agent: {activeCall.speaker}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {/* Mini Sound Bars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '18px' }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '3px',
                          height: isPlaying ? `${8 + (i % 4) * 3}px` : '4px',
                          background: isPlaying ? 'var(--color-blue-400)' : 'rgba(255,255,255,0.2)',
                          borderRadius: '4px',
                          transition: 'height 0.15s ease'
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    <Radio size={12} style={{ color: isPlaying ? 'var(--color-success)' : 'var(--color-white-50)' }} />
                    <span>{isPlaying ? 'STREAMING REAL AUDIO' : 'READY TO PLAY'}</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Live Transcript Entries with Synchronized Highlighter */}
              <div className="transcript-scroll-area">
                {activeCall.transcript.map((line, idx) => {
                  const isCurrent = currentTime >= line.time && (idx === activeCall.transcript.length - 1 || currentTime < activeCall.transcript[idx + 1].time);
                  const isAI = line.speaker.includes('Jenny') || line.speaker.includes('Olivia') || line.speaker.includes('AI');

                  return (
                    <div
                      key={idx}
                      onClick={() => handleJumpToTime(line.time)}
                      className={`transcript-entry ${isAI ? 'is-ai' : ''} ${isCurrent ? 'is-active-line' : ''}`}
                      style={{ cursor: 'pointer' }}
                      title="Click sentence to seek audio"
                    >
                      <div className="entry-speaker">
                        <span>{line.speaker}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.7 }}>
                          {Math.floor(line.time / 60)}:{String(Math.floor(line.time % 60)).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="entry-text">
                        {line.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Telemetry Verification Bar */}
              <div style={{ padding: '0.85rem 1.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10, 14, 26, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-white-50)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
                  <span>Production Telemetry Verified</span>
                </div>
                <span style={{ opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                  Click any sentence to jump timestamp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
