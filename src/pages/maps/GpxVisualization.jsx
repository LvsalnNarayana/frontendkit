import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import GpxVisualizationPreview from "../../components/maps/gpx-visualization/GpxVisualizationPreview";

const GpxVisualization = () => {
  return <PreviewLayout preview={<GpxVisualizationPreview />} />;
};

export default GpxVisualization;
