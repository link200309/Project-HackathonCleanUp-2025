import React, { useState, useEffect } from "react";
import {
  Recycle,
  Users,
  Camera,
  BookOpen,
  Award,
  Sparkles,
  ChevronRight,
  Play,
} from "lucide-react";
import recycle from "../../assets/images/Recycle.webp";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32 h-[110dvh]">
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-16">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition-all">
              <Sparkles className="w-4 h-4" />
              CleanUp Hack 2025
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl">
              Aprende a{" "}
              <span className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-pulse-subtle">
                reciclar
              </span>{" "}
              jugando
            </h1>

            <p className="text-xl text-white/95 leading-relaxed drop-shadow-lg font-medium">
              Clasifica residuos, gana puntos, sube de nivel y conviértete en un
              héroe del reciclaje. ¡Es gratis, divertido y ayudas al planeta!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-white/90 text-green-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Empezar ahora
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/50 hover:bg-white/30 hover:border-white hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                <BookOpen className="w-6 h-6" />
                Ver demo
              </button>
            </div>
          </div>

          <div className="relative perspective-1000">
            <div
              className="relative z-10 transform-3d"
              style={{
                transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${
                  -mousePos.y * 0.5
                }deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 shadow-2xl w-[60dvh] h-[60dvh] flex items-center justify-center mx-auto">
                <div className="relative overflow-hidden rounded-full w-full h-full items-center justify-center flex">
                  <img
                    src={recycle}
                    alt="Recycle"
                    className="w-[40dvh] h-[40dvh] object-cover animate-rotate-3d"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shine"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-full h-full border-4 border-white/20 rounded-full animate-orbit-1"></div>
                  <div className="absolute w-[110%] h-[110%] border-4 border-emerald-300/20 rounded-full animate-orbit-2"></div>
                </div>

                <div
                  className="absolute top-0 right-0 w-16 h-16 bg-yellow-300/80 rounded-full blur-sm animate-float-particle"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute bottom-10 left-5 w-12 h-12 bg-blue-300/80 rounded-full blur-sm animate-float-particle"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/3 left-0 w-10 h-10 bg-green-300/80 rounded-full blur-sm animate-float-particle"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute bottom-0 right-10 w-14 h-14 bg-purple-300/80 rounded-full blur-sm animate-float-particle"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black/10 backdrop-blur-md py-20 h-[110dvh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-neutral-100 mb-4 drop-shadow-2xl">
              ¿Por qué CleanUp Hero?
            </h2>
            <p className="text-xl text-white/90 drop-shadow-lg">
              Aprende reciclaje de forma divertida e interactiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                gradient: "from-green-400 to-emerald-600",
                title: "Juega y Aprende",
                desc: "Niveles progresivos donde clasificas residuos, ganas puntos y desbloqueas contenido educativo.",
              },
              {
                icon: Camera,
                gradient: "from-blue-400 to-cyan-600",
                title: "Detección con IA",
                desc: "Usa tu cámara para identificar tipos de basura automáticamente con inteligencia artificial.",
              },
              {
                icon: Users,
                gradient: "from-purple-400 to-pink-600",
                title: "Conecta con Recicladores",
                desc: "Encuentra recicladores independientes cerca de ti y agenda recolecciones fácilmente.",
              },
              {
                icon: BookOpen,
                gradient: "from-yellow-400 to-orange-600",
                title: "Centro de Aprendizaje",
                desc: "Lee artículos, historia del reciclaje y tips para ser más sostenible en tu día a día.",
              },
              {
                icon: Award,
                gradient: "from-red-400 to-rose-600",
                title: "Perfil Personalizable",
                desc: "Crea tu avatar, colecciona logros, sigue tu racha y compite con amigos en la tabla de líderes.",
              },
              {
                icon: Sparkles,
                gradient: "from-teal-400 to-cyan-600",
                title: "Impacto Real",
                desc: "Visualiza tu impacto ambiental: kg reciclados, CO₂ ahorrado y árboles salvados.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group border backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 transform-3d hover:scale-105"
              >
                <div className="flex flex-row space-x-4 mb-6">
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-100">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-neutral-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 drop-shadow-2xl">
            ¡Únete a la revolución del reciclaje!
          </h2>
          <p className="text-xl text-white/95 mb-10 drop-shadow-lg">
            Miles de usuarios ya están aprendiendo y haciendo la diferencia. ¿Te
            unes?
          </p>
          <button className="bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 transform hover:-translate-y-1">
            Comenzar gratis ahora
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <footer className="bg-black/50 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-2xl">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CleanUp Hero</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 CleanUp Hero - Hackathon CleanUp Hack 2025
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.1); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes rotate-3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        @keyframes orbit-1 {
          0% { transform: rotateZ(0deg) rotateY(75deg); }
          100% { transform: rotateZ(360deg) rotateY(75deg); }
        }

        @keyframes orbit-2 {
          0% { transform: rotateZ(0deg) rotateY(-75deg); }
          100% { transform: rotateZ(-360deg) rotateY(-75deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        .animate-gradient { animation: gradient 15s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-pulse-subtle { animation: pulse-subtle 3s ease-in-out infinite; }
        .animate-rotate-3d { animation: rotate-3d 30s linear infinite; }
        .animate-shine { animation: shine 4s ease-in-out infinite; }
        .animate-orbit-1 { animation: orbit-1 20s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 15s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Home;
