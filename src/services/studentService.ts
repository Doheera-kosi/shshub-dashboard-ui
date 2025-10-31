import axios from 'axios';

const API_BASE_URL = 'https://84.247.136.103/shshub/api/v1';

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};