import { useContext } from "react";
import { DirectionsContext } from "../DirectionsContext";

export const useDirectionControls = () => {
  const context = useContext(DirectionsContext);

  if (!context) {
    throw new Error(
      "useDirectionControls must be used within a DirectionsContextProvider"
    );
  }

  return context;
};
