import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import EditableDataPreview from "../../components/tables/editable-data/EditableDataPreview";

const EditableData = () => {
  return <PreviewLayout preview={<EditableDataPreview />} />;
};

export default EditableData;
