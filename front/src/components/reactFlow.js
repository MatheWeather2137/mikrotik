import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
];
const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2", animated: true },
  { id: "n2-n3", source: "n2", target: "n3" },
];

export default function React_Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const getData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/tool/traceroute/${inputValue}/1`
      );
      const json = await res.json();
      console.log(json);
      const validNodes = json.filter(
        (item) => item.address && item.address !== ""
      );
      const newNodes = validNodes.map((node, index) => ({
        id: `node-${index}`,
        position: { x: index * 50, y: index * 50 },
        data: {
          label: `${node.address}`,
        },
      }));

      const newEdges = newNodes.slice(0, -1).map((node, index) => ({
        id: `edge-${index}`,
        source: node.id,
        target: newNodes[index + 1].id,
        animated: true,
      }));
      setEdges(newEdges);
      setNodes(newNodes);
    } catch (error) {}
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="flow">
        <input value={inputValue} onChange={handleChange} />
        <button onClick={getData}>START</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
