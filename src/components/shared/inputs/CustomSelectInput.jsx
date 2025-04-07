import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
} from "@mui/material";
import { paperClasses } from "@mui/material/Paper";

const CustomSelectInput = ({
  name,
  value,
  label,
  options = [],
  onChange,
  error = false,
  helperText = "",
  disabled = false,
  fullWidth = false,
  size = "small",
}) => {
  const handleChange = (event) => {
    onChange?.(event.target.name, event.target.value);
  };

  return (
    <Stack
      width={"100%"}
      sx={{
        my: 1,
      }}
    >
      <FormControl
        size={size}
        error={error}
        fullWidth={fullWidth}
        disabled={disabled}
      >
        <InputLabel
          id={`${name}-select-label`}
          sx={{
            px: 1,
            backgroundColor: "white",
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          name={name}
          value={value}
          label={label}
          onChange={handleChange}
          sx={{
            fontSize: 14,
            "& .MuiSelect-select": {
              fontSize: 14,
            },
          }}
          MenuProps={{
            disablePortal: true,
            PaperProps: {
              sx: {
                [`&.${paperClasses.root}`]: {
                  mt: 0.5,
                  borderRadius: 1,
                  marginTop: "2px",
                  boxShadow: "none",
                },
              },
            },
          }}
        >
          {options.map(({ value, label }) => (
            <MenuItem
              key={value}
              value={value}
              sx={{ minHeight: "auto", fontSize: 14 }}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default CustomSelectInput;
