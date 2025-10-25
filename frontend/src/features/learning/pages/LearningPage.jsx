import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import UnitHeader from "../components/UnitHeader";
import LearningPath from "../components/LearningPath";
import { Flame, Gem, Award } from "lucide-react";

const LearningPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedUnit] = useState(1);

  const mockLessons = [
    {
      id: 1,
      type: "lesson",
      title: "Tipos de Residuos",
      isCompleted: true,
      isActive: false,
      isLocked: false,
      stars: 3,
    },
    {
      id: 2,
      type: "lesson",
      title: "Orgánicos",
      isCompleted: true,
      isActive: false,
      isLocked: false,
      stars: 2,
    },
    {
      id: "8ac3d618-437f-481d-8796-434e80ac7984",
      type: "lesson",
      title: "Plásticos",
      isCompleted: false,
      isActive: true,
      isLocked: false,
      stars: 0,
    },
    {
      id: "9712a065-5d09-432b-ade8-0bbc80288da7",
      type: "lesson",
      title: "No reciclables",
      isCompleted: false,
      isActive: true,
      isLocked: false,
      stars: 0,
    },
    {
      id: "a50eb138-aaec-4118-8f28-80f88cdb888d",
      type: "drag_and_drop",
      title: "Separa residuos",
      isCompleted: false,
      isActive: true,
      isLocked: false,
      stars: 0,
    },
    {
      id: 5,
      type: "lesson",
      title: "Papel y Cartón",
      isCompleted: false,
      isActive: false,
      isLocked: true,
      stars: 0,
    },

    {
      id: 7,
      type: "test",
      title: "Prueba Unidad 1",
      isCompleted: false,
      isActive: false,
      isLocked: true,
      stars: 0,
    },
    {
      id: 8,
      type: "lesson",
      title: "Metales",
      isCompleted: false,
      isActive: false,
      isLocked: true,
      stars: 0,
    },
  ];

  const handleLessonClick = (lesson) => {
    console.log("Lección seleccionada:", lesson);
    navigate(`/challenge/${lesson.id}`);
  };

  const currentLevel = "Bronce"; // profile?.user_stats?.current_level || "Bronce";
  const currentStreak = 0; // profile?.user_stats?.current_streak || 0;
  const totalXP = 0; // profile?.user_stats?.total_xp || 0;

  const getLevelColor = (level) => {
    const colors = {
      Bronce: "from-amber-600 to-amber-800",
      Plata: "from-gray-400 to-gray-600",
      Oro: "from-yellow-400 to-yellow-600",
      "Verde Legendario": "from-green-400 to-green-600",
    };
    return colors[level] || colors.Bronce;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-emerald-800 to-green-700 border-b-4 border-yellow-400 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src="/logo.svg"
              alt="EcoQuest"
              className="h-10 w-10"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-400 px-3 py-2 rounded-full shadow-lg">
                <Flame className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-green-900">
                  {currentStreak}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                <Gem className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-green-900">{totalXP}</span>
              </div>
              <div
                className={`flex items-center gap-2 bg-gradient-to-r ${getLevelColor(
                  currentLevel
                )} px-4 py-2 rounded-full shadow-xl border-2 border-white/50`}
              >
                <Award className="w-5 h-5 text-white" />
                <span className="font-bold text-white text-sm">
                  {currentLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-4 border-white flex items-center justify-center text-2xl hover:scale-110 transition-transform shadow-xl"
            >
              {/* COMENTADO: profile ya no está disponible */}
              {user?.user_metadata?.username?.charAt(0).toUpperCase() || "👤"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <UnitHeader
          unitNumber={selectedUnit}
          title="Fundamentos del Reciclaje"
          description="Aprende a separar correctamente los residuos"
          color="yellow"
        />

        <LearningPath lessons={mockLessons} onLessonClick={handleLessonClick} />

        <div className="mt-16 mb-8 text-center">
          <div className="inline-block bg-white/95 backdrop-blur-sm rounded-3xl border-b-8 border-yellow-400 px-8 py-6 shadow-2xl">
            <h3 className="text-2xl font-black text-green-900 mb-2">
              ¡Sigue así! 🎉
            </h3>
            <p className="text-green-700 font-medium">
              Has completado 2 de 12 lecciones
            </p>
            <div className="mt-4 bg-green-100 h-4 rounded-full overflow-hidden border-2 border-green-200">
              <div
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 h-full transition-all duration-500 shadow-lg"
                style={{ width: "17%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
