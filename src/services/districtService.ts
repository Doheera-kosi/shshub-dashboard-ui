import axios from 'axios';

import { BASE_API_URL } from './api';

export const addDistrict = async (regionId: string, districtData: any) => {
  const response = await axios.post(`${BASE_API_URL}/districts`, districtData, {
    params: { regionId },
  });
  return response.data;
};

export const updateDistrict = async (districtData: any) => {
  const response = await axios.put(`${BASE_API_URL}/districts`, districtData);
  return response.data;
};

export const getAllDistricts = async () => {
  const response = await axios.get(`${BASE_API_URL}/districts`);
  return response.data;
};

export const deleteDistrict = async (districtId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/districts/${districtId}`);
  return response.data;
};

export const uploadDistricts = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASE_API_URL}/districts/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};