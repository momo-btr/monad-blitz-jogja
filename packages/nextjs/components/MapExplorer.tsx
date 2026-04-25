"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";

// Fix Leaflet SSR and icon issues
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface MapExplorerProps {
  geoJsonData?: any;
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
}

// Helper to update map center dynamically
const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export default function MapExplorer({
  geoJsonData,
  center = [-0.7893, 113.9213], // Indonesia default
  zoom = 5,
  interactive = true,
}: MapExplorerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-base-300 animate-pulse flex items-center justify-center">
        <span className="text-black/50">Loading Map...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={interactive}
        zoomControl={interactive}
        dragging={interactive}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            pathOptions={{
              color: "#2A9D8F",
              fillColor: "#2A9D8F",
              fillOpacity: 0.5,
              weight: 3,
            }}
          />
        )}
        <MapUpdater center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}
