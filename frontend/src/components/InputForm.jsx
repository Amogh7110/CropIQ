import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import './InputForm.css';

const InputForm = ({ onResults }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    soil_ph: '',
    soil_type: 'loamy',
    nitrogen_level: 'medium',
    phosphorus_level: 'medium',
    potassium_level: 'medium',
    water_availability: 'medium',
    budget: 'medium',
    season: 'kharif'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Assuming backend is running locally on port 8000
      const response = await axios.post('http://localhost:8000/api/recommend', {
        ...formData,
        soil_ph: parseFloat(formData.soil_ph)
      });
      onResults(response.data);
    } catch (error) {
      console.error("Error fetching recommendations", error);
      alert("Failed to connect to the prediction engine. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel form-panel" id="analyze">
      <div className="panel-header">
        <h2>Farm Parameter Setup</h2>
        <p>Enter your field conditions to get an AI-powered crop recommendation.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="analysis-form">
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Location (District/State)</label>
            <input 
              type="text" 
              name="location" 
              className="form-control" 
              placeholder="e.g. Pune, Maharashtra" 
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Soil pH Level</label>
            <input 
              type="number" 
              step="0.1" 
              name="soil_ph" 
              className="form-control" 
              placeholder="e.g. 6.5" 
              required
              value={formData.soil_ph}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Soil Type</label>
            <select name="soil_type" className="form-control" value={formData.soil_type} onChange={handleChange}>
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="silt">Silt</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Season</label>
            <select name="season" className="form-control" value={formData.season} onChange={handleChange}>
              <option value="kharif">Kharif (Monsoon)</option>
              <option value="rabi">Rabi (Winter)</option>
              <option value="zaid">Zaid (Summer)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Nitrogen (N)</label>
            <select name="nitrogen_level" className="form-control" value={formData.nitrogen_level} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Phosphorus (P)</label>
            <select name="phosphorus_level" className="form-control" value={formData.phosphorus_level} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Potassium (K)</label>
            <select name="potassium_level" className="form-control" value={formData.potassium_level} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Water Availability</label>
            <select name="water_availability" className="form-control" value={formData.water_availability} onChange={handleChange}>
              <option value="low">Low (Rainfed only)</option>
              <option value="medium">Medium (Partial irrigation)</option>
              <option value="high">High (Full irrigation)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Budget Range</label>
            <select name="budget" className="form-control" value={formData.budget} onChange={handleChange}>
              <option value="low">Low (Subsistence)</option>
              <option value="medium">Medium (Commercial)</option>
              <option value="high">High (Enterprise)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary submit-btn" disabled={loading}>
          {loading ? (
            <><Loader2 size={20} className="spinner" /> Analyzing Ecosystem...</>
          ) : (
            'Generate Smart Insights'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
