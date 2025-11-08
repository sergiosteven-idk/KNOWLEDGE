// ==============================
// 📊 DASHBOARD DE PROGRESO (ACCESIBLE)
// ==============================

import React, { useEffect, useState } from 'react';
import { obtenerProgreso } from '../services/api';
import { useAccessibility } from '../contexts/AccessibilityContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface Progreso {
  id_progreso: number;
  tipo_progreso: string;
  porcentaje_completado: number;
  tiempo_total_segundos: number;
  estado: string;
  contenido: string;
  tipo_contenido: string;
}

const Dashboard: React.FC = () => {
  const { highContrast, darkMode } = useAccessibility();
  const [progreso, setProgreso] = useState<Progreso[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || '';
  const userId = 2; // 👈 puedes enlazarlo con tu auth en el futuro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerProgreso(userId, token);
        // Convierte valores de texto a número si es necesario
        const parsed = data.map((p: any) => ({
          ...p,
          porcentaje_completado: parseFloat(p.porcentaje_completado),
        }));
        setProgreso(parsed);
      } catch (error) {
        console.error('Error al cargar progreso:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando progreso...</p>;

  return (
    <div
      className={`min-h-screen p-8 transition ${
        highContrast
          ? 'bg-yellow-50 text-black'
          : darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Tu progreso de aprendizaje
      </h1>

      {progreso.length === 0 ? (
        <p className="text-center text-gray-600">No tienes progreso registrado aún.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* 🟦 Tarjetas individuales */}
          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {progreso.map((item) => (
              <div
                key={item.id_progreso}
                className={`p-4 rounded-xl shadow-lg border ${
                  highContrast ? 'bg-yellow-100 border-black' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h2 className="text-lg font-semibold text-blue-700">
                  {item.contenido}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{item.tipo_contenido}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${item.porcentaje_completado}%` }}
                  ></div>
                </div>
                <p className="text-sm">Progreso: {item.porcentaje_completado}%</p>
                <p className="text-sm">Tiempo total: {(item.tiempo_total_segundos / 60).toFixed(1)} min</p>
                <p className="text-sm">Estado: {item.estado}</p>
              </div>
            ))}
          </div>

          {/* 📊 Gráfico de barras */}
          <h2 className="text-xl font-semibold text-center mb-4">Resumen visual</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progreso}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="contenido" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="porcentaje_completado" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
