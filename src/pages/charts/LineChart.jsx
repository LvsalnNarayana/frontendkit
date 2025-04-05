import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import LineChartPreview from "../../components/charts/line-chart/LineChartPreview";

const LineChart = () => {
  return <PreviewLayout preview={<LineChartPreview />} />;
};

export default LineChart;
