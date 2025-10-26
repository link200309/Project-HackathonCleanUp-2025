import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";

export function useProfileSetup() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async ({ city, avatarIcon }) => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }

      return { success: true };
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
    error,
  };
}
