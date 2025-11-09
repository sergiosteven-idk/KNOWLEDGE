import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContenidoAdmin = () => {
  const [contenidos, setContenidos] = useState<any[]>([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/admin/contenido', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContenidos(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Contenido</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {contenidos.map((c) => (
            <tr key={c.id_contenido} className="text-center bg-white dark:bg-gray-800">
              <td className="p-2 border">{c.titulo}</td>
              <td className="p-2 border">{c.tipo}</td>
              <td className="p-2 border">{c.estado}</td>
              <td className="p-2 border">{c.nivel_dificultad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContenidoAdmin;
