import { TrendingUp, Droplets, Wallet, ShieldAlert, Sprout } from 'lucide-react';
import './ResultsDashboard.css';

const getCropDetails = (cropName) => {
  const details = {
    'RICE': { water: 'High', cost: 'Medium', tip: 'System of Rice Intensification (SRI)' },
    'MAIZE': { water: 'Medium', cost: 'Medium', tip: 'Ridge and furrow method' },
    'COFFEE': { water: 'Medium', cost: 'High', tip: 'Provide shade trees and proper pruning' },
    'MANGO': { water: 'Medium', cost: 'High', tip: 'High-density planting for better yield' },
    'JUTE': { water: 'High', cost: 'Low', tip: 'Requires stagnant water for retting' },
    'PAPAYA': { water: 'Medium', cost: 'Medium', tip: 'Raised bed planting to avoid waterlogging' },
    'COTTON': { water: 'Medium', cost: 'High', tip: 'Deep ploughing and regular pest scouting' },
    'APPLE': { water: 'Medium', cost: 'High', tip: 'Requires chilling hours and regular pruning' },
    'BANANA': { water: 'High', cost: 'High', tip: 'Tissue culture plants and drip irrigation' },
    'COCONUT': { water: 'Medium', cost: 'Medium', tip: 'Square planting system with regular manuring' },
    'DEFAULT': { water: 'Varies', cost: 'Medium', tip: 'Adopt drip irrigation and integrated pest management.' }
  };
  return details[cropName] || details['DEFAULT'];
};

const ResultsDashboard = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="dashboard-container" id="results">
      <div className="dashboard-header animate-fade-in">
        <h2>Intelligent Recommendations</h2>
        <p>Based on your farm's unique profile, here are the most profitable and sustainable options.</p>
      </div>

      <div className="results-grid">
        {results.map((crop, index) => (
          <div key={index} className={`glass-panel result-card delay-${(index + 1) * 100} animate-fade-in`}>
            <div className="card-header">
              <div className="crop-title-row">
                <div className="rank-badge">#{index + 1}</div>
                <h3 className="crop-name">{crop.crop}</h3>
              </div>
              <div className="score-circle">
                <svg viewBox="0 0 36 36" className="circular-chart green">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" strokeDasharray={`${parseFloat(crop.confidence)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text x="18" y="20.35" className="percentage">{crop.confidence}</text>
                </svg>
              </div>
            </div>

            <div className="card-metrics">
              <div className="metric">
                <Droplets size={16} color="#3b82f6" />
                <span>Water: <strong>{getCropDetails(crop.crop).water}</strong></span>
              </div>
              <div className="metric">
                <Wallet size={16} color="#10b981" />
                <span>Cost: <strong>{getCropDetails(crop.crop).cost}</strong></span>
              </div>
            </div>

            <div className="card-details">
              <div className="detail-section">
                <div className="detail-title"><Sprout size={16}/> Farming Technique</div>
                <p>{getCropDetails(crop.crop).tip}</p>
              </div>
              
              <div className="detail-section" style={{ marginTop: '15px' }}>
                <div className="detail-title"><TrendingUp size={16}/> AI Analysis</div>
                <p>The AI model predicts <strong>{crop.crop}</strong> is an optimal choice for your specific soil ecosystem with {crop.confidence} confidence.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDashboard;
