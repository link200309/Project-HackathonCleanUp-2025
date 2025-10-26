import PropTypes from "prop-types";
import { Award, Trophy, Medal, Flame, Target } from "lucide-react";

/**
 * Componente para mostrar una tarjeta de usuario en el ranking
 */
const RankCard = ({ user, isCurrentUser = false }) => {
  // Obtener icono de medalla según posición
  const getMedalIcon = (rank) => {
    if (rank === 1)
      return (
        <div className="flex flex-col items-center">
          <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
          <span className="text-xs font-black text-yellow-600">#1</span>
        </div>
      );
    if (rank === 2)
      return (
        <div className="flex flex-col items-center">
          <Medal className="w-7 h-7 text-gray-400 drop-shadow-lg" />
          <span className="text-xs font-black text-gray-600">#2</span>
        </div>
      );
    if (rank === 3)
      return (
        <div className="flex flex-col items-center">
          <Medal className="w-7 h-7 text-amber-600 drop-shadow-lg" />
          <span className="text-xs font-black text-amber-700">#3</span>
        </div>
      );
    return (
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center font-black text-green-800 text-lg shadow-md border-2 border-green-300">
          {rank}
        </div>
        <span className="text-xs font-bold text-gray-500 mt-1">#{rank}</span>
      </div>
    );
  };

  // Obtener color del nivel
  const getLevelColor = (level) => {
    const colors = {
      Bronce: "from-amber-600 to-amber-800",
      Plata: "from-gray-400 to-gray-600",
      Oro: "from-yellow-400 to-yellow-600",
      "Verde Legendario": "from-green-400 to-green-600",
    };
    return colors[level] || colors.Bronce;
  };

  // Obtener color de borde según posición
  const getBorderColor = (rank) => {
    if (rank === 1) return "border-yellow-400 bg-yellow-50/50";
    if (rank === 2) return "border-gray-400 bg-gray-50/50";
    if (rank === 3) return "border-amber-600 bg-amber-50/50";
    return "border-gray-200 bg-white";
  };

  return (
    <div
      className={`relative rounded-2xl border-4 p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isCurrentUser
          ? "border-green-500 bg-green-50/80 ring-4 ring-green-200 shadow-lg"
          : getBorderColor(user.rank)
      }`}
    >
      {/* Indicador "TÚ" */}
      {isCurrentUser && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
          TÚ
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Medalla/Posición */}
        <div className="flex-shrink-0">{getMedalIcon(user.rank)}</div>

        {/* Avatar */}
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl border-4 border-white shadow-lg">
          {user.avatar_icon}
        </div>

        {/* Información del usuario */}
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-gray-800 text-lg truncate">
            {user.username}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="truncate">📍 {user.city}</span>
          </div>
          {/* Nivel */}
          <div
            className={`inline-flex items-center gap-1 bg-gradient-to-r ${getLevelColor(
              user.current_level
            )} px-3 py-1 rounded-full mt-1`}
          >
            <Award className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">
              {user.current_level}
            </span>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-col items-end gap-1">
          {/* XP */}
          <div className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded-full shadow-md">
            <Target className="w-4 h-4 text-yellow-900" />
            <span className="font-black text-yellow-900 text-sm">
              {user.total_xp.toLocaleString()} XP
            </span>
          </div>

          {/* Racha */}
          {user.current_streak > 0 && (
            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="font-bold text-orange-900 text-xs">
                {user.current_streak}
              </span>
            </div>
          )}

          {/* Challenges completados */}
          <div className="text-xs text-gray-600 font-medium">
            {user.challenges_completed} retos
          </div>
        </div>
      </div>
    </div>
  );
};

RankCard.propTypes = {
  user: PropTypes.shape({
    rank: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar_icon: PropTypes.string,
    city: PropTypes.string,
    total_xp: PropTypes.number.isRequired,
    current_level: PropTypes.string.isRequired,
    challenges_completed: PropTypes.number,
    current_streak: PropTypes.number,
  }).isRequired,
  isCurrentUser: PropTypes.bool,
};

export default RankCard;
