import React, { forwardRef } from "react";
import { useDraggable } from "@dnd-kit/core";

const Draggable = forwardRef(({ id, position }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${position.x + transform.x}px, ${
          position.y + transform.y
        }px, 0)`
      : `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: transition || "none",
    opacity: isDragging ? 0.5 : 1,
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "4px",
    cursor: "grab",
    display: "inline-block",
    userSelect: "none",
    position: "absolute",
    top: 0,
    left: 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Draggable
    </div>
  );
});

export default Draggable;
