import PropTypes from "prop-types";
import { BookOpen, ChevronRight } from "lucide-react";
import { learningModules } from "../ModulesData";
import Header from "../../../components/Header";
import WasteCategoriesGrid from "../components/WasteCategories";

function HomeView({ setCurrentView, setSelectedCategory, setSelectedModule }) {
  return (
    <div className="min-h-screen md:p-4">
      <div className="max-w-6xl mx-auto">
        <Header
          unit={false}
          title={"Aprendamos a Reciclar"}
          description="Aprende los fundamentos del reciclaje, los tipos de contenedores y cómo reciclar correctamente."
        />

        <WasteCategoriesGrid
          setSelectedCategory={setSelectedCategory}
          setCurrentView={setCurrentView}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" /> Módulos Educativos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningModules.map((module) => (
              <div
                key={module.id}
                onClick={() => {
                  setSelectedModule(module);
                  setCurrentView("module");
                }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer p-6 transform hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{module.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {module.content.substring(0, 100)}...
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white text-center">
          <p className="text-lg font-semibold mb-2">🌟 ¡Cada acción cuenta!</p>
          <p className="text-sm opacity-90">
            Al aprender sobre reciclaje, estás ayudando a crear un futuro más
            limpio para Cochabamba y el mundo
          </p>
        </div>
      </div>
    </div>
  );
}

HomeView.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setSelectedModule: PropTypes.func.isRequired,
};

export default HomeView;
