import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import ComputerIcon from "@mui/icons-material/Computer";
import MemoryIcon from "@mui/icons-material/Memory";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Proc_Chart from "./proc_chart";
import Ram_Chart from "./ram_chart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function M_status() {
  const [connected, setConnected] = useState(false);
  const [cpu, setCpu] = useState("0");
  const [ram, setRam] = useState("0");
  const [open, setOpen] = useState(false);
  const [cpuTable, setCpuTable] = useState([]);
  const [ramTable, setRamTable] = useState([]);
  const handleOpenCpu = () => setOpen(true);
  const handleCloseCpu = () => setOpen(false);
  const handleOpenRam = () => setOpen(true);
  const handleCloseRam = () => setOpen(false);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/status");
      const json = await res.json();
      setCpu(json["cpu-load"]);
      const ram =
        ((json["total-memory"] - json["free-memory"]) / json["total-memory"]) *
        100;
      setRam(ram.toFixed(2) + "%");
      setConnected(true);
      setCpuTable((prev) => {
        return [...prev, json["cpu-load"]];
      });
      setRamTable((prev) => {
        return [...prev, ram.toFixed(2)];
      });
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cut = () => {
      if (cpuTable.length > 30) cpuTable.shift();
    };
    cut();
  }, [cpuTable]);

  useEffect(() => {
    const cut = () => {
      if (ramTable.length > 30) ramTable.shift();
    };
    cut();
  }, [ramTable]);

  return (
    <div className="status">
      {connected ? (
        <Chip label="Connected" color="success" />
      ) : (
        <Chip label="Disconnected" color="error" />
      )}

      <ComputerIcon onClick={handleOpenCpu} />
      {cpu}

      <MemoryIcon onClick={handleOpenRam} />
      {ram}
      <Modal
        open={open}
        onClose={handleCloseCpu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CPU info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Proc_Chart cpuData={cpuTable} />
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleCloseRam}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CPU info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Ram_Chart ramData={ramTable} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default M_status;
