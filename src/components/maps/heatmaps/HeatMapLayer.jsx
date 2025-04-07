import React, { useEffect, useRef } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const HeatMapLayer = ({
  mapId,
  opacity = 0.6,
  radius = 20,
  data = { features: [] },
}) => {
  const map = useMap(mapId);
  const visualization = useMapsLibrary("visualization");
  const heatmapRef = useRef(null);

  // Initialize heatmap layer
  useEffect(() => {
    if (!map || !visualization || !window.google?.maps?.visualization) return;

    heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
      map,
      radius,
      opacity,
    });

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
        heatmapRef.current = null;
      }
    };
  }, [map, visualization]);

  // Update heatmap options when props change
  useEffect(() => {
    if (!heatmapRef.current) return;

    heatmapRef.current.set("opacity", opacity);
    heatmapRef.current.set("radius", radius);
  }, [opacity, radius]);

  // Update heatmap data
  useEffect(() => {
    if (!heatmapRef.current || !data?.features?.length) return;

    const heatmapData = data.features.map((feature) => {
      const [lng, lat] = feature.geometry.coordinates || [];
      const weight = feature.properties?.mag || 1;

      return {
        location: new window.google.maps.LatLng(lat, lng),
        weight,
      };
    });

    heatmapRef.current.setData(heatmapData);
  }, [data]);

  return null;
};

export default HeatMapLayer;
