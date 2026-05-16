# AgriSmart 🌾: AI-Powered Smart Crop Recommendation System

AgriSmart is an advanced agricultural decision-support system designed to empower farmers and agricultural stakeholders by providing intelligent, data-driven crop recommendations. By analyzing environmental conditions, soil health metrics, and economic factors, AgriSmart leverages cutting-edge Machine Learning to suggest the most optimal and profitable crops to cultivate.

## 🌟 Key Features

- **🧠 AI-Driven Recommendations**: Uses a robust Random Forest machine learning model to predict the top 3 most suitable crops along with confidence probabilities.
- **📍 Real-Time Environmental Data Integration**: Automatically fetches user location and retrieves live weather data (temperature, humidity, rainfall) via Open-Meteo and OpenStreetMap APIs.
- **💻 Interactive & Modern Dashboard**: A visually stunning React frontend built with Vite, providing a seamless user experience, responsive design, and intuitive results presentation.
- **⚡ High-Performance Backend**: FastAPI-powered backend ensuring lightning-fast API responses and robust data validation.

---

## 🏗️ Project Architecture & Data Flow

AgriSmart is divided into two main components: a frontend UI and an AI-powered backend.

### 1. Frontend (React + Vite)
- Built with modern React and Vite for fast development and rendering.
- Gathers user inputs (Nitrogen, Phosphorus, Potassium, pH, Budget).
- Utilizes geolocation to automatically fetch exact real-time temperature, humidity, and rainfall.
- Communicates via `axios` to send structured JSON payloads to the backend API.
- Renders AI recommendations elegantly, mapping the predicted crops to a local dictionary to display actionable farming techniques, cost implications, and water requirements.

### 2. Backend (FastAPI + Scikit-Learn)
- Listens for requests at `/predict`.
- Strictly validates incoming JSON using `Pydantic` schemas to ensure data integrity before inference.
- Utilizes a pre-trained **Random Forest Classifier** (`scikit-learn`).
- The text inputs (like State) are processed using a `LabelEncoder` (`state_encoder.pkl`).
- Returns a sorted list of the Top 3 crop recommendations with probability scores.

---

## 🤖 The AI Model

The core of AgriSmart is a sophisticated Machine Learning pipeline:
- **Algorithm**: Random Forest Classifier
- **Features Analyzed (9)**: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, Rainfall, Budget, and State.
- **Output**: Predicts probabilities across ~22 different crop classes.
- **Workflow**:
  1. The backend loads the pre-trained model (`crop_model_v3.pkl`) and encoders into memory using `pickle`.
  2. Incoming feature data is formatted and encoded.
  3. `predict_proba()` is executed to calculate confidence scores for all crop classes.
  4. The top 3 predictions are extracted, formatted, and returned to the frontend.

---

## 🚀 Running AgriSmart (Development & Production)

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**
- **Git**

### 1. Backend Setup (FastAPI)

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <repository-url>
   cd AgriSmart/backend
   ```
2. Create and activate a fresh Python virtual environment:
   - **Windows:** `python -m venv venv` then `.\venv\Scripts\activate`
   - **Mac/Linux:** `python3 -m venv venv` then `source venv/bin/activate`
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   - **Development**: `python -m uvicorn app.main:app --reload`
   - **Production**: Use a production server like Gunicorn with Uvicorn workers:
     ```bash
     gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
     ```

### 2. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd AgriSmart/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. **Production Build**:
   To create an optimized production build:
   ```bash
   npm run build
   ```
   *The built files in the `dist/` directory can be served via Nginx, Vercel, Netlify, or any static file hosting service.*

---

## 💡 How to Use

1. Launch the application and scroll to the **Farm Parameter Setup**.
2. Click **"📍 Auto-fill Location & Weather"** to auto-populate the environmental fields based on your current location.
3. Manually enter any missing soil metrics (N, P, K, pH) and your budget.
4. Click **"Generate Smart Insights"** to receive AI-powered crop recommendations tailored to your specific conditions!

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.
