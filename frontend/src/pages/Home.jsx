// ==============================
// 🏠 HOME / FEED DE CONTENIDO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import { obtenerFeed } from "../services/api";
import { useAccessibility } from "../contexts/AccessibilityContext";

export default function Home() {
  const { darkMode, highContrast } = useAccessibility();
  const [contenidos, setContenidos] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const fetch = async () => {
      const res = await obtenerFeed();
      setContenidos(res);
    };
    fetch();
  }, []);

  const filtrados = contenidos.filter(
    (c) => filtro === "todos" || c.tipo === filtro
  );

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
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Contenidos Aprobados
      </h1>

      <div className="flex justify-center mb-6">
        <select
          className="p-2 border rounded text-black"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="video">Videos</option>
          <option value="pdf">Documentos PDF</option>
          <option value="curso">Cursos</option>
        </select>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center opacity-70">
          No hay contenidos publicados todavía.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((c) => (
            <div
              key={c.id_contenido}
              className="p-4 border rounded-lg shadow bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-blue-600 mb-2">{c.titulo}</h3>
              <p className="text-sm opacity-80 mb-3">{c.descripcion}</p>

              {c.tipo === "video" && c.archivo_url ? (
                <video controls className="w-full rounded-lg">
                  <source
                    src={`http://localhost:5000${c.archivo_url}`}
                    type="video/mp4"
                  />
                </video>
              ) : c.tipo === "pdf" ? (
                <a
                  href={c.url_contenido || `http://localhost:5000${c.archivo_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  📄 Ver documento PDF
                </a>
              ) : (
                <p className="italic text-gray-400">Tipo: {c.tipo}</p>
              )}

              <p className="text-xs opacity-60 mt-2">
                Publicado:{" "}
                {new Date(c.fecha_publicacion).toLocaleDateString("es-ES")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
