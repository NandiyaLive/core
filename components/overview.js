"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

const Overview = ({ data }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey={"name"} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `LKR${value}`}
        />
        <Bar dataKey={"total"} fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
