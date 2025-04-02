import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import ColumnPinningPreview from "../../components/tables/column-pinning/ColumnPinningPreview";

const ColumnPinning = () => {
  return <PreviewLayout preview={<ColumnPinningPreview />} />;
};

export default ColumnPinning;
