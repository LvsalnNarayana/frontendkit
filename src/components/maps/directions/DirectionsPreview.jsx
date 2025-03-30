import { Stack } from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import EventLogger from "../../shared/EventLogger";
import emitter from "../../../utils/EventEmitter";
import Direction from "./Direction";
import DirectionsControl from "./DirectionControls/DirectionsControl";
import { useDirectionControls } from "./hooks/DirectionControlsHook";

const DirectionsPreview = () => {
  const { mapId, center, zoom, setZoom } = useDirectionControls();
  useEffect(() => {
    emitter.emit("log", "Started Listening to Basic Marker...");
  }, []);
  return (
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
          disableDefaultUI
          disableDoubleClickZoom
          onZoomChanged={(event) => {
            if (event?.map) {
              setZoom(zoom);
            }
          }}
          id={mapId}
          style={{ width: "100%" }}
          defaultCenter={center}
          minZoom={3}
          maxZoom={15}
          defaultZoom={zoom}
        />
      </Stack>

      <Stack
        className="div2"
        gridArea="1 / 7 / 5/ 9"
        width="100%"
        height="100%"
        overflow="auto"
      >
        <DirectionsControl mapId={mapId} />
      </Stack>
    </Stack>
  );
};

export default DirectionsPreview;
