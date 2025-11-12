// ==============================
// 📝 REGISTRO — KNOWLEDGE
// ==============================
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/form/FormContainer";
import FormLabel from "../../components/form/FormLabel";
import FormInput from "../../components/form/FormInput";
import FormCheckbox from "../../components/form/FormCheckbox";
import FormSubmitButton from "../../components/form/FormSubmitButton";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!form.correo.includes("@")) newErrors.correo = "Correo inválido";
    if (form.contrasena.length < 6)
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres";
    if (form.contrasena !== form.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!termsAccepted)
      newErrors.terms = "Debes aceptar los términos y condiciones";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await register({
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      contrasena: form.contrasena,
    });

    if (res.ok) {
      setSuccessMsg("✅ Usuario registrado. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setErrors({ submit: res.msg });
    }
  };

  return (
    <FormContainer title="Crear cuenta" subtitle="Únete a la comunidad Knowledge">
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {errors.submit && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-scale-in">
            <p className="text-red-700 font-semibold flex items-center gap-2">
              <span className="animate-shake">⚠️</span> {errors.submit}
            </p>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg animate-scale-in">
            <p className="text-green-700 font-semibold flex items-center gap-2">
              <span className="animate-checkmark">✅</span> {successMsg}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel icon="👤" required>
              Nombre
            </FormLabel>
            <FormInput
              type="text"
              placeholder="Juan"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              error={!!errors.nombre}
              helperText={errors.nombre}
              required
            />
          </div>
          <div>
            <FormLabel icon="👤" required>
              Apellido
            </FormLabel>
            <FormInput
              type="text"
              placeholder="Pérez"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              error={!!errors.apellido}
              helperText={errors.apellido}
              required
            />
          </div>
        </div>

        <div>
          <FormLabel icon="📧" required>
            Correo electrónico
          </FormLabel>
          <FormInput
            type="email"
            placeholder="tu@correo.com"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
            error={!!errors.correo}
            helperText={errors.correo || "Usarás esto para iniciar sesión"}
            required
          />
        </div>

        <div>
          <FormLabel icon="🔐" required>
            Contraseña
          </FormLabel>
          <FormInput
            type="password"
            placeholder="••••••••"
            value={form.contrasena}
            onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
            error={!!errors.contrasena}
            helperText={
              errors.contrasena ||
              "Mínimo 6 caracteres, letras y números"
            }
            required
          />
        </div>

        <div>
          <FormLabel icon="🔐" required>
            Confirmar contraseña
          </FormLabel>
          <FormInput
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
          />
        </div>

        <FormCheckbox
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          label="Acepto los términos y condiciones"
          error={!!errors.terms}
          helperText={
            errors.terms ||
            "Leíste y aceptas nuestros términos de servicio"
          }
        />

        <div className="pt-4">
          <FormSubmitButton type="submit" loading={loading} icon="✨">
            Crear cuenta
          </FormSubmitButton>
        </div>

        <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/10">
          <span className="text-purple-100 text-sm">¿Ya tienes cuenta?</span>
          <a
            href="/login"
            className="text-white font-semibold hover:text-purple-100 transition-colors"
          >
            Inicia sesión
          </a>
        </div>
      </form>
    </FormContainer>
  );
}
