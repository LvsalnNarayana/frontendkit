import { Stack } from "@mui/material";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useRef, useEffect, useState } from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
    connectable: true,
  },
  {
    id: "2",
    position: { x: 300, y: 200 },
    data: { label: "Node 2" },
  },
];

const initialEdges = [];

const BasicFlowPreview = () => {
  const { setViewport } = useReactFlow();
  const parentRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [extent, setExtent] = useState([
    [0, 0],
    [Infinity, Infinity],
  ]);

  useEffect(() => {
    if (parentRef.current) {
      const updateSize = () => {
        const width = parentRef.current.clientWidth;
        const height = parentRef.current.clientHeight;
        setExtent([
          [0, 0],
          [width, height],
        ]);
      };

      updateSize();
    }
  }, []);

  const onConnect = (params) => {
    setEdges((eds) =>
      addEdge(
        { ...params, type: "default", animated: true }, // ✅ Fix: Specify edge type
        eds
      )
    );
  };

  return (
    <Stack height="100%" ref={parentRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={true}
        nodesConnectable={true}
        panOnDrag={false}
        translateExtent={extent}
        nodeExtent={extent}
        style={{ width: "100%", height: "100%" }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={1}
        maxZoom={1.5}
        preventScrolling={true}
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background />
        <Controls
          fitViewOptions={{ padding: 0.2 }}
          onFitView={() => {
            setViewport({
              x: 0,
              y: 0,
              zoom: 1,
            });
          }}
        />
      </ReactFlow>
    </Stack>
  );
};

export default BasicFlowPreview;
