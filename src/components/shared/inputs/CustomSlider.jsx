import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

const CustomSlider = ({
  name,
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  marks = false,
  showValue = true,
  error = false,
  helperText = "",
  disabled = false,
  size = "small",
}) => {
  const handleChange = (_, newValue) => {
    if (typeof newValue === "number") {
      onChange?.(name, newValue);
    }
  };

  return (
    <Stack spacing={1.5} width="100%">
      <FormControl fullWidth error={error} disabled={disabled}>
        {label && (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1" fontWeight={400} fontSize={14} mb={1}>
              {label}
            </Typography>
            <Typography variant="body1" fontWeight={400} fontSize={14} mb={1}>
              {value}
            </Typography>
          </Stack>
        )}

        <Box>
          <Slider
            name={name}
            value={value}
            min={min}
            max={max}
            step={step}
            marks={marks}
            onChange={handleChange}
            size={size}
            valueLabelDisplay={showValue ? "auto" : "off"}
            aria-labelledby={`${name}-slider`}
          />
        </Box>

        {helperText && (
          <FormHelperText
            sx={{
              margin: 0,
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default CustomSlider;
