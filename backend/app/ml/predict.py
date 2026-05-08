import random
import os
import pickle
import numpy as np
from app.schemas.inputs import FarmInput, RecommendationResponse, MLModelInput, MLModelResponseItem

# Prepare path for ML models
ML_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(ML_DIR, 'crop_model_v3.pkl')
ENCODER_PATH = os.path.join(ML_DIR, 'state_encoder.pkl')

model = None
state_le = None

try:
    if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH):
        model = pickle.load(open(MODEL_PATH, 'rb'))
        state_le = pickle.load(open(ENCODER_PATH, 'rb'))
    else:
        print(f"Warning: ML models not found at {ML_DIR}. Please download them.")
except Exception as e:
    print(f"Error loading models: {e}")

def get_ai_recommendations(data: MLModelInput):
    if model is None or state_le is None:
        return {"error": "Models not loaded. Please ensure crop_model_v3.pkl and state_encoder.pkl are in the app/ml/ directory."}

    # Convert state name to number
    try:
        state_encoded = state_le.transform([data.state])[0]
    except Exception as e:
        return {"error": f"Error encoding state: {e}"}
    
    # Prepare input for the AI
    features = [[data.n, data.p, data.k, data.temp, data.hum, data.ph, data.rain, data.budget, state_encoded]]
    
    # Get probabilities for Top 3
    try:
        probs = model.predict_proba(features)[0]
        top_3_idx = np.argsort(probs)[-3:][::-1]
        
        results = []
        for idx in top_3_idx:
            results.append(MLModelResponseItem(
                crop=str(model.classes_[idx]).upper(),
                confidence=f"{probs[idx] * 100:.2f}%"
            ))
        
        return {"priority_list": results}
    except Exception as e:
        return {"error": f"Prediction error: {e}"}

def get_recommendations(data: FarmInput) -> list[RecommendationResponse]:
    """
    Hybrid decision engine mock.
    Combines rule-based logic with a mocked ML suitability score.
    """
    recommendations = []
    
    # Simple Rule-Based Logic
    if data.water_availability == "low":
        recommendations.append(RecommendationResponse(
            crop_name="Millet (Bajra)",
            suitability_score=round(random.uniform(85.0, 95.0), 1),
            water_requirement="Low",
            estimated_cost="Low",
            farming_method_tip="Dryland farming techniques.",
            risk_alerts=["Requires careful weed management in early stages."],
            soil_improvement_tips=["Add organic compost to improve moisture retention."]
        ))
        recommendations.append(RecommendationResponse(
            crop_name="Sorghum (Jowar)",
            suitability_score=round(random.uniform(75.0, 85.0), 1),
            water_requirement="Low",
            estimated_cost="Low",
            farming_method_tip="Traditional sowing.",
            risk_alerts=["Pest susceptibility if not monitored."],
            soil_improvement_tips=[]
        ))
    
    if data.water_availability == "high" and data.season == "kharif":
        recommendations.append(RecommendationResponse(
            crop_name="Rice (Paddy)",
            suitability_score=round(random.uniform(90.0, 98.0), 1),
            water_requirement="High",
            estimated_cost="Medium to High",
            farming_method_tip="System of Rice Intensification (SRI).",
            risk_alerts=["High dependency on consistent rainfall or irrigation."],
            soil_improvement_tips=["Ensure proper drainage to prevent waterlogging diseases."]
        ))
        
    if 6.0 <= data.soil_ph <= 7.5:
        recommendations.append(RecommendationResponse(
            crop_name="Wheat",
            suitability_score=round(random.uniform(80.0, 90.0), 1),
            water_requirement="Medium",
            estimated_cost="Medium",
            farming_method_tip="Drip irrigation recommended.",
            risk_alerts=["Susceptible to rust diseases in humid conditions."],
            soil_improvement_tips=["Maintain balanced NPK fertilization."]
        ))

    # If no rules match strongly, provide a generic fallback for MVP
    if not recommendations:
        recommendations.append(RecommendationResponse(
            crop_name="Maize",
            suitability_score=round(random.uniform(70.0, 85.0), 1),
            water_requirement="Medium",
            estimated_cost="Medium",
            farming_method_tip="Ridge and furrow method.",
            risk_alerts=["Watch out for Fall Armyworm."],
            soil_improvement_tips=["Add nitrogen-rich fertilizers if leaves turn yellow."]
        ))
        
    # Sort by suitability score descending and return top 3
    recommendations.sort(key=lambda x: x.suitability_score, reverse=True)
    return recommendations[:3]
