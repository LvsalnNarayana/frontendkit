import { Stack, Switch, FormControlLabel, Slider, Typography } from "@mui/material";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ColorPicker from "../../shared/ColorPicker";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AreaChartPreview = () => {
  const [chartSettings, setChartSettings] = useState({
    showGrid: true,
    gridDasharray: 3,
    uvColor: "#8884d8", // Color for 'uv' area
    pvColor: "#82ca9d", // Color for 'pv' area (added since it's in data but not used yet)
    amtColor: "#ffc658", // Color for 'amt' area
  });

  const handleToggleGrid = (event) => {
    setChartSettings({ ...chartSettings, showGrid: event.target.checked });
  };

  const handleDashChange = (event, newValue) => {
    setChartSettings({ ...chartSettings, gridDasharray: newValue });
  };

  const handleColorChange = (colorType) => (newColor) => {
    setChartSettings({ ...chartSettings, [colorType]: newColor });
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
        control={<Switch checked={chartSettings.showGrid} onChange={handleToggleGrid} />}
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

      <Stack direction="row" spacing={2} justifyContent="space-between" width="100%" alignItems="center">
        <Typography gutterBottom variant="body1" fontSize={14}>
          UV Area Color
        </Typography>
        <ColorPicker color={chartSettings.uvColor} setColor={handleColorChange("uvColor")} />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="space-between" width="100%" alignItems="center">
        <Typography gutterBottom variant="body1" fontSize={14}>
          PV Area Color
        </Typography>
        <ColorPicker color={chartSettings.pvColor} setColor={handleColorChange("pvColor")} />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="space-between" width="100%" alignItems="center">
        <Typography gutterBottom variant="body1" fontSize={14}>
          AMT Area Color
        </Typography>
        <ColorPicker color={chartSettings.amtColor} setColor={handleColorChange("amtColor")} />
      </Stack>
    </Stack>
  );

  return (
    <Stack height="100%" width="100%" direction="row" spacing={2} sx={{ padding: 2 }}>
      {/* Chart Area */}
      <Stack gap={4} sx={{ width: "75%", height: "100%" }}>
        <Typography variant="body1" fontSize={20}>
          Area Chart Preview
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {chartSettings.showGrid && (
              <CartesianGrid strokeDasharray={`${chartSettings.gridDasharray} ${chartSettings.gridDasharray}`} />
            )}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke={chartSettings.uvColor} fill={chartSettings.uvColor} />
            <Area type="monotone" dataKey="pv" stroke={chartSettings.pvColor} fill={chartSettings.pvColor} />
            <Area type="monotone" dataKey="amt" stroke={chartSettings.amtColor} fill={chartSettings.amtColor} />
          </AreaChart>
        </ResponsiveContainer>
      </Stack>

      {/* Control Panel */}
      {controlPanel}
    </Stack>
  );
};

export default AreaChartPreview;