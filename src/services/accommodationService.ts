import axios from 'axios';

import { BASE_API_URL } from './api';

export const addAccommodation = async (accommodationData: any) => {
  const response = await axios.post(`${BASE_API_URL}/accommodations`, accommodationData);
  return response.data;
};

export const updateAccommodation = async (accommodationData: any) => {
  const response = await axios.put(`${BASE_API_URL}/accommodations`, accommodationData);
  return response.data;
};

export const getAllAccommodations = async () => {
  const response = await axios.get(`${BASE_API_URL}/accommodations`);
  return response.data;
};

export const deleteAccommodation = async (accommodationId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/accommodations/${accommodationId}`);
  return response.data;
};