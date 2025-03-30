import React, { useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Box } from "@mui/material";

const AdvancedMarkerPoint = ({
  position,
  ref,
  markerClick,
  infoWindowOpen,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <AdvancedMarker
      ref={ref}
      position={position}
      title="AdvancedMarker with custom HTML content"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        markerClick();
      }}
    >
      <Box
        component={"img"}
        src="/thinking.png"
        width={hovered || infoWindowOpen ? 40 : 30}
        sx={{ transition: "all 0.3s ease-in" }}
      ></Box>
    </AdvancedMarker>
  );
};

export default AdvancedMarkerPoint;
