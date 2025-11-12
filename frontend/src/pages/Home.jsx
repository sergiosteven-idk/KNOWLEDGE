// ==============================
// 🏠 HOME / FEED DE CONTENIDO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerFeed } from "../services/api.js";
import { useAccessibility } from "../contexts/AccessibilityContext";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import Logo from "../components/Logo";

export default function Home() {
  const { darkMode, highContrast } = useAccessibility();
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await obtenerFeed();
        setContenidos(res || []);
      } catch (err) {
        console.error(err);
        setError('Error al cargar contenidos. Intenta recargar.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtrados = contenidos.filter(
    (c) => filtro === "todos" || c.tipo === filtro
  );

  return (
    <Container>
      <main
        className={`min-h-screen py-8 transition ${
          highContrast
            ? "bg-yellow-50 text-black"
            : darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {/* Hero Section with Logo */}
        <section className="flex flex-col items-center justify-center py-8 md:py-12 gap-4 animate-fade-in">
          <Logo size={60} md:size={80} className="drop-shadow-lg" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-knowledge-purple text-center px-4">
            Contenidos Aprobados
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl px-4 text-sm md:text-base">
            Explora recursos educativos de calidad seleccionados por nuestra comunidad.
          </p>
        </section>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-4 px-4">
          <label htmlFor="tipo-filtro" className="sr-only">Filtrar contenidos por tipo</label>
          <select
            id="tipo-filtro"
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-knowledge-green transition-all duration-200 min-h-12"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            aria-label="Filtrar contenidos por tipo"
          >
            <option value="todos">📁 Todos los tipos</option>
            <option value="video">📹 Videos</option>
            <option value="pdf">📄 Documentos PDF</option>
            <option value="curso">🎓 Cursos</option>
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-12"><Loader /></div>
        ) : error ? (
          <div className="mx-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : filtrados.length === 0 ? (
          <p className="text-center opacity-70 py-8 px-4">No hay contenidos publicados todavía.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {filtrados.map((c, idx) => (
              <Card 
                key={c.id_contenido} 
                title={c.titulo} 
                className={`hover:shadow-lg transition animate-fade-in-delay-${(idx % 3) + 1}`}
              >
                <p className="text-sm opacity-80 mb-3">{c.descripcion}</p>

                {c.tipo === "video" && c.archivo_url ? (
                  <video controls className="w-full rounded-lg mb-3 max-h-40">
                    <source src={`http://localhost:5000${c.archivo_url}`} type="video/mp4" />
                  </video>
                ) : c.tipo === "pdf" ? (
                  <a href={c.url_contenido || `http://localhost:5000${c.archivo_url}`} target="_blank" rel="noreferrer" className="inline-block text-knowledge-purple hover:underline py-2 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    📄 Ver documento PDF
                  </a>
                ) : (
                  <p className="italic text-gray-400">Tipo: {c.tipo}</p>
                )}

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                  <Link to={`/feedback?contenido=${c.id_contenido}`} className="text-knowledge-green hover:underline font-medium min-h-10 flex items-center">Ver opiniones</Link>
                  <a href={c.url_contenido || `http://localhost:5000${c.archivo_url}`} target="_blank" rel="noreferrer" className="text-knowledge-purple hover:underline font-medium min-h-10 flex items-center">Abrir recurso</a>
                </div>

                <div className="mt-4 text-xs opacity-60 pt-3 border-t border-gray-200 dark:border-gray-700">
                  📅 {new Date(c.fecha_publicacion).toLocaleDateString("es-ES")}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </Container>
  );
}
