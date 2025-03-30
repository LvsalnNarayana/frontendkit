import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import PdfCreatorPreview from "../../components/pdf/PdfCreatorPreview";

const PdfCreator = () => {
  return <PreviewLayout preview={<PdfCreatorPreview />} />;
};

export default PdfCreator;
