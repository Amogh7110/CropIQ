from pydantic import BaseModel, Field
from typing import Optional

class FarmInput(BaseModel):
    location: str = Field(..., description="Location of the farm for weather data")
    soil_ph: float = Field(..., description="Soil pH level (0-14)")
    soil_type: str = Field(..., description="Type of soil (loamy, clay, sandy)")
    nitrogen_level: str = Field(..., description="Nitrogen level (low, medium, high)")
    phosphorus_level: str = Field(..., description="Phosphorus level (low, medium, high)")
    potassium_level: str = Field(..., description="Potassium level (low, medium, high)")
    water_availability: str = Field(..., description="Water availability (low, medium, high)")
    budget: str = Field(..., description="Budget constraint (low, medium, high)")
    season: str = Field(..., description="Growing season (kharif, rabi, zaid)")

class RecommendationResponse(BaseModel):
    crop_name: str
    suitability_score: float
    water_requirement: str
    estimated_cost: str
    farming_method_tip: str
    risk_alerts: list[str]
    soil_improvement_tips: list[str]

class MLModelInput(BaseModel):
    n: int = Field(..., description="Nitrogen")
    p: int = Field(..., description="Phosphorus")
    k: int = Field(..., description="Potassium")
    temp: float = Field(..., description="Temperature")
    hum: float = Field(..., description="Humidity")
    ph: float = Field(..., description="pH level")
    rain: float = Field(..., description="Rainfall")
    budget: int = Field(..., description="Budget")
    state: str = Field(..., description="State name")

class MLModelResponseItem(BaseModel):
    crop: str
    confidence: str

class MLModelResponse(BaseModel):
    priority_list: list[MLModelResponseItem]
