import { Divider, Stack, Typography } from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import CustomSlider from "../../shared/inputs/CustomSlider";
import CustomSelectInput from "../../shared/inputs/CustomSelectInput";
import CustomSwitch from "../../shared/inputs/CustomSwitch";
import ColorPicker from "../../shared/ColorPicker";

const gpxFiles = [
  {
    name: "South Downs Way",
    value: "South-Downs-Way.gpx",
  },
  {
    name: "South West Coastal Path",
    value: "SWCP-ALL.gpx",
  },
  {
    name: "Dales High Way",
    value: "Dales-High-Way.gpx",
  },
  {
    name: "Wainwrights Coast to Coast",
    value: "Wainwrights-Coast-to-Coast-track.gpx",
  },
];
const GpxVisualizationControl = ({ mapSettings, setMapSettings }) => {
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
          Path Settings
        </Typography>
        <Divider />
      </Stack>

      <CustomSelectInput
        name="gpx-paths"
        id={`${mapSettings?.id}-path-input`}
        value={mapSettings?.pathSettings?.pathData?.value}
        label="GPX Paths"
        options={gpxFiles?.map((file) => ({
          value: file.value,
          label: file.name,
        }))}
        onChange={(name, value) => {
          setMapSettings((prev) => ({
            ...prev,
            pathSettings: {
              ...prev.pathSettings,
              pathData: {
                ...prev.pathSettings.pathData,
                value,
                name: gpxFiles.find((file) => file.value === value)?.name,
              },
            },
          }));
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography variant="body1" fontSize={14} fontWeight={400}>
          Path Style
        </Typography>
        <ColorPicker
          color={mapSettings?.pathSettings?.strokeColor}
          setColor={(color) => {
            setMapSettings((prev) => ({
              ...prev,
              pathSettings: {
                ...prev.pathSettings,
                strokeColor: color,
              },
            }));
          }}
        />
      </Stack>
      <CustomSlider
        id={`${mapSettings?.id}-path-opacity-slider`}
        name="pathOpacity"
        label="Path Opacity"
        value={mapSettings?.pathSettings?.strokeOpacity}
        min={0}
        max={1}
        step={0.1}
        onChange={(name, value) => {
          setMapSettings((prev) => ({
            ...prev,
            pathSettings: {
              ...prev.pathSettings,
              strokeOpacity: value,
            },
          }));
        }}
      />
      <CustomSlider
        id={`${mapSettings?.id}-path-weight-slider`}
        name="pathWeight"
        label="Path Weight"
        value={mapSettings?.pathSettings?.strokeWeight}
        min={1}
        max={10}
        step={1}
        onChange={(name, value) => {
          setMapSettings((prev) => ({
            ...prev,
            pathSettings: {
              ...prev.pathSettings,
              strokeWeight: value,
            },
          }));
        }}
      />
    </Stack>
  );
};

export default GpxVisualizationControl;
