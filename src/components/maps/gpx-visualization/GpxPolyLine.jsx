import React, { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

const GpxPolyLine = ({ mapId, path, polylineSettings }) => {
  const map = useMap(mapId);

  useEffect(() => {
    if (!map || !path.length) return;

    const polyline = new window.google.maps.Polyline({
      path,
      map,
      strokeColor: polylineSettings.strokeColor || "#0000aa",
      strokeOpacity: polylineSettings.strokeOpacity || 1,
      strokeWeight: polylineSettings.strokeWeight || 6,
    });

    // Fit bounds to path
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds);

    return () => polyline.setMap(null); // Cleanup
  }, [
    map,
    path,
    polylineSettings.strokeColor,
    polylineSettings.strokeOpacity,
    polylineSettings.strokeWeight,
  ]);

  return null;
};

export default GpxPolyLine;
