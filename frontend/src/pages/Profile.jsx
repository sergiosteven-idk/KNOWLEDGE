// ==============================
// 👤 PERFIL DE USUARIO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Logo from "../components/Logo";
import FormLabel from "../components/form/FormLabel";
import FormInput from "../components/form/FormInput";
import api from "../services/api.js";

export default function Profile() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    tipo_usuario: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  // Obtener datos del perfil al cargar
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const res = await api.get(`/auth/me/${user.id}`);
        setForm(res.data);
      } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
      }
    };
    obtenerPerfil();
  }, []);

  // Actualizar perfil
  const actualizarPerfil = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    setLoading(true);

    try {
      await api.put(`/auth/update/${user.id}`, form);
      setSuccessMsg("✅ Perfil actualizado correctamente.");

      // Actualiza los datos en localStorage también
      const actualizado = {
        ...user,
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
      };
      localStorage.setItem("usuario", JSON.stringify(actualizado));

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      setErrors({ submit: "❌ Error al actualizar perfil." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <main className="py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <Logo size={80} />
          <h1 className="text-4xl md:text-5xl font-extrabold text-knowledge-purple mt-6 mb-3">
            Mi Perfil
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Actualiza tu información personal y mantén tu perfil al día.
          </p>
        </section>

        {/* Profile Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card>
            {successMsg && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg animate-scale-in">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  <span className="animate-checkmark">✅</span> {successMsg}
                </p>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-scale-in">
                <p className="text-red-700 font-semibold flex items-center gap-2">
                  <span className="animate-shake">⚠️</span> {errors.submit}
                </p>
              </div>
            )}

            <form onSubmit={actualizarPerfil} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <FormLabel icon="👤" required>
                    Nombre
                  </FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Juan"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    error={!!errors.nombre}
                    helperText={errors.nombre}
                    required
                  />
                </div>

                {/* Apellido */}
                <div>
                  <FormLabel icon="👤" required>
                    Apellido
                  </FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Pérez"
                    value={form.apellido}
                    onChange={(e) =>
                      setForm({ ...form, apellido: e.target.value })
                    }
                    error={!!errors.apellido}
                    helperText={errors.apellido}
                    required
                  />
                </div>
              </div>

              {/* Correo electrónico */}
              <div>
                <FormLabel icon="📧" required>
                  Correo electrónico
                </FormLabel>
                <FormInput
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.correo}
                  onChange={(e) =>
                    setForm({ ...form, correo: e.target.value })
                  }
                  error={!!errors.correo}
                  helperText={errors.correo || "Este es tu correo registrado"}
                  required
                />
              </div>

              {/* Rol (disabled) */}
              <div>
                <FormLabel>Rol en la comunidad</FormLabel>
                <div className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 font-semibold text-base cursor-not-allowed">
                  {form.tipo_usuario || "Estudiante"}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  📌 El rol no puede ser modificado
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Guardando..." : "💾 Guardar Cambios"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </Container>
  );
}
