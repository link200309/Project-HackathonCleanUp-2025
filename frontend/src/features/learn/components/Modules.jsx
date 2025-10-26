import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ModulesGrid = ({
  learningModules,
  setSelectedModule,
  setCurrentView,
}) => {
  return (
    <section className="my-16">
      <h1 className="text-3xl font-bold text-white mb-10 text-center">
        Módulos de Aprendizaje
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningModules.map((module) => (
          <motion.div
            key={module.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setSelectedModule(module);
              setCurrentView("module");
            }}
            className="relative overflow-hidden rounded-2xl cursor-pointer shadow-lg 
            bg-gradient-to-r from-green-700 to-emerald-800 p-6 text-white"
          >
            <div className="flex items-start gap-4">
              <span className="text-5xl">{module.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1">{module.title}</h3>
                <p className="text-sm font-semibold opacity-90 line-clamp-2">
                  {module.content.substring(0, 100)}...
                </p>
              </div>
              <ChevronRight className="w-6 h-6 opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

ModulesGrid.propTypes = {
  learningModules: PropTypes.array.isRequired,
  setSelectedModule: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};

export default ModulesGrid;
