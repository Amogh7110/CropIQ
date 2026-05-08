import { useState } from 'react';
import { ArrowRight, Leaf, Droplets, Sun, X } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="hero">
      {showVideo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex',
          justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)'
        }} onClick={() => setShowVideo(false)}>
          <div style={{ position: 'relative', width: '80%', maxWidth: '1000px' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowVideo(false)} style={{
              position: 'absolute', top: '-40px', right: '0', background: 'transparent',
              border: 'none', cursor: 'pointer', color: 'white'
            }}>
              <X size={32} />
            </button>
            <video controls autoPlay style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <source src="/Demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="badge">
            <span className="pulse-dot"></span>
            Smart Agriculture Ecosystem
          </div>
          <h1 className="hero-title">
            Data-Driven Farming for <br/>
            <span className="text-gradient">Maximum Yield</span>
          </h1>
          <p className="hero-subtitle">
            Leverage AI and soil analytics to discover the most profitable and sustainable crops tailored exactly to your farm's unique ecosystem.
          </p>
          
          <div className="hero-actions">
            <a href="#analyze" className="btn-primary">
              Analyze My Farm <ArrowRight size={18} />
            </a>
            <button className="btn-secondary" onClick={() => setShowVideo(true)}>View Demo</button>
          </div>
          
          <div className="features-grid">
            <div className="feature-item delay-100 animate-fade-in">
              <div className="feature-icon"><Leaf size={24} color="#10b981"/></div>
              <span>Soil Health</span>
            </div>
            <div className="feature-item delay-200 animate-fade-in">
              <div className="feature-icon"><Droplets size={24} color="#3b82f6"/></div>
              <span>Water Optimization</span>
            </div>
            <div className="feature-item delay-300 animate-fade-in">
              <div className="feature-icon"><Sun size={24} color="#f59e0b"/></div>
              <span>Climate Intelligence</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual delay-200 animate-fade-in">
          <div className="glass-panel main-visual">
            <div className="visual-glow"></div>
            <div className="mockup-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="mockup-body">
              <div className="skeleton-graph"></div>
              <div className="skeleton-cards">
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
