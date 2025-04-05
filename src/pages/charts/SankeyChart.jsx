import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import SankeyChartPreview from "../../components/charts/sankey-chart/SankeyChartPreview";

const SankeyChart = () => {
  return <PreviewLayout preview={<SankeyChartPreview />} />;
};

export default SankeyChart;
