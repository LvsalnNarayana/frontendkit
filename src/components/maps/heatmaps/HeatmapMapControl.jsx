import { Divider, Stack, Typography } from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import CustomSlider from "../../shared/inputs/CustomSlider";
import CustomSelectInput from "../../shared/inputs/CustomSelectInput";
import CustomSwitch from "../../shared/inputs/CustomSwitch";

const HeatmapMapControl = ({ mapSettings, setMapSettings }) => {
  const map = useMap(mapSettings?.id);

  useEffect(() => {
    if (!map) return;

    const zoomChangedListener = map.addListener("zoom_changed", () => {
      setMapSettings((prev) => ({
        ...prev,
        zoom: map.getZoom(),
      }));
    });

    return () => {
      if (zoomChangedListener) zoomChangedListener.remove();
    };
  }, [map, setMapSettings]);

  if (!map) return null;

  return (
    <Stack
      p={2}
      width="100%"
      spacing={1}
      flexShrink={0}
      flexGrow={1}
      height="100%"
      minHeight="100%"
      gap={2}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0.2em",
        },
        "&::-webkit-scrollbar-track": {
          // boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0,0,0,.2)",
        },
      }}
    >
      <Stack>
        <Typography variant="body1" fontSize={18} fontWeight={500}>
          Map Settings
        </Typography>
        <Divider />
      </Stack>

      <CustomSlider
        id={`${mapSettings?.id}-zoom-slider`}
        name="zoom"
        label="Zoom"
        value={mapSettings?.zoom}
        min={mapSettings?.minZoom}
        max={mapSettings?.maxZoom}
        step={1}
        onChange={(name, value) => {
          map.setZoom(value);
          setMapSettings((prev) => ({ ...prev, zoom: value }));
        }}
      />

      <CustomSelectInput
        name="gestureHandling"
        id={`${mapSettings?.id}-gesture-input`}
        value={mapSettings?.gestureHandling}
        label="Gesture Handling"
        options={[
          { value: "cooperative", label: "Cooperative" },
          { value: "greedy", label: "Greedy" },
          { value: "none", label: "None" },
          { value: "auto", label: "Auto" },
        ]}
        onChange={(name, value) => {
          map.setOptions({ gestureHandling: value });
          setMapSettings((prev) => ({ ...prev, gestureHandling: value }));
        }}
      />

      <CustomSelectInput
        name="disableDefaultUI"
        id={`${mapSettings?.id}-ui-toggle`}
        value={mapSettings?.disableDefaultUI}
        label="Default UI"
        options={[
          { value: false, label: "Enabled" },
          { value: true, label: "Disabled" },
        ]}
        onChange={(name, value) => {
          map.setOptions({ disableDefaultUI: value });
          setMapSettings((prev) => ({ ...prev, disableDefaultUI: value }));
        }}
      />

      <CustomSelectInput
        name="mapTypeId"
        id={`${mapSettings?.id}-maptype-input`}
        value={mapSettings?.mapTypeId}
        label="Map Type"
        options={[
          { value: "satellite", label: "Satellite" },
          { value: "roadmap", label: "Roadmap" },
          { value: "hybrid", label: "Hybrid" },
          { value: "terrain", label: "Terrain" },
        ]}
        onChange={(name, value) => {
          map.setMapTypeId(value);
          setMapSettings((prev) => ({ ...prev, mapTypeId: value }));
        }}
      />

      <CustomSwitch
        name="disableDoubleClickZoom"
        id={`${mapSettings?.id}-dblclick-toggle`}
        label="Double Click Zoom"
        value={!mapSettings?.disableDoubleClickZoom}
        onChange={(name, value) => {
          map.setOptions({ disableDoubleClickZoom: !value });
          setMapSettings((prev) => ({
            ...prev,
            disableDoubleClickZoom: !value,
          }));
        }}
      />
      <Stack>
        <Typography variant="body1" fontSize={18} fontWeight={500}>
          Heatmap Settings
        </Typography>
        <Divider />
      </Stack>
      <CustomSlider
        id={`${mapSettings?.id}-heatmap-radius-slider`}
        name="radius"
        label="Radius"
        value={mapSettings?.heatmapData?.radius}
        min={0}
        max={100}
        step={1}
        onChange={(name, value) => {
          setMapSettings((prev) => ({
            ...prev,
            heatmapData: { ...prev.heatmapData, radius: value },
          }));
        }}
      />
      <CustomSlider
        id={`${mapSettings?.id}-heatmap-opacity-slider`}
        name="opacity"
        label="Opacity"
        value={mapSettings?.heatmapData?.opacity}
        min={0}
        max={1}
        step={0.01}
        onChange={(name, value) => {
          setMapSettings((prev) => ({
            ...prev,
            heatmapData: { ...prev.heatmapData, opacity: value },
          }));
        }}
      />
      <CustomSwitch
        name="Dark Mode"
        id={`${mapSettings?.id}-darkmode-toggle`}
        label="Night Mode"
        value={mapSettings?.darkMode}
        onChange={(name, value) => {
          if (value) {
            map.setOptions({ styles: nightModeStyles });
          } else {
            map.setOptions({ styles: [] });
          }
          setMapSettings((prev) => ({
            ...prev,
            darkMode: value,
          }));
        }}
      />
    </Stack>
  );
};

const nightModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2e2e2e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#424242" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212121" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1e1e1e" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#1b1b1b" }],
  },
];

export default HeatmapMapControl;
