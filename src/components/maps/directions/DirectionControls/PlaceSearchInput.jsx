import React, { useEffect, useState, useCallback, useRef } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Stack,
  TextField,
} from "@mui/material";

export const PlaceSearchInput = ({ mapId, onPlaceSelect, label }) => {
  const map = useMap(mapId);
  const places = useMapsLibrary("places");
  const [sessionToken, setSessionToken] = useState();
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  const [predictionResults, setPredictionResults] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const resultAnchorRef = useRef(null);
  useEffect(() => {
    if (!places || !map) return;
    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }
      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event) => {
      const value = event.target?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <Stack py={1} width={"100%"}>
      <TextField
        label={label}
        size="small"
        value={inputValue}
        onChange={(event) => onInputChange(event)}
        placeholder="Search for a place"
        ref={resultAnchorRef}
      />
      <Popper
        disablePortal
        anchorEl={resultAnchorRef.current}
        open={predictionResults.length > 0}
        placement="bottom"
        sx={{
          width: resultAnchorRef.current?.clientWidth || "auto",
          backgroundColor: "background.paper",
          zIndex: 1000,
        }}
      >
        <MenuList>
          {predictionResults.map(({ place_id, description }) => (
            <MenuItem
              sx={{
                py: 0,
                minHeight: 30,
                fontSize: 14,
                "&:hover": { backgroundColor: "primary.main.light" },
              }}
              key={place_id}
              onClick={() => handleSuggestionClick(place_id)}
            >
              {description}
            </MenuItem>
          ))}
        </MenuList>
      </Popper>
    </Stack>
  );
};

export default PlaceSearchInput;
