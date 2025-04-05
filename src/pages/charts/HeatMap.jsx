import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import HeatMapPreview from "../../components/charts/heat-map/HeatMapPreview";

const HeatMap = () => {
  return <PreviewLayout preview={<HeatMapPreview />} />;
};

export default HeatMap;
