import { ArrowRight, Leaf, Droplets, Sun } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
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
            <button className="btn-secondary">View Demo</button>
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
