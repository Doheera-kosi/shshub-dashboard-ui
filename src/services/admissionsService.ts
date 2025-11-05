import api from './api';

export const getAdmissionsCount = async () => {
  const response = await api.get('/api/v1/admissions/count');
  return response.data;
};