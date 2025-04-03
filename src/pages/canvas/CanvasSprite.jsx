import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import CanvasSpritePreview from "../../components/canvas/canvas-sprite/CanvasSpritePreview";

const CanvasSprite = () => {
  return <PreviewLayout preview={<CanvasSpritePreview />} />;
};

export default CanvasSprite;
