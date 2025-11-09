import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ nombre: "", apellido: "", correo: "", contrasena: "" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    setMsg(res.ok ? "Usuario registrado. Ahora inicia sesión." : res.msg);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Crear cuenta</h1>
        {msg && <p className="mb-2">{msg}</p>}
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Nombre" className="p-2 rounded border text-black" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}/>
          <input placeholder="Apellido" className="p-2 rounded border text-black" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })}/>
        </div>
        <input placeholder="Correo" className="w-full p-2 rounded border mt-3 text-black" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })}/>
        <input placeholder="Contraseña" type="password" className="w-full p-2 rounded border mt-3 text-black" value={form.contrasena} onChange={(e) => setForm({ ...form, contrasena: e.target.value })}/>
        <button className="btn w-full mt-4" disabled={loading}>{loading ? "Creando..." : "Registrarse"}</button>
      </form>
    </div>
  );
}
