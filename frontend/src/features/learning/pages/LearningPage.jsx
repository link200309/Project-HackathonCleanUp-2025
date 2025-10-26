import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLearningData } from "../hooks/useLearningData";
import UnitHeader from "../components/UnitHeader";
import LearningPath from "../components/LearningPath";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { Flame, Sparkles, Award } from "lucide-react";
import Character1 from "../../../assets/images/characters/Character1.png";
import Character2 from "../../../assets/images/characters/Character2.png";
import Character4 from "../../../assets/images/characters/Character4.png";
import Avatar1 from "../../../assets/images/characters/avatar1.png";
import BigCloud from "../../../assets/images/decoration/bigCloud.png";
import Cloud from "../../../assets/images/decoration/cloud.png";
import SmallCloud from "../../../assets/images/decoration/smallCloud.png";

const LearningPage = () => {
  const navigate = useNavigate();
  const [selectedUnit] = useState(1);

  const { lessons, stats, loading, error } = useLearningData();

  const handleLessonClick = (lesson) => {
    console.log("Lección seleccionada:", lesson);
    navigate(`/challenge/${lesson.id}`);
  };

  const currentLevel = stats?.current_level || "Bronce";
  const currentStreak = stats?.current_streak || 0;
  const totalXP = stats?.total_xp || 0;

  const challengesCompleted = lessons.filter(
    (lesson) => lesson.isCompleted
  ).length;

  const totalChallenges = lessons.length || 12; // Fallback a 12
  const progressPercentage =
    totalChallenges > 0
      ? Math.round((challengesCompleted / totalChallenges) * 100)
      : 0;

  const getLevelColor = (level) => {
    const colors = {
      Bronce: "from-amber-600 to-amber-800",
      Plata: "from-gray-400 to-gray-600",
      Oro: "from-yellow-400 to-yellow-600",
      "Verde Legendario": "from-green-400 to-green-600",
    };
    return colors[level] || colors.Bronce;
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-black text-gray-800 mb-2">
            Error al cargar datos
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-emerald-800 to-green-700 border-b-4 border-yellow-400 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center relative">
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

            <div className="flex items-center gap-6">

              <div className="flex items-center">
                <Flame className="w-6 h-6 md:w-10 md:h-10 text-orange-400 mr-0 pr-0" />
                <span className="font-bold text-green-900 text-2xl">
                  {currentStreak}
                </span>
              </div>

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
              <div className="flex items-center gap-0 md:gap-2">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
                <span className="font-bold text-green-900 text-lg md:text-2xl">
                  {totalXP}
                </span>
              </div>
            </div>

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

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="relative max-w-4xl mx-auto px-4 py-8">
          <div className="fixed top-[50%] right-8 z-40 bg-white/95 backdrop-blur-sm rounded-3xl border-b-8 border-yellow-400 px-6 py-5 shadow-2xl max-w-[180px] md:max-w-[280px]">
            <h3 className="text-sm font-black text-green-900 mb-2 text-center md:text-lg">
              ¡Sigue así!
            </h3>
            <p className="text-sm text-green-700 font-medium text-center mb-3 md:text-lg">
              Has completado {challengesCompleted} de {totalChallenges}{" "}
              lecciones
            </p>
            <div className="bg-green-100 h-4 rounded-full overflow-hidden border-2 border-green-200 mb-4">
              <div
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 h-full transition-all duration-500 shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-center text-sm font-bold text-green-600">
              {progressPercentage}% completado
            </div>
          </div>

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

          <LearningPath lessons={lessons} onLessonClick={handleLessonClick} />

          <div className="w-[25%] absolute top-[15%] left-[8%]">
            <div
              className="absolute bottom-[100%] left-[-10%] mb-4 animate-float-delayed z-10"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl shadow-2xl px-6 py-4 max-w-[270px] max-h-[170px] md:max-h-[270px] border-4 border-blue-400">
                <p className="text-blue-800 font-black leading-relaxed text-center text-[10px] md:text-lg">
                  ¡Tú puedes! Cada reto te acerca más a ser un héroe del
                  reciclaje
                </p>
                <div className="absolute bottom-[-12px] left-[40%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-blue-400"></div>
                <div className="absolute bottom-[-8px] left-[40%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-blue-100"></div>
              </div>
            </div>
            <img src={Character1} alt="" />
          </div>

          <div className="w-[23%] absolute top-[50%] left-[8%]">
            <div className="absolute bottom-[100%] left-[-15%] mb-4 animate-float z-10">
              <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl shadow-2xl px-6 py-4 max-w-[260px] border-4 border-yellow-400">
                <p className="text-orange-800 font-black text-sm leading-relaxed text-center text-[10px] md:text-lg">
                  Tirá tu basura bien, no seas chango
                </p>
                <div className="absolute bottom-[-12px] left-[35%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-yellow-400"></div>
                <div className="absolute bottom-[-8px] left-[35%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-yellow-100"></div>
              </div>
            </div>
            <img src={Character4} alt="" />
          </div>

          <div className="w-[20%] absolute bottom-[5%] right-[5%]">
            <div className="absolute bottom-[100%] right-[-10%] mb-4 animate-float-delayed z-10">
              <div className="relative bg-white rounded-3xl shadow-2xl px-6 py-4 max-w-[280px] border-4 border-green-400">
                <p className="text-green-800 font-bold text-sm leading-relaxed text-center">
                  ¡Cada residuo en su lugar hace la diferencia!
                </p>
                <div className="absolute bottom-[-12px] right-[30%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-green-400"></div>
                <div className="absolute bottom-[-8px] right-[30%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
            </div>
            <img src={Character2} alt="" />
          </div>

          <div className="mt-16 mb-8 text-center">
            <button
              disabled
              className="inline-flex items-center gap-3 bg-gray-300 text-gray-500 px-8 py-4 rounded-3xl border-b-8 border-gray-400 shadow-lg cursor-not-allowed opacity-60"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full border-4 border-white">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black">Unidad 2</h3>
                <p className="text-sm font-medium">
                  Muy Pronto podras aprender con mas retos!
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;
