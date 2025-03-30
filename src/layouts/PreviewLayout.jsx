import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab, { tabClasses } from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Stack, useTheme } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <Stack
      p={1}
      role="tabpanel"
      hidden={value !== index}
      id={`preview-tabpanel-${index}`}
      aria-labelledby={`preview-tab-${index}`}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: value === index ? "block" : "none",
      }}
      flexGrow={1}
    >
      {children}
    </Stack>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `preview-tab-${index}`,
  "aria-controls": `preview-tabpanel-${index}`,
});

const PreviewLayout = ({ preview, description, code }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{ width: "100%", height: "100%" }} overflow={"hidden"}>
      {/* Tabs Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="preview tabs"
          sx={{
            backgroundColor: `${theme.palette.secondary.main}50`,
          }}
        >
          <Tab
            icon={<PlayArrowIcon fontSize="small" />}
            label="Preview"
            {...a11yProps(0)}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              minHeight: "48px",
              color: theme.palette.primary.main,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
              [`&.${tabClasses.root} .${tabClasses.icon}`]: {
                marginBottom: "0px",
                marginRight: "5px",
              },
            }}
          />
          <Tab
            icon={<TextSnippetOutlinedIcon fontSize="small" />}
            label="Description"
            {...a11yProps(1)}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              minHeight: "48px",
              color: theme.palette.primary.main,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
              [`&.${tabClasses.root} .${tabClasses.icon}`]: {
                marginBottom: "0px",
                marginRight: "5px",
              },
            }}
          />
          <Tab
            icon={<CodeOutlinedIcon fontSize="small" />}
            label="Code"
            {...a11yProps(2)}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              minHeight: "48px",
              color: theme.palette.primary.main,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
              [`&.${tabClasses.root} .${tabClasses.icon}`]: {
                marginBottom: "0px",
                marginRight: "5px",
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <CustomTabPanel value={value} index={0}>
        {preview}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {description}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {code}
      </CustomTabPanel>
    </Stack>
  );
};

export default PreviewLayout;
