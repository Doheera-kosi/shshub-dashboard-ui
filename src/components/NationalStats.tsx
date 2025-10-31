'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const NationalStats = () => {

  const regionalData = [
    { name: 'Ahafo', applicants: 4000 },
    { name: 'Ashanti', applicants: 12000 },
    { name: 'Bono', applicants: 7000 },
    { name: 'Bono East', applicants: 6500 },
    { name: 'Central', applicants: 8000 },
    { name: 'Eastern', applicants: 9000 },
    { name: 'Greater Accra', applicants: 15000 },
    { name: 'North East', applicants: 3000 },
    { name: 'Northern', applicants: 5000 },
    { name: 'Oti', applicants: 2500 },
    { name: 'Savannah', applicants: 2000 },
    { name: 'Upper East', applicants: 3500 },
    { name: 'Upper West', applicants: 3200 },
    { name: 'Volta', applicants: 6000 },
    { name: 'Western', applicants: 7500 },
    { name: 'Western North', applicants: 4500 },
  ];

  const genderData = [
    { name: 'Male', value: 55 },
    { name: 'Female', value: 45 },
  ];

  const boardingData = [
    { name: 'Boarding', value: 70 },
    { name: 'Day', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">National-Level Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div >
          <h3 className="text-md font-semibold mb-2">Regional Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="applicants" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-md font-semibold mb-2">Gender Categorization</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                  {genderData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Boarding Status</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={boardingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#82ca9d">
                  {boardingData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalStats;