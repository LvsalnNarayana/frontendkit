import { Stack } from "@mui/material";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import EventLogger from "../../shared/EventLogger";
import emitter from "../../../utils/EventEmitter";
import MapControls from "./MapControls";

const BasicMapPreview = () => {
  const mapId = "basic-map";
  useEffect(() => {
    emitter.emit("log", "Basic Map...");
  }, []);
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Stack flexGrow={1} direction={"row"} width={"100%"} height={"100%"}>
        <Map
          disableDefaultUI
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
          onCameraChanged={(event) => {
            if (event?.map) {
              const heading = event.map.getHeading();
              const tilt = event.map.getTilt();
              const center = event.map.getCenter()?.toJSON();
              const zoom = event.map.getZoom();
              emitter.emit(
                "log",
                `\n🎥 Camera Changed:\n\n• Heading: ${heading}\n• Tilt: ${tilt}\n• Center: ${JSON.stringify(
                  center,
                  null,
                  2
                )}\n• Zoom: ${zoom}\n`
              );
            }
          }}
          onCenterChanged={(event) => {
            if (event?.map) {
              const center = event.map.getCenter()?.toJSON();
              emitter.emit(
                "log",
                `\n🌍 Center Changed:\n\n• Center: ${JSON.stringify(
                  center,
                  null,
                  2
                )}\n`
              );
            }
          }}
          onDrag={(event) => {
            if (event?.map) {
              const center = event.map.getCenter()?.toJSON();
              emitter.emit(
                "log",
                `\n🖱️ Dragging:\n\n• Current Center: ${JSON.stringify(
                  center,
                  null,
                  2
                )}\n`
              );
            }
          }}
          onDragEnd={(event) => {
            if (event?.map) {
              const center = event.map.getCenter()?.toJSON();
              emitter.emit(
                "log",
                `\n✅ Drag End:\n\n• Final Center: ${JSON.stringify(
                  center,
                  null,
                  2
                )}\n`
              );
            }
          }}
          onDragStart={(event) => {
            if (event?.map) {
              const center = event.map.getCenter()?.toJSON();
              emitter.emit(
                "log",
                `\n🚀 Drag Start:\n\n• Initial Center: ${JSON.stringify(
                  center,
                  null,
                  2
                )}\n`
              );
            }
          }}
          onZoomChanged={(event) => {
            if (event?.map) {
              const zoom = event.map.getZoom();
              emitter.emit("log", `\n🔍 Zoom Changed:\n\n• Zoom: ${zoom}\n`);
            }
          }}
          id={mapId}
          style={{ width: "100%" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          minZoom={3}
          maxZoom={15}
          defaultZoom={3}
        />
        <Stack
          width={350}
          flexGrow={1}
          sx={{ overflow: "hidden", height: "100%" }}
          pl={1}
        >
          <Stack height="50%">
            <MapControls id={mapId} />
          </Stack>
          <Stack height="50%">
            <EventLogger />
          </Stack>
        </Stack>
      </Stack>
    </APIProvider>
  );
};

export default BasicMapPreview;
