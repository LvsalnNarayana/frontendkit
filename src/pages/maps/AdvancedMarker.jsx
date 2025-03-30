import React from "react";
import MainLayout from "../../layouts/MainLayout";
import AdvancedMarkerPreview from "../../components/maps/advanced-marker/AdvancedMarkerPreview";
import AdvancedMarkerDescription from "../../components/maps/advanced-marker/AdvancedMarkerDescription";
import AdvancedMarkerCode from "../../components/maps/advanced-marker/AdvancedMarkerCode";
import PreviewLayout from "../../layouts/PreviewLayout";

const AdvancedMarker = () => {
  return (
    <PreviewLayout
      preview={<AdvancedMarkerPreview />}
      description={<AdvancedMarkerDescription />}
      code={<AdvancedMarkerCode />}
    />
  );
};

export default AdvancedMarker;
