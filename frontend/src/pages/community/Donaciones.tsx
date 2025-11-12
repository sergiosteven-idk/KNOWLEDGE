import React, { useState } from 'react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Logo from '../../components/Logo';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormTextarea from '../../components/form/FormTextarea';
import FormCheckbox from '../../components/form/FormCheckbox';
import axios from 'axios';

const Donaciones = () => {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [anonima, setAnonima] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');
  const token = localStorage.getItem('token') || '';
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!monto || parseFloat(monto) <= 0) {
      newErrors.monto = 'Por favor ingresa un monto válido (mayor a 0)';
    }
    if (parseFloat(monto) < 1) {
      newErrors.monto = 'El monto mínimo es $1.00';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const enviarDonacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrors({});

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await axios.post(
        'http://localhost:5000/api/donaciones',
        {
          id_usuario: user.id,
          monto: parseFloat(monto),
          metodo_pago: 'transferencia',
          mensaje_donante: mensaje,
          anonima,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMsg('💙 ¡Gracias por tu apoyo a Knowledge!');
      setMonto('');
      setMensaje('');
      setAnonima(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      setErrors({ submit: 'Error al procesar la donación. Por favor intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <main className="py-6 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12 px-4 animate-fade-in">
          <Logo size={60} className="md:w-20 md:h-20 mx-auto" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-knowledge-purple mt-4 md:mt-6 mb-2 md:mb-3">
            Apoya el Conocimiento
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2">
            Tu donación ayuda a mantener y mejorar nuestra plataforma educativa. Cada aporte cuenta. 💙
          </p>
        </section>

        {/* Donation Form Card */}
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            {successMsg && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <p className="text-green-700 font-semibold">{successMsg}</p>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <p className="text-red-700 font-semibold flex items-center gap-2">
                  <span>⚠️</span> {errors.submit}
                </p>
              </div>
            )}

            <form onSubmit={enviarDonacion} className="space-y-5 md:space-y-6">
              {/* Amount Input */}
              <div>
                <FormLabel icon="💳" required>
                  Monto (USD)
                </FormLabel>
                <FormInput
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Ej: 25.00"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  error={errors.monto}
                  helperText={
                    errors.monto || 'Contribuye el monto que desees'
                  }
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <FormLabel icon="💬">
                  Mensaje (opcional)
                </FormLabel>
                <FormTextarea
                  placeholder="Cuéntanos por qué apoyas Knowledge..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  helperText="Comparte tu inspiración con nuestra comunidad"
                />
              </div>

              {/* Anonymous Checkbox */}
              <FormCheckbox
                id="anonima"
                checked={anonima}
                onChange={() => setAnonima(!anonima)}
                label="Realizar donación anónima"
                helperText="Tu nombre no será visible públicamente"
              />

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-12 text-base"
              >
                {isSubmitting ? '⏳ Procesando...' : '💙 Donar Ahora'}
              </Button>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm md:text-base">
                <p>
                  <strong>ℹ️ Seguridad:</strong> Usamos métodos de pago seguros encriptados. Tu información personal está protegida en todo momento.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </Container>
  );
};

export default Donaciones;
