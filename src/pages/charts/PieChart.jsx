import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import PieChartPreview from "../../components/charts/pie-chart/PieChartPreview";

const PieChart = () => {
  return <PreviewLayout preview={<PieChartPreview />} />;
};

export default PieChart;
