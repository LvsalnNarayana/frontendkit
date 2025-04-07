import React, { useEffect, useState } from "react";
import { GPXLoader } from "@loaders.gl/kml";
import { load } from "@loaders.gl/core";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import GpxPolyLine from "./GpxPolyLine";
import GpxVisualizationControl from "./GpxVisualizationControl";
import { Stack } from "@mui/material";

const GpxVisualizationPreview = () => {
  const [path, setPath] = useState([]);
  const [mapSettings, setMapSettings] = useState({
    id: "basic-marker",
    center: { lat: 40.748817, lng: -73.985428 },
    zoom: 10,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    disableDoubleClickZoom: false,
    mapTypeId: "roadmap",
    minZoom: 3,
    maxZoom: 20,
    pathSettings: {
      pathData: {
        name: "South Downs Way",
        value: "South-Downs-Way.gpx",
      },
      strokeColor: "#0000aa",
      strokeOpacity: 1,
      strokeWeight: 6,
    },
  });
  useEffect(() => {
    const fetchGPX = async () => {
      try {
        const data = await load(
          `/gpx/${mapSettings?.pathSettings?.pathData?.value}`,
          GPXLoader,
          {}
        );
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
  }, [mapSettings?.pathSettings?.pathData?.value]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Stack
        className="parent"
        width="100%"
        height="100%"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
        gap={2}
      >
        <Stack
          className="div1"
          gridArea="1 / 1 / 5 / 7"
          width="100%"
          height="100%"
        >
          <Map
            id={mapSettings.id}
            mapId={mapSettings.mapId}
            width="100%"
            height="100%"
            defaultCenter={mapSettings.center}
            defaultZoom={mapSettings.zoom}
            disableDefaultUI={mapSettings.disableDefaultUI}
            gestureHandling={mapSettings.gestureHandling}
            minZoom={mapSettings.minZoom}
            maxZoom={mapSettings.maxZoom}
            mapTypeId={mapSettings.mapTypeId}
            disableDoubleClickZoom={mapSettings.disableDoubleClickZoom}
            onClick={(e) => {
              setMapSettings({
                ...mapSettings,
                markerPosition: {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                },
              });
            }}
          >
            <GpxPolyLine
              mapId={mapSettings?.id}
              path={path}
              polylineSettings={mapSettings?.pathSettings}
            />
          </Map>
        </Stack>

        {/* Map Controls Section (Fixed position) */}
        <Stack
          className="div2"
          gridArea="1 / 7 / 5/ 9"
          width="100%"
          height="100%"
          overflow="auto"
        >
          <GpxVisualizationControl
            mapSettings={mapSettings}
            setMapSettings={setMapSettings}
          />
        </Stack>
      </Stack>
    </APIProvider>
  );
};

export default GpxVisualizationPreview;
