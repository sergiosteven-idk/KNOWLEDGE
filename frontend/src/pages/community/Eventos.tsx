import React, { useEffect, useState } from 'react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Logo from '../../components/Logo';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import axios from 'axios';

const Eventos = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { highContrast, darkMode } = useAccessibility();
  const token = localStorage.getItem('token') || '';
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/eventos');
        setEventos(res.data);
        setError('');
      } catch (err) {
        setError('No se pudieron cargar los eventos. Por favor intenta más tarde.');
      } finally {
        setLoading(false);
      }
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
    <Container>
      <main className="py-6 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12 px-4 animate-fade-in">
          <Logo size={60} className="md:w-20 md:h-20 mx-auto" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-knowledge-purple mt-4 md:mt-6 mb-2 md:mb-3">
            Eventos Comunitarios
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-2">
            Únete a nuestros eventos y conecta con la comunidad. Aprende, participa y crece junto a otros.
          </p>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mx-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-300 text-center text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Events Grid */}
        {!loading && eventos.length > 0 && (
          <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {eventos.map((ev, idx) => (
              <Card
                key={ev.id_evento}
                title={ev.titulo}
                className={`animate-fade-in-delay-${(idx % 3) + 1}`}
                footer={
                  <Button
                    variant="primary"
                    onClick={() => registrarse(ev.id_evento)}
                    className="w-full min-h-11"
                  >
                    Inscribirme
                  </Button>
                }
              >
                {ev.imagen_url && (
                  <img
                    src={ev.imagen_url}
                    alt={ev.titulo}
                    className="rounded-lg mb-4 w-full h-32 md:h-40 object-cover"
                  />
                )}
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{ev.descripcion}</p>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p className="font-medium">📅 {new Date(ev.fecha_inicio).toLocaleDateString('es-ES')}</p>
                  <p className="font-medium">📍 {ev.ubicacion || 'Virtual'}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Events State */}
        {!loading && eventos.length === 0 && !error && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay eventos disponibles en este momento.
            </p>
          </div>
        )}
      </main>
    </Container>
  );
};

export default Eventos;
