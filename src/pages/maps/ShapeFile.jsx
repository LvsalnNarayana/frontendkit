import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import ShapeFilePreview from "../../components/maps/shape-files/ShapeFilePreview";

const ShapeFile = () => {
  return <PreviewLayout preview={<ShapeFilePreview />} />;
};

export default ShapeFile;
