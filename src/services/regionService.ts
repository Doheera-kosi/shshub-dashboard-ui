import axios from 'axios';

const API_BASE_URL = 'https://84.247.136.103/shshub/api/v1';

export const getAllRegions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/regions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};