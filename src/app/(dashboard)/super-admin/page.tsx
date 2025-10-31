
"use client";

import { useEffect } from "react";
import NationalStats from "@/components/NationalStats";
import UserManagement from "@/components/UserManagement";
import PlacementOverride from "@/components/PlacementOverride";
import Configuration from "@/components/Configuration";

const SuperAdminPage = () => {
  useEffect(() => {
    // Only runs on the client
    localStorage.setItem("userType", "admin");
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <NationalStats />
      <UserManagement />
      <PlacementOverride />
      <Configuration />
    </div>
  );
};

export default SuperAdminPage;