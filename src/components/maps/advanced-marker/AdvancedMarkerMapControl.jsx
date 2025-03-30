import {
  Slider,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

const AdvancedMarkerMapControl = ({
  id,
  setMarkerPosition,
  markerPosition,
}) => {
  const theme = useTheme();
  const map = useMap(id);

  const [zoom, setZoom] = useState(3);
  const [gestureHandling, setGestureHandling] = useState("greedy");
  const [disableUI, setDisableUI] = useState(true);

  useEffect(() => {
    if (!map || !markerPosition) return;

    map.setOptions({
      gestureHandling,
      disableDefaultUI: disableUI,
    });

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(
      new window.google.maps.LatLng(markerPosition.lat, markerPosition.lng)
    );

    map.fitBounds(bounds);
    map.setZoom(zoom);
  }, [map, zoom, gestureHandling, disableUI, markerPosition]);

  const refreshCoordinates = () => {
    const lat = Math.random() * (49.384358 - 24.396308) + 24.396308;
    const lng = Math.random() * (-66.93457 - -125.0) + -125.0;

    const newCoordinates = { lat, lng };
    setMarkerPosition(newCoordinates);

    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(newCoordinates.lat, newCoordinates.lng)
      );

      map.fitBounds(bounds);
    }
  };
  return (
    <Stack
      px={1}
      width="100%"
      spacing={2}
      flexShrink={0}
      flexGrow={1}
      height="100%"
      overflow="auto"
      minHeight={"100%"}
    >
      <Typography
        variant="body1"
        sx={{ flexShrink: 0 }}
        fontSize={18}
        fontWeight={500}
      >
        Map Settings
      </Typography>
      <Button variant="contained" onClick={refreshCoordinates}>
        Refresh Marker
      </Button>
      {/* Zoom Control */}
      <Typography fontSize={14} sx={{ flexShrink: 0 }}>
        Zoom: {zoom}
      </Typography>
      <Stack width={"100%"} px={1}>
        <Slider
          min={3}
          max={15}
          value={zoom}
          onChange={(_, value) => setZoom(value)}
          sx={{
            color: "black",
            "& .MuiSlider-thumb ": {
              padding: 0,
            },
          }}
        />
      </Stack>

      {/* Gesture Handling Control */}
      <InputLabel sx={{ fontSize: 14, flexShrink: 0 }}>
        Gesture Handling
      </InputLabel>
      <FormControl size="small" fullWidth>
        <Select
          value={gestureHandling}
          onChange={(e) => setGestureHandling(e.target.value)}
          sx={{
            fontSize: 14,
            outline: "none",
            color: theme.palette.primary.main,
            border: "none",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: `1.5px solid ${theme.palette.primary.main}`,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${theme.palette.primary.main}`,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `1.5px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          <MenuItem value="cooperative">Cooperative</MenuItem>
          <MenuItem value="greedy">Greedy</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>

      {/* UI Control Toggle */}
      <InputLabel sx={{ fontSize: 14, flexShrink: 0 }}>UI Controls</InputLabel>
      <FormControl size="small" fullWidth>
        <Select
          value={disableUI ? "Disabled" : "Enabled"}
          onChange={(e) => setDisableUI(e.target.value === "Disabled")}
          sx={{ fontSize: 14 }}
        >
          <MenuItem value="Enabled">Enabled</MenuItem>
          <MenuItem value="Disabled">Disabled</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default AdvancedMarkerMapControl;
