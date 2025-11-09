import React, { useEffect, useState } from "react";
import axios from "axios";

const ContenidoAdmin = () => {
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || "";

  const fetchContenidos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/contenidos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContenidos(res.data);
    } catch (error) {
      console.error("❌ Error al obtener contenidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContenidos();
  }, []);

  const aprobarContenido = async (id: number) => {
    if (!window.confirm("¿Aprobar este contenido?")) return;
    try {
      await axios.put(
        `http://localhost:5000/api/admin/contenido/${id}/aprobar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Contenido aprobado correctamente.");
      fetchContenidos();
    } catch (error) {
      console.error("❌ Error al aprobar contenido:", error);
      alert("Error al aprobar el contenido.");
    }
  };

  const rechazarContenido = async (id: number) => {
    if (!window.confirm("¿Rechazar este contenido?")) return;
    try {
      await axios.put(
        `http://localhost:5000/api/admin/contenido/${id}/rechazar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("❌ Contenido rechazado.");
      fetchContenidos();
    } catch (error) {
      console.error("❌ Error al rechazar contenido:", error);
      alert("Error al rechazar el contenido.");
    }
  };

  const eliminarContenido = async (id: number) => {
    if (!window.confirm("¿Eliminar este contenido permanentemente?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/contenido/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Contenido eliminado correctamente.");
      fetchContenidos();
    } catch (error) {
      console.error("❌ Error al eliminar contenido:", error);
      alert("Error al eliminar el contenido.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-blue-400 animate-pulse">
        Cargando contenidos...
      </div>
    );

  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">
        Gestión de Contenidos
      </h1>

      {contenidos.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay contenidos en el sistema.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border border-gray-700">Título</th>
                <th className="p-3 border border-gray-700">Tipo</th>
                <th className="p-3 border border-gray-700">Autor</th>
                <th className="p-3 border border-gray-700">Estado</th>
                <th className="p-3 border border-gray-700">Nivel</th>
                <th className="p-3 border border-gray-700">Fecha</th>
                <th className="p-3 border border-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contenidos.map((c) => (
                <tr
                  key={c.id_contenido}
                  className="text-center bg-gray-900 text-gray-200 hover:bg-gray-800 transition"
                >
                  <td className="p-2 border border-gray-700">{c.titulo}</td>
                  <td className="p-2 border border-gray-700 capitalize">
                    {c.tipo || "—"}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {c.autor || "Anónimo"}
                  </td>
                  <td
                    className={`p-2 border font-semibold ${
                      c.estado === "aprobado"
                        ? "text-green-400"
                        : c.estado === "pendiente"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {c.estado}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {c.nivel_dificultad || "—"}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {c.fecha_publicacion || "—"}
                  </td>
                  <td className="p-2 border border-gray-700 space-x-2">
                    {c.estado !== "aprobado" && (
                      <button
                        onClick={() => aprobarContenido(c.id_contenido)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                      >
                        Aprobar
                      </button>
                    )}
                    {c.estado !== "rechazado" && (
                      <button
                        onClick={() => rechazarContenido(c.id_contenido)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md"
                      >
                        Rechazar
                      </button>
                    )}
                    <button
                      onClick={() => eliminarContenido(c.id_contenido)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
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
