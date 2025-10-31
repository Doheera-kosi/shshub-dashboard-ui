
"use client";

import { useEffect } from "react";
import NationalStats from "@/components/NationalStats";
import PlacementOverride from "@/components/PlacementOverride";
import UserManagement from "@/components/UserManagement";
import UserCard from "@/components/UserCard";
import Configuration from "@/components/Configuration";

const SuperAdminPage = () => {
  useEffect(() => {
    // Only runs on the client
    localStorage.setItem("userType", "admin");
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <UserCard type="Schools" />
        <UserCard type="Zones" />
        <UserCard type="Students" />
        <UserCard type="Teachers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NationalStats />
        </div>
        <div className="space-y-6">
          <UserManagement />
          <PlacementOverride />
          <Configuration />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPage;