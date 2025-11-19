import React from "react";

import { LineChart } from "@mui/x-charts/LineChart";

export default function Ram_Chart({ ramData }) {
  const xAxisData = ramData.map((_, i) => i + 1);

  return (
    <LineChart
      skipAnimation
      xAxis={[{ data: xAxisData }]}
      series={[
        {
          data: ramData,
        },
      ]}
      height={300}
    />
  );
}
