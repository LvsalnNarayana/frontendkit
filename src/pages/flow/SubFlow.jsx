import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import SubFlowPreview from "../../components/flow/sub-flow/SubFlowPreview";
import { ReactFlowProvider } from "@xyflow/react";

const SubFlow = () => {
  return (
    <ReactFlowProvider>
      <PreviewLayout preview={<SubFlowPreview />} />
    </ReactFlowProvider>
  );
};

export default SubFlow;
