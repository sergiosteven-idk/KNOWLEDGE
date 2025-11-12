import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api.js';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Logo from '../../components/Logo';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormTextarea from '../../components/form/FormTextarea';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import TextToSpeechHover from '../../components/accessibility/TextToSpeechHover';

const Feedback = () => {
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState('');
  const token = localStorage.getItem('token') || '';
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');
  const [searchParams] = useSearchParams();
  const id_contenido = searchParams.get('contenido');

  // Obtener feedback existente
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = id_contenido ? `/feedback/${id_contenido}` : '/feedback';
        const res = await api.get(url);
        setFeedbacks(res.data || []);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [id_contenido]);

  // Enviar nuevo feedback
  const enviarFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMsg('');
    
    if (!comentario.trim()) {
      setSubmitError('El comentario no puede estar vacío');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/feedback', {
        id_usuario: user.id,
        id_contenido: id_contenido || null,
        tipo_feedback: 'contenido',
        calificacion,
        comentario,
      });
      setSuccessMsg('✅ ¡Gracias por tu opinión!');
      setComentario('');
      setCalificacion(5);

      // Refresh feedback list
      const url = id_contenido ? `/feedback/${id_contenido}` : '/feedback';
      const res = await api.get(url);
      setFeedbacks(res.data || []);

      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setSubmitError('Error al enviar feedback. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <main className="py-6 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12 px-4 animate-fade-in">
          <Logo size={60} className="md:w-20 md:h-20 mx-auto" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-knowledge-purple mt-4 md:mt-6 mb-2 md:mb-3">
            Opiniones y Calificaciones
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2">
            Comparte tu experiencia con nuestra comunidad y ayuda a otros a conocer sobre este contenido.
          </p>
        </section>

        {/* Feedback Form Card */}
        <div className="max-w-2xl mx-auto px-4 mb-10 md:mb-12">
          <Card>
            <h2 className="text-2xl md:text-3xl font-extrabold text-knowledge-purple mb-6">
              📝 Deja tu opinión
            </h2>

            {successMsg && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg animate-scale-in">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  <span className="animate-checkmark">✅</span> {successMsg}
                </p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-scale-in">
                <p className="text-red-700 font-semibold flex items-center gap-2">
                  <span className="animate-shake">⚠️</span> {submitError}
                </p>
              </div>
            )}

            <form onSubmit={enviarFeedback} className="space-y-5 md:space-y-6">
              {/* Rating Input */}
              <div>
                <FormLabel icon="⭐" required>
                  Calificación
                </FormLabel>
                <div className="flex gap-3 items-center">
                  <FormInput
                    type="range"
                    min="1"
                    max="5"
                    value={calificacion}
                    onChange={(e) => setCalificacion(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-3xl font-extrabold text-knowledge-purple min-w-12 text-center">
                    {calificacion}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Muy malo</span>
                  <span>Excelente</span>
                </div>
              </div>

              {/* Comment Textarea */}
              <div>
                <FormLabel icon="💬" required>
                  Tu comentario
                </FormLabel>
                <FormTextarea
                  placeholder="Comparte qué te pareció este contenido..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows={5}
                  helperText="Sé honesto y constructivo. Tu opinión es valiosa."
                  required
                />
              </div>

              {/* Submit Button */}
              <FormSubmitButton 
                type="submit" 
                loading={submitting}
                icon="📤"
              >
                Enviar Opinión
              </FormSubmitButton>
            </form>
          </Card>
        </div>

        {/* Feedback List Section */}
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-knowledge-purple mb-6 text-center">
            💭 Comentarios de la comunidad
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : error ? (
            <Card>
              <p className="text-red-600 font-semibold text-center py-8">{error}</p>
            </Card>
          ) : feedbacks.length === 0 ? (
            <Card>
              <p className="text-gray-600 text-center py-8">
                Aún no hay comentarios. ¡Sé el primero en compartir tu opinión!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 stagger-container">
              {feedbacks.map((fb, index) => (
                <TextToSpeechHover
                  key={fb.id_feedback}
                  text={`Opinión de ${fb.nombre} ${fb.apellido}. Calificación: ${fb.calificacion} de 5 estrellas. Comentario: ${fb.comentario}`}
                  tag="div"
                  className={`animate-fade-in-delay-${Math.min(index, 3)}`}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-knowledge-purple text-base md:text-lg">
                          {fb.nombre} {fb.apellido}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl">⭐</span>
                          <span className="font-extrabold text-knowledge-purple text-lg">
                            {fb.calificacion}
                          </span>
                          <span className="text-gray-500 text-sm">/5</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {fb.comentario}
                    </p>
                  </Card>
                </TextToSpeechHover>
              ))}
            </div>
          )}
        </div>
      </main>
    </Container>
  );
};

export default Feedback;
