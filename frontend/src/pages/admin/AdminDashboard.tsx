// ==============================
// 🧑‍💼 PANEL ADMINISTRATIVO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ContenidoAdmin from "./ContenidoAdmin";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const AdminDashboard = () => {
  const { darkMode, highContrast } = useAccessibility();
  const [view, setView] = useState("usuarios");
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [estadisticas, setEstadisticas] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Cargar datos del panel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await api.get("/admin/usuarios");
        const resStats = await api.get("/admin/estadisticas");
        setUsuarios(resUsuarios.data);
        setEstadisticas(resStats.data);
      } catch (error) {
        console.error("❌ Error al cargar datos del panel admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
            view === "usuarios"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          👥 Usuarios
        </button>
        <button
          onClick={() => setView("contenido")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "contenido"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          📚 Contenido
        </button>
        <button
          onClick={() => setView("estadisticas")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "estadisticas"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          📊 Estadísticas
        </button>
      </div>

      {loading ? (
        <p className="text-center">Cargando datos...</p>
      ) : (
        <>
          {/* ============================== */}
          {/* 👥 SECCIÓN: USUARIOS */}
          {/* ============================== */}
          {view === "usuarios" && (
            <section className="overflow-x-auto">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                Lista de Usuarios
              </h2>
              {usuarios.length === 0 ? (
                <p>No hay usuarios registrados.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-3 border">Nombre</th>
                      <th className="p-3 border">Correo</th>
                      <th className="p-3 border">Rol</th>
                      <th className="p-3 border">Activo</th>
                      <th className="p-3 border">Fecha registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr
                        key={u.id_usuario}
                        className="text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <td className="p-2 border font-semibold">{u.nombre} {u.apellido}</td>
                        <td className="p-2 border">{u.correo}</td>
                        <td className="p-2 border capitalize">{u.tipo_usuario}</td>
                        <td className="p-2 border">
                          {u.activo ? (
                            <span className="text-green-600 font-semibold">Activo</span>
                          ) : (
                            <span className="text-red-600 font-semibold">Inactivo</span>
                          )}
                        </td>
                        <td className="p-2 border text-sm opacity-80">
                          {new Date(u.fecha_registro).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}

          {/* ============================== */}
          {/* 📚 SECCIÓN: CONTENIDO */}
          {/* ============================== */}
          {view === "contenido" && (
            <section>
              <ContenidoAdmin />
            </section>
          )}

          {/* ============================== */}
          {/* 📊 SECCIÓN: ESTADÍSTICAS */}
          {/* ============================== */}
          {view === "estadisticas" && (
            <section className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                Estadísticas del Sistema
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-blue-600">Usuarios</h3>
                  <p className="text-3xl font-bold mt-2">{estadisticas.total_usuarios}</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-blue-600">Contenidos</h3>
                  <p className="text-3xl font-bold mt-2">{estadisticas.total_contenidos}</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-blue-600">Promedio progreso</h3>
                  <p className="text-3xl font-bold mt-2">
                    {estadisticas.promedio_progreso || 0}%
                  </p>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
