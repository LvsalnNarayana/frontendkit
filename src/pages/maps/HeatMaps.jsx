import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import HeatMapsPreview from "../../components/maps/heatmaps/HeatMapsPreview";
import { APIProvider } from "@vis.gl/react-google-maps";

const HeatMaps = () => {
  return (
    <APIProvider       apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
    libraries={["visualization"]}>
      <PreviewLayout preview={<HeatMapsPreview />} />
    </APIProvider>
  );
};

export default HeatMaps;
