import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Stack } from "@mui/material";
import HeatMapLayer from "./HeatMapLayer";
import earthQuakeDataJson from "./earthquakes.json";
import emitter from "../../../utils/EventEmitter";
import HeatmapMapControl from "./HeatmapMapControl";

const HeatMapsPreview = () => {
  const mapId = "heat-map";
  const [radius, setRadius] = useState(25);
  const [opacity, setOpacity] = useState(0.6);
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
        >
          <HeatMapLayer
            id={mapId}
            radius={radius}
            opacity={opacity}
            data={earthQuakeDataJson}
          />
        </Map>
      </Stack>
      <Stack
        className="div2"
        gridArea="1 / 7 / 5/ 9"
        width="100%"
        height="100%"
        overflow="auto"
      >
        <HeatmapMapControl
          id={mapId}
          radius={radius}
          opacity={opacity}
          setRadius={setRadius}
          setOpacity={setOpacity}
        />
      </Stack>
    </Stack>
  );
};

export default HeatMapsPreview;
