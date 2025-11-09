import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/admin/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuarios registrados</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario} className="text-center bg-white dark:bg-gray-800">
              <td className="p-2 border">{u.nombre} {u.apellido}</td>
              <td className="p-2 border">{u.correo}</td>
              <td className="p-2 border">{u.tipo_usuario}</td>
              <td className="p-2 border">{u.activo ? 'Activo ✅' : 'Inactivo ❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosAdmin;
