import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CustomSwitch from "../../shared/inputs/CustomSwitch";

const BasicFlowControl = ({ flowSettings, setFlowSettings }) => {
  return (
    <Stack
      px={2}
      width="100%"
      spacing={1}
      flexShrink={0}
      flexGrow={1}
      height="100%"
      minHeight="100%"
      gap={2}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0,0,0,.2)",
        },
      }}
    >
      <Stack>
        <Typography variant="body1" fontSize={18} fontWeight={500}>
          Flow Settings
        </Typography>
        <Divider />
      </Stack>

      <CustomSwitch
        name="animatedEdges"
        label="Animated Edges"
        value={flowSettings.animatedEdges}
        onChange={(name, value) =>
          setFlowSettings((prev) => ({ ...prev, animatedEdges: value }))
        }
      />
      <CustomSwitch
        name="nodesDraggable"
        label="Nodes Draggable"
        value={flowSettings.nodesDraggable}
        onChange={(name, value) =>
          setFlowSettings((prev) => ({ ...prev, nodesDraggable: value }))
        }
      />

      <CustomSwitch
        name="nodesConnectable"
        label="Nodes Connectable"
        value={flowSettings.nodesConnectable}
        onChange={(name, value) =>
          setFlowSettings((prev) => ({ ...prev, nodesConnectable: value }))
        }
      />
      <CustomSwitch
        name="showControls"
        label="Show Controls"
        value={flowSettings.controls}
        onChange={(name, value) =>
          setFlowSettings((prev) => ({ ...prev, controls: value }))
        }
      />
      <CustomSwitch
        name="showMiniMap"
        label="Show Mini Map"
        value={flowSettings?.miniMap}
        onChange={(name, value) =>
          setFlowSettings((prev) => ({ ...prev, miniMap: value }))
        }
      />
      <CustomSwitch
        name="showBackground"
        label="Show Background"
        value={flowSettings?.background}
        onChange={(name, value) =>
          setFlowSettings((prev) => ({ ...prev, background: value }))
        }
      />
    </Stack>
  );
};

export default BasicFlowControl;
