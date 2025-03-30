import React, { useEffect, useState } from "react";
import { GPXLoader } from "@loaders.gl/kml";
import { load } from "@loaders.gl/core";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

const GpxPolyline = ({ path }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !path.length) return;

    const polyline = new window.google.maps.Polyline({
      path,
      map,
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 6,
    });

    // Fit bounds to path
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds);

    return () => polyline.setMap(null); // Cleanup
  }, [map, path]);

  return null;
};

const GpxVisualizationPreview = () => {
  const [path, setPath] = useState([]);

  useEffect(() => {
    const fetchGPX = async () => {
      try {
        const data = await load("/fells_loop.gpx", GPXLoader, {});
        const coords = [];

        for (const feature of data.features) {
          if (feature.geometry.type === "LineString") {
            coords.push(
              ...feature.geometry.coordinates.map(([lng, lat]) => ({
                lat,
                lng,
              }))
            );
          }
        }

        setPath(coords);
      } catch (err) {
        console.error("Error loading GPX:", err);
      }
    };

    fetchGPX();
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        disableDefaultUI
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={path[0] || { lat: 0, lng: 0 }}
        defaultZoom={8}
      >
        <GpxPolyline path={path} />
      </Map>
    </APIProvider>
  );
};

export default GpxVisualizationPreview;
