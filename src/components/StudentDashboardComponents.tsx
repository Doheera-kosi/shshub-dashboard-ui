'use client';

import React from 'react';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CheckCircle, Clock, XCircle, TrendingUp, ArrowRight, ChevronRight } from 'lucide-react';

const InfoCard = ({ title, value, icon, trend, sparklineData, color }: { title: string, value: string, icon: JSX.Element, trend?: string, sparklineData?: any[], color?: string }) => {
  return (
    <div className={`bg-white p-4 rounded-2xl shadow-sm flex-1 min-w-[150px] border-l-4`} style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {trend && (
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
          <span>{trend}</span>
        </div>
      )}
      {sparklineData && (
        <div className="w-full h-10 mt-2">
          <ResponsiveContainer>
            <BarChart data={sparklineData}>
              <Bar dataKey="value" fill={color || '#8884d8'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const ProgressTracker = () => {
  const stages = [
    { name: 'Admission application', status: 'completed' },
    { name: 'Fees payment', status: 'current' },
    { name: 'Profile Setup', status: 'upcoming' },
    { name: 'Student Onboarding', status: 'upcoming' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-400';
    if (status === 'current') return 'bg-yellow-300';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-blue-600 p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg text-white font-semibold mb-6">Application Progress</h3>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.name}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusColor(stage.status)}`}>
                {stage.status === 'completed' ? <CheckCircle size={20} /> : index + 1}
              </div>
              <p className="text-sm text-center text-white mt-2 w-20 h-10 flex items-center justify-center">{stage.name}</p>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${getStatusColor(stages[index + 1].status)}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const SchoolCategoryChart = () => {
  const data = [
    { name: 'Category A', value: 2, grade: '7-12', status: 1 },
    { name: 'Category B & C', value: 4, grade: '13-24', status: 90 },
    { name: 'Category D', value: 0, grade: '25+', status: null },
  ];
  const COLORS = ['#C3EBFA', '#A8E6A1', '#F7A6A6'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex-[2]">
      <h3 className="text-lg font-semibold mb-4">Selected School Categories</h3>
      <div className="flex items-center">
        <div className="w-1/3 h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" innerRadius={40} paddingAngle={1}>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} schools`, `Grade: ${props.payload.grade}`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-2/3 overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2">Category</th>
                <th scope="col" className="px-4 py-2">No. of Schools</th>
                <th scope="col" className="px-4 py-2">Grade Range</th>
                <th scope="col" className="px-4 py-2">Likelihood</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={entry.name} className="bg-white border-b">
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      {entry.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">{entry.value}</td>
                  <td className="px-4 py-2 text-center">{entry.grade}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.status === null ? 'bg-gray-100 text-gray-800' : entry.status <= 30 ? 'bg-red-100 text-red-800' : entry.status > 30 && entry.status <= 80 ? 'bg-yellow-100 text-yellow-800'  : 'bg-green-100 text-green-800'}`}>
                      {entry.status === null ? 'N/A' : `${entry.status}%`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SchoolFeesCard = () => {
  const fees = [
    { name: 'Tuition', status: 'completed', amount: '5,000' },
    { name: 'Feeding', status: 'pending', amount: '1,200' },
    { name: 'Accommodation', status: 'completed', amount: '2,500' },
    { name: 'SRC', status: 'pending', amount: '100' },
  ];

  // Sort fees to show completed first
  const sortedFees = [...fees].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') {
      return -1;
    }
    if (a.status !== 'completed' && b.status === 'completed') {
      return 1;
    }
    return 0;
  });

  const getStatusPill = (status: string) => {
    if (status === 'completed') {
      return <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Completed</span>;
    }
    return <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">Pending</span>;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">School Fees</h3>
        <button className="text-sm text-blue-600 flex items-center font-semibold rounded-xs px-4 py-2 bg-blue-100 hover:underline">See more<ChevronRight className="ml-1 w-4 h-4 font-bold text-blue-600" /></button>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2">Fee</th>
            <th scope="col" className="px-4 py-2">Amount</th>
            <th scope="col" className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedFees.map(fee => (
            <tr key={fee.name} className="bg-white border-b">
              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{fee.name}</td>
              <td className="px-4 py-2">GH₵{fee.amount}</td>
              <td className="px-4 py-2">{getStatusPill(fee.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export { InfoCard, ProgressTracker, SchoolCategoryChart, SchoolFeesCard };