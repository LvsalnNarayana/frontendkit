import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CustomSwitch from "../../shared/inputs/CustomSwitch";
import { useDnD } from "./CustomDnDFlowContext";

const FlowDnDControl = ({ flowSettings, setFlowSettings }) => {

  const [_, setType] = useDnD();
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    console.log(event);
    
    event.dataTransfer.effectAllowed = "move";
  };
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
      <Button onDragStart={(event) => onDragStart(event, "input")} draggable>
        Input Node
      </Button>
    </Stack>
  );
};

export default FlowDnDControl;
