import os
import geopandas
from shapely.geometry import Point
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- 1. Create and Configure the FastAPI App ---
app = FastAPI()

# Allow the frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. Load Processed Data at Startup ---
# This is efficient because the data is loaded only once.
DATA_FILE = os.path.join('data', 'mangrove_data.parquet')
print(f"Loading data from: {DATA_FILE}...")
mangrove_gdf = geopandas.read_parquet(DATA_FILE)
print(f"Data loaded successfully. CRS is: {mangrove_gdf.crs}")


# --- 3. Define the API Endpoint ---
@app.get("/check-location")
def check_location(lat: float, lon: float):
    """
    Checks if a given GPS coordinate is within a mangrove region.
    """
    point = Point(lon, lat)
    
    # Check if the point is contained within any of the mangrove polygons
    is_mangrove = mangrove_gdf.geometry.contains(point).any()
    
    # Convert the result to a standard Python boolean for JSON compatibility
    result = bool(is_mangrove)
    
    return {"latitude": lat, "longitude": lon, "is_mangrove": result}