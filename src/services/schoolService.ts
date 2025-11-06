import axios from 'axios';

import { BASE_API_URL } from './api';

export const addSchool = async (hometownId: string, schoolData: any) => {
  const response = await axios.post(`${BASE_API_URL}/schools`, schoolData, {
    params: { hometownId },
  });
  return response.data;
};

export const updateSchool = async (schoolData: any) => {
  const response = await axios.put(`${BASE_API_URL}/schools`, schoolData);
  return response.data;
};

export const getAllSchools = async () => {
  const response = await axios.get(`${BASE_API_URL}/schools`);
  return response.data;
};

export const getSchoolsByDistrict = async (districtId: string) => {
    const response = await axios.get(`${BASE_API_URL}/schools/${districtId}`);
    return response.data.data;
};

export const getSchoolDetails = async (schoolId: string) => {
    const response = await axios.get(`${BASE_API_URL}/schools/${schoolId}`);
    return response.data;
};

export const deleteSchool = async (schoolId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/schools/${schoolId}`);
  return response.data;
};

export const uploadSchools = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASE_API_URL}/schools/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};