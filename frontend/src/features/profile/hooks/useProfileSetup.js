import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../auth/context/AuthContext";

/**
 * Hook personalizado para configurar el perfil del usuario
 * Maneja ciudad y selección de avatar
 */
export function useProfileSetup() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Actualiza el perfil del usuario con ciudad y avatar
   */
  const updateProfile = async ({ city, avatarIcon }) => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }

      // Actualizar en la tabla public.users
      const { error: updateError } = await supabase
        .from("users")
        .update({
          city: city || null,
          avatar_icon: avatarIcon,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      // Refrescar datos del usuario en el contexto
      if (refreshUser) {
        await refreshUser();
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
