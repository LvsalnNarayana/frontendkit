import React from "react";
import BasicMapPreview from "../../components/maps/basic-map/BasicMapPreview";
import BasicMapCode from "../../components/maps/basic-map/BasicMapCode";
import BasicMapDescription from "../../components/maps/basic-map/BasicMapDescription";
import PreviewLayout from "../../layouts/PreviewLayout";

const BasicMap = () => {
  return (
    <PreviewLayout
      preview={<BasicMapPreview />}
      code={<BasicMapCode />}
      description={<BasicMapDescription />}
    />
  );
};

export default BasicMap;
