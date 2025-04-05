import {
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ColorPicker from "../../shared/ColorPicker";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const PieChartPreview = () => {
  const [chartSettings, setChartSettings] = useState({
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"], // Array of colors for each pie slice
    showLabels: true, // Since pie charts use labels, we'll make this controllable
  });

  const handleColorChange = (index) => (newColor) => {
    const newColors = [...chartSettings.colors];
    newColors[index] = newColor;
    setChartSettings({ ...chartSettings, colors: newColors });
  };

  const handleToggleLabels = (event) => {
    setChartSettings({ ...chartSettings, showLabels: event.target.checked });
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
            checked={chartSettings.showLabels}
            onChange={handleToggleLabels}
          />
        }
        sx={{ "& .MuiTypography-root": { fontSize: 14 } }}
        label="Show Labels"
      />

      {data.map((entry, index) => (
        <Stack
          key={entry.name}
          direction="row"
          spacing={2}
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography gutterBottom variant="body1" fontSize={14}>
            {entry.name} Color
          </Typography>
          <ColorPicker
            color={chartSettings.colors[index]}
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
          Pie Chart Preview
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          {" "}
          {/* Increased height for larger pie */}
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label={chartSettings.showLabels ? renderCustomizedLabel : false} // Toggle labels
              outerRadius={150} // Increased size (from 80 to 150)
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartSettings.colors[index % chartSettings.colors.length]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Stack>

      {/* Control Panel */}
      {controlPanel}
    </Stack>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  // index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default PieChartPreview;
