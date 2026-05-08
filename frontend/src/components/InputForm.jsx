import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import './InputForm.css';

const InputForm = ({ onResults }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    n: 90,
    p: 42,
    k: 43,
    temp: 20.8,
    hum: 82.0,
    ph: 6.5,
    rain: 200.0,
    budget: 50000,
    state: 'Maharashtra'
  });

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        
        // Fetch weather (current temp/humidity + daily rain)
        const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&daily=precipitation_sum&timezone=auto`);
        const current = weatherRes.data.current;
        const daily = weatherRes.data.daily;
        
        // Fetch State Name
        const geoRes = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const address = geoRes.data.address;
        const stateName = address.state || address.region || "Maharashtra";

        setFormData(prev => ({
          ...prev,
          temp: current.temperature_2m,
          hum: current.relative_humidity_2m,
          rain: (daily.precipitation_sum[0] || 0) * 10, // Approx value for ML model
          state: stateName
        }));
      } catch (err) {
        console.error("Error fetching location data", err);
        alert("Could not fetch weather data. Please enter manually.");
      } finally {
        setLoading(false);
      }
    }, () => {
      alert("Location access denied.");
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Assuming backend is running locally on port 8000
      // Send exact data types expected by MLModelInput
      const payload = {
        n: parseInt(formData.n),
        p: parseInt(formData.p),
        k: parseInt(formData.k),
        temp: parseFloat(formData.temp),
        hum: parseFloat(formData.hum),
        ph: parseFloat(formData.ph),
        rain: parseFloat(formData.rain),
        budget: parseInt(formData.budget),
        state: formData.state
      };
      const response = await axios.post('http://localhost:8000/api/predict', payload);
      onResults(response.data.priority_list);
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
          <div className="input-group" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-end', paddingBottom: '15px' }}>
            <button type="button" onClick={getLocationWeather} className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              📍 Auto-fill Location & Weather
            </button>
          </div>

          <div className="input-group">
            <label className="input-label">State Name</label>
            <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <label className="input-label">Soil pH Level</label>
            <input type="number" step="0.1" name="ph" className="form-control" value={formData.ph} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Temperature (°C)</label>
            <input type="number" step="0.1" name="temp" className="form-control" value={formData.temp} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Humidity (%)</label>
            <input type="number" step="0.1" name="hum" className="form-control" value={formData.hum} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Rainfall (mm)</label>
            <input type="number" step="0.1" name="rain" className="form-control" value={formData.rain} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Nitrogen (N)</label>
            <input type="number" name="n" className="form-control" value={formData.n} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Phosphorus (P)</label>
            <input type="number" name="p" className="form-control" value={formData.p} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Potassium (K)</label>
            <input type="number" name="k" className="form-control" value={formData.k} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="input-label">Budget Range</label>
            <input type="number" name="budget" className="form-control" value={formData.budget} onChange={handleChange} required />
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
