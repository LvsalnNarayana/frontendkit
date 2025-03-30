import React, { useRef, useState } from "react";
import { DndContext, useDndContext } from "@dnd-kit/core";
import { Stack } from "@mui/material";
import Draggable from "./Draggable";

const defaultCoordinates = { x: 0, y: 0 };
const testModifier = (
  { transform, activeNodeRect, containerNodeRect },
  currentCoordinates
) => {
  if (!transform || !activeNodeRect || !containerNodeRect) return transform;

  const { width: containerWidth, height: containerHeight } = containerNodeRect;
  const { width: elementWidth, height: elementHeight } = activeNodeRect;

  // Get the current stored position
  const { x: currentX, y: currentY } = currentCoordinates;

  // Calculate proposed new position
  const newX = currentX + transform.x;
  const newY = currentY + transform.y;

  // Define movement boundaries (clamping)
  const minX = 0;
  const minY = 0;
  const maxX = containerWidth - elementWidth; // Prevent overflow
  const maxY = containerHeight - elementHeight;

  // Ensure the item stays within bounds
  const clampedX = Math.max(minX, Math.min(newX, maxX));
  const clampedY = Math.max(minY, Math.min(newY, maxY));

  return {
    ...transform,
    x: clampedX - currentX, // Adjust relative movement
    y: clampedY - currentY,
  };
};

const BasicDnDPreview = () => {
  const dndContext = useDndContext();

  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const parentRef = useRef(null);

  const handleDragEnd = ({ delta }) => {
    setCoordinates((prev) => ({
      x: prev.x + delta?.x,
      y: prev.y + delta?.y,
    }));
  };
  const modifierWithCoordinates = (args) => testModifier(args, coordinates);

  return (
    <DndContext modifiers={[modifierWithCoordinates]} onDragEnd={handleDragEnd}>
      <Stack height="100%" position="relative" ref={parentRef}>
        <Draggable id="unq-id" position={coordinates} />
      </Stack>
    </DndContext>
  );
};

export default BasicDnDPreview;
