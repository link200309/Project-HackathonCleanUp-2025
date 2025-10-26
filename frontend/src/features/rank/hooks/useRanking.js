import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";


export function useRanking(limit = 100) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRanking = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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
            current_streak
          )
        `
        )
        .order("user_stats(total_xp)", { ascending: false })
        .limit(limit);

      if (fetchError) throw fetchError;

      const userIds = data.map((user) => user.id);
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("user_id, is_completed")
        .in("user_id", userIds)
        .eq("is_completed", true);

      if (progressError) {
        console.error("Error fetching progress:", progressError);
      }

      const completedCounts = {};
      if (progressData) {
        progressData.forEach((progress) => {
          completedCounts[progress.user_id] =
            (completedCounts[progress.user_id] || 0) + 1;
        });
      }

      const formattedData = data.map((user, index) => ({
        rank: index + 1,
        id: user.id,
        username: user.username,
        avatar_icon: user.avatar_icon || "🌱",
        city: user.city || "Sin ciudad",
        total_xp: user.user_stats.total_xp,
        current_level: user.user_stats.current_level,
        challenges_completed: completedCounts[user.id] || 0, // Conteo real desde user_progress
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
