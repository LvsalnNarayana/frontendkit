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
import React, { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import CheckIcon from "@mui/icons-material/Check";

const isValidHex = (hex) => /^#[0-9A-Fa-f]{6}$/.test(hex);

const ColorPicker = ({ sx = {}, color = "#000000", setColor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputColor, setInputColor] = useState(color.replace("#", ""));
  const popperRef = useRef(null);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInputColor(color.replace("#", ""));
  };

  const handleConfirm = () => {
    const hex = `#${inputColor}`;
    if (isValidHex(hex)) {
      setColor(hex);
      handleClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsidePopper =
        popperRef.current &&
        !popperRef.current.contains(event.target) &&
        anchorEl instanceof Element &&
        !anchorEl.contains(event.target);

      if (clickedOutsidePopper) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, anchorEl]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          backgroundColor: color,
          width: sx.width || 24,
          height: sx.height || 24,
          borderRadius: sx.borderRadius || "50%",
          border: "2px solid #ccc",
          "&:hover": { opacity: 0.9, backgroundColor: color },
        }}
      />

      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "preventOverflow",
            options: { boundary: "window" },
          },
        ]}
      >
        <Paper
          ref={popperRef}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConfirm();
                }
              }}
              sx={{
                width: 130,
                "& .MuiInputBase-root": {
                  textAlign: "center",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input": { p: 0 },
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
                      onClick={handleConfirm}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton size="small" onClick={handleClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Stack>

          <Box>
            <HexColorPicker
              color={color}
              onChange={(newColor) => {
                if (isValidHex(newColor)) {
                  setColor(newColor);
                  setInputColor(newColor.replace("#", ""));
                }
              }}
            />
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default ColorPicker;
