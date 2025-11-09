import React, { useState } from 'react';
import UsuariosAdmin from './UsuariosAdmin';
import ContenidoAdmin from './ContenidoAdmin';
import EstadisticasAdmin from './EstadisticasAdmin';

const AdminDashboard = () => {
  const [view, setView] = useState('usuarios');

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Panel Admin</h2>
        <button onClick={() => setView('usuarios')} className="btn bg-blue-700 hover:bg-blue-800">Usuarios</button>
        <button onClick={() => setView('contenido')} className="btn bg-blue-700 hover:bg-blue-800">Contenido</button>
        <button onClick={() => setView('estadisticas')} className="btn bg-blue-700 hover:bg-blue-800">Estadísticas</button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {view === 'usuarios' && <UsuariosAdmin />}
        {view === 'contenido' && <ContenidoAdmin />}
        {view === 'estadisticas' && <EstadisticasAdmin />}
      </main>
    </div>
  );
};

export default AdminDashboard;
