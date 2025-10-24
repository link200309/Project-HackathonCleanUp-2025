import React, { useState, useEffect } from "react";
import {
  Recycle,
  Trash2,
  Leaf,
  Users,
  Camera,
  BookOpen,
  Award,
  Sparkles,
  ChevronRight,
  Play,
} from "lucide-react";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const FloatingTrash = ({ delay, icon: Icon, color }) => (
    <div
      className="absolute animate-float"
      style={{
        animationDelay: `${delay}s`,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 90}%`,
      }}
    >
      <Icon className={`w-8 h-8 ${color} opacity-20`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Elementos flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingTrash delay={0} icon={Recycle} color="text-green-500" />
        <FloatingTrash delay={1} icon={Trash2} color="text-blue-500" />
        <FloatingTrash delay={2} icon={Leaf} color="text-emerald-500" />
        <FloatingTrash delay={3} icon={Recycle} color="text-teal-500" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-2xl transform group-hover:rotate-12 transition-transform duration-300">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                CleanUp Hero
              </span>
            </div>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Comenzar <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              CleanUp Hack 2025
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              Aprende a{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                reciclar
              </span>{" "}
              jugando
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Clasifica residuos, gana puntos, sube de nivel y conviértete en un
              héroe del reciclaje. ¡Es gratis, divertido y ayudas al planeta! 🌍
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <Play className="w-6 h-6" />
                Empezar ahora
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                <BookOpen className="w-6 h-6" />
                Ver demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Niveles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600">Usuarios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-gray-600">Gratis</div>
              </div>
            </div>
          </div>

          {/* Right - Mascot/Illustration */}
          <div className="relative">
            <div className="relative z-10 animate-bounce-slow">
              {/* Mascot Container */}
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full w-72 h-72 mx-auto flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                {/* Simplified mascot using icons */}
                <div className="relative">
                  <Recycle className="w-40 h-40 text-white animate-spin-slow" />
                  <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-blue-400 rounded-full p-3 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating cards around mascot */}
              <div className="absolute -left-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Trash2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Plástico</div>
                    <div className="font-bold text-green-600">+10 pts</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-8 top-1/3 bg-white p-4 rounded-2xl shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Orgánico</div>
                    <div className="font-bold text-green-600">+15 pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              ¿Por qué CleanUp Hero?
            </h2>
            <p className="text-xl text-gray-600">
              Aprende reciclaje de forma divertida e interactiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-300">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Juega y Aprende
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Niveles progresivos donde clasificas residuos, ganas puntos y
                desbloqueas contenido educativo.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-300">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Detección con IA
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Usa tu cámara para identificar tipos de basura automáticamente
                con inteligencia artificial.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300">
              <div className="bg-gradient-to-br from-purple-400 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Conecta con Recicladores
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Encuentra recicladores independientes cerca de ti y agenda
                recolecciones fácilmente.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-yellow-300">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Centro de Aprendizaje
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lee artículos, historia del reciclaje y tips para ser más
                sostenible en tu día a día.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="group bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-red-300">
              <div className="bg-gradient-to-br from-red-400 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Perfil Personalizable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Crea tu avatar, colecciona logros, sigue tu racha y compite con
                amigos en la tabla de líderes.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-teal-300">
              <div className="bg-gradient-to-br from-teal-400 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Impacto Real
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualiza tu impacto ambiental: kg reciclados, CO₂ ahorrado y
                árboles salvados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-emerald-600 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            ¡Únete a la revolución del reciclaje!
          </h2>
          <p className="text-xl text-green-50 mb-10">
            Miles de usuarios ya están aprendiendo y haciendo la diferencia. ¿Te
            unes?
          </p>
          <button className="bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
            Comenzar gratis ahora
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
