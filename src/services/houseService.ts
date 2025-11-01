import axios from 'axios';

import { BASE_API_URL } from './api';

export const addHouse = async (houseData: any) => {
  const response = await axios.post(`${BASE_API_URL}/houses`, houseData);
  return response.data;
};

export const updateHouse = async (houseData: any) => {
  const response = await axios.put(`${BASE_API_URL}/houses`, houseData);
  return response.data;
};

export const getAllHouses = async () => {
  const response = await axios.get(`${BASE_API_URL}/houses`);
  return response.data;
};

export const deleteHouse = async (houseId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/houses/${houseId}`);
  return response.data;
};