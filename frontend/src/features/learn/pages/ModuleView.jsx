import { ArrowLeft } from "lucide-react";

function ModuleView({ setCurrentView, selectedModule }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <span className="text-7xl mb-4 block">{selectedModule.icon}</span>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {selectedModule.title}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedModule.content}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 text-center">
            <p className="text-gray-700 font-semibold">
              ✅ ¡Has completado este módulo! Sigue aprendiendo para dominar el
              reciclaje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleView;
