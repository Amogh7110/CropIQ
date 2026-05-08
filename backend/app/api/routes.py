from fastapi import APIRouter
from app.schemas.inputs import FarmInput, RecommendationResponse, MLModelInput, MLModelResponse
from app.ml.predict import get_recommendations, get_ai_recommendations

router = APIRouter()

@router.post("/recommend", response_model=list[RecommendationResponse])
async def recommend_crop(data: FarmInput):
    """
    Receive farm inputs and return the top 3 crop recommendations.
    """
    recommendations = get_recommendations(data)
    return recommendations

@router.post("/predict", response_model=MLModelResponse)
async def predict_crops(data: MLModelInput):
    """
    Receive exact features for the new AI model and return the top 3 predicted crops.
    """
    result = get_ai_recommendations(data)
    if "error" in result:
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=result["error"])
    return result
