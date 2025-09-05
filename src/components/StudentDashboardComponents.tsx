'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CheckCircle, Clock, XCircle, TrendingUp, ArrowRight } from 'lucide-react';

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
    { name: 'Profile Creation', status: 'completed' },
    { name: 'Profile Verification', status: 'completed' },
    { name: 'School Selection', status: 'current' },
    { name: 'Awaiting Response', status: 'upcoming' },
    { name: 'Final Decision', status: 'upcoming' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-400';
    if (status === 'current') return 'bg-yellow-300';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Application Progress</h3>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusColor(stage.status)}`}>
                {stage.status === 'completed' ? <CheckCircle size={20} /> : index + 1}
              </div>
              <p className="text-xs text-center mt-2 w-20 h-10 flex items-center justify-center">{stage.name}</p>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-1 ${getStatusColor(stages[index + 1].status)}`}></div>
            )}
          </div>
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

const AcceptanceGradeCard = () => {
  const studentGrade = 15;
  const categoryAReq = { min: 7, max: 12 };
  const categoryBReq = { min: 13, max: 24 };
  const categoryCReq = { min: 25, max: null };

  const GradeRequirementBar = ({ studentGrade, req, categoryName }: { studentGrade: number, req: {min: number, max: number | null}, categoryName: string }) => {
    const getStatus = () => {
      if (studentGrade < req.min) {
        return 'overqualified';
      }
      if (req.max === null) {
        return 'qualified';
      }
      if (studentGrade >= req.min && studentGrade <= req.max) {
        return 'qualified';
      }
      return 'underqualified';
    };

    const status = getStatus();

    const getBarColor = () => {
      switch (status) {
        case 'qualified':
          return 'bg-green-500';
        case 'overqualified':
          return 'bg-green-500';
        case 'underqualified':
          return 'bg-red-500';
        default:
          return 'bg-gray-200';
      }
    };

    const requirementText = `${req.min}${req.max === null ? '+' : `-${req.max}`}`;
    const progress = (status === 'underqualified') ? 0 : 100;

    return (
      <div className="mb-2">
        <div className="flex justify-between text-sm font-medium">
          <span>{categoryName}</span>
          <span className='text-yellow-400'>{requirementText}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div className={`${getBarColor()} h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex-1">
      <h3 className="text-lg font-semibold mb-4">Acceptance Grade</h3>
      <div className="text-center">
        <p className="text-sm text-gray-500">Your Aggregate</p>
        <p className="text-4xl font-bold text-blue-400">{studentGrade}</p>
      </div>
      <div className="mt-4">
        <GradeRequirementBar studentGrade={studentGrade} req={categoryAReq} categoryName="Category A" />
        <GradeRequirementBar studentGrade={studentGrade} req={categoryBReq} categoryName="Category B" />
        <GradeRequirementBar studentGrade={studentGrade} req={categoryCReq} categoryName="Category C" />
      </div>
    </div>
  );
};

const Recommendations = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
      <ul className="space-y-3">
        <li className="text-sm text-gray-700">You have applied to 2 Category A schools. Consider applying to Category B for higher chances.</li>
        <li className="text-sm text-gray-700">Your profile is verified, but you haven’t selected any Category D schools yet.</li>
      </ul>
      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Apply to More Schools</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold">Edit Profile</button>
      </div>
    </div>
  );
};

export { InfoCard, ProgressTracker, SchoolCategoryChart, AcceptanceGradeCard, Recommendations };