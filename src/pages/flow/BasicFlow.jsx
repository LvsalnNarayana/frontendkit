import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import BasicFlowPreview from "../../components/flow/basic-flow/BasicFlowPreview";
import { ReactFlowProvider } from "@xyflow/react";

const BasicFlow = () => {
  return (
    <ReactFlowProvider>
      <PreviewLayout preview={<BasicFlowPreview />} />
    </ReactFlowProvider>
  );
};

export default BasicFlow;
