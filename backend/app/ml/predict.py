import random
from app.schemas.inputs import FarmInput, RecommendationResponse

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
