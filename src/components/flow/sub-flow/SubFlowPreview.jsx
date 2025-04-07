import { useEffect, useRef } from "react";
import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Stack } from "@mui/material";
import SubFlowControl from "./SubFlowControl";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 0" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Group A" },
    position: { x: 100, y: 100 },
    style: { width: 200, height: 200 },
    type: "group",
  },
  {
    id: "2a",
    data: { label: "Node A.1" },
    position: { x: 10, y: 50 },
    parentId: "2",
  },
  {
    id: "3",
    data: { label: "Node 1" },
    position: { x: 320, y: 100 },
  },
  {
    id: "4",
    data: { label: "Group B" },
    position: { x: 320, y: 200 },
    style: { width: 300, height: 300, backgroundColor: "rgb(0, 255, 0)" },
    type: "group",
  },
  {
    id: "4a",
    data: { label: "Node B.1" },
    position: { x: 15, y: 65 },
    parentId: "4",
    extent: "parent",
  },
  {
    id: "4b",
    data: { label: "Group B.A" },
    position: { x: 15, y: 120 },
    style: {
      backgroundColor: "rgba(255, 0, 255, 1)",
      height: 150,
      width: 270,
    },
    parentId: "4",
  },
  {
    id: "4b1",
    data: { label: "Node B.A.1" },
    position: { x: 20, y: 40 },
    parentId: "4b",
    extent: "parent",
  },
  {
    id: "4b2",
    data: { label: "Node B.A.2" },
    position: { x: 100, y: 100 },
    parentId: "4b",
  },
];
const initialEdges = [
  { id: "e1-2a", source: "1", target: "2a", animated: true },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2a-4a", source: "2a", target: "4a" },
  { id: "e3-4b1", source: "3", target: "4b1" },
  { id: "e4a-4b1", source: "4a", target: "4b1" },
  { id: "e4a-4b2", source: "4a", target: "4b2" },
  { id: "e4b1-4b2", source: "4b1", target: "4b2" },
];

const SubFlowPreview = () => {
  const parentRef = useRef(null);
  const { setViewport } = useReactFlow();
  const [extent, setExtent] = useState([
    [0, 0],
    [Infinity, Infinity],
  ]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [flowSettings, setFlowSettings] = useState({
    miniMap: true,
    controls: true,
    background: true,
  });

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      const width = parentRef.current.clientWidth;
      const height = parentRef.current.clientHeight;
      setExtent([
        [0, 0],
        [width, height],
      ]);
    }
  }, []);

  return (
    // <ReactFlow
    //   nodes={nodes}
    //   edges={edges}
    //   onNodesChange={onNodesChange}
    //   onEdgesChange={onEdgesChange}
    //   onConnect={onConnect}
    //   className="react-flow-subflows-example"
    //   fitView
    //   style={{ backgroundColor: "#F7F9FB" }}
    // >
    //   {flowSettings?.miniMap && <MiniMap />}
    //   {flowSettings?.controls && <Controls />}
    //   {flowSettings?.background && <Background variant="dots" size={2} />}
    // </ReactFlow>

    <Stack direction="row" height="100%" width="100%">
      <Stack height="100%" width="100%" ref={parentRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodesDraggable={flowSettings.nodesDraggable}
          nodesConnectable={flowSettings.nodesConnectable}
          panOnDrag={flowSettings.panOnDrag}
          translateExtent={extent}
          nodeExtent={extent}
          style={{ width: "100%", height: "100%" }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={1}
          maxZoom={1.5}
          preventScrolling={true}
          fitViewOptions={{ padding: 0.2 }}
        >
          {flowSettings?.background && <Background variant="dots" size={2} />}
          {flowSettings?.controls && (
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
          )}
          {flowSettings?.miniMap && <MiniMap />}
        </ReactFlow>
      </Stack>

      <Stack height="100%" width={400}>
        <SubFlowControl
          flowSettings={flowSettings}
          setFlowSettings={setFlowSettings}
        />
      </Stack>
    </Stack>
  );
};

export default SubFlowPreview;
