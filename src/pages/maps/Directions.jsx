import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import DirectionsPreview from "../../components/maps/directions/DirectionsPreview";
import { DirectionsContextProvider } from "../../components/maps/directions/DirectionsContext";
import { APIProvider } from "@vis.gl/react-google-maps";

const Directions = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <DirectionsContextProvider mapId={"directions-map"}>
        <PreviewLayout preview={<DirectionsPreview />} />
      </DirectionsContextProvider>
    </APIProvider>
  );
};

export default Directions;
