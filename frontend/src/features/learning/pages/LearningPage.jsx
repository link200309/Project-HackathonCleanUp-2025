import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import UnitHeader from "../components/UnitHeader";
import LearningPath from "../components/LearningPath";
import { Flame, Sparkles, Award } from "lucide-react";
import Character1 from "../../../assets/images/characters/Character1.png";
import Character2 from "../../../assets/images/characters/Character2.png";
import Avatar1 from "../../../assets/images/characters/avatar1.png";
import BigCloud from "../../../assets/images/decoration/bigCloud.png";
import Cloud from "../../../assets/images/decoration/cloud.png";
import SmallCloud from "../../../assets/images/decoration/smallCloud.png";

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

  // Efecto neón según el nivel
  const getLevelNeonEffect = (level) => {
    const effects = {
      Bronce:
        "shadow-[0_0_15px_rgba(245,158,11,0.8),0_0_30px_rgba(245,158,11,0.5),0_0_45px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,1),0_0_40px_rgba(245,158,11,0.7),0_0_60px_rgba(245,158,11,0.5)]",
      Plata:
        "shadow-[0_0_15px_rgba(156,163,175,0.8),0_0_30px_rgba(156,163,175,0.5),0_0_45px_rgba(156,163,175,0.3)] hover:shadow-[0_0_20px_rgba(156,163,175,1),0_0_40px_rgba(156,163,175,0.7),0_0_60px_rgba(156,163,175,0.5)]",
      Oro: "shadow-[0_0_15px_rgba(250,204,21,0.8),0_0_30px_rgba(250,204,21,0.5),0_0_45px_rgba(250,204,21,0.3)] hover:shadow-[0_0_20px_rgba(250,204,21,1),0_0_40px_rgba(250,204,21,0.7),0_0_60px_rgba(250,204,21,0.5)] animate-pulse",
      "Verde Legendario":
        "shadow-[0_0_20px_rgba(34,197,94,0.9),0_0_40px_rgba(34,197,94,0.6),0_0_60px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,1),0_0_60px_rgba(34,197,94,0.8),0_0_90px_rgba(34,197,94,0.6)] animate-pulse",
    };
    return effects[level] || effects.Bronce;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-emerald-800 to-green-700 border-b-4 border-yellow-400 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center relative">
            {/* Logo - Posición Absoluta Izquierda */}
            <div className="absolute left-0">
              <img
                src="/logo.svg"
                alt="EcoQuest"
                className="h-10 w-10"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Estadísticas Centradas */}
            <div className="flex items-center gap-6">
              {/* Racha */}

              <div className="flex items-center">
                <Flame className="w-10 h-10 text-orange-400 mr-0 pr-0" />
                <span className="font-bold text-green-900 text-2xl">
                  {currentStreak}
                </span>
              </div>

              {/* Nivel con Efecto Neón */}
              <div
                className={`flex items-center gap-2 bg-gradient-to-r ${getLevelColor(
                  currentLevel
                )} px-4 py-2 rounded-full border-2 border-white/50 transform hover:scale-110 transition-all duration-300 ${getLevelNeonEffect(
                  currentLevel
                )}`}
              >
                <Award className="w-5 h-5 text-white drop-shadow-lg" />
                <span className="font-bold text-white text-sm drop-shadow-lg">
                  {currentLevel}
                </span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-yellow-500" />
                <span className="font-bold text-green-900 text-2xl">
                  {totalXP}
                </span>
              </div>
            </div>

            {/* Avatar - Posición Absoluta Derecha */}
            <div className="absolute right-0">
              <button
                onClick={() => navigate("/profile")}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-4 border-white flex items-center justify-center text-2xl hover:scale-110 transition-transform shadow-xl"
              >
                <img src={Avatar1} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Nubes decorativas flotantes */}
        <div className="absolute top-[10%] left-[-5%] w-32 opacity-80 animate-float pointer-events-none z-0">
          <img src={BigCloud} alt="" className="w-full" />
        </div>
        <div
          className="absolute top-[5%] right-[-3%] w-24 opacity-70 animate-float-delayed pointer-events-none z-0"
          style={{ animationDelay: "2s" }}
        >
          <img src={Cloud} alt="" className="w-full" />
        </div>
        <div
          className="absolute top-[35%] left-[-8%] w-20 opacity-60 animate-float pointer-events-none z-0"
          style={{ animationDelay: "4s" }}
        >
          <img src={SmallCloud} alt="" className="w-full" />
        </div>
        <div
          className="absolute top-[60%] right-[-5%] w-28 opacity-75 animate-float-delayed pointer-events-none z-0"
          style={{ animationDelay: "1s" }}
        >
          <img src={Cloud} alt="" className="w-full" />
        </div>
        <div
          className="absolute bottom-[20%] left-[-4%] w-24 opacity-65 animate-float pointer-events-none z-0"
          style={{ animationDelay: "3s" }}
        >
          <img src={SmallCloud} alt="" className="w-full" />
        </div>
        <div className="absolute bottom-[10%] right-[-6%] w-32 opacity-70 animate-float-delayed pointer-events-none z-0">
          <img src={BigCloud} alt="" className="w-full" />
        </div>

        <UnitHeader
          unitNumber={selectedUnit}
          title="Fundamentos del Reciclaje"
          description="Aprende a separar correctamente los residuos"
          color="yellow"
        />

        <LearningPath lessons={mockLessons} onLessonClick={handleLessonClick} />

        <div className="w-[25%] absolute top-[15%] left-[8%]">
          <img src={Character1} alt="" />
        </div>
        <div className="w-[20%] absolute bottom-[5%] right-[5%]">
          <img src={Character2} alt="" />
        </div>

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
