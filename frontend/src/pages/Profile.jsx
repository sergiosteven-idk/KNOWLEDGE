// ==============================
// 👤 PERFIL DE USUARIO — KNOWLEDGE
// ==============================
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAccessibility } from "../contexts/AccessibilityContext";

export default function Profile() {
  const { darkMode, highContrast } = useAccessibility();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    tipo_usuario: "",
  });

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
    try {
      await api.put(`/auth/update/${user.id}`, form);
      alert("✅ Perfil actualizado correctamente.");

      // Actualiza los datos en localStorage también
      const actualizado = { ...user, nombre: form.nombre, apellido: form.apellido, correo: form.correo };
      localStorage.setItem("usuario", JSON.stringify(actualizado));
    } catch (error) {
      alert("❌ Error al actualizar perfil.");
    }
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        highContrast
          ? "bg-yellow-50 text-black"
          : darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Tu perfil
      </h1>

      <form
        onSubmit={actualizarPerfil}
        className="max-w-md mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <label className="block mb-2 font-semibold">Nombre</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-black mb-4"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <label className="block mb-2 font-semibold">Apellido</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-black mb-4"
          value={form.apellido}
          onChange={(e) => setForm({ ...form, apellido: e.target.value })}
        />

        <label className="block mb-2 font-semibold">Correo electrónico</label>
        <input
          type="email"
          className="w-full p-2 border rounded text-black mb-4"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />

        <label className="block mb-2 font-semibold">Rol</label>
        <input
          disabled
          className="w-full p-2 border rounded bg-gray-200 text-black mb-6"
          value={form.tipo_usuario || "estudiante"}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
