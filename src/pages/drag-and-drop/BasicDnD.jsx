import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import BasicDnDPreview from "../../components/drag-and-drop/basic-dnd/BasicDnDPreview";

const BasicDnD = () => {
  return <PreviewLayout preview={<BasicDnDPreview />} />;
};

export default BasicDnD;
