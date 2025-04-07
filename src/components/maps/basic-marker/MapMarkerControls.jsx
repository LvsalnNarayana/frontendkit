import { Button, Divider, Stack, Typography } from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import CustomSlider from "../../shared/inputs/CustomSlider";
import CustomSelectInput from "../../shared/inputs/CustomSelectInput";
import CustomSwitch from "../../shared/inputs/CustomSwitch";

const MapMarkerControls = ({ mapSettings, setMapSettings }) => {
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

  useEffect(() => {
    if (!map || !mapSettings?.markerPosition) return;
    const center = new window.google.maps.LatLng(
      mapSettings.markerPosition.lat,
      mapSettings.markerPosition.lng
    );
    map.setZoom(mapSettings.zoom || 10);
    map.setCenter(center);
  }, [map, mapSettings.markerPosition]);

  if (!map) return null;

  const refreshCoordinates = () => {
    // USA Bounding Box
    const minLat = 24.396308;
    const maxLat = 49.384358;
    const minLng = -125.0;
    const maxLng = -66.93457;

    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;
    const newCoordinates = { lat, lng };

    setMapSettings((prev) => ({ ...prev, markerPosition: newCoordinates }));

    if (map) {
      const center = new window.google.maps.LatLng(lat, lng);
      map.setCenter(center);
      map.setZoom(mapSettings.zoom || 10);
    }
  };

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
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
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

      <Button onClick={refreshCoordinates}>Refresh Coordinates</Button>

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
    </Stack>
  );
};

export default MapMarkerControls;
