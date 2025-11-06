import axios from 'axios';
import { BASE_API_URL } from './api';

export const getAdmissionsCount = async () => {
  const response = await axios.get(`${BASE_API_URL}/admissions/count`);
  return response.data;
};