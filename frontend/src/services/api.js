// ==============================
// 🌐 API SERVICE — KNOWLEDGE FRONTEND
// ==============================

import axios from "axios";

// Instancia base de Axios
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔒 Enviar token en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==============================
// 📡 ENDPOINTS REUTILIZABLES
// ==============================

// Subir contenido (con archivo)
export const subirContenido = async (formData, setProgress) => {
  const res = await api.post("/contenido", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      const progress = Math.round((e.loaded * 100) / e.total);
      if (setProgress) setProgress(progress);
    },
  });
  return res.data;
};

// Obtener progreso del usuario
export const obtenerProgreso = async (userId) => {
  const res = await api.get(`/progreso/${userId}`);
  return res.data;
};

// Obtener contenido del usuario
export const obtenerContenidoUsuario = async (userId) => {
  const res = await api.get(`/contenido/mis/${userId}`);
  return res.data;
};

// Feed público (contenidos aprobados)
export const obtenerFeed = async () => {
  const res = await api.get("/contenido/aprobados");
  return res.data;
};

// Admin: eliminar contenido
export const eliminarContenido = async (id) => {
  const res = await api.delete(`/admin/contenido/${id}`);
  return res.data;
};

export default api;
