import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Toggle_Button from "./toggle_button";
import PingTable from "./ping_table";

export default function Check_internet() {
  const [alignment, setAlignment] = useState("google.com");
  const [internet, setInternet] = useState(true);
  const [color, setColor] = useState("");
  const [packages, setPackages] = useState(1);
  const [data, setData] = useState([]);

  const check = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/tool/internet/${alignment}/${packages}`
      );
      const json = await res.json();
      setData(json);
      if (json[0]?.status === "timeout") {
        setInternet(false);
        setColor("error");
      } else {
        setInternet(true);
        setColor("success");
      }
    } catch {
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
          aria-label="Liczba pakietów"
          valueLabelDisplay="auto"
          onChange={(e) => setPackages(e.target.value)}
        />
      </Box>
      <PingTable data={data} />
    </div>
  );
}
