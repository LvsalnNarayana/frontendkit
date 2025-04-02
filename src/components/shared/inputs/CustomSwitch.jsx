import React from "react";
import {
  FormControl,
  FormHelperText,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

const CustomSwitch = ({
  name,
  label,
  value = false,
  onChange,
  error = false,
  helperText = "",
  disabled = false,
  size = "small",
}) => {
  const handleChange = (event) => {
    onChange?.(name, event.target.checked);
  };

  return (
    <Stack spacing={1.5} width="100%">
      <FormControl fullWidth error={error} disabled={disabled}>
        {label && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" fontWeight={400} fontSize={14} mb={1}>
              {label}
            </Typography>
            <Switch
              name={name}
              checked={value}
              onChange={handleChange}
              size={size}
            />
          </Stack>
        )}

        {/* {helperText && (
          <FormHelperText
            sx={{
              margin: 0,
            }}
          >
            {helperText}
          </FormHelperText>
        )} */}
      </FormControl>
    </Stack>
  );
};

export default CustomSwitch;
