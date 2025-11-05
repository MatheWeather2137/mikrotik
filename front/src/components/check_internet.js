import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function Check_internet() {
  const [internet, setInternet] = useState(true);

  const check = async () => {
    try {
      const res = await fetch("http://localhost:3000/tool/internet");
      const json = await res.json();
      if (json[0].status == "timeout") {
        setInternet(false);
      } else setInternet(true);

      console.log(json);
    } catch (error) {
      setInternet(false);
    }
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <div>
      <Button
        color={internet ? "success" : "error"}
        onClick={check}
        variant="contained"
      >
        Sprawdź internet
      </Button>
    </div>
  );
}
