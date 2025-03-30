const generateThemeOptions = (appTheme = {}) => {
  const mode = appTheme.mode || "light";

  const colors = {
    primary: "#0047AB",
    secondary: "#B9D9EB",
    tertiary: "#BFDBF7",
    quaternary: "#E1E5F2",
    success: "#4CAF50",
    warning: "#FFC107",
    info: "#2196F3",
    error: "#D32F2F",
    disabled: "#BDBDBD",
    divider: "#E0E0E0",
    background: mode === "light" ? "#ffffff" : "#121212",
  };

  const darken = (color, amount = 0.1) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(255 * amount);
    const r = Math.max((num >> 16) - amt, 0);
    const g = Math.max(((num >> 8) & 0x00ff) - amt, 0);
    const b = Math.max((num & 0x0000ff) - amt, 0);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  return {
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
    typography: {
      body1: {
        fontWeight: 400,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
      body2: {
        fontWeight: 400,
        fontSize: "12px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    },
    palette: {
      mode,
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      tertiary: { main: colors.tertiary },
      quaternary: { main: colors.quaternary },
      disabled: { main: colors.disabled },
      error: { main: colors.error },
      warning: { main: colors.warning },
      success: { main: colors.success },
      info: { main: colors.info },
      background: {
        default: colors.background,
        paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
        secondary: mode === "light" ? "#4f4f4f" : "#bdbdbd",
      },
      divider: colors.divider,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#cccccc", // Placeholder color
              border: `3px solid #e0e0e0`, // Placeholder border
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#b3b3b3", // Slightly darker on hover
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#e0e0e0",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordBreak: "break-word",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          size: "small",
          variant: "contained",
          disableElevation: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            fontWeight: 500,
            fontSize: "14px",
            "&:hover": {
              backgroundColor: darken(colors.primary, 0.05),
            },
            "&.MuiButton-containedSecondary:hover": {
              backgroundColor: darken(colors.secondary, 0.05),
            },
            "&.MuiButton-containedSuccess:hover": {
              backgroundColor: darken(colors.success, 0.05),
            },
            "&.MuiButton-containedError:hover": {
              backgroundColor: darken(colors.error, 0.05),
            },
          },
        },
      },

      MuiIconButton: {
        defaultProps: {
          disableFocusRipple: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: darken(colors.quaternary, 0.05),
            },
          },
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            width: "auto",
            marginRight: "7px",
            minWidth: "auto !important",
          },
        },
      },

      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: darken(colors.tertiary, 0.05),
            },
          },
        },
      },
    },
  };
};

export default generateThemeOptions;
