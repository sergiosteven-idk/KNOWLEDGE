// ==============================
// 👥 PANEL DE USUARIOS ADMINISTRATIVO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const UsuariosAdmin = () => {
  const { darkMode, highContrast } = useAccessibility();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/admin/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div
      className={`p-6 rounded-lg shadow transition ${
        highContrast
          ? "bg-yellow-50 text-black"
          : darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Usuarios registrados
      </h2>

      {loading ? (
        <p className="text-center">Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-center">No hay usuarios registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Correo</th>
                <th className="p-2 border">Rol</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr
                  key={u.id_usuario}
                  className="text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2 border">{u.nombre_completo}</td>
                  <td className="p-2 border">{u.correo}</td>
                  <td className="p-2 border capitalize">{u.tipo_usuario}</td>
                  <td className="p-2 border">
                    {u.activo ? (
                      <span className="text-green-600 font-semibold">Activo</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactivo</span>
                    )}
                  </td>
                  <td className="p-2 border text-xs">
                    {new Date(u.fecha_registro).toLocaleString("es-ES")}
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

export default UsuariosAdmin;
