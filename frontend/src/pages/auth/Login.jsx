// ==============================
// 🔐 LOGIN — KNOWLEDGE
// ==============================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export default function Login() {
  const { login, loading } = useAuth();
  const { highContrast, darkMode } = useAccessibility();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(correo, contrasena);
    if (!res.ok) {
      setError(res.msg);
      return;
    }
    navigate("/dashboard");
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
          Iniciar sesión
        </h1>

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <label className="block mb-2 font-semibold">Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          required
        />

        <label className="block mb-2 font-semibold">Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full p-2 border rounded mb-6 text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        <p className="text-sm mt-4 text-center">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}
