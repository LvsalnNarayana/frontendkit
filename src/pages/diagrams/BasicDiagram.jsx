import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import BasicDiagramPreview from "../../components/diagrams/basic-diagram/BasicDiagramPreview";

const BasicDiagram = () => {
  return <PreviewLayout preview={<BasicDiagramPreview />} />;
};

export default BasicDiagram;
