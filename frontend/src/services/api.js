// ==============================
// 🌐 API SERVICE — KNOWLEDGE
// ==============================

import axios from "axios";

// 🔗 Instancia base de Axios
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔒 Interceptor para enviar token en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==============================
// 📊 HELPERS — llamados reutilizables
// ==============================

// Obtener progreso del usuario
export const obtenerProgreso = async (userId, token) => {
  const res = await api.get(`/progreso/${userId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};

// Subir contenido (usuario)
export const subirContenido = async (payload) => {
  const res = await api.post("/contenido", payload);
  return res.data;
};

// Obtener contenido del usuario
export const obtenerContenidoUsuario = async (userId) => {
  const res = await api.get(`/contenido/mis/${userId}`);
  return res.data;
};

// Obtener eventos
export const obtenerEventos = async () => {
  const res = await api.get("/eventos");
  return res.data;
};

// Crear donación
export const crearDonacion = async (payload) => {
  const res = await api.post("/donaciones", payload);
  return res.data;
};

// Enviar feedback
export const enviarFeedback = async (payload) => {
  const res = await api.post("/feedback", payload);
  return res.data;
};

export default api;
