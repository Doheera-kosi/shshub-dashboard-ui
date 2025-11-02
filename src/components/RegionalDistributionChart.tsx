"use client";

import { useEffect, useState } from "react";
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
import { getRegionalDistribution } from "../services/dashboardService";

interface RegionalDistributionChartProps {
  region?: string;
  district?: string;
  school?: string;
}

const RegionalDistributionChart = ({ region, district, school }: RegionalDistributionChartProps) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRegionalDistribution(region, district, school);
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch regional distribution', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region, district, school]);

  if (loading) {
    return <div className="bg-white p-4 rounded-lg shadow-md mt-6">Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Regional Distribution of Applicants
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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