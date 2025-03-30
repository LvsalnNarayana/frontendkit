import React, { useEffect, useMemo } from "react";
import GeoJson from "geojson";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
const HeatMapLayer = ({ id, opacity, radius, data }) => {
  console.log({
    id,
    opacity,
    radius,
    data,
  });
  const map = useMap();
  const visualization = useMapsLibrary("visualization");

  const heatmap = useMemo(() => {
    if (!visualization) return null;

    return new window.google.maps.visualization.HeatmapLayer({
      radius: radius,
      opacity: opacity,
    });
  }, [visualization, radius, opacity]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setData(
      data.features.map((point) => {
        const [lng, lat] = point.geometry.coordinates;

        return {
          location: new window.google.maps.LatLng(lat, lng),
          weight: point.properties?.mag,
        };
      })
    );
  }, [heatmap, radius, opacity, data.features]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setMap(map);

    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, map]);

  return null;
};

export default HeatMapLayer;
