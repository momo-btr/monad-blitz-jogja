"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";

interface MapRendererProps {
  geojson: {
    type: string;
    coordinates: number[][][];
  } | null;
  className?: string;
}

export const MapRenderer = ({ geojson, className = "h-64" }: MapRendererProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Leaflet relies on the window object, so we must render it only on the client
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`${className} w-full rounded-xl skeleton bg-base-300`}></div>;
  }

  if (
    !geojson ||
    geojson.type !== "Polygon" ||
    !geojson.coordinates ||
    !geojson.coordinates[0] ||
    geojson.coordinates[0].length === 0
  ) {
    return (
      <div
        className={`${className} w-full rounded-xl flex items-center justify-center bg-base-200 text-base-content/50 border border-base-300 shadow-inner`}
      >
        No valid map data available
      </div>
    );
  }

  // GeoJSON uses [longitude, latitude] format
  // Leaflet uses [latitude, longitude] format
  const positions: [number, number][] = geojson.coordinates[0].map(
    (coord: number[]) => [coord[1], coord[0]] as [number, number],
  );

  // Default center to the first coordinate in the polygon
  const center = positions[0];

  return (
    <div className={`${className} w-full rounded-xl overflow-hidden shadow-md border border-base-300 relative z-0`}>
      <MapContainer center={center} zoom={16} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={positions}
          pathOptions={{
            color: "#3b82f6",
            fillColor: "#3b82f6",
            fillOpacity: 0.4,
            weight: 2,
          }}
        />
      </MapContainer>
    </div>
  );
};
