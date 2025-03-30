import { Stack } from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import EventLogger from "../../shared/EventLogger";
import emitter from "../../../utils/EventEmitter";
import MapMarkerControls from "./MapMarkerControls";

const BasicMarkerPreview = () => {
  const mapId = "basic-marker";

  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  useEffect(() => {
    emitter.emit("log", "Started Listening to Basic Marker...");
  }, []);
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
            onBoundsChanged={(event) => {
              if (event?.map) {
                const bounds = event.map.getBounds()?.toJSON();
                const center = event.map.getCenter()?.toJSON();
                const zoom = event.map.getZoom();
                emitter.emit(
                  "log",
                  `\n📍 Bounds Changed:\n\n• Bounds: ${JSON.stringify(
                    bounds,
                    null,
                    2
                  )}\n• Center: ${JSON.stringify(
                    center,
                    null,
                    2
                  )}\n• Zoom: ${zoom}\n`
                );
              }
            }}
            id={mapId}
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            minZoom={3}
            maxZoom={15}
            defaultZoom={3}
          >
            <Marker position={markerPosition} />
          </Map>
        </Stack>

        {/* Map Controls Section (Fixed position) */}
        <Stack
          className="div2"
          gridArea="1 / 7 / 3 / 9"
          width="100%"
          height="100%"
          overflow="auto"
        >
          <MapMarkerControls
            id={mapId}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />
        </Stack>
        <Stack
          className="div3"
          gridArea="3 / 7 / 5 / 9"
          width="100%"
          height="100%"
          overflow="auto"
        >
          <EventLogger />
        </Stack>
      </Stack>
    </APIProvider>
  );
};

export default BasicMarkerPreview;
