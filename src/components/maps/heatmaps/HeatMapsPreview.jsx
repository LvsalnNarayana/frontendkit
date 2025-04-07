import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Stack } from "@mui/material";
import HeatMapLayer from "./HeatMapLayer";
import earthQuakeDataJson from "./earthquakes.json";
import HeatmapMapControl from "./HeatmapMapControl";

const HeatMapsPreview = () => {
  const [mapSettings, setMapSettings] = useState({
    id: "heat-map",
    zoom: 5,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    disableDoubleClickZoom: false,
    mapTypeId: "satellite",
    minZoom: 3,
    maxZoom: 20,
    darkMode: false,
    heatmapData: {
      radius: 25,
      opacity: 0.6,
    },
  });
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
          id={mapSettings.id}
          width="100%"
          height="100%"
          defaultZoom={mapSettings.zoom}
          disableDefaultUI={mapSettings.disableDefaultUI}
          gestureHandling={mapSettings.gestureHandling}
          minZoom={mapSettings.minZoom}
          maxZoom={mapSettings.maxZoom}
          mapTypeId={mapSettings.mapTypeId}
          disableDoubleClickZoom={mapSettings.disableDoubleClickZoom}
        >
          <HeatMapLayer
            mapId={mapSettings.id}
            radius={mapSettings?.heatmapData?.radius}
            opacity={mapSettings?.heatmapData?.opacity}
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
          mapSettings={mapSettings}
          setMapSettings={setMapSettings}
        />
      </Stack>
    </Stack>
  );
};

export default HeatMapsPreview;
