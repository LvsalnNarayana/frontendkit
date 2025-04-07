import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  MiniMap,
} from "@xyflow/react";
import FlowDnDControl from "./FlowDnDControl";
import { Stack } from "@mui/material";
import { useDnD } from "./CustomDnDFlowContext";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 1;
const getId = () => `dndnode_${id++}`;

const FlowDnDPreview = () => {
  const { setViewport } = useReactFlow();
  const parentRef = useRef(null);
  const [type] = useDnD();
  const [flowSettings, setFlowSettings] = useState({
    animatedEdges: true,
    nodesDraggable: true,
    nodesConnectable: true,
    controls: true,
    miniMap: true,
    background: true,
  });
  const [extent, setExtent] = useState([
    [0, 0],
    [Infinity, Infinity],
  ]);

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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
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
          onDragOver={onDragOver}
          onDrop={onDrop}
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
        <FlowDnDControl
          flowSettings={flowSettings}
          setFlowSettings={setFlowSettings}
        />
      </Stack>
    </Stack>
  );
};

export default FlowDnDPreview;
