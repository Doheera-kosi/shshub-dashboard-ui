"use client";

import { useEffect } from "react";


import { InfoCard, ProgressTracker, SchoolCategoryChart, SchoolFeesCard, Recommendations } from "@/components/StudentDashboardComponents";
import { CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';

const sparklineData = [
  { value: 50 },
  { value: 75 },
  { value: 60 },
  { value: 80 },
  { value: 70 },
];

const StudentDashboardPage = () => {
  useEffect(() => {
    // Only runs on the client
    localStorage.setItem("userType", "student");
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      
      {/* Row 1: Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InfoCard 
          title="Schools Applied To" 
          value="6"
          icon={<TrendingUp className="text-[#C084FC]" />} 
          sparklineData={sparklineData}
          color="#C084FC"
        />
        <InfoCard 
          title="Accepted"
          value="1"
          icon={<CheckCircle className="text-[#A8E6A1]" />} 
          trend="+1 this week"
          color="#A8E6A1"
        />
        <InfoCard 
          title="Pending"
          value="4"
          icon={<Clock className="text-[#FAE27C]" />} 
          color="#FAE27C"
        />
        <InfoCard 
          title="Declined"
          value="1"
          icon={<XCircle className="text-[#F7A6A6]" />} 
          color="#F7A6A6"
        />
      </div>

      {/* Row 2: Application Progress Tracker */}
      <div className="mb-8">
        <ProgressTracker />
      </div>

      {/* Row 3: School Selection Insights */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <SchoolCategoryChart />
        <SchoolFeesCard />
      </div>

      {/* Row 4: Recommended Actions */}
      <div>
        <Recommendations />
      </div>
    </div>
  );
};

export default StudentDashboardPage;