import PropTypes from "prop-types";
import { Recycle, BookOpen, Trash2, ChevronRight } from "lucide-react";
import { wasteCategories } from "../CategoriesData";
import { learningModules } from "../ModulesData";
import Header from "../../../components/Header";
import TrashBin from "../../../components/TrashBin";

function HomeView({ setCurrentView, setSelectedCategory, setSelectedModule }) {
  return (
    <div className="min-h-screen md:p-4">
      <div className="max-w-6xl mx-auto">
        <Header
          unit={false}
          title={"Aprendamos a Reciclar"}
          description="Aprende los fundamentos del reciclaje, los tipos de contenedores y cómo reciclar correctamente."
        />

        <div className="h-[100dvh]">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4 flex items-center gap-2">
            <Recycle className="w-7 h-7 text-neutral-100" /> Tipos de Residuos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentView("detail");
                }}
                className="flex items-end cursor-pointer group"
              >
                <div className="flex-shrink-0 h-full flex items-end">
                  <TrashBin
                    colorName={category.trashColorName}
                    label={category.name}
                  />
                </div>
                <div className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all transform group-hover:-translate-y-1 group-hover:scale-[1.02] duration-300 overflow-hidden ml-[-20px] flex-1 z-10">
                  <div
                    className={`${category.color} p-4 flex items-center justify-between`}
                  >
                    <span className="text-4xl">{category.icon}</span>
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-500">
                        Contenedor: {category.binColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
