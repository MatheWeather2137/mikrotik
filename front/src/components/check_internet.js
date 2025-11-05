import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function Check_internet() {
  const [internet, setInternet] = useState(true);
  const [color, setColor] = useState("");

  const check = async () => {
    try {
      const res = await fetch("http://localhost:3000/tool/internet");
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
    <div>
      <Button color={color} onClick={check} variant="contained">
        Sprawdź internet
      </Button>
    </div>
  );
}
