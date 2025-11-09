// ==============================
// 📊 DASHBOARD DE USUARIO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import { obtenerProgreso, obtenerContenidoUsuario, subirContenido } from "../services/api";
import { useAccessibility } from "../contexts/AccessibilityContext";

const Dashboard = () => {
  const { highContrast, darkMode } = useAccessibility();

  const [progreso, setProgreso] = useState<any[]>([]);
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [nuevo, setNuevo] = useState({
    titulo: "",
    descripcion: "",
    tipo: "video",
    url_contenido: "",
    nivel_dificultad: "principiante",
  });

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = localStorage.getItem("token") || "";

  // Cargar progreso y contenido del usuario
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const dataProgreso = await obtenerProgreso(user.id, token);
        setProgreso(dataProgreso);

        const dataContenidos = await obtenerContenidoUsuario(user.id);
        setContenidos(dataContenidos);
      } catch (err) {
        console.error("❌ Error al cargar datos del dashboard:", err);
      }
    };
    cargarDatos();
  }, []);

  // Subir contenido nuevo
  const handleSubir = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subirContenido({ ...nuevo, id_autor: user.id });
      alert("✅ Contenido enviado para revisión.");
      setNuevo({
        titulo: "",
        descripcion: "",
        tipo: "video",
        url_contenido: "",
        nivel_dificultad: "principiante",
      });
      const dataContenidos = await obtenerContenidoUsuario(user.id);
      setContenidos(dataContenidos);
    } catch (error) {
      alert("❌ Error al subir contenido.");
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
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Panel de Usuario
      </h1>
      <p className="text-lg mb-4">
        👋 Bienvenido, {user.nombre || "Usuario"}.
      </p>

      {/* === Progreso del usuario === */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Tu progreso</h2>
        {progreso.length === 0 ? (
          <p>No tienes progreso registrado aún.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {progreso.map((p) => (
              <div
                key={p.id_progreso}
                className="p-4 border rounded-lg shadow bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="font-bold text-blue-600">{p.contenido}</h3>
                <p className="text-sm">Progreso: {p.porcentaje_completado}%</p>
                <p className="text-sm">
                  Tiempo total: {(p.tiempo_total_segundos / 60).toFixed(1)} min
                </p>
                <p className="text-xs opacity-70">Estado: {p.estado}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* === Contenidos subidos === */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Tus contenidos subidos
        </h2>
        {contenidos.length === 0 ? (
          <p>No has subido contenido todavía.</p>
        ) : (
          <ul className="space-y-3">
            {contenidos.map((c) => (
              <li
                key={c.id_contenido}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
              >
                <h3 className="font-bold text-blue-600">{c.titulo}</h3>
                <p className="text-sm opacity-80">{c.descripcion}</p>
                <p className="text-xs">Estado: {c.estado}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* === Subir nuevo contenido === */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Subir nuevo contenido</h2>
        <form onSubmit={handleSubir} className="space-y-4 max-w-xl">
          <input
            placeholder="Título"
            className="w-full p-2 border rounded text-black"
            value={nuevo.titulo}
            onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            className="w-full p-2 border rounded text-black"
            value={nuevo.descripcion}
            onChange={(e) =>
              setNuevo({ ...nuevo, descripcion: e.target.value })
            }
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
            placeholder="URL del contenido"
            className="w-full p-2 border rounded text-black"
            value={nuevo.url_contenido}
            onChange={(e) =>
              setNuevo({ ...nuevo, url_contenido: e.target.value })
            }
          />
          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Enviar contenido
          </button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
