import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const EstadisticasAdmin = () => {
  const [stats, setStats] = useState<any>(null);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('http://localhost:5000/api/admin/estadisticas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  const data = [
    { name: 'Usuarios', value: stats.total_usuarios },
    { name: 'Contenidos', value: stats.total_contenidos },
  ];

  const COLORS = ['#3B82F6', '#10B981'];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Estadísticas del Sistema</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={120} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <p className="mt-4">
        Promedio de progreso de los usuarios: <strong>{stats.promedio_progreso}%</strong>
      </p>
    </div>
  );
};

export default EstadisticasAdmin;
