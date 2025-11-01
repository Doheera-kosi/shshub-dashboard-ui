
"use client";

import { useEffect } from "react";
import NationalStats from "@/components/NationalStats";
import PlacementOverride from "@/components/PlacementOverride";
import UserManagement from "@/components/UserManagement";
import UserCard from "@/components/UserCard";
import BoardingStatusChart from "@/components/BoardingStatusChart";
import GenderCategorizationChart from "@/components/GenderCategorizationChart";
import RegionalDistributionChart from "@/components/RegionalDistributionChart";
import Configuration from "@/components/Configuration";

const SuperAdminPage = () => {
  useEffect(() => {
    // Only runs on the client
    localStorage.setItem("userType", "admin");
  }, []);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <UserCard type="Schools" />
        <UserCard type="Zones" />
        <UserCard type="Students" />
        <UserCard type="Teachers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BoardingStatusChart />
        <GenderCategorizationChart />
      </div>

      <RegionalDistributionChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <UserManagement />
        <PlacementOverride />
        <Configuration />
      </div>
    </div>
  );
};

export default SuperAdminPage;