
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
import { getAllDistricts, getDistrictsByRegion } from "@/services/districtService";
import { District } from "@/types/district";
import { getAllSchools, getSchoolsByDistrict, getSchoolDetails } from "@/services/schoolService";
import { School } from "@/types/school";
import { Building2, Map } from "lucide-react";
import AdmissionsCountCard from "@/components/super-admin/AdmissionsCountCard";
import SearchableSelect from "@/components/SearchableSelect";
import FilterPopup from "@/components/FilterPopup";
import { Filter } from "lucide-react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRef } from "react";

export default function SuperAdminPage() {
  const { regions, districts: allDistricts, loading } = useAppData();
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [schoolCount, setSchoolCount] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<{ value: string; label: string } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{ value: string; label: string } | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<{ value: string; label: string } | null>(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(filterRef, () => setIsFilterPopupOpen(false));

  useEffect(() => {
    const fetchAllSchools = async () => {
      try {
        const { data, count } = await getAllSchools();
        setAllSchools(data);
        setSchoolCount(count);
      } catch (error) {
        console.error("Error fetching all schools:", error);
      }
    };

    fetchAllSchools();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedRegion) {
        try {
          const fetchedDistricts = await getDistrictsByRegion(selectedRegion.value);
          setFilteredDistricts(fetchedDistricts);
        } catch (error) {
          console.error("Error fetching districts:", error);
          setFilteredDistricts([]);
        }
      } else {
        setFilteredDistricts(allDistricts);
      }
      setSelectedDistrict(null);
      setSchools([]);
      setSelectedSchool(null);
    };

    fetchDistricts();
  }, [selectedRegion, allDistricts]);

  useEffect(() => {
    const fetchSchools = async () => {
      if (selectedDistrict) {
        try {
          const fetchedSchools = await getSchoolsByDistrict(selectedDistrict.value);
          setSchools(fetchedSchools);
        } catch (error) {
          console.error("Error fetching schools:", error);
          setSchools([]);
        }
      } else {
        setSchools(allSchools);
      }
      setSelectedSchool(null);
    };

    fetchSchools();
  }, [selectedDistrict, allSchools]);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      if (selectedSchool && selectedSchool.value) {
        try {
          const schoolDetails = await getSchoolDetails(selectedSchool.value);
          if (regions) {
            const region = regions.find(r => r.id === schoolDetails.district.region.id);
            if (region) {
              setSelectedRegion({ value: region.id, label: region.name });
            }
          }
          const district = {
            value: schoolDetails.district.id,
            label: schoolDetails.district.name
          };
          setSelectedDistrict(district);
        } catch (error) {
          console.error("Error fetching school details:", error);
        }
      }
    };

    fetchSchoolDetails();
  }, [selectedSchool, regions]);

  const handleRegionChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedRegion(selectedOption);
  };

  const handleDistrictChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedDistrict(selectedOption);
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Super Admin Dashboard</h1>
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-md"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
          {isFilterPopupOpen && (
            <FilterPopup
              regions={regions || []}
              districts={filteredDistricts || []}
              schools={schools || []}
              selectedRegion={selectedRegion}
              setSelectedRegion={handleRegionChange}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={handleDistrictChange}
              selectedSchool={selectedSchool}
              setSelectedSchool={setSelectedSchool}
              onClose={() => setIsFilterPopupOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AdmissionsCountCard />
        <UserCard title="Regions" value={(regions || []).length} type="Regions" />
        <UserCard title="Districts" value={(allDistricts || []).length} type="Districts" />
        <UserCard title="Schools" value={schoolCount} type="Schools" />
        <UserCard title="Upload" value="" type="Upload" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BoardingStatusChart region={selectedRegion?.value} district={selectedDistrict?.value} school={selectedSchool?.value} />
          <GenderCategorizationChart region={selectedRegion?.value} district={selectedDistrict?.value} school={selectedSchool?.value} />
      </div>

      <RegionalDistributionChart region={selectedRegion?.value} district={selectedDistrict?.value} school={selectedSchool?.value} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <UserManagement regionCount={(regions || []).length} districtCount={(allDistricts || []).length} />
        <PlacementOverride />
        <Configuration />
      </div>
    </div>
  );
}