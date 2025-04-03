import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import BasicCanvasPreview from "../../components/canvas/basic-canvas/BasicCanvasPreview";

const BasicCanvas = () => {
  return <PreviewLayout preview={<BasicCanvasPreview />} />;
};

export default BasicCanvas;
