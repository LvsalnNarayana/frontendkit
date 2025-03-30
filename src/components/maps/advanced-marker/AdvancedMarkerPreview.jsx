import { Divider, Stack, Typography } from "@mui/material";
import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import EventLogger from "../../shared/EventLogger";
import emitter from "../../../utils/EventEmitter";
import AdvancedMarkerMapControl from "./AdvancedMarkerMapControl";
import AdvancedMarkerPoint from "./AdvancedMarkerPoint";

const AdvancedMarkerPreview = () => {
  const mapId = "advanced-marker";
  /*
  ..######..########....###....########.########
  .##....##....##......##.##......##....##......
  .##..........##.....##...##.....##....##......
  ..######.....##....##.....##....##....######..
  .......##....##....#########....##....##......
  .##....##....##....##.....##....##....##......
  ..######.....##....##.....##....##....########
  */
  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  /*
  .########.########.########.########..######..########
  .##.......##.......##.......##.......##....##....##...
  .##.......##.......##.......##.......##..........##...
  .######...######...######...######...##..........##...
  .##.......##.......##.......##.......##..........##...
  .##.......##.......##.......##.......##....##....##...
  .########.##.......##.......########..######.....##...
  */
  useEffect(() => {
    emitter.emit("log", "Started Listening to Basic Marker...");
  }, []);
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
            mapId={import.meta.env.VITE_GOOGLE_MAPS_KEY}
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            minZoom={3}
            maxZoom={15}
            defaultZoom={3}
          >
            {/* Marker at the updated position */}
            <AdvancedMarkerPoint
              ref={markerRef}
              position={markerPosition}
              markerClick={() => {
                setInfowindowOpen(true);
              }}
              infoWindowOpen={infowindowOpen}
            />
            {infowindowOpen && (
              <InfoWindow
                anchor={marker}
                position={markerPosition}
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
                  {JSON.stringify(markerPosition, null, 2)}
                </Typography>
              </InfoWindow>
            )}
          </Map>
        </Stack>

        {/* Map Controls Section */}
        <Stack
          className="div2"
          gridArea="1 / 7 /  3/ 9"
          width="100%"
          height="100%"
          overflow="auto"
        >
          <AdvancedMarkerMapControl
            id={mapId}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />
        </Stack>

        {/* Event Logger Section */}
        <Stack
          className="div3"
          gridArea="3 /7 / 5 / 9"
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

export default AdvancedMarkerPreview;
