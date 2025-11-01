"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ahafo", applicants: 4400 },
  { name: "Ashanti", applicants: 13980 },
  { name: "Bono", applicants: 9800 },
  { name: "Bono East", applicants: 3908 },
  { name: "Central", applicants: 4800 },
  { name: "Eastern", applicants: 3800 },
  { name: "Greater Accra", applicants: 15000 },
  { name: "North East", applicants: 2390 },
  { name: "Northern", applicants: 4300 },
  { name: "Oti", applicants: 2400 },
  { name: "Savannah", applicants: 1890 },
  { name: "Upper East", applicants: 3490 },
  { name: "Upper West", applicants: 2000 },
  { name: "Volta", applicants: 6800 },
  { name: "Western", applicants: 7800 },
  { name: "Western North", applicants: 2800 },
];

const RegionalDistributionChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Regional Distribution of Applicants
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applicants" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegionalDistributionChart;