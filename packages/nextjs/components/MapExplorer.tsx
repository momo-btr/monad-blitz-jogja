"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic imports to prevent SSR "window is not defined" errors
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

interface MapExplorerProps {
  geoJsonData?: any;
}

export const MapExplorer = ({ geoJsonData }: MapExplorerProps) => {
  const [mounted, setMounted] = useState(false);
  // Default center focused on Indonesia
  const defaultCenter: [number, number] = [-0.7893, 113.9213];

  useEffect(() => {
    // A trick to ensure leaflet assets are loaded properly on client side
    // Leaflet's default icons can sometimes be problematic in Next.js without this,
    // but for GeoJSON shapes, it's generally fine.
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] w-full rounded-xl bg-base-200 animate-pulse border border-base-300 z-0"></div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-base-300 shadow-sm z-0 relative isolate">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        className="h-full w-full z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={() => ({
              color: "#2A9D8F",
              weight: 2,
              fillColor: "#2A9D8F",
              fillOpacity: 0.4,
            })}
          />
        )}
      </MapContainer>
    </div>
  );
};
