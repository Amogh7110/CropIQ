# AgriSmart - Smart Crop Recommendation System

AgriSmart is an AI-powered agricultural decision-support system that provides intelligent crop recommendations based on soil conditions, weather, and budget. It features a React frontend and a FastAPI backend with a machine learning model.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Python 3.9+** (for the backend AI model)
- **Node.js 18+** (for the frontend React app)

---

## 🛠️ 1. Backend Setup (FastAPI & ML Model)

The backend is written in Python and hosts the machine learning model.

**Important Note:** If you received this project as a ZIP file, do **NOT** use the existing `venv` folder if one is present. Python virtual environments break when moved to a different computer. Please follow the steps below to create a fresh one.

1. **Open a terminal** and navigate into the `backend` folder:
   ```bash
   cd backend
   ```

2. **Create a fresh Python virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - **Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\activate
     ```
   - **Windows (Command Prompt):**
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **Mac/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install the required Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the backend server:**
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   *The backend should now be running at `http://127.0.0.1:8000`*

---

## 💻 2. Frontend Setup (React & Vite)

The frontend is a modern React application built with Vite.

1. **Open a SECOND, NEW terminal** (keep the backend server running in the first one) and navigate into the `frontend` folder:
   ```bash
   cd frontend
   ```

2. **Install the Node dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the App:**
   Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

---

## 🧠 Using the App
- When the web app opens, scroll down to the **Farm Parameter Setup**.
- Click the **"📍 Auto-fill Location & Weather"** button to automatically fetch real-time weather and temperature using geolocation.
- Click **"Generate Smart Insights"** to send the data to the backend AI model and receive your personalized crop recommendations!
