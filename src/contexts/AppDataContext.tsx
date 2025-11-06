'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllRegions } from '@/services/regionService';
import { getAllDistricts } from '@/services/districtService';
import { Region } from '@/types/region';
import { District } from '@/types/district';

interface AppDataContextType {
  regions: Region[];
  districts: District[];
  loading: boolean;
  refetchData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regionsResponse, districtsResponse] = await Promise.all([
        getAllRegions(),
        getAllDistricts(),
      ]);
      setRegions(regionsResponse);
      setDistricts(districtsResponse);
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