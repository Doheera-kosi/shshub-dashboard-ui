"use client";

import { useEffect } from "react";


import { InfoCard, ProgressTracker, SchoolCategoryChart, SchoolFeesCard } from "@/components/StudentDashboardComponents";
import { CheckCircle, Clock, XCircle, TrendingUp, BookCopy, PencilLine } from 'lucide-react';
import AnnouncementsAndEvents from "@/components/AnnouncementsAndEvents";

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
          title="Terms Completed"
          value="1 of 9"
          icon={<CheckCircle className="text-[#A8E6A1]" />} 
          color="#A8E6A1"
        />
        <InfoCard 
          title="Pending Assignments" 
          value="6"
          icon={<BookCopy className="text-blue-500" />} 
          color="#3B82F6"
        />
        
        <InfoCard 
          title="Online Quizzes"
          value="4"
          icon={<PencilLine className="text-blue-300" />} 
          color="#93C5FD"
        />
        <InfoCard 
          title="Upcoming Events"
          value="1"
          icon={<Clock className="text-[#FAE27C]" />} 
          color="#FAE27C"
        />
      </div>

      {/* Row 2: Application Progress Tracker */}
      <div className="mb-8">
        <ProgressTracker />
      </div>

      {/* Row 3: School Selection Insights */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <AnnouncementsAndEvents />
        {/* <SchoolFeesCard /> */}
      </div>
    </div>
  );
};

export default StudentDashboardPage;