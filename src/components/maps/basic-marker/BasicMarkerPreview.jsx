import { Stack } from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import MapMarkerControls from "./MapMarkerControls";

const BasicMarkerPreview = () => {
  const [mapSettings, setMapSettings] = useState({
    id: "basic-marker",
    center: { lat: 40.748817, lng: -73.985428 },
    zoom: 5,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    disableDoubleClickZoom: false,
    mapTypeId: "satellite",
    minZoom: 3,
    maxZoom: 20,
    markerPosition: { lat: 37.7749, lng: -122.4194 },
    markerColor: "red",
    markerLabel: "A",
  });

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
            <Marker
              position={{
                lat: mapSettings.markerPosition.lat,
                lng: mapSettings.markerPosition.lng,
              }}
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
          <MapMarkerControls
            mapSettings={mapSettings}
            setMapSettings={setMapSettings}
          />
        </Stack>
      </Stack>
    </APIProvider>
  );
};

export default BasicMarkerPreview;
