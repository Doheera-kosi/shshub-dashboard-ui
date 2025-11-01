import axios from 'axios';

import { BASE_API_URL } from './api';

export const addProgram = async (programData: any) => {
  const response = await axios.post(`${BASE_API_URL}/programs`, programData);
  return response.data;
};

export const updateProgram = async (programData: any) => {
  const response = await axios.put(`${BASE_API_URL}/programs`, programData);
  return response.data;
};

export const getAllPrograms = async () => {
  const response = await axios.get(`${BASE_API_URL}/programs`);
  return response.data;
};

export const deleteProgram = async (programId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/programs/${programId}`);
  return response.data;
};