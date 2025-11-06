import axios from 'axios';

import { BASE_API_URL } from './api';

export const getAllRegions = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/regions`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const createRegion = async (regionData: { name: string }) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/regions`, regionData);
    return response.data;
  } catch (error) {
    console.error('Error creating region:', error);
    throw error;
  }
};

export const updateRegion = async (regionData: any) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/regions`, regionData);
    return response.data;
  } catch (error) {
    console.error('Error updating region:', error);
    throw error;
  }
};

export const deleteRegion = async (regionId: string) => {
  try {
    const response = await axios.delete(`${BASE_API_URL}/regions/${regionId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting region:', error);
    throw error;
  }
};

export const uploadRegions = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${BASE_API_URL}/regions/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading regions:', error);
    throw error;
  }
};