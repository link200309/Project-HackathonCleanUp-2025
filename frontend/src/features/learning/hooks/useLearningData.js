import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../auth/context/AuthContext";

export function useLearningData() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchLearningData() {
      try {
        setLoading(true);
        setError(null);

        const { data: challengesData, error: challengesError } = await supabase
          .from("challenges")
          .select("*")
          .eq("is_active", true)
          .order("order_index", { ascending: true, nullsFirst: false })
          .order("difficulty_level", { ascending: true });

        if (challengesError) throw challengesError;

        const { data: progressData, error: progressError } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id);

        if (progressError) throw progressError;

        const { data: statsData, error: statsError } = await supabase
          .from("user_stats")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (statsError) throw statsError;

        setChallenges(challengesData || []);
        setUserProgress(progressData || []);
        setStats(statsData);
      } catch (err) {
        console.error("❌ Error fetching learning data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLearningData();
  }, [user]);

  const isChallengeCompleted = (challengeId) => {
    return userProgress.some(
      (progress) =>
        progress.challenge_id === challengeId && progress.is_completed
    );
  };

  const getChallengeStars = (challengeId) => {
    const progress = userProgress.find(
      (p) => p.challenge_id === challengeId && p.is_completed
    );
    if (!progress) return 0;
    return progress.is_correct ? 3 : 1;
  };

  const lessons = challenges.map((challenge, index) => {
    const isCompleted = isChallengeCompleted(challenge.id);
    const stars = getChallengeStars(challenge.id);

    const previousChallenge = challenges[index - 1];
    const isPreviousCompleted = previousChallenge
      ? isChallengeCompleted(previousChallenge.id)
      : true;

    const isLocked = index > 0 && !isPreviousCompleted;
    const isActive = !isLocked;

    return {
      id: challenge.id,
      type: challenge.type,
      title: challenge.question.substring(0, 30) + "...",
      category: challenge.category,
      difficulty: challenge.difficulty_level,
      isCompleted,
      isActive,
      isLocked,
      stars,
    };
  });

  return {
    challenges,
    lessons,
    userProgress,
    stats,
    loading,
    error,
    isChallengeCompleted,
    getChallengeStars,
  };
}
