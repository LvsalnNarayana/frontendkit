import {
  Slider,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Switch,
} from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

const HeatmapMapControl = ({ id, radius, opacity, setRadius, setOpacity }) => {
  const map = useMap(id);

  const [zoom, setZoom] = useState(3);
  const [gestureHandling, setGestureHandling] = useState("greedy");
  const [disableUI, setDisableUI] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (!map) return;

    map.setZoom(zoom);
    map.setOptions({
      gestureHandling,
      disableDefaultUI: disableUI,
      styles: darkMode ? nightModeStyles : undefined,
    });
  }, [map, zoom, gestureHandling, disableUI, darkMode]);

  return (
    <Stack
      p={2}
      spacing={2}
      width="100%"
      height="100%"
      sx={{ overflowX: "hidden" }}
    >
      <Typography variant="h6" flexShrink={0} fontWeight={600}>
        Map Settings
      </Typography>

      {/* Zoom Control */}
      <Typography flexShrink={0}>Zoom: {zoom}</Typography>
      <Slider
        size="small"
        min={3}
        max={15}
        value={zoom}
        onChange={(_, value) => setZoom(value)}
      />

      {/* Gesture Handling */}
      <InputLabel sx={{ flexShrink: 0 }}>Gesture Handling</InputLabel>
      <FormControl fullWidth>
        <Select
          size="small"
          value={gestureHandling}
          onChange={(e) => setGestureHandling(e.target.value)}
        >
          <MenuItem value="cooperative">Cooperative</MenuItem>
          <MenuItem value="greedy">Greedy</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>

      {/* UI Controls Toggle */}
      <InputLabel sx={{ flexShrink: 0 }}>UI Controls</InputLabel>
      <FormControl fullWidth>
        <Select
          size="small"
          value={disableUI ? "Disabled" : "Enabled"}
          onChange={(e) => setDisableUI(e.target.value === "Disabled")}
        >
          <MenuItem value="Enabled">Enabled</MenuItem>
          <MenuItem value="Disabled">Disabled</MenuItem>
        </Select>
      </FormControl>

      {/* UI Mode Toggle */}
      <InputLabel sx={{ flexShrink: 0 }}>Dark Mode</InputLabel>
      <Switch
        size="small"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />

      {/* Heatmap Radius */}
      <Typography sx={{ flexShrink: 0 }}>Heatmap Radius: {radius}</Typography>
      <Slider
        size="small"
        min={5}
        max={50}
        value={radius}
        onChange={(_, value) => setRadius(value)}
      />

      {/* Heatmap Opacity */}
      <Typography sx={{ flexShrink: 0 }}>Heatmap Opacity: {opacity}</Typography>
      <Slider
        size="small"
        min={0.1}
        max={1}
        step={0.1}
        value={opacity}
        onChange={(_, value) => setOpacity(value)}
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
