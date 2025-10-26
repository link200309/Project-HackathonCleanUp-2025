import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronRight, Trash2 } from "lucide-react";
import { wasteCategories } from "../CategoriesData";
import TrashBin from "../../../components/TrashBin";

const WasteCategoriesGrid = ({
  setSelectedCategory = () => {},
  setCurrentView = () => {},
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-12 text-center">
          Categorías de Residuos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wasteCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentView("detail");
                console.log("Categoría seleccionada:", category.name);
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex items-end cursor-pointer group mt-12 mb-6 h-44"
            >
              <div className="flex-shrink-0 h-full flex items-end">
                <TrashBin
                  colorName={category.trashColorName}
                  hovered={hoveredId === category.id}
                />
              </div>

              <div className="relative h-44 pl-8 bg-black/20 rounded-xl shadow-md hover:shadow-2xl transition-all transform group-hover:-translate-y-1 group-hover:scale-[1.02] duration-300 overflow-hidden ml-[-50px] flex-1 z-10">
                <div
                  className={`${category.color} p-4 flex items-center justify-between`}
                >
                  <h3 className="font-bold text-lg text-neutral-100">
                    {category.name}
                  </h3>
                  <ChevronRight className="w-6 h-6 text-neutral-100" />
                </div>
                <div className="p-4">
                  <p className="text-neutral-300 text-sm font-semibold mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Trash2 className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-400 font-semibold">
                      Contenedor: {category.binColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

WasteCategoriesGrid.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};

export default WasteCategoriesGrid;
