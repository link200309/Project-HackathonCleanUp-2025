import PropTypes from "prop-types";
import Header from "../../../components/Header";
import WasteCategoriesGrid from "../components/WasteCategories";
import LearningModulesGrid from "../components/Modules";
import EducationalVideos from "../components/EducationalVideos";
import { learningModules } from "../ModulesData";

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

        <LearningModulesGrid
          learningModules={learningModules}
          setSelectedModule={setSelectedModule}
          setCurrentView={setCurrentView}
        />

        <EducationalVideos />

        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white text-center shadow-lg">
          <p className="text-lg font-semibold mb-2">🌟 ¡Cada acción cuenta!</p>
          <p className="text-sm opacity-90">
            Al aprender sobre reciclaje, estás ayudando a crear un futuro más limpio para Cochabamba y el mundo.
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
