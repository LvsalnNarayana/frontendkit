import { Stack } from "@mui/material";
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
import "@xyflow/react/dist/style.css";
import { useRef, useEffect, useState } from "react";
import BasicFlowControl from "./BasicFlowControl";

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

  const [flowSettings, setFlowSettings] = useState({
    animatedEdges: true,
    nodesDraggable: true,
    nodesConnectable: true,
    controls: true,
    miniMap: true,
    background: true,
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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

  // Update animated property for all edges when toggled
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: flowSettings?.animatedEdges,
      }))
    );
  }, [flowSettings?.animatedEdges]);

  // Remove edges when connectable is disabled
  useEffect(() => {
    if (!flowSettings.nodesConnectable) {
      setEdges([]);
    }
  }, [flowSettings.nodesConnectable, setEdges]);

  // Remove edges when connectable is disabled
  useEffect(() => {
    if (!flowSettings.nodesConnectable) {
      setEdges([]);
    }
  }, [flowSettings.nodesConnectable, setEdges]);

  const onConnect = (params) => {
    setEdges((eds) =>
      addEdge(
        { ...params, type: "default", animated: flowSettings?.animatedEdges },
        eds
      )
    );
  };

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
        <BasicFlowControl
          flowSettings={flowSettings}
          setFlowSettings={setFlowSettings}
        />
      </Stack>
    </Stack>
  );
};

export default BasicFlowPreview;
