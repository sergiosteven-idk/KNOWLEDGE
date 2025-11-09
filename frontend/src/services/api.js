import axios from "axios";

// 🔗 Configuración base
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔒 Interceptor para incluir token JWT en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🧩 Funciones de utilidad (helpers)
export const obtenerProgreso = async (userId, token) => {
  const res = await api.get(`/progreso/${userId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};

// puedes seguir añadiendo más helpers si lo deseas, por ejemplo:
export const obtenerEventos = async () => (await api.get("/eventos")).data;
export const crearDonacion = async (payload) =>
  (await api.post("/donaciones", payload)).data;
export const enviarFeedback = async (payload) =>
  (await api.post("/feedback", payload)).data;

export default api;
