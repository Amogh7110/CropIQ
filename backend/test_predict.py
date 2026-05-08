import sys
import os
sys.path.insert(0, os.path.abspath(r'd:\HACKATHONS\AgriSmart\AgriSmart\backend'))

from app.schemas.inputs import MLModelInput
from app.ml.predict import get_ai_recommendations

# Test with mock data
try:
    data = MLModelInput(
        n=90, p=42, k=43, temp=20.8, hum=82.0, ph=6.5, rain=202.9, budget=2, state="Maharashtra"
    )
    print("Testing ML model prediction...")
    result = get_ai_recommendations(data)
    print(result)
except Exception as e:
    print(f"Error during test: {e}")
