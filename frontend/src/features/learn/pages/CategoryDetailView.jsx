import { ArrowLeft, Trash2, Leaf } from "lucide-react";

function CategoryDetailView({ setCurrentView, selectedCategory }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`${selectedCategory.color} p-8 text-white`}>
            <span className="text-6xl mb-4 block">{selectedCategory.icon}</span>
            <h1 className="text-4xl font-bold mb-2">{selectedCategory.name}</h1>
            <p className="text-lg opacity-90">{selectedCategory.description}</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-blue-600" /> ¿Dónde va?
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Contenedor:</span>{" "}
                {selectedCategory.binColor}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Tiempo de descomposición:</span>{" "}
                {selectedCategory.decompositionTime}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                📦 Ejemplos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedCategory.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                💡 Consejos para reciclar
              </h3>
              <ul className="space-y-2">
                {selectedCategory.tips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-green-500 font-bold text-lg">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" /> Impacto Ambiental
              </h3>
              <p className="text-gray-700">{selectedCategory.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetailView;
