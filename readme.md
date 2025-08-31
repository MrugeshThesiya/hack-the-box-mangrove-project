# Mangrove Guardian Project

A multi-component platform for mangrove ecosystem monitoring, conservation, and citizen science. This project includes a mobile app for field data collection, a machine learning backend for geospatial analysis, and tools for audio-to-text reporting.

---

## Project Structure

```
.
├── AudioToText/      # Voice-to-report web app (Flask backend)
├── dashboard/        # Reserved for dashboard features (empty)
├── Mangrove/         # Mangrove image analysis (FastAPI backend, Jupyter notebook)
├── ml-backend/       # Geospatial ML backend (FastAPI, GeoPandas)
├── mobile-app/       # Expo React Native mobile app
```

---

## Components

### 1. Mobile App (`mobile-app/`)

- **Tech:** Expo, React Native, TypeScript
- **Features:**
  - Submit mangrove photos and location
  - View conservation stats, achievements, and profile
  - Check if a location is a mangrove region
- **Getting Started:**
  ```sh
  cd mobile-app
  npm install
  npm start
  ```
  Open in Expo Go, Android/iOS emulator, or web.

---

### 2. ML Backend (`ml-backend/`)

- **Tech:** FastAPI, GeoPandas, Shapely
- **Features:**
  - API to check if GPS coordinates are in a mangrove region
  - Loads geospatial data from processed Parquet files
- **Endpoints:**
  - `POST /check-coordinates` — JSON `{latitude, longitude}` → `{is_mangrove: bool, ...}`
- **Run Locally:**
  ```sh
  cd ml-backend
  pip install -r requirements.txt
  uvicorn main:app --reload --port 8001
  # or
  uvicorn main:app --host 0.0.0.0 --port 8001
  ```
  See `Mangrove Classifier.ipynb` for model details.

---

### 3. Audio to Text (`AudioToText/`)

- **Tech:** Flask, SpeechRecognition
- **Features:**
  - Web app for submitting voice-based mangrove reports
  - Multi-language support
- **Run Locally:**
  ```sh
  cd AudioToText
  pip install -r requirements.txt
  python app.py
  ```
  Open `index.html` in your browser.

---

## Data

- **Geospatial Data:** Located in `data/` and `processed_data/`
- **Sample Images:** See `mang.jpg`

---

## Development Notes

- **CORS:** All APIs are configured for cross-origin requests.
- **File-based Routing:** Mobile app uses Expo Router for navigation.

---

## Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [GeoPandas Documentation](https://geopandas.org/)
- [OpenCV Documentation](https://docs.opencv.org/)
