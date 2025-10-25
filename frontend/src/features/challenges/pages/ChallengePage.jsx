import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Award } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../auth/context/AuthContext";
import MultipleChoiceChallenge from "../components/MultipleChoiceChallenge";
import DragAndDropChallenge from "../components/DragAndDropChallenge";
import ResultModal from "../components/ResultModal";

/**
 * Página principal de desafíos
 * Carga un challenge por ID y muestra el componente correspondiente según su tipo
 */
const ChallengePage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el modal de resultado
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const loadChallenge = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("challenges")
        .select("*")
        .eq("id", challengeId)
        .eq("is_active", true)
        .single();

      if (fetchError) throw fetchError;

      if (!data) {
        throw new Error("Desafío no encontrado");
      }

      setChallenge(data);
    } catch (err) {
      console.error("Error cargando challenge:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [challengeId]);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  const handleSubmitAnswer = async (answer) => {
    if (!challenge || !user) return;

    const correct = answer === challenge.correct_answer;
    setIsCorrect(correct);
    setUserAnswer(answer);
    setShowResult(true);

    try {
      // Guardar progreso en la base de datos
      const { error: progressError } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_id: user.id,
            challenge_id: challenge.id,
            is_completed: true,
            is_correct: correct,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,challenge_id",
          }
        );

      if (progressError) {
        console.error("Error guardando progreso:", progressError);
      }

      // Si es correcto, actualizar XP y stats
      if (correct) {
        const { error: statsError } = await supabase.rpc("increment", {
          table_name: "user_stats",
          row_id: user.id,
          column_name: "total_xp",
          x: challenge.xp_reward || 10,
        });

        if (statsError) {
          console.error("Error actualizando XP:", statsError);
        }

        // Actualizar contador de challenges completados
        const { error: countError } = await supabase.rpc("increment", {
          table_name: "user_stats",
          row_id: user.id,
          column_name: "challenges_completed",
          x: 1,
        });

        if (countError) {
          console.error("Error actualizando contador:", countError);
        }
      }
    } catch (err) {
      console.error("Error en submit:", err);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    navigate("/learn");
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setUserAnswer("");
  };

  // Obtener color de categoría
  const getCategoryColor = (category) => {
    const colors = {
      organico: "from-amber-600 to-orange-600",
      plastico: "from-blue-500 to-cyan-500",
      "papel-carton": "from-yellow-500 to-amber-500",
      vidrio: "from-green-500 to-emerald-500",
      metal: "from-gray-500 to-slate-600",
      "no-reciclable": "from-red-500 to-rose-600",
    };
    return colors[category] || "from-green-500 to-emerald-600";
  };

  const getCategoryName = (category) => {
    const names = {
      organico: "Orgánico",
      plastico: "Plástico",
      "papel-carton": "Papel y Cartón",
      vidrio: "Vidrio",
      metal: "Metal",
      "no-reciclable": "No Reciclable",
    };
    return names[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold">Cargando desafío...</p>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Algo salió mal
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Desafío no encontrado"}
          </p>
          <button
            onClick={() => navigate("/learn")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all"
          >
            Volver a Aprender
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/learn")}
              className="flex items-center gap-2 text-white font-bold hover:text-yellow-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </button>

            <div className="flex items-center gap-4">
              {/* Categoría */}
              <div
                className={`bg-gradient-to-r ${getCategoryColor(
                  challenge.category
                )} px-4 py-2 rounded-full shadow-lg`}
              >
                <span className="text-white font-bold text-sm">
                  {getCategoryName(challenge.category)}
                </span>
              </div>

              {/* Dificultad */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < challenge.difficulty_level
                        ? "bg-yellow-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* XP Reward */}
              <div className="flex items-center gap-2 bg-yellow-400 px-3 py-2 rounded-full shadow-lg">
                <Award className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-green-900">
                  +{challenge.xp_reward} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {challenge.type === "multiple_choice" ? (
          <MultipleChoiceChallenge
            challenge={challenge}
            onSubmit={handleSubmitAnswer}
          />
        ) : challenge.type === "drag_and_drop" ? (
          <DragAndDropChallenge
            challenge={challenge}
            onSubmit={handleSubmitAnswer}
          />
        ) : (
          <div className="text-center text-white">
            <p>Tipo de desafío no soportado: {challenge.type}</p>
          </div>
        )}
      </div>

      {/* Result Modal */}
      {showResult && (
        <ResultModal
          isCorrect={isCorrect}
          userAnswer={userAnswer}
          correctAnswer={challenge.correct_answer}
          explanation={challenge.explanation}
          xpEarned={isCorrect ? challenge.xp_reward : 0}
          onContinue={handleCloseResult}
          onTryAgain={!isCorrect ? handleTryAgain : null}
        />
      )}
    </div>
  );
};

export default ChallengePage;
