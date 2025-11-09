// ==============================
// 📤 DASHBOARD DE USUARIO — SUBIDA DE CONTENIDO
// ==============================
import React, { useEffect, useState } from "react";
import {
  subirContenido,
  obtenerContenidoUsuario,
  obtenerProgreso,
} from "../services/api";
import { useAccessibility } from "../contexts/AccessibilityContext";

const Dashboard = () => {
  const { highContrast, darkMode } = useAccessibility();
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [progreso, setProgreso] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [archivo, setArchivo] = useState<File | null>(null);

  const [nuevo, setNuevo] = useState({
    titulo: "",
    descripcion: "",
    tipo: "video",
    nivel_dificultad: "principiante",
  });

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    const cargarDatos = async () => {
      const prog = await obtenerProgreso(user.id);
      const cont = await obtenerContenidoUsuario(user.id);
      setProgreso(prog);
      setContenidos(cont);
    };
    cargarDatos();
  }, []);

  const handleSubir = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(nuevo).forEach(([k, v]) => formData.append(k, v));
    if (archivo) formData.append("archivo", archivo);
    formData.append("id_autor", user.id);

    try {
      await subirContenido(formData, setUploadProgress);
      alert("✅ Contenido enviado para revisión.");
      setNuevo({
        titulo: "",
        descripcion: "",
        tipo: "video",
        nivel_dificultad: "principiante",
      });
      setArchivo(null);
      setUploadProgress(0);
      const cont = await obtenerContenidoUsuario(user.id);
      setContenidos(cont);
    } catch (error) {
      alert("❌ Error al subir contenido.");
      setUploadProgress(0);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition ${
        highContrast
          ? "bg-yellow-50 text-black"
          : darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Panel de Usuario</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Sube videos o documentos para compartir con la comunidad.
      </p>

      <form
        onSubmit={handleSubir}
        className="space-y-4 max-w-lg bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <input
          placeholder="Título"
          className="w-full p-2 border rounded text-black"
          value={nuevo.titulo}
          onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
          required
        />

        <textarea
          placeholder="Descripción"
          className="w-full p-2 border rounded text-black"
          value={nuevo.descripcion}
          onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
        />

        <select
          className="w-full p-2 border rounded text-black"
          value={nuevo.tipo}
          onChange={(e) => setNuevo({ ...nuevo, tipo: e.target.value })}
        >
          <option value="video">Video</option>
          <option value="pdf">Documento PDF</option>
          <option value="curso">Curso</option>
        </select>

        <input
          type="file"
          accept="video/mp4,application/pdf"
          onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded text-black"
        />

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-300 rounded mt-2">
            <div
              className="bg-blue-600 text-xs text-white text-center rounded"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Enviar contenido
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
