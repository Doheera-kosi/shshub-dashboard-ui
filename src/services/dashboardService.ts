import { BASE_API_URL } from './api';

export const getDashboardSummary = async (region?: string, district?: string, school?: string) => {
  let url = `${BASE_API_URL}/dashboard/summary`;
  const params = new URLSearchParams();
  if (region) params.append('region', region);
  if (district) params.append('district', district);
  if (school) params.append('school', school);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard summary');
  }
  return response.json();
};

export const getBoardingStatus = async (region?: string, district?: string, school?: string) => {
  let url = `${BASE_API_URL}/dashboard/boarding-status`;
  const params = new URLSearchParams();
  if (region) params.append('region', region);
  if (district) params.append('district', district);
  if (school) params.append('school', school);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch boarding status');
  }
  return response.json();
};

export const getGenderCategorization = async (region?: string, district?: string, school?: string) => {
  let url = `${BASE_API_URL}/dashboard/gender-categorization`;
  const params = new URLSearchParams();
  if (region) params.append('region', region);
  if (district) params.append('district', district);
  if (school) params.append('school', school);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch gender categorization');
  }
  return response.json();
};

export const getRegionalDistribution = async (region?: string, district?: string, school?: string) => {
  let url = `${BASE_API_URL}/dashboard/regional-distribution`;
  const params = new URLSearchParams();
  if (region) params.append('region', region);
  if (district) params.append('district', district);
  if (school) params.append('school', school);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch regional distribution');
  }
  return response.json();
};