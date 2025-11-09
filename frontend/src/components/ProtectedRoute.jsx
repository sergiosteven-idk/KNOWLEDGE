// ==============================
// 🛡️ RUTA PROTEGIDA — KNOWLEDGE
// ==============================
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * ProtectedRoute
 * @param {ReactNode} children - Componente hijo protegido
 * @param {string[]} roles - (Opcional) lista de roles permitidos
 */
export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth();

  // 🚫 No hay usuario logueado → redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Si hay restricción de roles, verificar el rol del usuario
  if (roles.length > 0 && !roles.includes(user.tipo_usuario)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Usuario autorizado → mostrar componente
  return children;
}
