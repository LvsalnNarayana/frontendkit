import React from "react";
import MainLayout from "../../layouts/MainLayout";
import BasicMarkerPreview from "../../components/maps/basic-marker/BasicMarkerPreview";
import BasicMarkerCode from "../../components/maps/basic-marker/BasicMarkerCode";
import BasicMarkerDescription from "../../components/maps/basic-marker/BasicMarkerDescription";
import PreviewLayout from "../../layouts/PreviewLayout";

const BasicMarker = () => {
  return (
    <PreviewLayout
      preview={<BasicMarkerPreview />}
      code={<BasicMarkerCode />}
      description={<BasicMarkerDescription />}
    />
  );
};

export default BasicMarker;
