import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Toggle_Button from "./toggle_button";

export default function Check_internet() {
  const [alignment, setAlignment] = useState("google.com");
  const [internet, setInternet] = useState(true);
  const [color, setColor] = useState("");

  const check = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/tool/internet/${alignment}`
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
    </div>
  );
}
