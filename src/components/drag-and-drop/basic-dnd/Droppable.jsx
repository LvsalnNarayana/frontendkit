import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: "unique-id",
  });
  const style = {
    width: "500px",
    height: "500px",
    backgroundColor: "lightgrey",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
export default Droppable;
