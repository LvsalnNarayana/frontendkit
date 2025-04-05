import React, { useState, useEffect } from "react";
import ReactApexCharts from "react-apexcharts";
import {
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import ColorPicker from "../../shared/ColorPicker"; // Assuming you have this component

// Function to generate random data
function generateData(count, options) {
  const { min, max } = options;
  const data = [];

  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    data.push(value);
  }

  return data;
}

const HeatMapPreview = () => {
  const initialColorScale = [
    { from: -30, to: 5, name: "Low", color: "#00A100" },
    { from: 6, to: 20, name: "Medium", color: "#128FD9" },
    { from: 21, to: 45, name: "High", color: "#FFB200" },
    { from: 46, to: 55, name: "Extreme", color: "#FF0000" },
  ];

  const days = Array.from({ length: 20 }, (_, i) => `${i + 1}`); // Days 1-20

  const [chartState, setChartState] = useState({
    series: [
      { name: "Jan", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Feb", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Mar", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Apr", data: generateData(20, { min: -30, max: 55 }) },
      { name: "May", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Jun", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Jul", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Aug", data: generateData(20, { min: -30, max: 55 }) },
      { name: "Sep", data: generateData(20, { min: -30, max: 55 }) },
    ],
    options: {
      chart: {
        height: 350,
        type: "heatmap",
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: initialColorScale,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
      xaxis: {
        type: "category",
        categories: days, // Explicitly set days 1-20
        title: {
          text: "Day",
        },
        labels: {
          rotate: -45, // Rotate labels if needed for readability
        },
      },
      yaxis: {
        title: {
          text: "Month",
        },
      },
      tooltip: {
        x: {
          formatter: (val) => `Day ${val}`,
        },
        y: {
          formatter: (val, { seriesIndex }) =>
            `${chartState.series[seriesIndex].name}: ${val}`,
        },
      },
    },
  });

  const [chartSettings, setChartSettings] = useState({
    showDataLabels: false,
    shadeIntensity: 0.5,
    colorScale: initialColorScale,
  });

  // Sync chartState with chartSettings whenever settings change
  useEffect(() => {
    setChartState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        dataLabels: {
          enabled: chartSettings.showDataLabels,
        },
        plotOptions: {
          ...prevState.options.plotOptions,
          heatmap: {
            ...prevState.options.plotOptions.heatmap,
            shadeIntensity: chartSettings.shadeIntensity,
            colorScale: {
              ranges: chartSettings.colorScale,
            },
          },
        },
      },
    }));
  }, [chartSettings]);

  const handleToggleDataLabels = (event) => {
    setChartSettings({
      ...chartSettings,
      showDataLabels: event.target.checked,
    });
  };

  const handleShadeIntensityChange = (event, newValue) => {
    setChartSettings({ ...chartSettings, shadeIntensity: newValue / 10 }); // Convert to 0-1 range
  };

  const handleColorChange = (rangeIndex) => (newColor) => {
    const newColorScale = [...chartSettings.colorScale];
    newColorScale[rangeIndex] = {
      ...newColorScale[rangeIndex],
      color: newColor,
    };
    setChartSettings({ ...chartSettings, colorScale: newColorScale });
  };

  const controlPanel = (
    <Stack
      gap={2}
      sx={{
        width: "25%",
        padding: 2,
        bgcolor: "grey.100",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chart Controls
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={chartSettings.showDataLabels}
            onChange={handleToggleDataLabels}
          />
        }
        sx={{ "& .MuiTypography-root": { fontSize: 14 } }}
        label="Show Data Labels"
      />

      <Typography gutterBottom variant="body1" fontSize={14}>
        Shade Intensity
      </Typography>
      <Stack pr={1}>
        <Slider
          value={chartSettings.shadeIntensity * 10} // Convert back to 0-5 for slider
          onChange={handleShadeIntensityChange}
          min={0}
          max={5}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Stack>

      {chartSettings.colorScale.map((range, index) => (
        <Stack
          key={range.name}
          direction="row"
          spacing={2}
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography gutterBottom variant="body1" fontSize={14}>
            {range.name} Color
          </Typography>
          <ColorPicker
            color={range.color}
            setColor={handleColorChange(index)}
          />
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Stack
      height="100%"
      width="100%"
      direction="row"
      spacing={2}
      sx={{ padding: 2 }}
    >
      {/* Chart Area */}
      <Stack gap={4} sx={{ width: "75%", height: "100%" }}>
        <Typography variant="body1" fontSize={20}>
          HeatMap Chart Preview
        </Typography>
        <div style={{ width: "100%", height: 350 }}>
          <ReactApexCharts
            options={chartState.options}
            series={chartState.series}
            type="heatmap"
            height={350}
          />
        </div>
      </Stack>

      {/* Control Panel */}
      {controlPanel}
    </Stack>
  );
};

export default HeatMapPreview;
