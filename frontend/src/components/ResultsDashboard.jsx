import { TrendingUp, Droplets, Wallet, ShieldAlert, Sprout } from 'lucide-react';
import './ResultsDashboard.css';

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
                <h3 className="crop-name">{crop.crop_name}</h3>
              </div>
              <div className="score-circle">
                <svg viewBox="0 0 36 36" className="circular-chart green">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" strokeDasharray={`${crop.suitability_score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text x="18" y="20.35" className="percentage">{Math.round(crop.suitability_score)}%</text>
                </svg>
              </div>
            </div>

            <div className="card-metrics">
              <div className="metric">
                <Droplets size={16} color="#3b82f6" />
                <span>Water: <strong>{crop.water_requirement}</strong></span>
              </div>
              <div className="metric">
                <Wallet size={16} color="#10b981" />
                <span>Cost: <strong>{crop.estimated_cost}</strong></span>
              </div>
            </div>

            <div className="card-details">
              <div className="detail-section">
                <div className="detail-title"><Sprout size={16}/> Farming Method</div>
                <p>{crop.farming_method_tip}</p>
              </div>

              {crop.risk_alerts && crop.risk_alerts.length > 0 && (
                <div className="detail-section warning">
                  <div className="detail-title"><ShieldAlert size={16}/> Risk Alerts</div>
                  <ul>
                    {crop.risk_alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                  </ul>
                </div>
              )}

              {crop.soil_improvement_tips && crop.soil_improvement_tips.length > 0 && (
                <div className="detail-section success">
                  <div className="detail-title"><TrendingUp size={16}/> Soil Improvement</div>
                  <ul>
                    {crop.soil_improvement_tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDashboard;
