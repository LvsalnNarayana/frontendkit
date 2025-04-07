import { Divider, Stack, Typography } from "@mui/material";
import {
  APIProvider,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import AdvancedMarkerMapControl from "./AdvancedMarkerMapControl";
import AdvancedMarkerPoint from "./AdvancedMarkerPoint";

const AdvancedMarkerPreview = () => {
  /*
  ..######..########....###....########.########
  .##....##....##......##.##......##....##......
  .##..........##.....##...##.....##....##......
  ..######.....##....##.....##....##....######..
  .......##....##....#########....##....##......
  .##....##....##....##.....##....##....##......
  ..######.....##....##.....##....##....########
  */
  const [mapSettings, setMapSettings] = useState({
    id: "advanced-marker",
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
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowOpen, setInfowindowOpen] = useState(false);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Stack
        width="100%"
        height="100%"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
        rowGap={2}
        columnGap={2}
        gap={2}
      >
        {/* Map Section */}
        <Stack
          gridArea="1 / 1 / 5 / 7"
          width="100%"
          height="100%"
          flexShrink={0}
        >
          <Map
            id={mapSettings.id}
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
            mapId={import.meta.env.VITE_GOOGLE_MAPS_KEY}
          >
            {/* Marker at the updated position */}
            <AdvancedMarkerPoint
              ref={markerRef}
              position={mapSettings.markerPosition}
              markerClick={() => {
                setInfowindowOpen(true);
              }}
              infoWindowOpen={infowindowOpen}
            />
            {infowindowOpen && (
              <InfoWindow
                anchor={marker}
                position={mapSettings.markerPosition}
                onClose={() => {
                  setInfowindowOpen(false);
                }}
              >
                <Typography
                  variant="body1"
                  fontSize={14}
                  textAlign={"center"}
                  fontWeight={500}
                >
                  Marker Position
                </Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant="body1" fontSize={14}>
                  {JSON.stringify(mapSettings?.markerPosition, null, 2)}
                </Typography>
              </InfoWindow>
            )}
          </Map>
        </Stack>

        {/* Map Controls Section */}
        <Stack
          className="div2"
          gridArea="1 / 7 /  5/ 9"
          width="100%"
          height="100%"
          overflow="auto"
        >
          <AdvancedMarkerMapControl
            mapSettings={mapSettings}
            setMapSettings={setMapSettings}
          />
        </Stack>
      </Stack>
    </APIProvider>
  );
};

export default AdvancedMarkerPreview;
