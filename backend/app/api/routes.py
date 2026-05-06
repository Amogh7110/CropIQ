from fastapi import APIRouter
from app.schemas.inputs import FarmInput, RecommendationResponse
from app.ml.predict import get_recommendations

router = APIRouter()

@router.post("/recommend", response_model=list[RecommendationResponse])
async def recommend_crop(data: FarmInput):
    """
    Receive farm inputs and return the top 3 crop recommendations.
    """
    recommendations = get_recommendations(data)
    return recommendations
