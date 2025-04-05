import { CloseOutlined } from "@mui/icons-material";
import {
  IconButton,
  Popper,
  Paper,
  Box,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import CheckIcon from "@mui/icons-material/Check";

const ColorPicker = ({ sx, color, setColor }) => {
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);
  const colorPickerOpen = Boolean(colorPickerAnchorEl);
  const [inputColor, setInputColor] = useState(color.replace("#", ""));

  const handleColorpickerOpen = (event) => {
    setColorPickerAnchorEl(event.currentTarget);
  };

  const handleColorpickerClose = () => {
    setColorPickerAnchorEl(null);
    // Sync inputColor with the current color when closing
    setInputColor(color.replace("#", ""));
  };

  const handleColorConfirm = () => {
    const newColor = `#${inputColor}`;
    setColor(newColor);
    handleColorpickerClose();
  };

  return (
    <>
      {/* Icon Button with Current Color Preview */}
      <IconButton
        onClick={handleColorpickerOpen}
        sx={{
          backgroundColor: color,
          width: sx?.width || 24,
          height: sx?.height || 24,
          borderRadius: sx?.borderRadius || "50%",
          border: "2px solid #ccc",
          "&:hover": { opacity: 0.9, backgroundColor: color },
        }}
      />

      {/* Popper Menu with Color Picker */}
      <Popper
        open={colorPickerOpen}
        anchorEl={colorPickerAnchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "preventOverflow",
            options: { boundary: "window" },
          },
        ]}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            borderRadius: 2,
            p: 1,
            boxShadow: 3,
          }}
        >
          {/* Close Button and Input Field */}
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              size="small"
              value={inputColor}
              onChange={(e) => setInputColor(e.target.value)}
              onKeyDown={(keyEvent) => {
                if (keyEvent.key === "Enter") {
                  handleColorConfirm();
                }
              }}
              sx={{
                width: 130,
                "& .MuiInputBase-root": {
                  textAlign: "center",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input": {
                  p: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="success"
                      size="small"
                      sx={{ p: 0.2 }}
                      onClick={handleColorConfirm}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton size="small" onClick={handleColorpickerClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Stack>

          {/* Color Picker */}
          <Box>
            <HexColorPicker
              color={color}
              onChange={(newColor) => {
                setColor(newColor);
                setInputColor(newColor.replace("#", ""));
              }}
            />
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default ColorPicker;
