import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const obtenerProgreso = async (userId: number, token: string) => {
  const res = await axios.get(`${API_URL}/progreso/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
