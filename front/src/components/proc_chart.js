import React from "react";

import { LineChart } from "@mui/x-charts/LineChart";

export default function Proc_Chart({ cpuData }) {
  const xAxisData = Array.from({ length: cpuData.length }, (_, i) => i + 1);

  return (
    <LineChart
      xAxis={[{ data: xAxisData }]}
      series={[
        {
          data: cpuData,
        },
      ]}
      height={300}
    />
  );
}
