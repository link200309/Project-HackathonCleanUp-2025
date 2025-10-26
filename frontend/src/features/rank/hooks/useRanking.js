import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";

/**
 * Hook para obtener el ranking global de usuarios
 * @param {number} limit - Número máximo de usuarios a obtener (default: 100)
 * @returns {Object} - { rankings, loading, error, refreshRanking }
 */
export function useRanking(limit = 100) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRanking = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Query optimizada según SUPABASE-SETUP.md
      const { data, error: fetchError } = await supabase
        .from("users")
        .select(
          `
          id,
          username,
          avatar_icon,
          city,
          user_stats!inner (
            total_xp,
            current_level,
            challenges_completed,
            current_streak
          )
        `
        )
        .order("user_stats(total_xp)", { ascending: false })
        .limit(limit);

      if (fetchError) throw fetchError;

      // Agregar ranking number y formatear datos
      const formattedData = data.map((user, index) => ({
        rank: index + 1,
        id: user.id,
        username: user.username,
        avatar_icon: user.avatar_icon || "🌱",
        city: user.city || "Sin ciudad",
        total_xp: user.user_stats.total_xp,
        current_level: user.user_stats.current_level,
        challenges_completed: user.user_stats.challenges_completed,
        current_streak: user.user_stats.current_streak,
      }));

      setRankings(formattedData);
    } catch (err) {
      console.error("❌ Error fetching ranking:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRanking();

    // Suscripción a cambios en tiempo real
    const subscription = supabase
      .channel("user_stats_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_stats",
        },
        () => {
          console.log("🔄 Ranking actualizado en tiempo real");
          fetchRanking();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [limit]);

  return {
    rankings,
    loading,
    error,
    refreshRanking: fetchRanking,
  };
}
