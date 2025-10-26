import { useState } from "react";
import { useRanking } from "../hooks/useRanking";
import { useAuth } from "../../auth/context/AuthContext";
import RankCard from "../components/RankCard";
import { Trophy, Users, Filter } from "lucide-react";

const RankingPage = () => {
  const { user } = useAuth();
  const [limit, setLimit] = useState(100);
  const [filterLevel, setFilterLevel] = useState("all");
  const { rankings, error, refreshRanking } = useRanking(limit);

  const filteredRankings = rankings.filter((rank) => {
    if (filterLevel === "all") return true;
    return rank.current_level === filterLevel;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-black text-gray-800 mb-2">
            Error al cargar ranking
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshRanking}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 pb-16">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-800 to-green-700 border-b-4 border-yellow-400 shadow-xl mb-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">
                  Ranking Global
                </h1>
                <p className="text-yellow-200 font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {rankings.length} eco-héroes activos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-bold text-gray-700">Filtrar por:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterLevel("all")}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  filterLevel === "all"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Todos
              </button>
              {["Bronce", "Plata", "Oro", "Verde Legendario"].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    filterLevel === level
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRankings.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <h3 className="text-2xl font-black text-gray-800 mb-2">
                No hay usuarios en este nivel
              </h3>
              <p className="text-gray-600">
                Intenta con otro filtro o espera a que más usuarios alcancen
                este nivel
              </p>
            </div>
          ) : (
            filteredRankings.map((ranking) => (
              <RankCard
                key={ranking.id}
                user={ranking}
                isCurrentUser={user && ranking.id === user.id}
              />
            ))
          )}
        </div>

        {!filterLevel && rankings.length >= limit && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setLimit(limit + 50)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              Cargar más usuarios
            </button>
          </div>
        )}

        <div className="mt-12 bg-white/95 backdrop-blur-sm rounded-3xl border-b-8 border-yellow-400 px-8 py-6 shadow-2xl text-center">
          <h3 className="text-2xl font-black text-green-900 mb-2">
            ¡Sigue reciclando!
          </h3>
          <p className="text-green-700 font-medium">
            Cada acción cuenta para un planeta más limpio
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
