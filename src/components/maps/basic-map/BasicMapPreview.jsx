import { Stack } from "@mui/material";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import emitter from "../../../utils/EventEmitter";
import MapControls from "./MapControls";

const BasicMapPreview = () => {
  // IMPORTANT: Replace this with your actual Google Maps Map ID that has 3D buildings enabled
  const mapId = "YOUR_CUSTOM_MAP_ID_WITH_3D_BUILDINGS";

  const [mapSettings, setMapSettings] = useState({
    mapId: mapId,
    center: { lat: 40.748817, lng: -73.985428 }, // Example: NYC (Empire State Building)
    zoom: 18,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    disableDoubleClickZoom: false,
    mapTypeId: "satellite",
    minZoom: 3,
    maxZoom: 20,
  });

  useEffect(() => {
    emitter.emit("log", "Basic Map with 3D buildings...");
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Stack flexGrow={1} direction={"row"} width={"100%"} height={"100%"}>
        <Map
          id={mapSettings.mapId}
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
        />
        <Stack
          width={450}
          flexGrow={1}
          sx={{ overflow: "hidden", height: "100%" }}
          pl={1}
        >
          <Stack height="100%">
            <MapControls
              id={mapId}
              mapSettings={mapSettings}
              setMapSettings={setMapSettings}
            />
          </Stack>
        </Stack>
      </Stack>
    </APIProvider>
  );
};

export default BasicMapPreview;
