# app.py
# All necessary imports for the server and the analysis
import shutil
import os
import cv2
import numpy as np
import json
from datetime import datetime
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from shapely.geometry import Point

# --- Paste ALL Python Classes & Functions from your Notebook Below ---

def convert_numpy_types(obj):
    """Convert numpy types to JSON serializable types"""
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.bool_):
        return bool(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, dict):
        return {k: convert_numpy_types(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_types(item) for item in obj]
    elif hasattr(obj, 'item'):
        return obj.item()
    return obj

def extract_gps_from_image(image_path):
    """Extract GPS coordinates from image EXIF data"""
    try:
        image = Image.open(image_path)
        exif_data = image._getexif()
        if exif_data is None: return None, "No EXIF data found"
        gps_info = {}
        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == "GPSInfo":
                for gps_tag in value:
                    sub_tag_name = GPSTAGS.get(gps_tag, gps_tag)
                    gps_info[sub_tag_name] = value[gps_tag]
        if not gps_info: return None, "No GPS data in image"
        lat = convert_to_degrees(gps_info.get('GPSLatitude'))
        lng = convert_to_degrees(gps_info.get('GPSLongitude'))
        if gps_info.get('GPSLatitudeRef') == 'S': lat = -lat
        if gps_info.get('GPSLongitudeRef') == 'W': lng = -lng
        return (lat, lng), "GPS extracted successfully"
    except Exception as e:
        return None, f"Error extracting GPS: {str(e)}"

def convert_to_degrees(gps_coordinate):
    """Convert GPS coordinate to decimal degrees"""
    if gps_coordinate is None: return None
    degrees = float(gps_coordinate[0])
    minutes = float(gps_coordinate[1])
    seconds = float(gps_coordinate[2])
    return degrees + (minutes / 60.0) + (seconds / 3600.0)

class MangroveClassifier:
    # ... (Paste the full MangroveClassifier class code here) ...
    def classify_mangrove(self, image_path):
        image = cv2.imread(image_path)
        if image is None: return False, {"error": "Could not load image"}
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        # (Your full classification logic here)
        return True, {"is_mangrove": True, "confidence": 80} # Placeholder

class EnhancedMangroveDamageDetector:
    # ... (Paste the full EnhancedMangroveDamageDetector class code here) ...
    def analyze_comprehensive_health(self, image_path):
        # (Your full health analysis logic here)
        return {"overall_health": {"status": "HEALTHY", "health_score": 95}} # Placeholder

class TwoStageMangroveAPI:
    def __init__(self):
        self.classifier = MangroveClassifier()
        self.damage_detector = EnhancedMangroveDamageDetector()
    def process_image(self, image_path):
        print("🔍 Stage 1: Checking if image contains mangroves...")
        is_mangrove, classification_result = self.classifier.classify_mangrove(image_path)
        if not is_mangrove:
            return {"success": False, "message": "Not a mangrove image"}
        print("✅ Stage 1 Complete: Mangrove detected")
        print("🔬 Stage 2: Conducting comprehensive health analysis...")
        health_analysis = self.damage_detector.analyze_comprehensive_health(image_path)
        return {"success": True, "classification": classification_result, "health_analysis": health_analysis}

# This is the main function the API will call
def analyze_mangrove_image(image_path: str):
    """
    Main function to run the complete two-stage analysis.
    """
    api = TwoStageMangroveAPI()
    result = api.process_image(image_path)
    return result

# --- FastAPI Server Code ---

app = FastAPI(title="Mangrove Health Analyzer API")

# Configure CORS to allow the frontend to communicate with this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Mangrove Analyzer API!"}

@app.post("/analyze/")
async def create_upload_file(file: UploadFile = File(...)):
    """
    This endpoint receives an image, saves it, runs analysis, and returns the result.
    """
    temp_dir = "temp_uploads"
    os.makedirs(temp_dir, exist_ok=True)
    temp_file_path = os.path.join(temp_dir, file.filename)

    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Call the analysis function defined in this same file
        analysis_result = analyze_mangrove_image(temp_file_path)
        
        # Convert any NumPy types to be JSON-safe
        safe_result = convert_numpy_types(analysis_result)

        if not safe_result.get("success"):
            raise HTTPException(status_code=400, detail=safe_result)

        return safe_result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {str(e)}")
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)