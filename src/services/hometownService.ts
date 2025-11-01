import axios from 'axios';

import { BASE_API_URL } from './api';

export const addHometown = async (hometownData: any) => {
  const response = await axios.post(`${BASE_API_URL}/hometowns`, hometownData);
  return response.data;
};

export const updateHometown = async (hometownData: any) => {
  const response = await axios.put(`${BASE_API_URL}/hometowns`, hometownData);
  return response.data;
};

export const getAllHometowns = async () => {
  const response = await axios.get(`${BASE_API_URL}/hometowns`);
  return response.data;
};

export const deleteHometown = async (hometownId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/hometowns/${hometownId}`);
  return response.data;
};