// ==============================
// 🔍 PÁGINA DE RESULTADOS DE BÚSQUEDA (RF-22)
// ==============================
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAccessibility } from "../contexts/AccessibilityContext";
import Container from "../components/ui/Container";
import api from "../services/api";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { darkMode, highContrast } = useAccessibility();
  
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [consulta, setConsulta] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const q = searchParams.get("q") || "";

  useEffect(() => {
    const buscar = async () => {
      if (!q.trim()) {
        setError("Por favor, ingresa un término de búsqueda");
        setLoading(false);
        return;
      }

      setLoading(true);
      setConsulta(q);
      setError("");

      try {
        const params = new URLSearchParams();
        params.append("q", q);
        if (filtroTipo) params.append("tipo", filtroTipo);
        if (filtroNivel) params.append("nivel", filtroNivel);

        const response = await api.get(`/contenido/buscar?${params.toString()}`);
        setResultados(response.data.resultados || []);
        
        if ((response.data.resultados || []).length === 0) {
          setError("No se encontraron resultados para tu búsqueda");
        }
      } catch (err) {
        console.error("Error en búsqueda:", err);
        setError("Error al buscar contenido");
      } finally {
        setLoading(false);
      }
    };

    buscar();
  }, [q, filtroTipo, filtroNivel]);

  const bgClass = highContrast
    ? "bg-yellow-50"
    : darkMode
    ? "bg-gray-900"
    : "bg-white";

  const textClass = highContrast
    ? "text-black"
    : darkMode
    ? "text-white"
    : "text-gray-900";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} py-8`}>
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            🔍 Resultados de búsqueda
          </h1>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {q && `Buscando: "${q}"`}
          </p>
        </div>

        {/* Filtros */}
        <div className={`mb-8 p-6 rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}>
          <h2 className="font-bold mb-4">Filtros</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Tipo de contenido</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="">Todos</option>
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="curso">Curso</option>
                <option value="texto">Texto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Nivel</label>
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <option value="">Todos</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl">Buscando... ⏳</div>
          </div>
        ) : error ? (
          <div className={`p-6 rounded-lg text-center ${
            darkMode ? "bg-red-900/20" : "bg-red-100"
          }`}>
            <p className="text-lg">❌ {error}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Volver al inicio
            </button>
          </div>
        ) : resultados.length === 0 ? (
          <div className={`p-6 rounded-lg text-center ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <p className="text-lg">Sin resultados</p>
          </div>
        ) : (
          <div>
            <p className="text-sm opacity-75 mb-6">
              Se encontraron {resultados.length} resultado{resultados.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resultados.map((contenido) => (
                <div
                  key={contenido.id_contenido}
                  className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                      {contenido.tipo.toUpperCase()}
                    </span>
                    <span className="text-xs opacity-60">{contenido.nivel_dificultad}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {contenido.titulo}
                  </h3>
                  
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {contenido.descripcion || "Sin descripción"}
                  </p>

                  <div className="flex items-center justify-between text-xs opacity-70 mb-4">
                    <span>👤 {contenido.autor || "Anónimo"}</span>
                    <span>📅 {new Date(contenido.fecha_publicacion).toLocaleDateString("es-ES")}</span>
                  </div>

                  {contenido.archivo_url && (
                    <a
                      href={`http://localhost:5000${contenido.archivo_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-4 py-2 rounded-lg bg-knowledge-green text-white text-sm font-semibold hover:bg-knowledge-green/90 transition"
                    >
                      📥 Descargar / Ver
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
