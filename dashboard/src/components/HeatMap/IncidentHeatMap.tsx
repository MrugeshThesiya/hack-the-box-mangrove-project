"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const HeatLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heat = L.heatLayer(points, { radius: 25, blur: 15, maxZoom: 17 });
    heat.addTo(map);

    return () => {
      heat.remove();
    };
  }, [map, points]);

  return null;
};

const IncidentHeatmap = ({ incidents }) => {
  // incidents = [{ lat: 21.123, long: 72.456, severity: 3 }, ...]
  const heatPoints = incidents.map(i => [i.lat, i.long, i.severity || 1]);

  return (
    <MapContainer
      center={[21.123, 72.456]} // Default center
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HeatLayer points={heatPoints} />
    </MapContainer>
  );
};

export default IncidentHeatmap;
