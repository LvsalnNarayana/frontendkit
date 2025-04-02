import { Stack } from "@mui/material";
import React from "react";
import CustomSelectInput from "../shared/inputs/CustomSelectInput";
import CustomSlider from "../shared/inputs/CustomSlider";
import CustomSwitch from "../shared/inputs/CustomSwitch";
import CustomTextInput from "../shared/inputs/CustomTextInput";

const GanttChartPreview = () => {
  return (
    <Stack height={"100%"} gap={4}>
      <CustomSelectInput
        name="age"
        value={"10"}
        label="Select Age"
        options={[
          { value: "10", label: "Option 1" },
          { value: "20", label: "Option 2" },
          { value: "30", label: "Option 3" },
        ]}
        onChange={(name, value) => {
          console.log(name, value);
        }}
        error={true}
        helperText={"Helper Text"}
      />

      <CustomSlider
        name="volume"
        label="Volume"
        value={30}
        min={0}
        max={100}
        step={5}
        onChange={(name, val) => {
          console.log(name, val);
        }}
        error={true}
        helperText={"volumeError"}
      />
      <CustomSwitch
        name="notifications"
        label="Enable Notifications"
        value={true}
        onChange={(name, value) => {
          console.log(name, value);
        }}
        helperText="Toggle this to receive alerts."
        error={false}
      />
      <CustomTextInput
        name="email"
        value={"test@gmail.com"}
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        onChange={(name, value) => {
          console.log(name, value);
        }}
        helperText="We’ll never share your email."
        error={true}
        fullWidth
      />
    </Stack>
  );
};

export default GanttChartPreview;
