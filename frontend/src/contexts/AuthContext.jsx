// ==============================
// 🔒 CONTEXTO DE AUTENTICACIÓN — KNOWLEDGE
// ==============================
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // 🧩 LOGIN
  // ------------------------------
  const login = async (correo, contrasena) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { correo, contrasena });

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      setUser(data.usuario);

      return { ok: true };
    } catch (error) {
      console.error("❌ Error en login:", error);
      return { ok: false, msg: "Credenciales incorrectas o usuario inactivo." };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 🧩 REGISTRO
  // ------------------------------
  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", payload);
      return { ok: true, data };
    } catch (error) {
      console.error("❌ Error en registro:", error);
      return { ok: false, msg: "Error al registrar usuario." };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 🧩 LOGOUT
  // ------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUser(null);
  };

  // ------------------------------
  // 🧩 SINCRONIZAR USUARIO EN RECARGA
  // ------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
