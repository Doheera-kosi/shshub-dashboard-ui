
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NationalStats from "@/components/NationalStats";
import PlacementOverride from "@/components/PlacementOverride";
import UserManagement from "@/components/UserManagement";
import UserCard from "@/components/UserCard";
import BoardingStatusChart from "@/components/BoardingStatusChart";
import GenderCategorizationChart from "@/components/GenderCategorizationChart";
import RegionalDistributionChart from "@/components/RegionalDistributionChart";
import Configuration from "@/components/Configuration";
import { useAppData } from "@/contexts/AppDataContext";

interface School {
  id: string;
  name: string;
}

const SuperAdminPage = () => {
  const { regions, districts, loading } = useAppData();
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {
    localStorage.setItem("userType", "admin");
  }, []);

  useEffect(() => {
    // Fetch schools when a district is selected
    const fetchSchools = async () => {
      if (selectedDistrict) {
        // In a real application, you would fetch this from an API
        const mockSchools = {
          "101": [
            { id: "10101", name: "Achimota School" },
            { id: "10102", name: "Accra Academy" },
          ],
          "102": [
            { id: "10201", name: "Tema Secondary School" },
            { id: "10202", name: "Chemu Senior High School" },
          ],
          "201": [
            { id: "20101", name: "Prempeh College" },
            { id: "20102", name: "Opoku Ware School" },
          ],
          "202": [
            { id: "20201", name: "Obuasi Senior High Technical School" },
          ],
          "301": [
            { id: "30101", name: "St. John's School" },
          ],
          "302": [
            { id: "30201", name: "Tarkwa Senior High School" },
          ],
        };
        setSchools(mockSchools[selectedDistrict] || []);
        setSelectedSchool("");
      } else {
        setSchools([]);
        setSelectedSchool("");
      }
    };

    fetchSchools();
  }, [selectedDistrict]);

  const filteredDistricts = selectedRegion
    ? districts.filter((d) => d.regionId === selectedRegion)
    : [];

  const cardLinks = {
    Regions: "/super-admin/regions",
    Districts: "/super-admin/districts",
    Schools: "/super-admin/schools",
    Students: "/super-admin/students",
    Teachers: "/super-admin/teachers",
    Users: "/super-admin/users",
    Upload: "/super-admin/upload",
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="border border-gray-200 p-2 rounded-lg"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-200 p-2 rounded-lg"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedRegion}
        >
          <option value="">All Districts</option>
          {filteredDistricts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-200 p-2 rounded-lg"
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          disabled={!selectedDistrict}
        >
          <option value="">All Schools</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <UserCard title="Regions" value={regions.length} type="Regions" />
        <UserCard title="Districts" value={districts.length} type="Districts" />
        <UserCard title="Schools" value={schools.length} type="Schools" />
        <UserCard title="Upload" value="" type="Upload" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BoardingStatusChart region={selectedRegion} district={selectedDistrict} school={selectedSchool} />
        <GenderCategorizationChart region={selectedRegion} district={selectedDistrict} school={selectedSchool} />
      </div>

      <RegionalDistributionChart region={selectedRegion} district={selectedDistrict} school={selectedSchool} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <UserManagement regionCount={regions.length} />
        <PlacementOverride />
        <Configuration />
      </div>
    </div>
  );
};

export default SuperAdminPage;