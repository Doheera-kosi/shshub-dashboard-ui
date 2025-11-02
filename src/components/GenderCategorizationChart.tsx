"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getGenderCategorization } from "../services/dashboardService";

const COLORS = ["#FFBB28", "#FF8042"];

interface GenderCategorizationChartProps {
  region?: string;
  district?: string;
  school?: string;
}

const GenderCategorizationChart = ({ region, district, school }: GenderCategorizationChartProps) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getGenderCategorization(region, district, school);
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch gender categorization', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region, district, school]);

  if (loading) {
    return <div className="bg-white p-4 rounded-lg shadow-md">Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Gender Categorization</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderCategorizationChart;