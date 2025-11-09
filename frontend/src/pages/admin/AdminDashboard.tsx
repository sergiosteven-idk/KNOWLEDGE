// ==============================
// 🧑‍💼 PANEL ADMINISTRATIVO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ContenidoAdmin from "./ContenidoAdmin";
import UsuariosAdmin from "./UsuariosAdmin";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const AdminDashboard = () => {
  const { darkMode, highContrast } = useAccessibility();
  const [view, setView] = useState<"usuarios" | "contenido" | "estadisticas">("usuarios");
  const [estadisticas, setEstadisticas] = useState<any>({ usuarios: 0, contenidos: 0, promedio_progreso: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/estadisticas");
        // Backend devuelve { usuarios, contenidos, promedio_progreso }
        setEstadisticas(res.data);
      } catch (error) {
        console.error("❌ Error al cargar estadísticas:", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div
      className={`min-h-screen p-6 transition ${
        highContrast
          ? "bg-yellow-50 text-black"
          : darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Panel Administrativo
      </h1>

      {/* Botones de navegación */}
      <div className="flex justify-center mb-8 flex-wrap gap-3">
        <button
          onClick={() => setView("usuarios")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "usuarios" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          👥 Usuarios
        </button>
        <button
          onClick={() => setView("contenido")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "contenido" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          📚 Contenido
        </button>
        <button
          onClick={() => setView("estadisticas")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "estadisticas" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          📊 Estadísticas
        </button>
      </div>

      {view === "usuarios" && <UsuariosAdmin />}
      {view === "contenido" && <ContenidoAdmin />}

      {view === "estadisticas" && (
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Estadísticas del Sistema</h2>
          {loadingStats ? (
            <p className="text-center">Cargando datos...</p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-600">Usuarios</h3>
                <p className="text-3xl font-bold mt-2">{estadisticas.usuarios}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-600">Contenidos</h3>
                <p className="text-3xl font-bold mt-2">{estadisticas.contenidos}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-600">Promedio progreso</h3>
                <p className="text-3xl font-bold mt-2">{estadisticas.promedio_progreso}%</p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;