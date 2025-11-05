import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export default function Toggle_Button({ alignment, setAlignment, setColor }) {
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setColor("");
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="google.com">Google</ToggleButton>
      <ToggleButton value="wp.pl">WP</ToggleButton>
      <ToggleButton value="onet.pl">Onet</ToggleButton>
    </ToggleButtonGroup>
  );
}
