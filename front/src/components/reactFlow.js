import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { Box, style } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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
  const [ipData, setIpData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const getIpInfo = async (ip) => {
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}`);
      const json = await res.json();
      console.log("IP INFO:", json);
      setIpData(json);
    } catch (err) {
      console.error(err);
    }
  };

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
      const newNodes = validNodes.map((node, index) => {
        const offset = index % 2 == 0 ? 50 : -50;
        return {
          id: `node-${index}`,
          position: { x: offset, y: index * 100 },
          data: {
            label: `${node.address} | ${node.last}ms`,
          },
          style: node.last > 5 && { border: "1px solid red" },
        };
      });

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "white",
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="flow">
        <input value={inputValue} onChange={handleChange} />
        <button onClick={getData}>START</button>
      </div>

      <ReactFlow
        onNodeClick={(event, node) => {
          const ip = node.data.label.split(" | ")[0];
          getIpInfo(ip);
          handleOpen();
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {ipData ? (
              <>
                <Typography variant="h6">{ipData.query}</Typography>
                <Typography>ISP: {ipData.isp}</Typography>
                <Typography>Country: {ipData.country}</Typography>
                <Typography>City: {ipData.city}</Typography>
                <Typography>Region name: {ipData.regionName}</Typography>
                <Typography>Timezone: {ipData.timezone}</Typography>
                <Typography>
                  Lat/Lon: {ipData.lat}, {ipData.lon}
                </Typography>
                <Typography>Zip: {ipData.zip}</Typography>
              </>
            ) : (
              <Typography>Ładowanie...</Typography>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}
