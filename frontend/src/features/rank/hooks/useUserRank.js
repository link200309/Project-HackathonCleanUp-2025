import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../auth/context/AuthContext";

/**
 * Hook para obtener el ranking del usuario actual
 * @returns {Object} - { userRank, loading, error }
 */
export function useUserRank() {
  const { user } = useAuth();
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchUserRank() {
      try {
        setLoading(true);
        setError(null);

        // Obtener datos del usuario
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select(
            `
            id,
            username,
            avatar_icon,
            city,
            user_stats (
              total_xp,
              current_level,
              challenges_completed,
              current_streak,
              longest_streak
            )
          `
          )
          .eq("id", user.id)
          .single();

        if (userError) throw userError;

        // Calcular ranking global (contar usuarios con más XP)
        const { count, error: countError } = await supabase
          .from("user_stats")
          .select("*", { count: "exact", head: true })
          .gt("total_xp", userData.user_stats.total_xp);

        if (countError) throw countError;

        const globalRank = count + 1;

        setUserRank({
          rank: globalRank,
          id: userData.id,
          username: userData.username,
          avatar_icon: userData.avatar_icon || "🌱",
          city: userData.city || "Sin ciudad",
          total_xp: userData.user_stats.total_xp,
          current_level: userData.user_stats.current_level,
          challenges_completed: userData.user_stats.challenges_completed,
          current_streak: userData.user_stats.current_streak,
          longest_streak: userData.user_stats.longest_streak,
        });
      } catch (err) {
        console.error("❌ Error fetching user rank:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserRank();
  }, [user]);

  return { userRank, loading, error };
}
