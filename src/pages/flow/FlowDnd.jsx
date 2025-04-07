import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import FlowDnDPreview from "../../components/flow/flow-dnd/FlowDnDPreview";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "../../components/flow/flow-dnd/CustomDnDFlowContext";

const FlowDnd = () => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <PreviewLayout preview={<FlowDnDPreview />} />
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default FlowDnd;
