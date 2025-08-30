# import os
# import geopandas
# from shapely.geometry import Point
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# # --- 1. Create and Configure the FastAPI App ---
# app = FastAPI()

# # Allow the frontend to communicate with this backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- 2. Load Processed Data at Startup ---
# # This is efficient because the data is loaded only once.
# DATA_FILE = os.path.join('data', 'mangrove_data.parquet')
# print(f"Loading data from: {DATA_FILE}...")
# mangrove_gdf = geopandas.read_parquet(DATA_FILE)
# print(f"Data loaded successfully. CRS is: {mangrove_gdf.crs}")


# # --- 3. Define the API Endpoint ---
# @app.get("/check-location")
# def check_location(lat: float, lon: float):
#     """
#     Checks if a given GPS coordinate is within a mangrove region.
#     """
#     point = Point(lon, lat)
    
#     # Check if the point is contained within any of the mangrove polygons
#     is_mangrove = mangrove_gdf.geometry.contains(point).any()
    
#     # Convert the result to a standard Python boolean for JSON compatibility
#     result = bool(is_mangrove)
    
#     return {"latitude": lat, "longitude": lon, "is_mangrove": result}
import geopandas as gpd
import os
from shapely.geometry import Point
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware # Import for CORS

# --- Basic App Setup ---
app = FastAPI()

# --- Enable CORS (Cross-Origin Resource Sharing) ---
# This allows your website (running on a different origin) to talk to your API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# --- Data Loading (runs only once on startup) ---
PROCESSED_FILE_PATH = os.path.join('processed_data', 'mangrove_data.parquet')
print("Loading mangrove data...")
# We assume the parquet file has already been created by your other script.
mangrove_gdf = gpd.read_parquet(PROCESSED_FILE_PATH)
print("--- Mangrove data loaded successfully! ---")


# --- Define the request data model ---
# This tells FastAPI what kind of data to expect from the frontend (a JSON with lat and lon).
class Coordinate(BaseModel):
    latitude: float
    longitude: float


# --- Your analysis function ---
def is_in_mangrove_region(latitude: float, longitude: float, gdf: gpd.GeoDataFrame) -> bool:
    point_to_check = Point(longitude, latitude)
    return gdf.geometry.contains(point_to_check).any()


# --- API Endpoint ---
@app.post("/check-coordinates")
def check_mangrove_endpoint(coordinate: Coordinate):
    """
    API endpoint to check if a coordinate is in a mangrove region.
    Receives a POST request with JSON data like: {"latitude": 21.9, "longitude": 88.7}
    """
    is_mangrove = is_in_mangrove_region(
        latitude=coordinate.latitude,
        longitude=coordinate.longitude,
        gdf=mangrove_gdf
    )

    if is_mangrove:
        return {"is_mangrove": True, "message": "The location is within a mangrove region."}
    else:
        return {"is_mangrove": False, "message": "The location is not in a mangrove region."}