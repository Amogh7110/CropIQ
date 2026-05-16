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

        // Map for typical historical average rainfall (mm) for Indian States
        const stateRainfallMap = {
          "Andhra Pradesh": 900, "Arunachal Pradesh": 2800, "Assam": 2800, "Bihar": 1200, "Chhattisgarh": 1300, 
          "Goa": 3000, "Gujarat": 1000, "Haryana": 600, "Himachal Pradesh": 1200, "Jharkhand": 1300, 
          "Karnataka": 1200, "Kerala": 2900, "Madhya Pradesh": 1100, "Maharashtra": 2000, "Manipur": 1500, 
          "Meghalaya": 2800, "Mizoram": 2500, "Nagaland": 2000, "Odisha": 1500, "Punjab": 600, 
          "Rajasthan": 400, "Sikkim": 2700, "Tamil Nadu": 1000, "Telangana": 900, "Tripura": 2200, 
          "Uttar Pradesh": 1200, "Uttarakhand": 1500, "West Bengal": 1800
        };
        
        // Use average rainfall per season for the ML model (dividing annual by roughly 10 as an approximation for the model range)
        const annualRain = stateRainfallMap[stateName] || 1500;
        const modelRainfall = (annualRain / 10).toFixed(1);

        setFormData(prev => ({
          ...prev,
          temp: current.temperature_2m,
          hum: current.relative_humidity_2m,
          rain: modelRainfall, // Using realistic state-level average instead of daily forecast
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
            <select name="state" className="form-control" value={formData.state} onChange={handleChange} required>
              <option value="" disabled>Select a state...</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
            </select>
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
