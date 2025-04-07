import { Divider, Stack, Typography } from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import CustomSlider from "../../shared/inputs/CustomSlider";
import CustomSelectInput from "../../shared/inputs/CustomSelectInput";
import CustomSwitch from "../../shared/inputs/CustomSwitch";

const MapControls = ({ id, mapSettings, setMapSettings }) => {
  const map = useMap(id);
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
      minHeight={"100%"}
      gap={2}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
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
        <Typography
          variant="body1"
          sx={{ flexShrink: 0 }}
          fontSize={18}
          fontWeight={500}
        >
          Map Settings
        </Typography>
        <Divider />
      </Stack>

      <CustomSlider
        id={`${id}-slider-input`}
        name={id}
        label="Zoom"
        value={mapSettings?.zoom}
        min={mapSettings?.minZoom}
        max={mapSettings?.maxZoom}
        step={1}
        onChange={(name, value) => {
          map.setZoom(value);
          setMapSettings((prev) => ({ ...prev, zoom: value }));
        }}
        marks={false}
        showValue={true}
        error={false}
        helperText=""
        disabled={false}
      />

      <CustomSelectInput
        name={id}
        id={`${id}-select-input`}
        value={mapSettings?.gestureHandling}
        label="Gesture Handling"
        options={[
          { value: "cooperative", label: "Cooperative" },
          { value: "greedy", label: "Greedy" },
          { value: "none", label: "None" },
          { value: "auto", label: "Auto" },
        ]}
        onChange={(name, value) => {
          map.setMapTypeId(value);
          setMapSettings((prev) => ({ ...prev, gestureHandling: value }));
        }}
        error={false}
        helperText=""
        disabled={false}
        fullWidth={false}
        size="small"
      />

      <CustomSelectInput
        name={id}
        id={`${id}-default-ui-input`}
        value={mapSettings?.disableDefaultUI}
        label="Default UI"
        options={[
          { value: false, label: "Enabled" },
          { value: true, label: "Disabled" },
        ]}
        onChange={(name, value) => {
          map.setMapTypeId(value);
          setMapSettings((prev) => ({ ...prev, disableDefaultUI: value }));
        }}
        error={false}
        helperText=""
        disabled={false}
        fullWidth={false}
        size="small"
      />
      <CustomSelectInput
        name={id}
        id={`${id}-map-type-input`}
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
        error={false}
        helperText=""
        disabled={false}
        fullWidth={false}
        size="small"
      />
      <CustomSwitch
        name={id}
        id={`${id}-double-click-input`}
        label="Double Click Zoom"
        value={!mapSettings?.disableDoubleClickZoom}
        onChange={(name, value) => {
          map.setMapTypeId(value);
          setMapSettings((prev) => ({
            ...prev,
            disableDoubleClickZoom: !value,
          }));
        }}
        error={false}
        helperText=""
        disabled={false}
        fullWidth={false}
        size="small"
      />
    </Stack>
  );
};
export default MapControls;
