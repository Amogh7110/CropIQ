# AgriSmart: Full Codebase Architecture & Data Flow

This document explains exactly how the AgriSmart application works step-by-step, from the moment a user clicks a button on the frontend to the moment the AI model returns a prediction from the backend. 

---

## 1. The User Interface (Frontend Layout)
**File:** `frontend/src/App.jsx` and `frontend/src/components/HeroSection.jsx`
*   **What it does:** When a user opens the web app, `App.jsx` renders the Navbar, HeroSection, InputForm, and ResultsDashboard. 
*   **Demo Video:** In `HeroSection.jsx`, if the user clicks "View Demo", a React `useState` hook (`showVideo`) triggers a modal overlay to play the `Demo.mp4` video located in the `frontend/public` folder.

---

## 2. Auto-Filling Weather & Location (Frontend Logic)
**File:** `frontend/src/components/InputForm.jsx`
*   **What it does:** If the user clicks the "📍 Auto-fill Location & Weather" button, the `getLocationWeather` function executes.
*   **How it works:**
    1.  It uses the browser's built-in `navigator.geolocation.getCurrentPosition()` to get the user's exact latitude and longitude.
    2.  It sends an HTTP GET request to the **Open-Meteo API** to get real-time `temperature_2m` and `relative_humidity_2m`, as well as daily `precipitation_sum` (Rainfall).
    3.  It sends another request to the **Nominatim (OpenStreetMap) API** to reverse-geocode the coordinates and find the user's `State Name`.
    4.  It updates the React `formData` state, instantly filling the form inputs on the screen.

---

## 3. Submitting the Form (Frontend to Backend)
**File:** `frontend/src/components/InputForm.jsx`
*   **What it does:** When the user clicks "Generate Smart Insights", the `handleSubmit` function triggers.
*   **How it works:** It packages the Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall, Budget, and State into a strictly typed JSON object (parsing strings to Integers and Floats where necessary). It then uses `axios.post()` to send this JSON payload to the backend at `http://localhost:8000/api/predict`.

---

## 4. Receiving the Request & Validation (Backend API)
**Files:** `backend/app/api/routes.py` AND `backend/app/schemas/inputs.py`
*   **What it does:** The FastAPI backend is listening for requests.
*   **How it works:**
    1.  The request hits the `@router.post("/predict")` endpoint in `routes.py`.
    2.  Before processing, FastAPI checks the data against the `MLModelInput` class located in `schemas/inputs.py`. This ensures that `n` is an integer, `temp` is a float, `state` is a string, etc. If the frontend sends bad data, FastAPI automatically blocks it.
    3.  If valid, it passes the data to the `get_ai_recommendations` function.

---

## 5. The Brains: AI Prediction (Backend ML)
**File:** `backend/app/ml/predict.py`
*   **What it does:** This is where the actual Machine Learning happens using `scikit-learn`.
*   **How it works:**
    1.  **Loading the Model:** At the top of the file, Python uses `pickle` to load the pre-trained `crop_model_v3.pkl` (the Random Forest AI) and `state_encoder.pkl` from disk into memory.
    2.  **Encoding:** AI models cannot read text. So, `state_le.transform([data.state])` converts the string "Maharashtra" into a number (like `14`) that the AI understands.
    3.  **Predicting:** The code builds an array of the 9 features: `[[n, p, k, temp, hum, ph, rain, budget, state_encoded]]` and passes it to `model.predict_proba()`.
    4.  **Math:** The Random Forest looks at its decision trees and returns a probability score for all ~22 crops. The code sorts these probabilities, grabs the Top 3 highest scores, formats them into a list (`priority_list`), and sends them back to the frontend.

---

## 6. Rendering the Results (Frontend UI)
**File:** `frontend/src/components/ResultsDashboard.jsx`
*   **What it does:** The frontend receives the Top 3 crops and their confidence percentages from the backend and displays them beautifully.
*   **How it works:** 
    1.  Because the AI model *only* returns the Crop Name and Confidence, `ResultsDashboard.jsx` uses a helper function called `getCropDetails()`.
    2.  This function acts as a local dictionary. If the AI predicted "COFFEE", the dictionary looks up Coffee and attaches the hardcoded "Farming Technique", "High Cost", and "Medium Water Requirement" texts.
    3.  Finally, React maps over the array and renders the glassy cards, the circular percentage SVGs, and the farming tips onto the screen!
