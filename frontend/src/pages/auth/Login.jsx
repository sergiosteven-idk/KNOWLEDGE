// ==============================
// 🔐 LOGIN — KNOWLEDGE
// ==============================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormContainer from "../../components/form/FormContainer";
import FormLabel from "../../components/form/FormLabel";
import FormInput from "../../components/form/FormInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import Logo from "../../components/Logo";

export default function Login() {
  const { login, loading } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(correo, contrasena);
    if (!res.ok) {
      setError(res.msg);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <FormContainer title="Iniciar sesión" subtitle="Bienvenido a Knowledge">
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-scale-in">
            <p className="text-red-700 font-semibold flex items-center gap-2">
              <span className="animate-shake">⚠️</span> {error}
            </p>
          </div>
        )}

        <div>
          <FormLabel icon="👤" required>
            Correo electrónico
          </FormLabel>
          <FormInput
            type="email"
            placeholder="tu@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            icon="📧"
            error={error ? true : false}
            helperText="Ingresa el correo con el que te registraste"
            required
          />
        </div>

        <div>
          <FormLabel icon="🔐" required>
            Contraseña
          </FormLabel>
          <FormInput
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            icon="🔒"
            error={error ? true : false}
            helperText={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-purple-200 hover:text-white transition-colors"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            }
            required
          />
        </div>

        <div className="pt-4">
          <FormSubmitButton type="submit" loading={loading} icon="→">
            Iniciar sesión
          </FormSubmitButton>
        </div>

        <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10">
          <a
            href="#"
            className="text-purple-200 hover:text-white text-sm transition-colors font-medium"
          >
            ¿Olvidaste tu contraseña?
          </a>
          <p className="text-purple-100 text-sm">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="text-white font-semibold hover:text-purple-100 transition-colors"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}
