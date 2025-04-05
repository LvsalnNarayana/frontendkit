import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import CandleChartPreview from "../../components/charts/candle-chart/CandleChartPreview";

const CandleChart = () => {
  return <PreviewLayout preview={<CandleChartPreview />} />;
};

export default CandleChart;
