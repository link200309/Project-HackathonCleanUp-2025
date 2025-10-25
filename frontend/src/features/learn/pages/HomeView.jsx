import {
  Recycle,
  BookOpen,
  Leaf,
  Trash2,
  ChevronRight,
  Award,
} from "lucide-react";
import { wasteCategories } from "../CategoriesData";
import { learningModules } from "../ModulesData";

function HomeView({ setCurrentView, setSelectedCategory, setSelectedModule }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-3 rounded-xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">EcoLearn</h1>
                <p className="text-gray-600">Aprende a cuidar el planeta</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-700">
                ¡Sigue aprendiendo!
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Recycle className="w-7 h-7 text-green-600" /> Tipos de Residuos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wasteCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentView("detail");
                }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden transform hover:scale-105"
              >
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
                  <p className="text-gray-600 text-sm mb-3">
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

export default HomeView;
