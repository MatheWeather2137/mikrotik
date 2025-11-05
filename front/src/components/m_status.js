import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import ComputerIcon from "@mui/icons-material/Computer";
import MemoryIcon from "@mui/icons-material/Memory";

function M_status() {
  const [connected, setConnected] = useState(false);
  const [cpu, setCpu] = useState("0");
  const [ram, setRam] = useState("0");

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/status");
      const json = await res.json();
      setCpu(json["cpu-load"]);
      setRam(json["total-memory"] - json["free-memory"] / 100);
      setConnected(true);
      console.log(json);
    } catch (error) {
      setCpu(0);
      setRam(0);
      setConnected(false);
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status">
      {connected ? (
        <Chip label="Connected" color="success" />
      ) : (
        <Chip label="Disconnected" color="error" />
      )}

      <ComputerIcon />
      {cpu}

      <MemoryIcon />
      {ram}
    </div>
  );
}
export default M_status;
