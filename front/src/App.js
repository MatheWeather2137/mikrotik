import "./App.css";
import M_status from "./components/m_status";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import Check_internet from "./components/check_internet";
import Firewalls from "./components/firewalls";
import React_Flow from "./components/reactFlow";

function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="App">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Check_internet />
          </TabPanel>
          <TabPanel value="2">
            <Firewalls />
          </TabPanel>
          <TabPanel value="3">
            <React_Flow />
          </TabPanel>
        </TabContext>
      </Box>
      <div className="m_status">
        <M_status />
      </div>
    </div>
  );
}

export default App;
