import {
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import ColorPicker from "../../shared/ColorPicker";

const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const ScatterChartPreview = () => {
  const [chartSettings, setChartSettings] = useState({
    showGrid: true,
    gridDasharray: 3,
    pointColors: [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#FF0000",
      "#FF69B4",
    ], // Colors for each point
  });

  const handleToggleGrid = (event) => {
    setChartSettings({ ...chartSettings, showGrid: event.target.checked });
  };

  const handleDashChange = (event, newValue) => {
    setChartSettings({ ...chartSettings, gridDasharray: newValue });
  };

  const handleColorChange = (index) => (newColor) => {
    const newColors = [...chartSettings.pointColors];
    newColors[index] = newColor;
    setChartSettings({ ...chartSettings, pointColors: newColors });
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
            checked={chartSettings.showGrid}
            onChange={handleToggleGrid}
          />
        }
        sx={{
          "& .MuiTypography-root": {
            fontSize: 14,
          },
        }}
        label="Show Grid"
      />

      <Typography gutterBottom variant="body1" fontSize={14}>
        Grid Dash Array
      </Typography>
      <Stack pr={1}>
        <Slider
          value={chartSettings.gridDasharray}
          onChange={handleDashChange}
          min={1}
          max={10}
          step={1}
          valueLabelDisplay="auto"
        />
      </Stack>

      {data.map((point, index) => (
        <Stack
          key={index}
          direction="row"
          spacing={2}
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography gutterBottom variant="body1" fontSize={14}>
            Point {index + 1} Color
          </Typography>
          <ColorPicker
            color={chartSettings.pointColors[index]}
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
          Scatter Chart Preview
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            {chartSettings.showGrid && (
              <CartesianGrid
                strokeDasharray={`${chartSettings.gridDasharray} ${chartSettings.gridDasharray}`}
              />
            )}
            <XAxis type="number" dataKey="x" name="X Axis" />
            <YAxis type="number" dataKey="y" name="Y Axis" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data Points" data={data}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartSettings.pointColors[
                      index % chartSettings.pointColors.length
                    ]
                  }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Stack>

      {/* Control Panel */}
      {controlPanel}
    </Stack>
  );
};

export default ScatterChartPreview;
