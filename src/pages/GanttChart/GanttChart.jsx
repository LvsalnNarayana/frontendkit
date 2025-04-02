import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import GanttChartPreview from "../../components/gantt-chart/GanttChartPreview";

const GanttChart = () => {
  return <PreviewLayout preview={<GanttChartPreview />} />;
};

export default GanttChart;
