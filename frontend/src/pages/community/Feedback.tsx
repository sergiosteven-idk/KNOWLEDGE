import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const Feedback = () => {
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const token = localStorage.getItem('token') || '';
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');
  const id_contenido = 1; // puedes enlazarlo al contenido actual
  const { darkMode, highContrast } = useAccessibility();

  // Obtener feedback existente
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await axios.get(`http://localhost:5000/api/feedback/${id_contenido}`);
      setFeedbacks(res.data);
    };
    fetchFeedbacks();
  }, []);

  // Enviar nuevo feedback
  const enviarFeedback = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/feedback',
        {
          id_usuario: user.id,
          id_contenido,
          tipo_feedback: 'contenido',
          calificacion,
          comentario,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ ¡Gracias por tu opinión!');
      setComentario('');
      const res = await axios.get(`http://localhost:5000/api/feedback/${id_contenido}`);
      setFeedbacks(res.data);
    } catch {
      alert('❌ Error al enviar feedback');
    }
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? 'bg-gray-900 text-white' : highContrast ? 'bg-yellow-50 text-black' : 'bg-white text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Opiniones y Calificaciones</h1>

      <div className="max-w-xl mx-auto mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <label className="block mb-2 font-semibold">Calificación (1 a 5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={calificacion}
          onChange={(e) => setCalificacion(Number(e.target.value))}
          className="w-full p-2 border rounded mb-4 text-black"
        />

        <label className="block mb-2 font-semibold">Tu comentario</label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />

        <button onClick={enviarFeedback} className="btn w-full">
          Enviar Feedback
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Comentarios recientes</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {feedbacks.map((fb) => (
          <div
            key={fb.id_feedback}
            className="p-4 rounded-lg shadow border bg-gray-50 dark:bg-gray-800"
          >
            <p className="font-semibold text-blue-700">{fb.nombre} {fb.apellido}</p>
            <p className="text-sm text-gray-600">⭐ {fb.calificacion}/5</p>
            <p className="mt-2">{fb.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
