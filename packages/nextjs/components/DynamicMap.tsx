"use client";

import { ComponentProps } from "react";
import dynamic from "next/dynamic";
import { MapRenderer } from "./MapRenderer";

// Dynamically import the map renderer to disable SSR
// Leaflet uses the window object which is not available during server-side rendering
const DynamicMapComponent = dynamic(() => import("./MapRenderer").then(mod => mod.MapRenderer), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-base-300 animate-pulse flex items-center justify-center rounded-xl">
      <span className="text-black/50">Loading Map...</span>
    </div>
  ),
});

type MapRendererProps = ComponentProps<typeof MapRenderer>;

/**
 * A wrapper around MapRenderer that safely loads it only on the client side.
 * Use this component anywhere you need to display a Leaflet map.
 */
export const DynamicMap = (props: MapRendererProps) => {
  return <DynamicMapComponent {...props} />;
};
