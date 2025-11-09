import React, { useEffect, useState } from "react";
import api, { eliminarContenido } from "../../services/api";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const ContenidoAdmin = () => {
  const { highContrast, darkMode } = useAccessibility();
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/contenido");
      setContenidos(res.data);
    } catch (error) {
      console.error("Error al cargar contenidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const aprobar = async (id: number) => {
    await api.put(`/admin/contenido/${id}/aprobar`);
    fetchData();
  };

  const rechazar = async (id: number) => {
    await api.put(`/admin/contenido/${id}/rechazar`);
    fetchData();
  };

  const eliminar = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este contenido?")) {
      await eliminarContenido(id);
      fetchData();
    }
  };

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
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Gestión de Contenidos
      </h1>

      {loading ? (
        <p className="text-center">Cargando contenidos...</p>
      ) : contenidos.length === 0 ? (
        <p className="text-center">No hay contenidos en el sistema.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border">Título</th>
                <th className="p-3 border">Tipo</th>
                <th className="p-3 border">Estado</th>
                <th className="p-3 border">Nivel</th>
                <th className="p-3 border">Fecha publicación</th>
                <th className="p-3 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contenidos.map((c) => (
                <tr
                  key={c.id_contenido}
                  className="text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2 border">{c.titulo}</td>
                  <td className="p-2 border capitalize">{c.tipo || "—"}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      c.estado === "aprobado"
                        ? "text-green-600"
                        : c.estado === "rechazado"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {c.estado || "pendiente"}
                  </td>
                  <td className="p-2 border">{c.nivel_dificultad || "—"}</td>
                  <td className="p-2 border text-xs">
                    {c.fecha_publicacion || "—"}
                  </td>
                  <td className="p-2 border space-x-2">
                    {c.estado !== "aprobado" && (
                      <>
                        <button
                          onClick={() => aprobar(c.id_contenido)}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => rechazar(c.id_contenido)}
                          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => eliminar(c.id_contenido)}
                      className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContenidoAdmin;
