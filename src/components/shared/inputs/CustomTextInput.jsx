import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  outlinedInputClasses,
  Stack,
} from "@mui/material";

const CustomTextInput = ({
  name,
  value,
  label,
  placeholder = "",
  onChange,
  type = "text",
  error = false,
  helperText = "",
  disabled = false,
  fullWidth = false,
  size = "small",
  inputPadding = "10.5px 14px", // ⬅️ New prop
  rootPadding = 0,              // ⬅️ New prop
}) => {
  const handleChange = (event) => {
    onChange?.(event.target.name, event.target.value);
  };

  return (
    <Stack spacing={2} width={fullWidth ? "100%" : "30%"}>
      <FormControl
        variant="outlined"
        size={size}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {label && (
          <InputLabel
            htmlFor={`${name}-input`}
            sx={{
              px: 1,
              backgroundColor: "white",
            }}
          >
            {label}
          </InputLabel>
        )}
        <OutlinedInput
          id={`${name}-input`}
          name={name}
          value={value}
          placeholder={placeholder}
          type={type}
          label={label}
          onChange={handleChange}
          sx={{
            [`&.${outlinedInputClasses.root}`]: {
              p: rootPadding,
            },
            fontSize: 14,
            "& input": {
              fontSize: 14,
              padding: inputPadding,
            },
          }}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default CustomTextInput;
