import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { ok, msg } = await login(correo, contrasena);
    if (!ok) return setErr(msg);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Iniciar sesión</h1>
        {err && <p className="text-red-500 mb-2">{err}</p>}
        <label className="block mb-2 font-medium">Correo</label>
        <input className="w-full p-2 rounded border mb-4 text-black" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <label className="block mb-2 font-medium">Contraseña</label>
        <input type="password" className="w-full p-2 rounded border mb-6 text-black" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        <button className="btn w-full" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
      </form>
    </div>
  );
}
