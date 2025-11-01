import axios from 'axios';

import { BASE_API_URL } from './api';

export const addClass = async (classData: any) => {
  const response = await axios.post(`${BASE_API_URL}/classes`, classData);
  return response.data;
};

export const updateClass = async (classData: any) => {
  const response = await axios.put(`${BASE_API_URL}/classes`, classData);
  return response.data;
};

export const getAllClasses = async () => {
  const response = await axios.get(`${BASE_API_URL}/classes`);
  return response.data;
};

export const deleteClass = async (classId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/classes/${classId}`);
  return response.data;
};