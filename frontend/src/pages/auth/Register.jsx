// ==============================
// 📝 REGISTRO — KNOWLEDGE
// ==============================
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, loading } = useAuth();
  const { darkMode, highContrast } = useAccessibility();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.ok) {
      setMsg("✅ Usuario registrado. Ahora inicia sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMsg("❌ " + res.msg);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition ${
        highContrast
          ? "bg-yellow-50 text-black"
          : darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Crear cuenta
        </h1>

        {msg && <p className="text-center mb-4">{msg}</p>}

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="p-2 border rounded text-black"
            required
          />
          <input
            placeholder="Apellido"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            className="p-2 border rounded text-black"
            required
          />
        </div>

        <input
          placeholder="Correo electrónico"
          type="email"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
          className="w-full p-2 border rounded text-black mt-4"
          required
        />

        <input
          placeholder="Contraseña"
          type="password"
          value={form.contrasena}
          onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
          className="w-full p-2 border rounded text-black mt-4"
          required
        />

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>

        <p className="text-sm mt-4 text-center">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
