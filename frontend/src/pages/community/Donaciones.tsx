import React, { useState } from 'react';
import axios from 'axios';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const Donaciones = () => {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [anonima, setAnonima] = useState(false);
  const { darkMode } = useAccessibility();
  const token = localStorage.getItem('token') || '';
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');

  const enviarDonacion = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/donaciones',
        { id_usuario: user.id, monto, metodo_pago: 'transferencia', mensaje_donante: mensaje, anonima },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('💙 ¡Gracias por tu apoyo!');
    } catch {
      alert('❌ Error al procesar donación');
    }
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Haz una Donación</h1>

      <div className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800">
        <label className="block mb-2 font-medium">Monto (USD)</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />

        <label className="block mb-2 font-medium">Mensaje opcional</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />

        <div className="flex items-center mb-4">
          <input type="checkbox" checked={anonima} onChange={() => setAnonima(!anonima)} />
          <span className="ml-2 text-sm">Donar de forma anónima</span>
        </div>

        <button onClick={enviarDonacion} className="btn w-full">
          Donar
        </button>
      </div>
    </div>
  );
};

export default Donaciones;
