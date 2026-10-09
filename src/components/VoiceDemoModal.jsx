import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, PhoneOff, PhoneCall, Radio, Sparkles, Volume2, ShieldCheck } from 'lucide-react';
import { AGENTS } from '../data/landingData';

export default function VoiceDemoModal({ isOpen, onClose }) {
  const [selectedAgent, setSelectedAgent] = useState('jenny');
  const [callActive, setCallActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef(null);

  const agent = AGENTS[selectedAgent];

  useEffect(() => {
    let timer;
    if (callActive) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  const handleStartCall = () => {
    setCallActive(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio playback prevented:', e));
    }
  };

  const handleEndCall = () => {
    setCallActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleSwitchAgent = (id) => {
    if (callActive) {
      handleEndCall();
    }
    setSelectedAgent(id);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Hidden Audio Track */}
        <audio
          ref={audioRef}
          src={agent.audioSrc}
          onEnded={handleEndCall}
          preload="metadata"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--color-white-50)', cursor: 'pointer', padding: '0.5rem' }}
          aria-label="Close demo modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Sparkles size={16} style={{ color: 'var(--color-blue-400)' }} />
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-blue-400)', letterSpacing: '0.15em' }}>
            Interactive Voice Sandbox
          </span>
        </div>

        {/* Agent Select Pills */}
        <div style={{ display: 'inline-flex', padding: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem' }}>
          <button
            type="button"
            className={`agent-selector-tab ${selectedAgent === 'jenny' ? 'is-active' : ''}`}
            onClick={() => handleSwitchAgent('jenny')}
            style={{ padding: '0.45rem 1.15rem', fontSize: '0.8125rem' }}
          >
            Jenny · Inbound Reception
          </button>
          <button
            type="button"
            className={`agent-selector-tab ${selectedAgent === 'olivia' ? 'is-active' : ''}`}
            onClick={() => handleSwitchAgent('olivia')}
            style={{ padding: '0.45rem 1.15rem', fontSize: '0.8125rem' }}
          >
            Olivia · Outbound Sales
          </button>
        </div>

        {/* Central Avatar & Pulse Glow */}
        <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 1.5rem' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: callActive ? 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)' : 'none',
              animation: callActive ? 'pulse-glow 1.5s infinite' : 'none',
              opacity: 0.9
            }}
          />
          <img
            src={agent.image}
            alt={agent.name}
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-blue-500)', position: 'relative', zIndex: 1, boxShadow: '0 0 25px rgba(37,99,235,0.4)' }}
          />
        </div>

        <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
          {agent.name} · {agent.role}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-white-70)', marginBottom: '1.75rem', lineHeight: 1.55 }}>
          {callActive ? (
            <span style={{ color: 'var(--color-success)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              ● Live Stream Active ({Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')})
            </span>
          ) : (
            agent.lead
          )}
        </p>

        {/* Action Button */}
        {callActive ? (
          <button
            type="button"
            onClick={handleEndCall}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--color-danger)',
              color: '#fff',
              border: 'none',
              padding: '0.85rem 2.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(239, 68, 68, 0.45)'
            }}
          >
            <PhoneOff size={18} />
            <span>End Active Call</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartCall}
            className="btn-primary"
            style={{ padding: '0.75rem 2.25rem', fontSize: '1rem' }}
          >
            <PhoneCall size={18} />
            <span>Start Voice Conversation</span>
          </button>
        )}

        <div style={{ marginTop: '1.75rem', fontSize: '0.75rem', color: 'var(--color-white-50)', fontFamily: 'var(--font-mono)' }}>
          Sub-550ms neural latency · 24kHz studio-quality voice engine
        </div>
      </div>
    </div>
  );
}
