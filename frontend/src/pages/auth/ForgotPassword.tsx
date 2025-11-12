// ==============================
// 🔐 RECUPERACIÓN DE CONTRASEÑA (RF-06)
// ==============================
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import Container from "../../components/ui/Container";
import api from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { darkMode, highContrast } = useAccessibility();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !email.includes("@")) {
      setError("Por favor, ingresa un correo electrónico válido");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/forgot-password", { correo: email });
      setSuccess(true);
      setEmail("");
      // Auto-redirigir después de 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message ||
        "No pudimos procesar tu solicitud. Verifica el correo e intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const bgClass = highContrast ? "bg-yellow-50" : darkMode ? "bg-gray-900" : "bg-white";
  const textClass = highContrast ? "text-black" : darkMode ? "text-white" : "text-gray-900";
  const cardClass = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass} ${textClass} py-12 px-4`}>
      <Container className="w-full max-w-md">
        <div className={`p-8 rounded-lg border shadow-lg ${cardClass}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">🔐 Recuperar Contraseña</h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {success ? (
            <div className={`p-6 rounded-lg mb-6 ${
              darkMode ? "bg-green-900/20 border border-green-700" : "bg-green-100 border border-green-300"
            }`}>
              <h2 className={`font-bold mb-2 ${darkMode ? "text-green-300" : "text-green-700"}`}>
                ✅ Correo enviado correctamente
              </h2>
              <p className={`text-sm mb-4 ${darkMode ? "text-green-200" : "text-green-600"}`}>
                Revisa tu bandeja de entrada (y spam) para el enlace de recuperación.
              </p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Redirigiendo al login en 3 segundos...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  📧 Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-knowledge-green ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className={`p-3 rounded-lg text-sm ${
                  darkMode ? "bg-red-900/20 border border-red-700 text-red-300" : "bg-red-100 border border-red-300 text-red-700"
                }`}>
                  ❌ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-knowledge-green text-white hover:bg-knowledge-green/90 focus:outline-none focus:ring-2 focus:ring-knowledge-green focus:ring-offset-2"
              >
                {loading ? "⏳ Enviando..." : "📬 Enviar enlace de recuperación"}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  ¿Recuerdas tu contraseña?{" "}
                  <Link
                    to="/login"
                    className="text-knowledge-green font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-knowledge-green rounded px-1"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* Register Link */}
          <div className="mt-6 text-center border-t border-gray-300 dark:border-gray-700 pt-6">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-knowledge-green font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-knowledge-green rounded px-1"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
