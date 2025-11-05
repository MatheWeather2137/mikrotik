import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Toggle_Button from "./toggle_button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Check_internet() {
  const [alignment, setAlignment] = useState("google.com");
  const [internet, setInternet] = useState(true);
  const [color, setColor] = useState("");
  const [packages, setPackages] = useState(1);
  const [time, setTime] = useState([]);

  const check = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/tool/internet/${alignment}/${packages}`
      );
      const json = await res.json();
      if (json[0].status == "timeout") {
        setInternet(false);
        setColor("error");
      } else {
        setInternet(true);
        setColor("success");
      }

      console.log(json);
    } catch (error) {
      setInternet(false);
    }
  };

  return (
    <div className="wplata">
      <Toggle_Button
        alignment={alignment}
        setAlignment={setAlignment}
        setColor={setColor}
      />
      <Button color={color} onClick={check} variant="contained">
        Sprawdź internet
      </Button>
      <Box sx={{ width: 300 }}>
        <Slider
          defaultValue={1}
          min={1}
          max={4}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) => setPackages(e.target.value)}
        />
      </Box>
      <Box sx={{ width: 500 }}>
        <TableContainer component={Paper}>
          <Table sx={{ width: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Czas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
