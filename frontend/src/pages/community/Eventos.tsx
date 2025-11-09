import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const Eventos = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const { highContrast, darkMode } = useAccessibility();
  const token = localStorage.getItem('token') || '';
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');

  useEffect(() => {
    const fetchEventos = async () => {
      const res = await axios.get('http://localhost:5000/api/eventos');
      setEventos(res.data);
    };
    fetchEventos();
  }, []);

  const registrarse = async (id_evento: number) => {
    try {
      await axios.post(
        'http://localhost:5000/api/eventos/registrar',
        { id_usuario: user.id, id_evento },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Te has inscrito al evento correctamente.');
    } catch (error) {
      alert('❌ Error al registrarse en el evento.');
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition ${
        highContrast ? 'bg-yellow-50 text-black' : darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Eventos Comunitarios</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventos.map((ev) => (
          <div key={ev.id_evento} className="p-4 rounded-xl shadow-lg border bg-gray-50 dark:bg-gray-800">
            <img src={ev.imagen_url} alt={ev.titulo} className="rounded-lg mb-3 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">{ev.titulo}</h2>
            <p className="text-sm mb-2">{ev.descripcion}</p>
            <p className="text-sm">📅 {new Date(ev.fecha_inicio).toLocaleDateString()}</p>
            <p className="text-sm">📍 {ev.ubicacion || 'Virtual'}</p>
            <button
              onClick={() => registrarse(ev.id_evento)}
              className="btn mt-3 w-full"
            >
              Inscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
