import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  // si se pasan roles, validarlos (p.ej. tipo_usuario: 'docente' | 'super_admin' | 'estudiante')
  if (roles.length && !roles.includes(user.tipo_usuario)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
