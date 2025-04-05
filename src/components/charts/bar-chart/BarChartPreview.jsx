import {
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

const BarChartPreview = () => {
  const [chartSettings, setChartSettings] = useState({
    showGrid: true,
    gridDasharray: 3,
    pvColor: "#8884d8",
    uvColor: "#82ca9d",
    amtColor: "#ffc658", // Added for the 'amt' bar
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

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Typography gutterBottom variant="body1" fontSize={14}>
          PV Bar Color
        </Typography>
        <ColorPicker
          color={chartSettings.pvColor}
          setColor={handleColorChange("pvColor")}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Typography gutterBottom variant="body1" fontSize={14}>
          UV Bar Color
        </Typography>
        <ColorPicker
          color={chartSettings.uvColor}
          setColor={handleColorChange("uvColor")}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Typography gutterBottom variant="body1" fontSize={14}>
          AMT Bar Color
        </Typography>
        <ColorPicker
          color={chartSettings.amtColor}
          setColor={handleColorChange("amtColor")}
        />
      </Stack>
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
          Bar Chart Preview
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {chartSettings.showGrid && (
              <CartesianGrid
                strokeDasharray={`${chartSettings.gridDasharray} ${chartSettings.gridDasharray}`}
              />
            )}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill={chartSettings.pvColor} />
            <Bar dataKey="amt" stackId="a" fill={chartSettings.amtColor} />
            <Bar dataKey="uv" fill={chartSettings.uvColor} />
          </BarChart>
        </ResponsiveContainer>
      </Stack>

      {/* Control Panel */}
      {controlPanel}
    </Stack>
  );
};

export default BarChartPreview;
