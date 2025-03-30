import React from "react";
import PlaceSearchInput from "./PlaceSearchInput";
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import ColorPicker from "../../../shared/ColorPicker";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import StraightIcon from "@mui/icons-material/Straight";
import { useDirectionControls } from "../hooks/DirectionControlsHook";
const getDirectionIcon = (instruction) => {
  if (instruction.includes("right") && !instruction.includes("keep")) {
    if (instruction.includes("slight"))
      return <TurnSlightRightIcon sx={{ fontSize: 40 }} />;
    if (instruction.includes("U-turn"))
      return <UTurnRightIcon sx={{ fontSize: 40 }} />;
    return <TurnRightIcon sx={{ fontSize: 40 }} />;
  }
  if (instruction.includes("left") && !instruction.includes("keep")) {
    if (instruction.includes("slight"))
      return <TurnSlightLeftIcon sx={{ fontSize: 40 }} />;
    if (instruction.includes("U-turn"))
      return <UTurnLeftIcon sx={{ fontSize: 40 }} />;
    return <TurnLeftIcon sx={{ fontSize: 40 }} />;
  }
  if (instruction.includes("straight"))
    return <StraightIcon sx={{ fontSize: 40 }} />;
  return <StraightIcon sx={{ fontSize: 40 }} />;
};
export const DirectionsControl = () => {
  const {
    mapId,
    zoom,
    setZoom,
    routes,
    draggableMarkers,
    setDraggableMarkers,
    draggableRoutes,
    setDraggableRoutes,
    startAddress,
    destinationAddress,
    map,
    distance,
    directions,
    duration,
    fetchDirections,
    setStartingPlace,
    setDestinationPlace,
    startingPoint,
    destinationPoint,
    showAlternateRoutes,
    setShowAlternateRoutes,
    setActiveRoute,
    routeIndex,
    routeColor,
    setRouteColor
  } = useDirectionControls();

  return (
    <Stack p={1} gap={3} width={"100%"}>
      <Stack width={"100%"} gap={1}>
        <Typography fontSize={16} sx={{ flexShrink: 0 }}>
          Zoom: {zoom}
        </Typography>
        <Slider
          size="small"
          min={3}
          max={15}
          value={zoom}
          onChange={(_, value) => {
            setZoom(value);
            map.setZoom(value);
          }}
          sx={{
            color: "black",
            "& .MuiSlider-thumb ": {
              padding: 0,
            },
          }}
        />
      </Stack>
      <Stack>
        <PlaceSearchInput
          label={"From"}
          value={startingPoint}
          mapId={mapId}
          onPlaceSelect={(place) => {
            setStartingPlace(place);
          }}
        />
        <PlaceSearchInput
          label={"To"}
          value={destinationPoint}
          mapId={mapId}
          onPlaceSelect={(place) => setDestinationPlace(place)}
        />
        <Button variant="contained" color="primary" onClick={fetchDirections}>
          Get Directions
        </Button>
      </Stack>
      <Stack width={"100%"} gap={1}>
        <Typography variant="body1" fontSize={18} fontWeight={500}>
          Summary
        </Typography>
        <Divider flexItem />
        <Typography variant="body1" fontSize={16}>
          {startAddress && destinationAddress && (
            <>
              {startAddress} <span style={{ fontSize: 20 }}>&#x2192;</span>{" "}
              {destinationAddress}
            </>
          )}
        </Typography>
        <Typography variant="body1" fontSize={14}>
          Distance: {distance}
        </Typography>
        <Typography variant="body1" fontSize={14}>
          Duration: {duration}
        </Typography>
      </Stack>
      <Stack width={"100%"}>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" fontSize={18} fontWeight={500}>
            Directions
          </Typography>
        </Stack>
        <Divider sx={{ my: 0.5 }} />
        <List
          sx={{
            p: 0,
            maxHeight: 100,
            overflowY: "auto",
            // "&::-webkit-scrollbar": {
            //   width: 10,
            // },
          }}
        >
          {directions?.map((direction, index) => {
            return (
              <ListItemButton
                key={index}
                selected
                sx={{
                  my: 1,
                  px: 0,
                  py: 1,
                  borderRadius: 1,
                  cursor: "auto",
                  bgcolor: "primary.main.light",
                  "&:hover": {
                    bgcolor: "primary.main.light",
                  },
                }}
                width={"100%"}
              >
                <ListItemIcon sx={{ width: 52 }}>
                  {getDirectionIcon(direction?.maneuver)}
                </ListItemIcon>

                <ListItemText
                  primary={direction?.instructions.replace(/<[^>]*>/g, " ")}
                  secondary={`Distance: ${direction.distance.text}, Duration: ${direction.duration.text}`}
                  primaryTypographyProps={{ fontSize: 18 }}
                  secondaryTypographyProps={{
                    fontSize: 14,
                    color: "text.secondary",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Stack>
      <Stack width={"100%"}>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" fontSize={18} fontWeight={500}>
            Alternate Routes
          </Typography>
          <Switch
            value={showAlternateRoutes}
            checked={showAlternateRoutes} // Ensure the Switch reflects the state
            size="small"
            onChange={(event) => {
              setShowAlternateRoutes(event.target.checked); // ✅ Correctly updates state
            }}
          />
        </Stack>
        <Divider sx={{ my: 0.5 }} />
        <List
          sx={{
            p: 0,
            maxHeight: 100,
            overflowY: "auto",
          }}
        >
          {routes?.map((route, index) => {
            return (
              <ListItem
                disabled
                key={index}
                selected={routeIndex === index}
                onClick={() => {
                  setActiveRoute(index);
                }}
                sx={{
                  px: 0,
                  py: 1,
                  borderRadius: 1,
                }}
                width={"100%"}
              >
                <ListItemText
                  variant="body1"
                  fontSize={14}
                  sx={{
                    mr: 3,
                  }}
                >
                  {route?.summary}
                </ListItemText>
                <Button
                  disabled={routeIndex === index}
                  sx={{
                    px: 1.5,
                    fontSize: 14,
                    color: "white",
                    minWidth: "70px",
                  }}
                  color={routeIndex === index ? "disabled" : "success"}
                >
                  {routeIndex === index ? "Active" : "Go"}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Stack>

      <FormControlLabel
        control={
          <Switch
            checked={draggableRoutes}
            onChange={(draggableRouteEvent) => {
              setDraggableRoutes(draggableRouteEvent?.target?.checked);
            }}
            size="small"
          />
        }
        label="Draggable Routes"
        labelPlacement="start"
        sx={{
          mx: 0,
          px: 0,
          "& .MuiTypography-root": {
            fontSize: "16px",
            marginRight: "auto",
          },
        }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={draggableMarkers}
            onChange={(draggableMarkerEvent) => {
              setDraggableMarkers(draggableMarkerEvent?.target?.checked);
            }}
            size="small"
          />
        }
        label="Draggable Markers"
        labelPlacement="start"
        sx={{
          mx: 0,
          px: 0,
          "& .MuiTypography-root": {
            fontSize: "16px",
            marginRight: "auto",
          },
        }}
      />

      <FormControlLabel
        control={
          <ColorPicker
            stateColor={routeColor}
            setColorState={(color) => {
              setRouteColor(color);
            }}
            sx={{
              width: 25,
              height: 25,
              borderRadius: 0,
            }}
          />
        }
        label="Route Color"
        labelPlacement="start"
        sx={{
          mx: 0,
          px: 0,
          display: "flex",
          alignItems: "flex-start",
          "& .MuiTypography-root": {
            fontSize: "16px",
            marginRight: "auto",
          },
        }}
      />
      <FormControlLabel
        label="Route Marker Animation"
        labelPlacement="start"
        sx={{
          mx: 0,
          px: 0,
          "& .MuiTypography-root": {
            fontSize: "16px",
            marginRight: "auto",
          },
        }}
        control={
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={1}
          >
            <IconButton sx={{ p: 0.5 }}>
              <PlayArrowIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ p: 0.5 }}>
              <PauseIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ p: 0.5 }}>
              <StopIcon fontSize="small" />
            </IconButton>
          </Stack>
        }
      />
    </Stack>
  );
};
export default DirectionsControl;
