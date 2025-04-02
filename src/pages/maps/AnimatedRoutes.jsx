import React from "react";
import PreviewLayout from "../../layouts/PreviewLayout";
import AnimatedRoutesPreview from "../../components/maps/animated-routes/AnimatedRoutesPreview";

const AnimatedRoutes = () => {
  return <PreviewLayout preview={<AnimatedRoutesPreview />} />;
};

export default AnimatedRoutes;
