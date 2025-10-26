import PropTypes from "prop-types";
import {
  ArrowLeft,
  Leaf,
  Clock,
  Trash2,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from "lucide-react";

function CategoryDetailView({ setCurrentView, selectedCategory }) {
  return (
    <div className="min-h-screen pb-8 pt-0">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-6 font-semibold transition-all border border-white/20"
        >
          <ArrowLeft className="w-5 h-5" /> Volver al inicio
        </button>

        <div className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/50">
          <div
            className={`${selectedCategory.color} p-8 md:p-8 text-white relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 opacity-10 text-[200px]">
              {selectedCategory.icon}
            </div>
            <div className="relative z-10 flex items-start gap-6">
              <span className="text-7xl md:text-8xl drop-shadow-lg">
                {selectedCategory.icon}
              </span>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-md">
                  {selectedCategory.name}
                </h1>
                <p className="text-lg md:text-lg opacity-95 leading-relaxed">
                  {selectedCategory.description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border-2 border-blue-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Trash2 className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-lg text-gray-800">
                    Contenedor
                  </h3>
                </div>
                <p className="text-gray-700 text-lg font-semibold">
                  {selectedCategory.binColor}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border-2 border-amber-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-lg text-gray-800">
                    Descomposición
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCategory.decompositionTime}
                </p>
              </div>
            </div>

            {/* Ejemplos con mejor diseño */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200/50">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">{selectedCategory.icon}</span>
                Ejemplos de {selectedCategory.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedCategory.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 text-center text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105 border border-purple-100"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>

            {/* Consejos mejorados */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200/50">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-xl text-gray-800">
                  Consejos para reciclar correctamente
                </h3>
              </div>
              <ul className="space-y-3">
                {selectedCategory.tips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 bg-white/60 rounded-lg p-3 hover:bg-white/80 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impacto Ambiental Expandido */}
            {selectedCategory.environmentalImpact && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="w-7 h-7 text-green-600" />
                  <h3 className="font-bold text-2xl text-gray-800">
                    Impacto Ambiental
                  </h3>
                </div>

                {/* Impacto Positivo */}
                <div className="bg-gradient-to-br from-green-50 to-green-100/70 rounded-2xl p-6 border-2 border-green-300/50 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg text-green-800 mb-2">
                        Beneficios del Reciclaje
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedCategory.environmentalImpact.positive}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impacto Negativo */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-300/50 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg text-red-800 mb-2">
                        Consecuencias del Mal Manejo
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedCategory.environmentalImpact.negative}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contexto Cochabamba */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-300/50 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg text-blue-800 mb-2">
                        📍 Situación en Cochabamba
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedCategory.environmentalImpact.cochabambaContext}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action Final */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 text-white text-center shadow-xl">
              <p className="text-lg font-semibold mb-2">
                🌍 Cada acción cuenta para un Cochabamba más limpio
              </p>
              <p className="text-sm opacity-90">
                Separa correctamente tus residuos y contribuye a un futuro
                sostenible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CategoryDetailView.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
  selectedCategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    binColor: PropTypes.string.isRequired,
    decompositionTime: PropTypes.string.isRequired,
    examples: PropTypes.arrayOf(PropTypes.string).isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired,
    impact: PropTypes.string,
    environmentalImpact: PropTypes.shape({
      positive: PropTypes.string.isRequired,
      negative: PropTypes.string.isRequired,
      cochabambaContext: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default CategoryDetailView;
