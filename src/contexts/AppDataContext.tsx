'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllRegions } from '@/services/regionService';
import { getAllDistricts } from '@/services/districtService';

interface AppDataContextType {
  regions: any[];
  districts: any[];
  loading: boolean;
  refetchData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regionsData, districtsData] = await Promise.all([
        getAllRegions(),
        getAllDistricts(),
      ]);
      setRegions(regionsData);
      setDistricts(districtsData);
    } catch (error) {
      console.error("Failed to fetch app data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppDataContext.Provider value={{ regions, districts, loading, refetchData: fetchData }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};